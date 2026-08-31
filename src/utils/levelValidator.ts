import { LevelData, ValidationIssue } from '../types/level';
import { getBoxType } from '../constants/boxTypes';

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

export function balanceLevelCardDeck(data: LevelData): LevelData {
  const coloredCaps = getColoredBoxCapacities(data);
  const colorPool: number[] = [];

  for (const [colStr, cap] of Object.entries(coloredCaps)) {
    const col = Number(colStr);
    for (let i = 0; i < cap; i++) {
      colorPool.push(col);
    }
  }

  for (let i = colorPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
  }

  let poolIdx = 0;

  const updatedBoxes = data.BoxNodes.map(bx => {
    const boxType = getBoxType(bx.TypeId);
    const numCards = Math.min(bx.InitCards.length || boxType.defaultSlots, boxType.capacity);
    const newCards: number[] = [];

    for (let i = 0; i < numCards; i++) {
      if (poolIdx < colorPool.length) {
        newCards.push(colorPool[poolIdx++]);
      } else {
        newCards.push(bx.IsPaperBox ? 1 : bx.BoxColor);
      }
    }

    return {
      ...bx,
      InitCards: newCards,
    };
  });

  const updatedSpawners = (data.SpawnerNodes || []).map(sn => ({
    ...sn,
    SpawnBoxes: sn.SpawnBoxes.map(sb => {
      const boxType = getBoxType(sb.TypeId);
      const numCards = Math.min(sb.InitCards.length || boxType.defaultSlots, boxType.capacity);
      const newCards: number[] = [];

      for (let i = 0; i < numCards; i++) {
        if (poolIdx < colorPool.length) {
          newCards.push(colorPool[poolIdx++]);
        } else {
          newCards.push(sb.IsPaperBox ? 1 : sb.BoxColor);
        }
      }

      return {
        ...sb,
        InitCards: newCards,
      };
    }),
  }));

  return {
    ...data,
    BoxNodes: updatedBoxes,
    SpawnerNodes: updatedSpawners,
  };
}
