import { LevelData, BoxNode } from '../types/level';
import { getNodeBoundingBox, doPolygonsIntersect, distance } from './geometry';

export function calculateAutoBlockers(
  levelData: LevelData,
  originX = 0,
  originY = 0,
  gridUnit = 80,
  overlapTolerance = 15 // pixels margin
): BoxNode[] {
  const nodeMap = new Map(levelData.BoardNodes.map(n => [n.Id, n]));
  const boxMap = new Map(levelData.BoxNodes.map(b => [b.Id, b]));

  // Compute bounding boxes for all nodes
  const boundingBoxes = levelData.BoardNodes.map(bn => {
    const box = boxMap.get(bn.Id) || {
      Id: bn.Id,
      TypeId: 1,
      BoxColor: 0,
      BlockedNodes: [],
      InitCards: [],
      IsHidden: false,
    };
    return getNodeBoundingBox(bn, box, originX, originY, gridUnit);
  });

  const updatedBoxes: BoxNode[] = levelData.BoxNodes.map(boxNode => {
    const myBoardNode = nodeMap.get(boxNode.Id);
    if (!myBoardNode) return { ...boxNode };

    const myBbox = boundingBoxes.find(b => b.id === boxNode.Id);
    if (!myBbox) return { ...boxNode };

    const blocked: string[] = [];

    // Check against all nodes in LOWER layers (higher TileMapId)
    for (const otherBbox of boundingBoxes) {
      if (otherBbox.id === boxNode.Id) continue;
      if (otherBbox.tileMapId <= myBbox.tileMapId) continue; // Only block nodes in lower layers

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

  return updatedBoxes;
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
