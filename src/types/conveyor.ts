export interface ConveyorNode {
  Id: string;
  XPosition: number;
  ZPosition: number;
  TangentMode: number;
  YRotation: number;
}

export interface ConveyorSlot {
  Id: string;
  TargetNodeId: string;
  YRotation: number;
  XPosition: number;
  ZPosition: number;
  LockedTurn: number;
  UnlockedByAd: boolean;
}

export interface ConveyorData {
  Id: number | string;
  ConveyorNodes: ConveyorNode[];
  ConveyorRoute: string[];
  ConveyorSlots: ConveyorSlot[];
  IsLoop: boolean;
  BoardOffsetX: number;
  BoardOffsetZ: number;
  NumberOfArrows: number;
}

export interface ConveyorPreset {
  id: string;
  name: string;
  description: string;
  data: ConveyorData;
}
