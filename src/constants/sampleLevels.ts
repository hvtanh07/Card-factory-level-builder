import { LevelData } from "../types/level";

export const LEVEL_1_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-1_0",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_0",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_-1_1",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_1_1",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_0",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1_1"
      ],
      "InitCards": [
        1,
        1,
        0,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_0",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_1_1"
      ],
      "InitCards": [
        0,
        0,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        0,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1_1",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_2_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_0_1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 0,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_0_-1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 0,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_-1_0",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_1_0",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_2",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": 2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_-2",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": -2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1_0",
        "1_1_0",
        "1_0_2"
      ],
      "InitCards": [
        1,
        1,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_-1",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_-1_0",
        "1_1_0",
        "1_0_-2"
      ],
      "InitCards": [
        2,
        2,
        0,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_0",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1_0",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        2,
        2,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_2",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_-2",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        0,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_3_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-1_1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_-1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_-1_0",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_1_0",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_0_2",
      "NodeId": 3,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": 2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_0_-2",
      "NodeId": 3,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": -2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1_0"
      ],
      "InitCards": [
        1,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_1",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_1_0"
      ],
      "InitCards": [
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1_-1",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-1_0"
      ],
      "InitCards": [
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_-1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_1_0"
      ],
      "InitCards": [
        2,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_0",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_0_2",
        "2_0_-2"
      ],
      "InitCards": [
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1_0",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_0_2",
        "2_0_-2"
      ],
      "InitCards": [
        0,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_2",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        2,
        0,
        1,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_-2",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        2,
        0,
        2,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_4_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-2_2",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -2,
      "MapPosY": 2,
      "ZRotation": 315.0,
      "XPosition": -0.177999973,
      "YPosition": -0.432000041
    },
    {
      "Id": "0_1_-2",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": -2,
      "ZRotation": 315.0,
      "XPosition": 0.023999989,
      "YPosition": 0.262000084
    },
    {
      "Id": "0_-2_-2",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": -2,
      "MapPosY": -2,
      "ZRotation": 44.9999962,
      "XPosition": -0.457999945,
      "YPosition": -0.3080001
    },
    {
      "Id": "0_1_1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": 1,
      "ZRotation": 44.9999962,
      "XPosition": 0.03399998,
      "YPosition": 0.103999853
    },
    {
      "Id": "1_-2_0",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -2,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": -0.6880001,
      "YPosition": -0.3699999
    },
    {
      "Id": "1_-1_1",
      "NodeId": 0,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 270.0,
      "XPosition": 0.366,
      "YPosition": 0.4439999
    },
    {
      "Id": "1_1_0",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.163999975,
      "YPosition": -0.3699999
    },
    {
      "Id": "1_-1_-2",
      "NodeId": 2,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": -2,
      "ZRotation": 270.0,
      "XPosition": 0.366,
      "YPosition": 0.0620002747
    },
    {
      "Id": "2_-1_1",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 44.9999962,
      "XPosition": -0.683999956,
      "YPosition": -0.746000051
    },
    {
      "Id": "2_1_0",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 135.0,
      "XPosition": -0.0260000229,
      "YPosition": -0.0499999523
    },
    {
      "Id": "2_-1_-2",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": -1,
      "MapPosY": -2,
      "ZRotation": 44.9999962,
      "XPosition": 0.916,
      "YPosition": -0.157999992
    },
    {
      "Id": "2_-2_0",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": -2,
      "MapPosY": 0,
      "ZRotation": 135.0,
      "XPosition": 0.472,
      "YPosition": -1.67000008
    },
    {
      "Id": "3_-1_0",
      "NodeId": 3,
      "TileMapId": 3,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": -0.813999951,
      "YPosition": -0.809999943
    },
    {
      "Id": "3_-1_-3",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": -1,
      "MapPosY": -3,
      "ZRotation": 0.0,
      "XPosition": 0.0960000157,
      "YPosition": 0.277999878
    },
    {
      "Id": "3_-1_-2",
      "NodeId": 5,
      "TileMapId": 3,
      "MapPosX": -1,
      "MapPosY": -2,
      "ZRotation": 0.0,
      "XPosition": 0.0160000324,
      "YPosition": 1.69200015
    },
    {
      "Id": "3_0_-1",
      "NodeId": 3,
      "TileMapId": 3,
      "MapPosX": 0,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.53,
      "YPosition": -0.07399988
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2_2",
      "TypeId": 1,
      "BoxColor": 3,
      "BlockedNodes": [
        "2_-1_1"
      ],
      "InitCards": [
        1,
        1,
        1,
        1
      ],
      "IsHidden": false
    },
    {
      "Id": "0_1_-2",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_-1_-2"
      ],
      "InitCards": [
        0,
        0,
        2,
        2
      ],
      "IsHidden": false
    },
    {
      "Id": "0_-2_-2",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_-2_0"
      ],
      "InitCards": [
        3,
        3,
        0,
        0
      ],
      "IsHidden": false
    },
    {
      "Id": "0_1_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_1_0"
      ],
      "InitCards": [
        2,
        2,
        3,
        3
      ],
      "IsHidden": false
    },
    {
      "Id": "1_-2_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_-1_1",
        "2_-2_0"
      ],
      "InitCards": [
        2,
        2,
        2,
        2
      ],
      "IsHidden": false
    },
    {
      "Id": "1_-1_1",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_-1_1",
        "2_1_0"
      ],
      "InitCards": [
        3,
        3
      ],
      "IsHidden": false
    },
    {
      "Id": "1_1_0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "2_1_0",
        "2_-1_-2"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "IsHidden": false
    },
    {
      "Id": "1_-1_-2",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_-1_-2",
        "2_-2_0"
      ],
      "InitCards": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "IsHidden": false
    },
    {
      "Id": "2_-1_1",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [
        "3_-1_-2",
        "3_-1_0"
      ],
      "InitCards": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "IsHidden": false
    },
    {
      "Id": "2_1_0",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [
        "3_-1_-2",
        "3_0_-1"
      ],
      "InitCards": [
        3,
        3,
        3,
        3,
        3,
        3
      ],
      "IsHidden": false
    },
    {
      "Id": "2_-1_-2",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [
        "3_0_-1",
        "3_-1_-3"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "IsHidden": false
    },
    {
      "Id": "2_-2_0",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [
        "3_-1_-3",
        "3_-1_0"
      ],
      "InitCards": [
        2,
        2,
        2,
        2,
        2,
        2
      ],
      "IsHidden": false
    },
    {
      "Id": "3_-1_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2
      ],
      "IsHidden": false
    },
    {
      "Id": "3_-1_-3",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false
    },
    {
      "Id": "3_-1_-2",
      "TypeId": 6,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false
    },
    {
      "Id": "3_0_-1",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        3,
        3
      ],
      "IsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "IsOddSize": false,
  "Version": 2,
  "TurnSpawnerNodes": [],
  "LinkedBoxes": []
};

export const LEVEL_5_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_0_0",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": 0,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_-1_1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 45.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_1_1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": 1,
      "ZRotation": 315.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_-1_-1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 135.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_1_-1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": -1,
      "ZRotation": 225.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_-2_0",
      "NodeId": 1,
      "TileMapId": 2,
      "MapPosX": -2,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_2_0",
      "NodeId": 1,
      "TileMapId": 2,
      "MapPosX": 2,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_0_2",
      "NodeId": 1,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": 2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_0_-2",
      "NodeId": 1,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": -2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "3_-1_0",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "3_1_0",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1_1",
        "1_1_1",
        "1_-1_-1",
        "1_1_-1"
      ],
      "InitCards": [
        2,
        1,
        3,
        2,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_-2_0",
        "2_0_2"
      ],
      "InitCards": [
        0,
        2,
        1,
        0,
        0,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1_1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_2_0",
        "2_0_2"
      ],
      "InitCards": [
        1,
        3,
        2,
        0,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_-1",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "2_-2_0",
        "2_0_-2"
      ],
      "InitCards": [
        0,
        3,
        0,
        2,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1_-1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_2_0",
        "2_0_-2"
      ],
      "InitCards": [
        1,
        0,
        1,
        3,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-2_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "3_-1_0"
      ],
      "InitCards": [
        3,
        1,
        0,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_2_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "3_1_0"
      ],
      "InitCards": [
        0,
        3,
        3,
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "3_-1_0",
        "3_1_0"
      ],
      "InitCards": [
        0,
        2,
        3,
        0,
        0,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_-2",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "3_-1_0",
        "3_1_0"
      ],
      "InitCards": [
        0,
        0,
        3,
        0,
        0,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_-1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_6_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-1_1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 45.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": 1,
      "ZRotation": 315.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_-1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": -1,
      "ZRotation": 225.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 135.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_2",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": 2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_2_0",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 2,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_-2",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": -2,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_-2_0",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -2,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_0_0",
      "NodeId": 1,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "3_-1_0",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "3_1_0",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "3_0_1",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": 0,
      "MapPosY": 1,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_0_2",
        "1_-2_0"
      ],
      "InitCards": [
        3,
        1,
        3,
        2,
        1,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_0_2",
        "1_2_0"
      ],
      "InitCards": [
        1,
        2,
        2,
        0,
        0,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_-1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_2_0",
        "1_0_-2"
      ],
      "InitCards": [
        2,
        4,
        2,
        0,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1_-1",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_-2_0",
        "1_0_-2"
      ],
      "InitCards": [
        0,
        4,
        0,
        3,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_2",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        2,
        0,
        2,
        3,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_2_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        4,
        2,
        1,
        3,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_-2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        1,
        3,
        4,
        0,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-2_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        0,
        2,
        3,
        0,
        0,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "3_-1_0",
        "3_1_0",
        "3_0_1"
      ],
      "InitCards": [
        1,
        1,
        3,
        0,
        0,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_-1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0_1",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_7_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-1_1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_-1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_-1_0",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_1_0",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_-1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_0_0",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": 0,
      "ZRotation": 45.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "3_-1_0",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "3_1_0",
      "NodeId": 4,
      "TileMapId": 3,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1_0",
        "1_0_1"
      ],
      "InitCards": [
        2,
        2,
        2,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": true
    },
    {
      "Id": "0_1_1",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_1_0",
        "1_0_1"
      ],
      "InitCards": [
        2,
        0,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1_-1",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-1_0",
        "1_0_-1"
      ],
      "InitCards": [
        1,
        0,
        3,
        0
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": true
    },
    {
      "Id": "0_1_-1",
      "TypeId": 1,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_1_0",
        "1_0_-1"
      ],
      "InitCards": [
        4,
        2,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 3,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        2,
        3,
        1,
        3,
        4,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        3,
        2,
        2,
        2,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        0,
        1,
        1,
        4,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_-1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_0_0"
      ],
      "InitCards": [
        4,
        0,
        2,
        3,
        0,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_0",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [
        "3_-1_0",
        "3_1_0"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_-1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_8_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-2_1",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": -2,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_2_1",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": 2,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_-2_-1",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": -2,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_2_-1",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": 2,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_1",
      "NodeId": 2,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": 1,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_-1",
      "NodeId": 2,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": -1,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_-1_0",
      "NodeId": 5,
      "TileMapId": 2,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_1_0",
      "NodeId": 5,
      "TileMapId": 2,
      "MapPosX": 1,
      "MapPosY": 0,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2_1",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_0_1",
        "2_-1_0"
      ],
      "InitCards": [
        2,
        1,
        2,
        0,
        1,
        0,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2_1",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_0_1",
        "2_1_0"
      ],
      "InitCards": [
        0,
        0,
        3,
        0,
        4,
        2,
        0,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2_-1",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_0_-1",
        "2_-1_0"
      ],
      "InitCards": [
        2,
        4,
        1,
        2,
        4,
        3,
        3,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2_-1",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_0_-1",
        "2_1_0"
      ],
      "InitCards": [
        1,
        1,
        4,
        4,
        0,
        1,
        1,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_1",
      "TypeId": 3,
      "BoxColor": 4,
      "BlockedNodes": [
        "2_-1_0",
        "2_1_0"
      ],
      "InitCards": [
        0,
        3,
        4,
        0,
        2,
        3,
        0,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_-1",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_-1_0",
        "2_1_0"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-1_0",
      "TypeId": 6,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_1_0",
      "TypeId": 6,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_9_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-1_1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": 1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "0_1_-1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": 1,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "1_0_0",
      "NodeId": 2,
      "TileMapId": 1,
      "MapPosX": 0,
      "MapPosY": 0,
      "ZRotation": 45.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_-2_0",
      "NodeId": 6,
      "TileMapId": 2,
      "MapPosX": -2,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    },
    {
      "Id": "2_2_0",
      "NodeId": 6,
      "TileMapId": 2,
      "MapPosX": 2,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.0,
      "YPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_0_0",
        "2_-2_0"
      ],
      "InitCards": [
        0,
        3,
        1,
        1,
        0,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_0_0",
        "2_2_0"
      ],
      "InitCards": [
        3,
        4,
        0,
        3,
        0,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1_-1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_0_0",
        "2_-2_0"
      ],
      "InitCards": [
        2,
        1,
        1,
        3,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_-1",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_0_0",
        "2_2_0"
      ],
      "InitCards": [
        3,
        4,
        1,
        1,
        0,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0_0",
      "TypeId": 3,
      "BoxColor": 4,
      "BlockedNodes": [
        "2_-2_0",
        "2_2_0"
      ],
      "InitCards": [
        4,
        3,
        4,
        3,
        1,
        4,
        0,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [
    {
      "Id": "2_-2_0",
      "BlockedNodes": [],
      "SpawnBoxes": [
        {
          "Id": "",
          "TypeId": 2,
          "BoxColor": 0,
          "BlockedNodes": [],
          "InitCards": [
            1,
            3,
            0,
            0,
            0,
            4
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 2,
          "BoxColor": 1,
          "BlockedNodes": [],
          "InitCards": [
            4,
            3,
            1,
            4,
            2,
            0
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 2,
          "BoxColor": 2,
          "BlockedNodes": [],
          "InitCards": [
            4,
            3,
            2,
            2,
            4,
            0
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        }
      ]
    },
    {
      "Id": "2_2_0",
      "BlockedNodes": [],
      "SpawnBoxes": [
        {
          "Id": "",
          "TypeId": 2,
          "BoxColor": 3,
          "BlockedNodes": [],
          "InitCards": [
            4,
            0,
            0,
            1,
            2,
            0
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 2,
          "BoxColor": 4,
          "BlockedNodes": [],
          "InitCards": [
            2,
            4,
            4,
            3,
            0,
            3
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 2,
          "BoxColor": 0,
          "BlockedNodes": [],
          "InitCards": [
            0,
            1,
            2,
            2,
            0,
            0
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        }
      ]
    }
  ],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export const LEVEL_10_SAMPLE: LevelData = {
  "BoardNodes": [
    {
      "Id": "0_-1_2",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": 2,
      "ZRotation": 0.0,
      "XPosition": 0.286,
      "YPosition": -0.182000041
    },
    {
      "Id": "0_-2_1",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": -2,
      "MapPosY": 1,
      "ZRotation": 42.9999962,
      "XPosition": -0.738000035,
      "YPosition": -0.1960001
    },
    {
      "Id": "0_0_1",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": 0,
      "MapPosY": 1,
      "ZRotation": 136.999985,
      "XPosition": 1.45,
      "YPosition": -0.226000071
    },
    {
      "Id": "0_-3_-1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -3,
      "MapPosY": -1,
      "ZRotation": 42.9999962,
      "XPosition": 0.59799993,
      "YPosition": 0.46600008
    },
    {
      "Id": "0_2_-1",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": 2,
      "MapPosY": -1,
      "ZRotation": 136.999985,
      "XPosition": -0.592,
      "YPosition": 0.486000061
    },
    {
      "Id": "0_-2_-2",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": -2,
      "MapPosY": -2,
      "ZRotation": 223.000015,
      "XPosition": 0.272000074,
      "YPosition": 0.362000227
    },
    {
      "Id": "0_0_-2",
      "NodeId": 2,
      "TileMapId": 0,
      "MapPosX": 0,
      "MapPosY": -2,
      "ZRotation": 315.0,
      "XPosition": 0.19,
      "YPosition": 0.322000265
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 1,
      "TileMapId": 0,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 42.9999962,
      "XPosition": 0.19600004,
      "YPosition": 0.416000128
    },
    {
      "Id": "1_-2_-1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -2,
      "MapPosY": -1,
      "ZRotation": 270.0,
      "XPosition": -0.187999964,
      "YPosition": 1.20600009
    },
    {
      "Id": "1_-1_0",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": 0,
      "ZRotation": 90.0,
      "XPosition": 0.396,
      "YPosition": 0.4000001
    },
    {
      "Id": "1_1_-1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": 1,
      "MapPosY": -1,
      "ZRotation": 270.0,
      "XPosition": 0.163999975,
      "YPosition": 1.23600006
    },
    {
      "Id": "1_-1_-3",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": -3,
      "ZRotation": 225.0,
      "XPosition": -0.204,
      "YPosition": 1.708
    },
    {
      "Id": "1_-1_-1",
      "NodeId": 1,
      "TileMapId": 1,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 136.999985,
      "XPosition": 1.166,
      "YPosition": -0.0039999485
    },
    {
      "Id": "2_-2_0",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": -2,
      "MapPosY": 0,
      "ZRotation": 42.9999962,
      "XPosition": 0.09200001,
      "YPosition": 0.4000001
    },
    {
      "Id": "2_0_0",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": 0,
      "ZRotation": 136.999985,
      "XPosition": 0.69,
      "YPosition": 0.470000267
    },
    {
      "Id": "2_0_-2",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": 0,
      "MapPosY": -2,
      "ZRotation": 42.9999962,
      "XPosition": 0.21,
      "YPosition": 0.492000341
    },
    {
      "Id": "2_-2_-2",
      "NodeId": 2,
      "TileMapId": 2,
      "MapPosX": -2,
      "MapPosY": -2,
      "ZRotation": 136.999985,
      "XPosition": 0.482,
      "YPosition": 0.462000132
    },
    {
      "Id": "2_-1_-1",
      "NodeId": 0,
      "TileMapId": 2,
      "MapPosX": -1,
      "MapPosY": -1,
      "ZRotation": 0.0,
      "XPosition": 0.216000021,
      "YPosition": 0.5960002
    },
    {
      "Id": "3_-4_-3",
      "NodeId": 6,
      "TileMapId": 3,
      "MapPosX": -4,
      "MapPosY": -3,
      "ZRotation": 135.0,
      "XPosition": 1.034,
      "YPosition": 0.2380004
    },
    {
      "Id": "3_2_-3",
      "NodeId": 6,
      "TileMapId": 3,
      "MapPosX": 2,
      "MapPosY": -3,
      "ZRotation": 44.9999962,
      "XPosition": -0.552000046,
      "YPosition": 0.0180001259
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_2",
      "TypeId": 1,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_-1_0"
      ],
      "InitCards": [
        2,
        2,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2_1",
      "TypeId": 3,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_-2_-1"
      ],
      "InitCards": [
        7,
        7,
        5,
        5,
        5,
        5,
        8,
        8
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_1",
      "TypeId": 3,
      "BoxColor": 9,
      "BlockedNodes": [
        "1_1_-1"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        7,
        7,
        8,
        8
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-3_-1",
      "TypeId": 1,
      "BoxColor": 6,
      "BlockedNodes": [
        "1_-2_-1",
        "1_-1_-3"
      ],
      "InitCards": [
        0,
        0,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2_-1",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_1_-1",
        "1_-1_-1"
      ],
      "InitCards": [
        0,
        0,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2_-2",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1_-3",
        "3_-4_-3"
      ],
      "InitCards": [
        7,
        7,
        7,
        7,
        8,
        8,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_-2",
      "TypeId": 3,
      "BoxColor": 8,
      "BlockedNodes": [
        "1_-1_-1",
        "3_2_-3"
      ],
      "InitCards": [
        2,
        2,
        4,
        4,
        7,
        7,
        8,
        8
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1_-1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1_-1",
        "1_-1_0",
        "1_-1_-3"
      ],
      "InitCards": [
        4,
        4,
        7,
        7,
        8,
        8
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-2_-1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_-2_0",
        "2_-2_-2"
      ],
      "InitCards": [
        0,
        0,
        8,
        8,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_0",
      "TypeId": 2,
      "BoxColor": 9,
      "BlockedNodes": [
        "2_-2_0",
        "2_0_0",
        "2_-1_-1"
      ],
      "InitCards": [
        8,
        8,
        8,
        8,
        7,
        7
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1_-1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_0_0",
        "2_0_-2"
      ],
      "InitCards": [
        2,
        2,
        7,
        7,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_-3",
      "TypeId": 2,
      "BoxColor": 8,
      "BlockedNodes": [
        "2_-2_-2",
        "2_-1_-1"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_-1",
      "TypeId": 2,
      "BoxColor": 9,
      "BlockedNodes": [
        "2_-1_-1",
        "2_0_-2"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        7,
        7
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-2_0",
      "TypeId": 3,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        4,
        4,
        4,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_0",
      "TypeId": 3,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        8,
        8,
        4,
        4,
        4,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_-2",
      "TypeId": 3,
      "BoxColor": 9,
      "BlockedNodes": [],
      "InitCards": [
        7,
        7,
        8,
        8,
        8,
        8,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-2_-2",
      "TypeId": 3,
      "BoxColor": 8,
      "BlockedNodes": [],
      "InitCards": [
        8,
        8,
        8,
        8,
        7,
        7,
        7,
        7
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-1_-1",
      "TypeId": 1,
      "BoxColor": 8,
      "BlockedNodes": [],
      "InitCards": [
        8,
        8,
        7,
        7
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    }
  ],
  "SpawnerNodes": [
    {
      "Id": "3_-4_-3",
      "BlockedNodes": [],
      "SpawnBoxes": [
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 4,
          "BlockedNodes": [],
          "InitCards": [
            7,
            7,
            7,
            7,
            8,
            8,
            8,
            8
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 2,
          "BlockedNodes": [],
          "InitCards": [
            7,
            7,
            7,
            7,
            4,
            4,
            4,
            4
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 0,
          "BlockedNodes": [],
          "InitCards": [
            4,
            4,
            4,
            4,
            2,
            2,
            2,
            2
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 9,
          "BlockedNodes": [],
          "InitCards": [
            2,
            2,
            2,
            2,
            0,
            0,
            0,
            0
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 8,
          "BlockedNodes": [],
          "InitCards": [
            0,
            0,
            0,
            0,
            8,
            8,
            8,
            8
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        }
      ]
    },
    {
      "Id": "3_2_-3",
      "BlockedNodes": [],
      "SpawnBoxes": [
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 8,
          "BlockedNodes": [],
          "InitCards": [
            8,
            8,
            2,
            2,
            0,
            0,
            4,
            4
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 0,
          "BlockedNodes": [],
          "InitCards": [
            8,
            8,
            4,
            4,
            7,
            7,
            2,
            2
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 2,
          "BlockedNodes": [],
          "InitCards": [
            0,
            0,
            8,
            8,
            7,
            7,
            4,
            4
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 4,
          "BlockedNodes": [],
          "InitCards": [
            2,
            2,
            0,
            0,
            8,
            8,
            7,
            7
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        },
        {
          "Id": "",
          "TypeId": 3,
          "BoxColor": 9,
          "BlockedNodes": [],
          "InitCards": [
            7,
            7,
            0,
            0,
            2,
            2,
            4,
            4
          ],
          "IsHidden": false,
          "LockedTurn": 0,
          "IsCardsHidden": false
        }
      ]
    }
  ],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2
};

export interface PresetLevel {
  id: string;
  name: string;
  description: string;
  data: LevelData;
}

export const PRESET_LEVELS: PresetLevel[] = [
  {
    id: 'preset_1',
    name: "Level 1 (Tutorial - Warmup)",
    description: "Simple 4-box introductory level with Red and Blue sorting",
    data: LEVEL_1_SAMPLE
  },
  {
    id: 'preset_2',
    name: "Level 2 (Cross Block)",
    description: "6 boxes across 2 layers with spatial overlap blocking",
    data: LEVEL_2_SAMPLE
  },
  {
    id: 'preset_3',
    name: "Level 3 (Tray Delivery)",
    description: "Introduction to Neutral Trays providing card feeds for sorting",
    data: LEVEL_3_SAMPLE
  },
  {
    id: 'preset_4',
    name: "Level 4 (Classic Conveyor)",
    description: "16 boxes across 4 layers with standard 4-color sorting",
    data: LEVEL_4_SAMPLE
  },
  {
    id: 'preset_5',
    name: "Level 5 (Pyramid Multi-Tier)",
    description: "11 boxes arranged in a 4-layer stepped pyramid with 4 colors",
    data: LEVEL_5_SAMPLE
  },
  {
    id: 'preset_6',
    name: "Level 6 (Spiral Shuffle)",
    description: "12 boxes in a rotating pinwheel formation with 5 colors",
    data: LEVEL_6_SAMPLE
  },
  {
    id: 'preset_7',
    name: "Level 7 (Mystery & Locks)",
    description: "Turn-locked boxes and face-down mystery cards",
    data: LEVEL_7_SAMPLE
  },
  {
    id: 'preset_8',
    name: "Level 8 (8-Slot Factory)",
    description: "High-capacity 8-slot boxes and extra-wide delivery trays",
    data: LEVEL_8_SAMPLE
  },
  {
    id: 'preset_9',
    name: "Level 9 (Twin Spawners)",
    description: "Two continuous Spawner portals dispensing 6 queued boxes",
    data: LEVEL_9_SAMPLE
  },
  {
    id: 'preset_10',
    name: "Level 10 (Master Spawner 6-Color)",
    description: "20 nodes with 2 Spawner portals, 10 queued boxes, and 6 vibrant colors",
    data: LEVEL_10_SAMPLE
  },
];

export const SAMPLE_LEVELS = PRESET_LEVELS;
