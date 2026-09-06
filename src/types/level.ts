export enum ColorPallet {
  red = 0,
  blue = 1,
  green = 2,
  purple = 3,
  Orange = 4,
  Neutral = 5,
  Yellow = 6,
  Pink = 7,
  Cyan = 8,
  Indigo = 9,
}

export enum BoxSize {
  SmallBox = 0,
  MediumBox = 1,
  LargeBox = 2,
  XLBox = 3,
}

export interface BoardNode {
  Id: string;
  LayerId: number;
  YRotation: number;
  XPosition: number;
  ZPosition: number;
  // Optional backwards compatibility fields
  NodeId?: number;
  TileMapId?: number;
  MapPosX?: number;
  MapPosY?: number;
  ZRotation?: number;
  YPosition?: number;
}

export interface BoxNode {
  Id: string;
  TypeId: number;
  BoxColor: number;
  BlockedNodes: string[];
  InitCards: number[];
  IsHidden: boolean;
  LockedTurn?: number;
  IsPaperBox?: boolean;
  IsRainbowBox?: boolean;
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
  IsPaperBox?: boolean;
  IsRainbowBox?: boolean;
  IsCardsHidden?: boolean;
}

export interface SpawnerNode {
  Id: string;
  BlockedNodes: string[];
  SpawnBoxes: SpawnBox[];
}

export interface LevelData {
  Id?: number | string;
  BoardOffsetX?: number;
  BoardOffsetZ?: number;
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
