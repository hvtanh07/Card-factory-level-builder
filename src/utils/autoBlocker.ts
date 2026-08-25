import { LevelData, BoxNode, SpawnerNode } from '../types/level';
import { getNodeBoundingBox, doPolygonsIntersect, distance } from './geometry';

export interface AutoBlockerResult {
  updatedBoxes: BoxNode[];
  updatedSpawners: SpawnerNode[];
  sameLayerConflicts: Array<{ node1: string; node2: string; layer: number }>;
}

export function calculateAutoBlockersResult(
  levelData: LevelData,
  originX = 0,
  originY = 0,
  gridUnit = 80,
  overlapTolerance = 15 // pixels margin
): AutoBlockerResult {
  const nodeMap = new Map(levelData.BoardNodes.map(n => [n.Id, n]));
  const boxMap = new Map(levelData.BoxNodes.map(b => [b.Id, b]));
  const spawnerMap = new Map((levelData.SpawnerNodes || []).map(s => [s.Id, s]));

  // Compute bounding boxes for all nodes
  const boundingBoxes = levelData.BoardNodes.map(bn => {
    const box = boxMap.get(bn.Id) || {
      Id: bn.Id,
      TypeId: spawnerMap.has(bn.Id) ? 2 : 1,
      BoxColor: 0,
      BlockedNodes: [],
      InitCards: [],
      IsHidden: false,
    };
    return getNodeBoundingBox(bn, box, originX, originY, gridUnit);
  });

  const sameLayerConflicts: Array<{ node1: string; node2: string; layer: number }> = [];

  // Check for same-layer conflicts
  for (let i = 0; i < boundingBoxes.length; i++) {
    for (let j = i + 1; j < boundingBoxes.length; j++) {
      const b1 = boundingBoxes[i];
      const b2 = boundingBoxes[j];
      if (b1.tileMapId === b2.tileMapId) {
        if (doPolygonsIntersect(b1.points, b2.points)) {
          sameLayerConflicts.push({
            node1: b1.id,
            node2: b2.id,
            layer: b1.tileMapId,
          });
        }
      }
    }
  }

  // Calculate blockers for BoxNodes
  const updatedBoxes: BoxNode[] = levelData.BoxNodes.map(boxNode => {
    const myBoardNode = nodeMap.get(boxNode.Id);
    if (!myBoardNode) return { ...boxNode };

    const myBbox = boundingBoxes.find(b => b.id === boxNode.Id);
    if (!myBbox) return { ...boxNode };

    const blocked: string[] = [];

    // Check against all nodes in LOWER layers (strictly higher TileMapId)
    for (const otherBbox of boundingBoxes) {
      if (otherBbox.id === boxNode.Id) continue;
      if (otherBbox.tileMapId <= myBbox.tileMapId) continue; // Upper layers block lower layers only

      // Check distance or SAT intersection
      const centerDist = distance(myBbox.center, otherBbox.center);
      const approxRadius = (Math.max(myBbox.width, myBbox.height) + Math.max(otherBbox.width, otherBbox.height)) / 2;

      if (centerDist <= approxRadius + overlapTolerance) {
        if (doPolygonsIntersect(myBbox.points, otherBbox.points)) {
          blocked.push(otherBbox.id);
        } else if (centerDist < approxRadius * 0.7) {
          // Close proximity overlap
          blocked.push(otherBbox.id);
        }
      }
    }

    return {
      ...boxNode,
      BlockedNodes: blocked,
    };
  });

  // Calculate blockers for SpawnerNodes
  const updatedSpawners: SpawnerNode[] = (levelData.SpawnerNodes || []).map(spawnerNode => {
    const myBoardNode = nodeMap.get(spawnerNode.Id);
    if (!myBoardNode) return { ...spawnerNode };

    const myBbox = boundingBoxes.find(b => b.id === spawnerNode.Id);
    if (!myBbox) return { ...spawnerNode };

    const blocked: string[] = [];

    for (const otherBbox of boundingBoxes) {
      if (otherBbox.id === spawnerNode.Id) continue;
      if (otherBbox.tileMapId <= myBbox.tileMapId) continue;

      const centerDist = distance(myBbox.center, otherBbox.center);
      const approxRadius = (Math.max(myBbox.width, myBbox.height) + Math.max(otherBbox.width, otherBbox.height)) / 2;

      if (centerDist <= approxRadius + overlapTolerance) {
        if (doPolygonsIntersect(myBbox.points, otherBbox.points)) {
          blocked.push(otherBbox.id);
        } else if (centerDist < approxRadius * 0.7) {
          blocked.push(otherBbox.id);
        }
      }
    }

    return {
      ...spawnerNode,
      BlockedNodes: blocked,
    };
  });

  return {
    updatedBoxes,
    updatedSpawners,
    sameLayerConflicts,
  };
}

export function calculateAutoBlockers(
  levelData: LevelData,
  originX = 0,
  originY = 0,
  gridUnit = 80,
  overlapTolerance = 15
): BoxNode[] {
  const res = calculateAutoBlockersResult(levelData, originX, originY, gridUnit, overlapTolerance);
  return res.updatedBoxes;
}

/**
 * Returns a map of node ID -> list of IDs of nodes that are blocking this node
 */
export function getBlockedByMap(boxNodes: BoxNode[]): Map<string, string[]> {
  const map = new Map<string, string[]>();

  for (const box of boxNodes) {
    if (!map.has(box.Id)) {
      map.set(box.Id, []);
    }
    for (const blockedId of box.BlockedNodes) {
      const current = map.get(blockedId) || [];
      if (!current.includes(box.Id)) {
        current.push(box.Id);
      }
      map.set(blockedId, current);
    }
  }

  return map;
}
