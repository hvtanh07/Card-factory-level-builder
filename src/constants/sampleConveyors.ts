import { ConveyorData, ConveyorPreset } from '../types/conveyor';

export const DEFAULT_CONVEYOR_DEMO: ConveyorData = {
  Id: 1,
  ConveyorNodes: [
    { Id: "0", XPosition: -3.24, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "1", XPosition: -2.0, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "2", XPosition: -0.8, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "3", XPosition: 0.8, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "4", XPosition: 2.2, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "5", XPosition: 3.24, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 }
  ],
  ConveyorRoute: ["0", "1", "2", "3", "4", "5"],
  ConveyorSlots: [
    { Id: "0", TargetNodeId: "1", YRotation: 90.0, XPosition: -1.95, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "1", TargetNodeId: "2", YRotation: 90.0, XPosition: -0.65, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "2", TargetNodeId: "3", YRotation: 90.0, XPosition: 0.65, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "3", TargetNodeId: "4", YRotation: 90.0, XPosition: 1.95, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false }
  ],
  IsLoop: false,
  BoardOffsetX: 0.0,
  BoardOffsetZ: 2.0,
  NumberOfArrows: 3
};

export const SAMPLE_CONVEYOR_LOOP: ConveyorData = {
  Id: 2,
  ConveyorNodes: [
    { Id: "0", XPosition: -2.8, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "1", XPosition: -1.3, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "2", XPosition: 1.3, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "3", XPosition: 2.8, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "4", XPosition: 3.3, ZPosition: -1.0, TangentMode: 1, YRotation: 180.0 },
    { Id: "5", XPosition: 2.8, ZPosition: -2.0, TangentMode: 1, YRotation: 270.0 },
    { Id: "6", XPosition: -2.8, ZPosition: -2.0, TangentMode: 1, YRotation: 270.0 },
    { Id: "7", XPosition: -3.3, ZPosition: -1.0, TangentMode: 1, YRotation: 0.0 }
  ],
  ConveyorRoute: ["0", "1", "2", "3", "4", "5", "6", "7"],
  ConveyorSlots: [
    { Id: "0", TargetNodeId: "0", YRotation: 90.0, XPosition: -1.95, ZPosition: 1.8, LockedTurn: 0, UnlockedByAd: false },
    { Id: "1", TargetNodeId: "1", YRotation: 90.0, XPosition: -0.65, ZPosition: 1.8, LockedTurn: 0, UnlockedByAd: false },
    { Id: "2", TargetNodeId: "2", YRotation: 90.0, XPosition: 0.65, ZPosition: 1.8, LockedTurn: 0, UnlockedByAd: false },
    { Id: "3", TargetNodeId: "3", YRotation: 90.0, XPosition: 1.95, ZPosition: 1.8, LockedTurn: 0, UnlockedByAd: false }
  ],
  IsLoop: true,
  BoardOffsetX: 0.0,
  BoardOffsetZ: 3.5,
  NumberOfArrows: 4
};

export const SAMPLE_CONVEYOR_COMPACT_3SLOT: ConveyorData = {
  Id: 3,
  ConveyorNodes: [
    { Id: "0", XPosition: -2.5, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "1", XPosition: -1.3, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "2", XPosition: 0.0, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "3", XPosition: 1.3, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "4", XPosition: 2.5, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 }
  ],
  ConveyorRoute: ["0", "1", "2", "3", "4"],
  ConveyorSlots: [
    { Id: "0", TargetNodeId: "1", YRotation: 90.0, XPosition: -1.3, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "1", TargetNodeId: "2", YRotation: 90.0, XPosition: 0.0, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "2", TargetNodeId: "3", YRotation: 90.0, XPosition: 1.3, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false }
  ],
  IsLoop: false,
  BoardOffsetX: 0.0,
  BoardOffsetZ: 2.0,
  NumberOfArrows: 2
};

export const SAMPLE_CONVEYOR_5SLOT: ConveyorData = {
  Id: 4,
  ConveyorNodes: [
    { Id: "0", XPosition: -3.8, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "1", XPosition: -2.6, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "2", XPosition: -1.3, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "3", XPosition: 0.0, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "4", XPosition: 1.3, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "5", XPosition: 2.6, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
    { Id: "6", XPosition: 3.8, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 }
  ],
  ConveyorRoute: ["0", "1", "2", "3", "4", "5", "6"],
  ConveyorSlots: [
    { Id: "0", TargetNodeId: "1", YRotation: 90.0, XPosition: -2.6, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "1", TargetNodeId: "2", YRotation: 90.0, XPosition: -1.3, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "2", TargetNodeId: "3", YRotation: 90.0, XPosition: 0.0, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "3", TargetNodeId: "4", YRotation: 90.0, XPosition: 1.3, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false },
    { Id: "4", TargetNodeId: "5", YRotation: 90.0, XPosition: 2.6, ZPosition: 2.0, LockedTurn: 0, UnlockedByAd: false }
  ],
  IsLoop: false,
  BoardOffsetX: 0.0,
  BoardOffsetZ: 2.0,
  NumberOfArrows: 4
};

export const PRESET_CONVEYORS: ConveyorPreset[] = [
  {
    id: 'conveyor_prod_linear',
    name: 'Linear 4-Slot (Production Standard)',
    description: 'The standard horizontal conveyor with inlet on the left and outlet on the right with 4 box docks.',
    data: DEFAULT_CONVEYOR_DEMO
  },
  {
    id: 'conveyor_loop',
    name: 'Racetrack Loop (Continuous)',
    description: 'A continuous closed-circuit loop conveyor that recirculates cards endlessly around the docks.',
    data: SAMPLE_CONVEYOR_LOOP
  },
  {
    id: 'conveyor_compact_3slot',
    name: 'Compact 3-Slot Belt',
    description: 'A narrower 3-slot conveyor for challenging or introductory small levels.',
    data: SAMPLE_CONVEYOR_COMPACT_3SLOT
  },
  {
    id: 'conveyor_extended_5slot',
    name: 'Extended 5-Slot Belt',
    description: 'A wide 5-slot conveyor for large multi-color levels with high box throughput.',
    data: SAMPLE_CONVEYOR_5SLOT
  }
];
