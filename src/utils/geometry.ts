import { BoardNode, BoxNode } from '../types/level';
import { getBoxType } from '../constants/boxTypes';

export const DEFAULT_GRID_UNIT = 80;

export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  id: string;
  tileMapId: number;
  center: Point;
  width: number;
  height: number;
  rotationDeg: number;
  points: Point[];
}

/**
 * Converts BoardNode grid + offset to world screen coordinates (Canvas/SVG space, where +Y is Down)
 */
export function nodeToScreenPos(
  node: BoardNode,
  originX: number,
  originY: number,
  gridUnit: number = DEFAULT_GRID_UNIT
): Point {
  const unityX = node.MapPosX + node.XPosition;
  const unityY = node.MapPosY + node.YPosition;

  // Unity: +X is right, +Y is up. Canvas: +X is right, +Y is down.
  const screenX = originX + unityX * gridUnit;
  const screenY = originY - unityY * gridUnit;

  return { x: screenX, y: screenY };
}

/**
 * Converts screen coordinate back to Unity grid + local offset
 */
export function screenToNodePos(
  screenX: number,
  screenY: number,
  originX: number,
  originY: number,
  gridUnit: number = DEFAULT_GRID_UNIT,
  snapToGrid: boolean = false
): { mapPosX: number; mapPosY: number; xPos: number; yPos: number } {
  const unityX = (screenX - originX) / gridUnit;
  const unityY = -(screenY - originY) / gridUnit;

  if (snapToGrid) {
    const mapPosX = Math.round(unityX);
    const mapPosY = Math.round(unityY);
    return {
      mapPosX,
      mapPosY,
      xPos: 0,
      yPos: 0,
    };
  }

  const mapPosX = Math.floor(unityX + 0.5);
  const mapPosY = Math.floor(unityY + 0.5);
  const xPos = unityX - mapPosX;
  const yPos = unityY - mapPosY;

  return {
    mapPosX,
    mapPosY,
    xPos: Number(xPos.toFixed(3)),
    yPos: Number(yPos.toFixed(3)),
  };
}

/**
 * Calculate the 4 rotated corner points of a node bounding box
 */
export function getNodeBoundingBox(
  boardNode: BoardNode,
  boxNode: BoxNode,
  originX: number,
  originY: number,
  gridUnit: number = DEFAULT_GRID_UNIT
): BoundingBox {
  const center = nodeToScreenPos(boardNode, originX, originY, gridUnit);
  const boxType = getBoxType(boxNode.TypeId);

  const halfW = boxType.width / 2;
  const halfH = boxType.height / 2;

  // In SVG, clockwise angle is -ZRotation
  const rad = (-boardNode.ZRotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const localCorners: Point[] = [
    { x: -halfW, y: -halfH },
    { x: halfW, y: -halfH },
    { x: halfW, y: halfH },
    { x: -halfW, y: halfH },
  ];

  const points = localCorners.map(p => ({
    x: center.x + p.x * cos - p.y * sin,
    y: center.y + p.x * sin + p.y * cos,
  }));

  return {
    id: boardNode.Id,
    tileMapId: boardNode.TileMapId,
    center,
    width: boxType.width,
    height: boxType.height,
    rotationDeg: boardNode.ZRotation,
    points,
  };
}

/**
 * Separating Axis Theorem (SAT) 2D polygon intersection test
 */
export function doPolygonsIntersect(polyA: Point[], polyB: Point[]): boolean {
  const polygons = [polyA, polyB];

  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i];
    for (let i1 = 0; i1 < polygon.length; i1++) {
      const i2 = (i1 + 1) % polygon.length;
      const p1 = polygon[i1];
      const p2 = polygon[i2];

      const normal = { x: -(p2.y - p1.y), y: p2.x - p1.x };

      let minA = Infinity;
      let maxA = -Infinity;
      for (const p of polyA) {
        const projected = normal.x * p.x + normal.y * p.y;
        if (projected < minA) minA = projected;
        if (projected > maxA) maxA = projected;
      }

      let minB = Infinity;
      let maxB = -Infinity;
      for (const p of polyB) {
        const projected = normal.x * p.x + normal.y * p.y;
        if (projected < minB) minB = projected;
        if (projected > maxB) maxB = projected;
      }

      if (maxA < minB || maxB < minA) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Distance between two points
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
