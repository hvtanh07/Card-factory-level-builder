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
  LockedTurn: number; // 0 = unlocked; >0 = locked until player sends up this number of boxes
  UnlockedByAd: boolean; // true = slot is locked and requires watching an ad
}

export interface ConveyorData {
  Id: number;
  ConveyorNodes: ConveyorNode[];
  ConveyorRoute: string[]; // sequence of ConveyorNode IDs
  ConveyorSlots: ConveyorSlot[];
  IsLoop: boolean;
  BoardOffsetX: number;
  BoardOffsetZ: number;
  NumberOfArrows: number;
}
