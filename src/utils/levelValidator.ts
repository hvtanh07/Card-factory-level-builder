import { LevelData, ValidationIssue, SpawnBox } from '../types/level';
import { getBoxType } from '../constants/boxTypes';
import { getBlockedByMap } from './autoBlocker';

export function validateLevel(data: LevelData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const boardMap = new Map(data.BoardNodes.map(n => [n.Id, n]));
  const boxMap = new Map(data.BoxNodes.map(b => [b.Id, b]));
  const spawnerMap = new Map((data.SpawnerNodes || []).map(s => [s.Id, s]));

  // 1. Check for missing box/board pairs
  for (const bn of data.BoardNodes) {
    if (!boxMap.has(bn.Id) && !spawnerMap.has(bn.Id)) {
      issues.push({
        type: 'error',
        nodeId: bn.Id,
        message: `BoardNode "${bn.Id}" has no matching BoxNode or SpawnerNode.`,
      });
    }
  }

  for (const bx of data.BoxNodes) {
    if (!boardMap.has(bx.Id)) {
      issues.push({
        type: 'error',
        nodeId: bx.Id,
        message: `BoxNode "${bx.Id}" has no matching BoardNode.`,
      });
    }
  }

  for (const sn of (data.SpawnerNodes || [])) {
    if (!boardMap.has(sn.Id)) {
      issues.push({
        type: 'error',
        nodeId: sn.Id,
        message: `SpawnerNode "${sn.Id}" has no matching BoardNode.`,
      });
    }
  }

  // 2. Check BlockedNodes validity
  for (const bx of data.BoxNodes) {
    const myBoard = boardMap.get(bx.Id);

    for (const blockedId of bx.BlockedNodes) {
      if (blockedId === bx.Id) {
        issues.push({
          type: 'error',
          nodeId: bx.Id,
          message: `Node "${bx.Id}" cannot block itself.`,
        });
      }

      if (!boxMap.has(blockedId) && !spawnerMap.has(blockedId)) {
        issues.push({
          type: 'error',
          nodeId: bx.Id,
          message: `Node "${bx.Id}" references non-existent blocked target "${blockedId}".`,
        });
      } else if (myBoard) {
        const targetBoard = boardMap.get(blockedId);
        if (targetBoard) {
          const myLayer = myBoard.LayerId ?? myBoard.TileMapId ?? 0;
          const targetLayer = targetBoard.LayerId ?? targetBoard.TileMapId ?? 0;
          if (targetLayer >= myLayer) {
            issues.push({
              type: 'error',
              nodeId: bx.Id,
              message: `Node "${bx.Id}" (Layer ${myLayer}) cannot block "${blockedId}" (Layer ${targetLayer}). Lower/same layer is not allowed to block a higher layer (Layer 0 is lowest base, Layer 1/2/3 are on top).`,
            });
          }
        }
      }
    }

    // 3. Card capacity check
    const boxType = getBoxType(bx.TypeId);
    if (bx.InitCards.length > boxType.capacity) {
      issues.push({
        type: 'warning',
        nodeId: bx.Id,
        message: `Box "${bx.Id}" has ${bx.InitCards.length} cards, which exceeds Type ${bx.TypeId} max capacity (${boxType.capacity}).`,
      });
    }
  }

  // 4. Circular dependency detection (DFS cycle check)
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function hasCycle(nodeId: string, path: string[]): boolean {
    visited.add(nodeId);
    recStack.add(nodeId);

    const bx = boxMap.get(nodeId);
    const sn = spawnerMap.get(nodeId);
    const blockedNodes = bx?.BlockedNodes || sn?.BlockedNodes || [];

    for (const nextId of blockedNodes) {
      if (!visited.has(nextId)) {
        if (hasCycle(nextId, [...path, nextId])) return true;
      } else if (recStack.has(nextId)) {
        issues.push({
          type: 'error',
          nodeId,
          message: `Circular blocking dependency detected: ${path.join(' -> ')} -> ${nextId}`,
        });
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  }

  for (const bx of data.BoxNodes) {
    if (!visited.has(bx.Id)) {
      hasCycle(bx.Id, [bx.Id]);
    }
  }

  // 5. Card Deck vs Box Capacity balance check
  const cardDist = getCardDistribution(data);
  const coloredCaps = getColoredBoxCapacities(data);

  for (const [colStr, cap] of Object.entries(coloredCaps)) {
    const col = Number(colStr);
    const count = cardDist[col] || 0;
    if (count !== cap) {
      issues.push({
        type: 'warning',
        message: `Color ${col}: Total cards (${count}) does not match total box capacity (${cap}). Difference: ${count - cap > 0 ? `+${count - cap}` : count - cap}.`,
      });
    }
  }

  // 6. Check for fully pre-completed monocolor boxes (no puzzle challenge / feed cards)
  const allColoredBoxColors = new Set(data.BoxNodes.filter(b => !b.IsPaperBox && !getBoxType(b.TypeId).isTray).map(b => b.BoxColor));
  if (allColoredBoxColors.size > 1) {
    for (const bx of data.BoxNodes) {
      if (bx.IsPaperBox || getBoxType(bx.TypeId).isTray) continue;
      const boxType = getBoxType(bx.TypeId);
      if (bx.InitCards.length >= boxType.capacity && bx.InitCards.every(c => c === bx.BoxColor)) {
        issues.push({
          type: 'warning',
          nodeId: bx.Id,
          message: `Box "${bx.Id}" contains only matching cards (${bx.InitCards.length}/${boxType.capacity}) and is already filled up. It should contain other card colors or be incomplete.`,
        });
      }
    }
  }

  // 7. Check for excessive color variety per box (> 4 distinct colors or too many 4-color boxes)
  let fourColorBoxCount = 0;
  for (const bx of data.BoxNodes) {
    const distinctColors = new Set(bx.InitCards);
    if (distinctColors.size > 4) {
      issues.push({
        type: 'warning',
        nodeId: bx.Id,
        message: `Box "${bx.Id}" contains ${distinctColors.size} different card colors. Maximum allowed is 4 colors per box.`,
      });
    } else if (distinctColors.size === 4) {
      fourColorBoxCount++;
    }
  }
  if (fourColorBoxCount > 4) {
    issues.push({
      type: 'warning',
      message: `Level has ${fourColorBoxCount} boxes with 4 colors. Limit 4-color boxes to at most 3-4 boxes per level.`,
    });
  }

  return issues;
}

export function getCardDistribution(data: LevelData): Record<number, number> {
  const distribution: Record<number, number> = {};
  for (const bx of data.BoxNodes) {
    for (const cardColor of bx.InitCards) {
      distribution[cardColor] = (distribution[cardColor] || 0) + 1;
    }
  }
  for (const sn of (data.SpawnerNodes || [])) {
    for (const sb of sn.SpawnBoxes) {
      for (const cardColor of sb.InitCards) {
        distribution[cardColor] = (distribution[cardColor] || 0) + 1;
      }
    }
  }
  for (const cardColor of (data.InitialCards || [])) {
    distribution[cardColor] = (distribution[cardColor] || 0) + 1;
  }
  return distribution;
}

export function getColoredBoxCapacities(data: LevelData): Record<number, number> {
  const capacities: Record<number, number> = {};
  for (const bx of data.BoxNodes) {
    if (bx.IsPaperBox) continue; // Skip neutral paper trays
    const boxType = getBoxType(bx.TypeId);
    capacities[bx.BoxColor] = (capacities[bx.BoxColor] || 0) + boxType.capacity;
  }
  for (const sn of (data.SpawnerNodes || [])) {
    for (const sb of sn.SpawnBoxes) {
      if (sb.IsPaperBox) continue;
      const boxType = getBoxType(sb.TypeId);
      capacities[sb.BoxColor] = (capacities[sb.BoxColor] || 0) + boxType.capacity;
    }
  }
  return capacities;
}

export interface SolverResult {
  solvable: boolean;
  solutionMoves?: string[];
}

/**
 * Simulates clearing the level on a conveyor with `maxSlots` capacity.
 * Trays dump cards directly onto the conveyor without occupying a box slot.
 * Colored boxes occupy a conveyor slot until filled with their respective color.
 */
export function isLevelSolvable(levelData: LevelData, maxSlots = 4): SolverResult {
  const boxList = levelData.BoxNodes;
  const totalBoxes = boxList.length;
  if (totalBoxes === 0) return { solvable: true, solutionMoves: [] };

  const boxIdToIndex = new Map(boxList.map((b, idx) => [b.Id, idx]));

  const blockedByMap = getBlockedByMap(boxList);
  const blockerIndicesMap = new Map<number, number[]>();
  for (let i = 0; i < boxList.length; i++) {
    const blockers = blockedByMap.get(boxList[i].Id) || [];
    blockerIndicesMap.set(
      i,
      blockers.map(id => boxIdToIndex.get(id)!).filter(idx => idx !== undefined)
    );
  }

  const memo = new Set<string>();
  const maxStates = 5000;

  function serializeState(clearedMask: number, docked: Array<{ color: number; count: number; cap: number }>, belt: number[]): string {
    const beltCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const c of belt) beltCounts[c] = (beltCounts[c] || 0) + 1;
    const dockedStr = docked.map(d => `${d.color}:${d.count}/${d.cap}`).sort().join(';');
    return `${clearedMask}|${dockedStr}|${beltCounts.join(',')}`;
  }

  function dfs(
    clearedMask: number,
    docked: Array<{ id: string; color: number; count: number; cap: number }>,
    belt: number[],
    path: string[]
  ): string[] | null {
    if (memo.size > maxStates) return null;

    let newDocked = docked.map(d => ({ ...d }));
    let newBelt = [...belt];
    let changed = true;

    while (changed) {
      changed = false;
      for (let i = 0; i < newBelt.length; i++) {
        const c = newBelt[i];
        const target = newDocked.find(d => d.color === c && d.count < d.cap);
        if (target) {
          target.count++;
          newBelt.splice(i, 1);
          changed = true;
          break;
        }
      }
      const beforeLen = newDocked.length;
      newDocked = newDocked.filter(d => d.count < d.cap);
      if (newDocked.length < beforeLen) {
        changed = true;
      }
    }

    if (clearedMask === (1 << totalBoxes) - 1 && newDocked.length === 0 && newBelt.length === 0) {
      return path;
    }

    const stateKey = serializeState(clearedMask, newDocked, newBelt);
    if (memo.has(stateKey)) return null;
    memo.add(stateKey);

    const availableBoxIndices: number[] = [];
    for (let i = 0; i < totalBoxes; i++) {
      if ((clearedMask & (1 << i)) !== 0) continue;
      const blockers = blockerIndicesMap.get(i) || [];
      const isUnblocked = blockers.every(bIdx => (clearedMask & (1 << bIdx)) !== 0);
      if (isUnblocked) {
        availableBoxIndices.push(i);
      }
    }

    if (availableBoxIndices.length === 0) {
      return null;
    }

    // Branch 1: Trays dump cards without occupying conveyor slots
    for (const idx of availableBoxIndices) {
      const box = boxList[idx];
      const isTray = Boolean(box.IsPaperBox || getBoxType(box.TypeId).isTray);
      if (isTray) {
        const nextMask = clearedMask | (1 << idx);
        const nextBelt = [...newBelt, ...box.InitCards];
        const res = dfs(nextMask, newDocked, nextBelt, [...path, `Tray:${box.Id}`]);
        if (res) return res;
      }
    }

    // Branch 2: Colored boxes dock into an available conveyor slot
    if (newDocked.length < maxSlots) {
      const candidates = availableBoxIndices.filter(idx => !boxList[idx].IsPaperBox && !getBoxType(boxList[idx].TypeId).isTray);

      for (const idx of candidates) {
        const box = boxList[idx];
        const bType = getBoxType(box.TypeId);
        let inBoxCount = 0;
        const toBelt: number[] = [];
        for (const c of box.InitCards) {
          if (c === box.BoxColor && inBoxCount < bType.capacity) {
            inBoxCount++;
          } else {
            toBelt.push(c);
          }
        }

        const nextMask = clearedMask | (1 << idx);
        const nextDocked = [...newDocked, { id: box.Id, color: box.BoxColor, count: inBoxCount, cap: bType.capacity }];
        const nextBelt = [...newBelt, ...toBelt];

        const res = dfs(nextMask, nextDocked, nextBelt, [...path, `Box:${box.Id}`]);
        if (res) return res;
      }
    }

    return null;
  }

  const initialBelt = levelData.InitialCards ? [...levelData.InitialCards] : [];
  const solution = dfs(0, [], initialBelt, []);
  return {
    solvable: solution !== null,
    solutionMoves: solution || undefined,
  };
}

export interface BalanceResult {
  level: LevelData;
  solvable: boolean;
  attempts: number;
}

export function getEqualChunks(cap: number, numColors: number): number[] {
  const base = Math.floor(cap / numColors);
  const rem = cap % numColors;
  const chunks: number[] = [];
  for (let i = 0; i < numColors; i++) {
    chunks.push(base + (i < rem ? 1 : 0));
  }
  return chunks;
}

/**
 * Balances the deck so that:
 * 1. Inside each box, cards are clustered into contiguous color groups with nearly equal amounts (e.g. 2-2-2, 3-3, 2-2).
 * 2. Total card counts exactly match total colored box capacities (0 validation warnings).
 * 3. The resulting level is verified solvable with `maxSlots` conveyor slots (default: 4).
 * 4. Respects max colors per box limits with 2-color boxes being the most common for 3-color caps, and limited 4-color boxes for 4-color caps.
 */
export function balanceLevelCardDeckResult(data: LevelData, maxSlots = 4, maxColorsPerBox = 3): BalanceResult {
  const coloredCaps = getColoredBoxCapacities(data);
  const colors = Object.keys(coloredCaps).map(Number).filter(c => coloredCaps[c] > 0);
  if (colors.length === 0) {
    return { level: data, solvable: true, attempts: 0 };
  }

  const boardMap = new Map(data.BoardNodes.map(n => [n.Id, n]));
  const sortedBoxes = [...data.BoxNodes].sort((a, b) => {
    const layerA = boardMap.get(a.Id)?.LayerId ?? 0;
    const layerB = boardMap.get(b.Id)?.LayerId ?? 0;
    return layerB - layerA;
  });

  const coloredBoxes = sortedBoxes.filter(b => !b.IsPaperBox && !getBoxType(b.TypeId).isTray);
  const trays = sortedBoxes.filter(b => b.IsPaperBox || getBoxType(b.TypeId).isTray);

  const spawnerColoredBoxes: SpawnBox[] = [];
  for (const sn of data.SpawnerNodes || []) {
    for (const sb of sn.SpawnBoxes || []) {
      if (!sb.IsPaperBox && !getBoxType(sb.TypeId).isTray) {
        spawnerColoredBoxes.push(sb);
      }
    }
  }

  const allColoredHolders = [...coloredBoxes, ...spawnerColoredBoxes];
  const totalDeckCards = Object.values(coloredCaps).reduce((sum, c) => sum + c, 0);

  // 1. Calculate tray cards and evenly distribute remaining cards across all colored boxes
  const trayTargetCounts = trays.map(tb => getBoxType(tb.TypeId, true).capacity);
  const totalTrayCards = trayTargetCounts.reduce((sum, c) => sum + c, 0);

  const remainingCardsCount = Math.max(allColoredHolders.length, totalDeckCards - totalTrayCards);
  const numColored = allColoredHolders.length;
  const coloredMaxCaps = allColoredHolders.map(bx => getBoxType(bx.TypeId).capacity);

  const baseCount = numColored > 0 ? Math.floor(remainingCardsCount / numColored) : 0;
  const extra = numColored > 0 ? remainingCardsCount % numColored : 0;
  const targetBoxCounts: number[] = [];

  for (let i = 0; i < numColored; i++) {
    const maxC = coloredMaxCaps[i];
    const cnt = baseCount + (i < extra ? 1 : 0);
    targetBoxCounts.push(Math.min(cnt, maxC));
  }

  let diff = remainingCardsCount - targetBoxCounts.reduce((sum, c) => sum + c, 0);
  for (let i = 0; i < targetBoxCounts.length; i++) {
    if (diff > 0 && targetBoxCounts[i] < coloredMaxCaps[i]) {
      const add = Math.min(diff, coloredMaxCaps[i] - targetBoxCounts[i]);
      targetBoxCounts[i] += add;
      diff -= add;
    } else if (diff < 0 && targetBoxCounts[i] > 1) {
      const sub = Math.min(-diff, targetBoxCounts[i] - 1);
      targetBoxCounts[i] -= sub;
      diff += sub;
    }
  }

  interface HolderInfo {
    id: string;
    cap: number;
    color: number;
    isTray: boolean;
    targetColors: number;
  }

  const allHolders: HolderInfo[] = [];
  for (let i = 0; i < trays.length; i++) {
    allHolders.push({
      id: trays[i].Id,
      cap: trayTargetCounts[i],
      color: -1,
      isTray: true,
      targetColors: 2,
    });
  }
  for (let i = 0; i < allColoredHolders.length; i++) {
    allHolders.push({
      id: allColoredHolders[i].Id,
      cap: targetBoxCounts[i],
      color: allColoredHolders[i].BoxColor,
      isTray: false,
      targetColors: 2,
    });
  }

  const totalHoldersCount = allHolders.length;
  let bestLevel = data;
  let attempts = 0;
  const maxAttempts = 600;

  while (attempts < maxAttempts) {
    attempts++;

    // Target 70% 2 colors per box, 30% 3 colors per box
    if (colors.length <= 1) {
      for (const h of allHolders) h.targetColors = 1;
    } else if (colors.length === 2) {
      for (const h of allHolders) h.targetColors = 2;
    } else {
      const num3 = Math.max(1, Math.round(totalHoldersCount * 0.30));
      const num2 = totalHoldersCount - num3;
      const targetColorsList = [...Array(num2).fill(2), ...Array(num3).fill(3)];
      // Shuffle target colors
      for (let i = targetColorsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [targetColorsList[i], targetColorsList[j]] = [targetColorsList[j], targetColorsList[i]];
      }
      for (let i = 0; i < allHolders.length; i++) {
        allHolders[i].targetColors = targetColorsList[i];
      }
    }

    const pool: Record<number, number> = { ...coloredCaps };
    const boxCardsMap = new Map<string, number[]>();
    let possible = true;

    // Order holders: 3-color boxes and larger capacity boxes first
    const holderOrder = [...allHolders].sort((a, b) => {
      if (b.targetColors !== a.targetColors) return b.targetColors - a.targetColors;
      return b.cap - a.cap;
    });

    for (const h of holderOrder) {
      const cap = h.cap;
      let tCol = Math.min(h.targetColors, colors.length);
      const avail = colors.filter(c => (pool[c] || 0) > 0);
      if (avail.length === 0) {
        possible = false;
        break;
      }
      tCol = Math.min(tCol, avail.length);

      interface ComboCandidate {
        cols: number[];
        score: number;
      }
      const candidateCombos: ComboCandidate[] = [];

      const searchCombos = (reqSize: number) => {
        if (reqSize === 2) {
          for (let i = 0; i < avail.length; i++) {
            for (let j = i + 1; j < avail.length; j++) {
              const c1 = avail[i];
              const c2 = avail[j];
              if ((pool[c1] || 0) + (pool[c2] || 0) >= cap) {
                const hasDiff = (c1 !== h.color || c2 !== h.color) ? 1 : 0;
                const score = hasDiff * 1000 + (pool[c1] || 0) + (pool[c2] || 0);
                candidateCombos.push({ cols: [c1, c2], score });
              }
            }
          }
        } else if (reqSize === 3) {
          for (let i = 0; i < avail.length; i++) {
            for (let j = i + 1; j < avail.length; j++) {
              for (let k = j + 1; k < avail.length; k++) {
                const c1 = avail[i];
                const c2 = avail[j];
                const c3 = avail[k];
                if ((pool[c1] || 0) + (pool[c2] || 0) + (pool[c3] || 0) >= cap) {
                  const score = (pool[c1] || 0) + (pool[c2] || 0) + (pool[c3] || 0);
                  candidateCombos.push({ cols: [c1, c2, c3], score });
                }
              }
            }
          }
        } else if (reqSize === 1) {
          for (const c of avail) {
            if ((pool[c] || 0) >= cap) {
              candidateCombos.push({ cols: [c], score: pool[c] || 0 });
            }
          }
        }
      };

      searchCombos(tCol);
      if (candidateCombos.length === 0) {
        for (const fallbackSize of [2, 3, 1]) {
          searchCombos(fallbackSize);
          if (candidateCombos.length > 0) break;
        }
      }

      if (candidateCombos.length === 0) {
        possible = false;
        break;
      }

      candidateCombos.sort((a, b) => b.score - a.score);
      const topN = Math.min(3, candidateCombos.length);
      const chosen = candidateCombos[Math.floor(Math.random() * topN)].cols;

      const boxCards: number[] = [];
      if (chosen.length === 1) {
        const c1 = chosen[0];
        for (let k = 0; k < cap; k++) boxCards.push(c1);
        pool[c1] = (pool[c1] || 0) - cap;
      } else if (chosen.length === 2) {
        const [c1, c2] = chosen;
        const half = Math.floor(cap / 2);
        let take1 = Math.max(1, Math.min(half, pool[c1] || 0));
        let take2 = cap - take1;
        if (take2 > (pool[c2] || 0)) {
          take2 = pool[c2] || 0;
          take1 = cap - take2;
        }
        for (let k = 0; k < take1; k++) boxCards.push(c1);
        for (let k = 0; k < take2; k++) boxCards.push(c2);
        pool[c1] = (pool[c1] || 0) - take1;
        pool[c2] = (pool[c2] || 0) - take2;
      } else if (chosen.length === 3) {
        const [c1, c2, c3] = chosen;
        let t1 = Math.max(1, Math.min(Math.floor(cap / 3), pool[c1] || 0));
        const rem = cap - t1;
        let t2 = Math.max(1, Math.min(Math.floor(rem / 2), pool[c2] || 0));
        let t3 = rem - t2;
        if (t3 > (pool[c3] || 0)) {
          const diffT = t3 - (pool[c3] || 0);
          t3 = pool[c3] || 0;
          if ((pool[c1] || 0) >= t1 + diffT) {
            t1 += diffT;
          } else if ((pool[c2] || 0) >= t2 + diffT) {
            t2 += diffT;
          } else {
            possible = false;
            break;
          }
        }
        for (let k = 0; k < t1; k++) boxCards.push(c1);
        for (let k = 0; k < t2; k++) boxCards.push(c2);
        for (let k = 0; k < t3; k++) boxCards.push(c3);
        pool[c1] = (pool[c1] || 0) - t1;
        pool[c2] = (pool[c2] || 0) - t2;
        pool[c3] = (pool[c3] || 0) - t3;
      }

      // Group cards contiguously
      const myColor = h.color;
      const groups = new Map<number, number>();
      for (const c of boxCards) {
        groups.set(c, (groups.get(c) || 0) + 1);
      }
      const grouped: number[] = [];
      if (groups.has(myColor)) {
        const count = groups.get(myColor)!;
        for (let k = 0; k < count; k++) grouped.push(myColor);
        groups.delete(myColor);
      }
      for (const [col, count] of groups.entries()) {
        for (let k = 0; k < count; k++) grouped.push(col);
      }

      boxCardsMap.set(h.id, grouped);
    }

    if (!possible || Object.values(pool).some(cnt => cnt > 0)) {
      continue;
    }

    // Process spawner boxes if any
    const updatedSpawners = (data.SpawnerNodes || []).map(sn => ({
      ...sn,
      SpawnBoxes: sn.SpawnBoxes.map(sb => {
        const assigned = boxCardsMap.get(sb.Id);
        if (assigned) return { ...sb, InitCards: assigned };
        return { ...sb };
      }),
    }));

    const candidateLevel: LevelData = {
      ...data,
      BoxNodes: data.BoxNodes.map(bx => ({
        ...bx,
        InitCards: boxCardsMap.get(bx.Id) || bx.InitCards,
      })),
      SpawnerNodes: updatedSpawners,
    };

    // Verify balance matches exact capacity
    const issues = validateLevel(candidateLevel);
    const hasCapacityWarning = issues.some(i => i.message.includes('does not match total box capacity'));
    if (hasCapacityWarning) {
      continue;
    }

    // Rule: No colored box may contain only matching cards when completed
    if (colors.length > 1) {
      const hasMonocolorFilledBox = candidateLevel.BoxNodes.some(bx => {
        if (bx.IsPaperBox || getBoxType(bx.TypeId).isTray) return false;
        const bType = getBoxType(bx.TypeId);
        return bx.InitCards.length >= bType.capacity && bx.InitCards.every(c => c === bx.BoxColor);
      });
      if (hasMonocolorFilledBox) {
        continue;
      }

      const hasMonocolorFilledSpawner = (candidateLevel.SpawnerNodes || []).some(sn =>
        sn.SpawnBoxes.some(sb => {
          if (sb.IsPaperBox || getBoxType(sb.TypeId).isTray) return false;
          const bType = getBoxType(sb.TypeId);
          return sb.InitCards.length >= bType.capacity && sb.InitCards.every(c => c === sb.BoxColor);
        })
      );
      if (hasMonocolorFilledSpawner) {
        continue;
      }
    }

    // Rule: No box is empty
    const hasEmptyBox = candidateLevel.BoxNodes.some(bx => !bx.InitCards || bx.InitCards.length === 0);
    if (hasEmptyBox) {
      continue;
    }

    // Verify solvability with maxSlots
    const solveRes = isLevelSolvable(candidateLevel, maxSlots);
    if (solveRes.solvable) {
      return {
        level: candidateLevel,
        solvable: true,
        attempts,
      };
    }
    bestLevel = candidateLevel;
  }

  return {
    level: bestLevel,
    solvable: false,
    attempts,
  };
}

export function balanceLevelCardDeck(data: LevelData, maxSlots = 4, maxColorsPerBox = 3): LevelData {
  return balanceLevelCardDeckResult(data, maxSlots, maxColorsPerBox).level;
}
