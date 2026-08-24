export interface BoardNode {
  Id: string;
  NodeId: number;
  TileMapId: number;
  MapPosX: number;
  MapPosY: number;
  ZRotation: number;
  XPosition: number;
  YPosition: number;
}

export interface BoxNode {
  Id: string;
  TypeId: number;
  BoxColor: number;
  BlockedNodes: string[];
  InitCards: number[];
  IsHidden: boolean;
  LockedTurn?: number;
  IsCardsHidden?: boolean;
}

export interface SpawnBox {
  Id: string;
  TypeId: number;
  BoxColor: number;
  BlockedNodes: string[];
  InitCards: number[];
  IsHidden: boolean;
  LockedTurn?: number;
  IsCardsHidden?: boolean;
}

export interface SpawnerNode {
  Id: string;
  BlockedNodes: string[];
  SpawnBoxes: SpawnBox[];
}

export interface LevelData {
  BoardNodes: BoardNode[];
  BoxNodes: BoxNode[];
  SpawnerNodes: SpawnerNode[];
  TurnSpawnerNodes: any[];
  LinkedBoxes: any[];
  IsOddSize: boolean;
  Version: number;
}

export interface BoxTypeDef {
  id: number;
  name: string;
  width: number;
  height: number;
  capacity: number;
  defaultSlots: number;
  isTray?: boolean;
}

export interface ViewportTransform {
  x: number;
  y: number;
  zoom: number;
}

export interface ValidationIssue {
  type: 'error' | 'warning';
  nodeId?: string;
  message: string;
}
