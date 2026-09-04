import { LevelData, ValidationIssue } from '../types/level';
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

  const solution = dfs(0, [], [], []);
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

/**
 * Balances the deck so that:
 * 1. Inside each box, cards are clustered into contiguous color groups (pairs/quads or monocolor).
 * 2. Total card counts exactly match total colored box capacities (0 validation warnings).
 * 3. The resulting level is verified solvable with `maxSlots` conveyor slots (default: 4).
 */
export function balanceLevelCardDeckResult(data: LevelData, maxSlots = 4): BalanceResult {
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

  let bestLevel = data;
  let attempts = 0;
  const maxAttempts = 150;

  while (attempts < maxAttempts) {
    attempts++;

    const remainingQuota: Record<number, number> = { ...coloredCaps };
    const boxCardsMap = new Map<string, number[]>();

    for (const bx of sortedBoxes) {
      const bType = getBoxType(bx.TypeId);
      const cap = bType.capacity;
      const isTray = Boolean(bx.IsPaperBox || bType.isTray);
      const myColor = bx.BoxColor;

      // Group sizes in chunks of 2 or 4
      const chunkSizes: number[] = [];
      let remCap = cap;

      while (remCap > 0) {
        if (remCap === 2) {
          chunkSizes.push(2);
          remCap -= 2;
        } else if (remCap === 4) {
          if (Math.random() < 0.45) {
            chunkSizes.push(4);
            remCap -= 4;
          } else {
            chunkSizes.push(2, 2);
            remCap -= 4;
          }
        } else if (remCap >= 6) {
          const chunk = Math.random() < 0.6 ? 4 : 2;
          chunkSizes.push(chunk);
          remCap -= chunk;
        } else {
          chunkSizes.push(remCap);
          remCap = 0;
        }
      }

      const boxCards: number[] = [];
      // If there are multiple colors in the level, non-tray boxes must NOT be filled only with their matching color
      const maxMyColorCards = (!isTray && colors.length > 1) ? Math.max(0, cap - 2) : cap;
      let myColorPlaced = 0;

      for (let cIdx = 0; cIdx < chunkSizes.length; cIdx++) {
        const sz = chunkSizes[cIdx];
        let chosenColor = myColor;

        // Can we pick myColor?
        const canPickMyColor = !isTray &&
          (myColorPlaced + sz <= maxMyColorCards) &&
          ((remainingQuota[myColor] || 0) >= sz);

        if (canPickMyColor && Math.random() < 0.55) {
          chosenColor = myColor;
          myColorPlaced += sz;
        } else {
          // Pick other color with highest quota
          const otherColors = colors.filter(c => c !== myColor && (remainingQuota[c] || 0) >= sz);
          if (otherColors.length > 0) {
            otherColors.sort((a, b) => (remainingQuota[b] || 0) - (remainingQuota[a] || 0));
            const pickIdx = Math.floor(Math.random() * Math.min(2, otherColors.length));
            chosenColor = otherColors[pickIdx];
          } else {
            const anyOther = colors.filter(c => c !== myColor && (remainingQuota[c] || 0) > 0);
            if (anyOther.length > 0) {
              anyOther.sort((a, b) => (remainingQuota[b] || 0) - (remainingQuota[a] || 0));
              chosenColor = anyOther[0];
            } else if (canPickMyColor) {
              chosenColor = myColor;
              myColorPlaced += sz;
            } else {
              const anyCol = colors.filter(c => (remainingQuota[c] || 0) > 0);
              chosenColor = anyCol.length > 0 ? anyCol[0] : myColor;
              if (chosenColor === myColor) myColorPlaced += sz;
            }
          }
        }

        const actualCount = Math.min(sz, remainingQuota[chosenColor] || 0);
        for (let k = 0; k < actualCount; k++) {
          boxCards.push(chosenColor);
        }
        remainingQuota[chosenColor] = Math.max(0, (remainingQuota[chosenColor] || 0) - actualCount);
      }

      while (boxCards.length < cap) {
        // Try other colors first
        const otherLeft = colors.find(c => c !== myColor && (remainingQuota[c] || 0) > 0);
        if (otherLeft) {
          boxCards.push(otherLeft);
          remainingQuota[otherLeft]--;
        } else {
          const anyLeft = colors.find(c => (remainingQuota[c] || 0) > 0);
          if (!anyLeft) break;
          boxCards.push(anyLeft);
          remainingQuota[anyLeft]--;
        }
      }

      boxCardsMap.set(bx.Id, boxCards);
    }

    // Top up any remaining quotas
    for (const col of colors) {
      while ((remainingQuota[col] || 0) > 0) {
        let placed = false;
        // Prefer placing `col` into boxes of a DIFFERENT color first
        const candidateBoxes = [...data.BoxNodes].sort((a, b) => {
          const aDiff = a.BoxColor !== col ? 0 : 1;
          const bDiff = b.BoxColor !== col ? 0 : 1;
          return aDiff - bDiff;
        });

        for (const bx of candidateBoxes) {
          const bCards = boxCardsMap.get(bx.Id) || [];
          const bType = getBoxType(bx.TypeId);
          if (bCards.length < bType.capacity) {
            if (bx.BoxColor === col && bCards.length + 1 >= bType.capacity && bCards.every(c => c === col) && colors.length > 1) {
              continue;
            }
            bCards.push(col);
            remainingQuota[col]--;
            placed = true;
            break;
          }
        }
        if (!placed) break;
      }
    }

    // Ensure all cards in each box are grouped contiguously by color
    for (const [id, rawCards] of boxCardsMap.entries()) {
      const bx = data.BoxNodes.find(b => b.Id === id);
      const myColor = bx?.BoxColor ?? 1;
      const groups = new Map<number, number>();
      for (const c of rawCards) {
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
      boxCardsMap.set(id, grouped);
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

export function balanceLevelCardDeck(data: LevelData, maxSlots = 4): LevelData {
  return balanceLevelCardDeckResult(data, maxSlots).level;
}
