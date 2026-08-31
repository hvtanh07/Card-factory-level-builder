import { LevelData } from "../types/level";

export const LEVEL_EASY_1_DATA: LevelData = {
  "Id": 1,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.2_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-1.2_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": -0.75
    },
    {
      "Id": "0_1.2_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 0.75
    },
    {
      "Id": "0_1.2_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-1.2_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.2_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.2_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_-1.2_-0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.2_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.2_-0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "1_-1.2_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.2_0.75",
        "0_-1.2_-0.75"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        0,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.2_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_1.2_0.75",
        "0_1.2_-0.75"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
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

export const LEVEL_EASY_2_DATA: LevelData = {
  "Id": 2,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.7_0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": 0.8
    },
    {
      "Id": "0_0.7_0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": 0.8
    },
    {
      "Id": "0_-0.7_-0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": -0.8
    },
    {
      "Id": "0_0.7_-0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": -0.8
    },
    {
      "Id": "1_0.0_0.8",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.8
    },
    {
      "Id": "1_0.0_-0.8",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.8
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.7_0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_-0.7_-0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_-0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
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
      "Id": "1_0.0_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.7_0.8",
        "0_0.7_0.8"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_-0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.7_-0.8",
        "0_0.7_-0.8"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        2,
        2
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

export const LEVEL_EASY_3_DATA: LevelData = {
  "Id": 3,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "0_0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_-0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.8_0.75",
        "0_-0.8_-0.75"
      ],
      "InitCards": [
        0,
        0,
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
      "Id": "1_0.8_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.8_0.75",
        "0_0.8_-0.75"
      ],
      "InitCards": [
        0,
        1,
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
      "Id": "2_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-0.8_0.75",
        "0_0.8_0.75",
        "0_-0.8_-0.75",
        "0_0.8_-0.75",
        "1_-0.8_0.0",
        "1_0.8_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
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

export const LEVEL_EASY_4_DATA: LevelData = {
  "Id": 4,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "0_0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.8_0.75",
        "0_-0.8_-0.75"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.8_0.75",
        "0_0.8_-0.75"
      ],
      "InitCards": [
        0,
        1,
        1,
        2
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

export const LEVEL_EASY_5_DATA: LevelData = {
  "Id": 5,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "0_0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        2
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        2,
        2
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.8_0.75",
        "0_-0.8_-0.75"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.8_0.75",
        "0_0.8_-0.75"
      ],
      "InitCards": [
        0,
        0,
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
      "Id": "2_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-0.8_0.75",
        "0_0.8_0.75",
        "0_-0.8_-0.75",
        "0_0.8_-0.75",
        "1_-0.8_0.0",
        "1_0.8_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        2,
        2
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

export const LEVEL_EASY_6_DATA: LevelData = {
  "Id": 6,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.4_0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.8
    },
    {
      "Id": "0_1.4_0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.8
    },
    {
      "Id": "0_-1.4_-0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": -0.8
    },
    {
      "Id": "0_1.4_-0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": -0.8
    },
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.4_0.0",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.4_0.0",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.4_0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        1,
        2,
        2
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2,
        2,
        2
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_-0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_-0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "1_-1.4_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.4_0.8",
        "0_-1.4_-0.8"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.4_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.4_0.8",
        "0_1.4_-0.8"
      ],
      "InitCards": [
        0,
        0,
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
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        2,
        2
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

export const LEVEL_EASY_7_DATA: LevelData = {
  "Id": 7,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.4_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 0.75
    },
    {
      "Id": "0_0.0_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.75
    },
    {
      "Id": "0_1.4_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-1.4_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": -0.75
    },
    {
      "Id": "0_0.0_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.75
    },
    {
      "Id": "0_1.4_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-0.7_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.7_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.4_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_1.4_0.75",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_-0.75",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_-0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.7_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-1.4_0.75",
        "0_0.0_0.75",
        "0_-1.4_-0.75",
        "0_0.0_-0.75"
      ],
      "InitCards": [
        0,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.7_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.75",
        "0_1.4_0.75",
        "0_0.0_-0.75",
        "0_1.4_-0.75"
      ],
      "InitCards": [
        0,
        1,
        1,
        3
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

export const LEVEL_EASY_8_DATA: LevelData = {
  "Id": 8,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.1_0.9",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.1,
      "ZPosition": 0.9
    },
    {
      "Id": "0_1.1_0.9",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.1,
      "ZPosition": 0.9
    },
    {
      "Id": "0_-1.1_-0.9",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.1,
      "ZPosition": -0.9
    },
    {
      "Id": "0_1.1_-0.9",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.1,
      "ZPosition": -0.9
    },
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.1_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.1,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.1_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.1,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.0",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.1_0.9",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.1_0.9",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.1_-0.9",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.1_-0.9",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "1_-1.1_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.1_0.9",
        "0_-1.1_-0.9"
      ],
      "InitCards": [
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.1_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_1.1_0.9",
        "0_1.1_-0.9"
      ],
      "InitCards": [
        1,
        1,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        2
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

export const LEVEL_EASY_9_DATA: LevelData = {
  "Id": 9,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.4_0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 0.8
    },
    {
      "Id": "0_0.0_0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.8
    },
    {
      "Id": "0_1.4_0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 0.8
    },
    {
      "Id": "0_-0.7_-0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": -0.8
    },
    {
      "Id": "0_0.7_-0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": -0.8
    },
    {
      "Id": "1_-1.05_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.05,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.05_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.05,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.4_0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_-0.8",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_-0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.05_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.4_0.8",
        "0_0.0_0.8",
        "0_-0.7_-0.8"
      ],
      "InitCards": [
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.8",
        "0_-0.7_-0.8",
        "0_0.7_-0.8"
      ],
      "InitCards": [
        0,
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
      "Id": "1_1.05_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_0.8",
        "0_1.4_0.8",
        "0_0.7_-0.8"
      ],
      "InitCards": [
        1,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.8",
        "0_-0.7_-0.8",
        "0_0.7_-0.8",
        "1_0.0_0.0"
      ],
      "InitCards": [
        1,
        3,
        3,
        3
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

export const LEVEL_EASY_10_DATA: LevelData = {
  "Id": 10,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.4_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 1.3
    },
    {
      "Id": "0_0.0_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.3
    },
    {
      "Id": "0_1.4_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 1.3
    },
    {
      "Id": "0_-0.9_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.9,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.9_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.9,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-1.4_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": -1.3
    },
    {
      "Id": "0_0.0_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.3
    },
    {
      "Id": "0_1.4_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": -1.3
    },
    {
      "Id": "1_-1.2_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": 0.65
    },
    {
      "Id": "1_1.2_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 0.65
    },
    {
      "Id": "1_-1.2_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": -0.65
    },
    {
      "Id": "1_1.2_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": -0.65
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_-0.7_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.7_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.4_1.3",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        3,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_1.3",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
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
      "Id": "0_1.4_1.3",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.9_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.9_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_-1.3",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        3,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.3",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
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
      "Id": "0_1.4_-1.3",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.2_0.65",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-1.4_1.3",
        "0_-0.9_0.0"
      ],
      "InitCards": [
        0,
        0,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.2_0.65",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_1.4_1.3",
        "0_0.9_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.2_-0.65",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "0_-1.4_-1.3"
      ],
      "InitCards": [
        1,
        2,
        2,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.2_-0.65",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.9_0.0",
        "0_1.4_-1.3"
      ],
      "InitCards": [
        0,
        0,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "0_0.9_0.0"
      ],
      "InitCards": [
        0,
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
      "Id": "2_-0.7_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "1_-1.2_0.65",
        "1_-1.2_-0.65",
        "1_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.7_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.9_0.0",
        "1_1.2_0.65",
        "1_1.2_-0.65",
        "1_0.0_0.0"
      ],
      "InitCards": [
        1,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "0_0.9_0.0",
        "1_0.0_0.0",
        "2_-0.7_0.0",
        "2_0.7_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        2
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

export const LEVEL_MEDIUM_1_DATA: LevelData = {
  "Id": 11,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "0_0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
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
      "Id": "0_0.8_0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_-0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.8_0.75",
        "0_-0.8_-0.75"
      ],
      "InitCards": [
        1,
        1,
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
      "Id": "1_0.8_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.8_0.75",
        "0_0.8_-0.75"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
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

export const LEVEL_MEDIUM_2_DATA: LevelData = {
  "Id": 12,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_0.0_1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.0_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.4
    },
    {
      "Id": "0_-1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.2_0.0",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.2_0.0",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0.0_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_-1.4_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_1.4_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.2_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.4_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.2_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.4_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        2,
        2
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

export const LEVEL_MEDIUM_3_DATA: LevelData = {
  "Id": 13,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.4_0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 0.8
    },
    {
      "Id": "0_0.0_0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.8
    },
    {
      "Id": "0_1.4_0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 0.8
    },
    {
      "Id": "0_-0.7_-0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": -0.8
    },
    {
      "Id": "0_0.7_-0.8",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": -0.8
    },
    {
      "Id": "1_-1.05_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.05,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.05_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.05,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.0",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.4_0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_-0.8",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
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
      "Id": "0_0.7_-0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "1_-1.05_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.4_0.8",
        "0_0.0_0.8",
        "0_-0.7_-0.8"
      ],
      "InitCards": [
        0,
        0,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.8",
        "0_-0.7_-0.8",
        "0_0.7_-0.8"
      ],
      "InitCards": [
        0,
        1,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.05_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_0.8",
        "0_1.4_0.8",
        "0_0.7_-0.8"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.8",
        "0_-0.7_-0.8",
        "0_0.7_-0.8",
        "1_0.0_0.0"
      ],
      "InitCards": [
        1,
        2,
        3,
        3
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

export const LEVEL_MEDIUM_4_DATA: LevelData = {
  "Id": 14,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 1.4
    },
    {
      "Id": "0_-0.8_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-0.8_-1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": -1.4
    },
    {
      "Id": "0_0.8_1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.8_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.8_-1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": -1.4
    },
    {
      "Id": "1_-0.8_0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.7
    },
    {
      "Id": "1_-0.8_-0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.7
    },
    {
      "Id": "1_0.8_0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.7
    },
    {
      "Id": "1_0.8_-0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.7
    },
    {
      "Id": "2_0.0_0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.7
    },
    {
      "Id": "2_0.0_-0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.7
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.8_-1.4",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_1.4",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_-1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "1_-0.8_0.7",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.8_1.4",
        "0_-0.8_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_-0.7",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-0.8_0.0",
        "0_-0.8_-1.4"
      ],
      "InitCards": [
        0,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_0.8_1.4",
        "0_0.8_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_-0.7",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.8_0.0",
        "0_0.8_-1.4"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.8_1.4",
        "0_-0.8_0.0",
        "0_0.8_1.4",
        "0_0.8_0.0",
        "1_-0.8_0.7",
        "1_0.8_0.7"
      ],
      "InitCards": [
        0,
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.8_0.0",
        "0_-0.8_-1.4",
        "0_0.8_0.0",
        "0_0.8_-1.4",
        "1_-0.8_-0.7",
        "1_0.8_-0.7"
      ],
      "InitCards": [
        0,
        0,
        1,
        2
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

export const LEVEL_MEDIUM_5_DATA: LevelData = {
  "Id": 15,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.4_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 0.75
    },
    {
      "Id": "0_0.0_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.75
    },
    {
      "Id": "0_1.4_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-1.4_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": -0.75
    },
    {
      "Id": "0_0.0_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.75
    },
    {
      "Id": "0_1.4_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-1.4_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.4_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "2_-0.7_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.7_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.4_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_0.75",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_-0.75",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
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
      "Id": "0_1.4_-0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.4_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.4_0.75",
        "0_-1.4_-0.75"
      ],
      "InitCards": [
        0,
        1,
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
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_0.75",
        "0_0.0_-0.75"
      ],
      "InitCards": [
        0,
        2,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.4_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.4_0.75",
        "0_1.4_-0.75"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-0.7_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.4_0.75",
        "0_0.0_0.75",
        "0_-1.4_-0.75",
        "0_0.0_-0.75",
        "1_-1.4_0.0",
        "1_0.0_0.0"
      ],
      "InitCards": [
        0,
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
      "Id": "2_0.7_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.75",
        "0_1.4_0.75",
        "0_0.0_-0.75",
        "0_1.4_-0.75",
        "1_0.0_0.0",
        "1_1.4_0.0"
      ],
      "InitCards": [
        0,
        1,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.75",
        "0_0.0_-0.75",
        "1_0.0_0.0",
        "2_-0.7_0.0",
        "2_0.7_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        2
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

export const LEVEL_MEDIUM_6_DATA: LevelData = {
  "Id": 16,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_0.0_1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.0_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.4
    },
    {
      "Id": "0_-1.4_0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.7
    },
    {
      "Id": "0_-1.4_-0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": -0.7
    },
    {
      "Id": "0_1.4_0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.7
    },
    {
      "Id": "0_1.4_-0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": -0.7
    },
    {
      "Id": "1_-0.7_0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": 0.7
    },
    {
      "Id": "1_0.7_0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": 0.7
    },
    {
      "Id": "1_-0.7_-0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": -0.7
    },
    {
      "Id": "1_0.7_-0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": -0.7
    },
    {
      "Id": "2_0.0_0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.7
    },
    {
      "Id": "2_0.0_-0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.7
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0.0_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        0,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_0.7",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        3,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_-0.7",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_-0.7",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.7_0.7",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_1.4",
        "0_-1.4_0.7"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.7_0.7",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_1.4",
        "0_1.4_0.7"
      ],
      "InitCards": [
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.7_-0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_0.0_-1.4",
        "0_-1.4_-0.7"
      ],
      "InitCards": [
        0,
        0,
        0,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.7_-0.7",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.0_-1.4",
        "0_1.4_-0.7"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_1.4",
        "1_-0.7_0.7",
        "1_0.7_0.7"
      ],
      "InitCards": [
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_-1.4",
        "1_-0.7_-0.7",
        "1_0.7_-0.7"
      ],
      "InitCards": [
        1,
        1,
        1,
        2
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

export const LEVEL_MEDIUM_7_DATA: LevelData = {
  "Id": 17,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.8_1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 1.4
    },
    {
      "Id": "0_-1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-0.8_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -1.4
    },
    {
      "Id": "0_0.8_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -1.4
    },
    {
      "Id": "1_-0.8_0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.7
    },
    {
      "Id": "1_0.8_0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.7
    },
    {
      "Id": "1_-0.8_-0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": -0.7
    },
    {
      "Id": "1_0.8_-0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": -0.7
    },
    {
      "Id": "2_0.0_0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.7
    },
    {
      "Id": "2_0.0_-0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.7
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 3,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.8_-1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_-1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.7",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.8_1.4",
        "0_-1.4_0.0"
      ],
      "InitCards": [
        0,
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
      "Id": "1_0.8_0.7",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.8_1.4",
        "0_1.4_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_-0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.4_0.0",
        "0_-0.8_-1.4"
      ],
      "InitCards": [
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
      "Id": "1_0.8_-0.7",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_1.4_0.0",
        "0_0.8_-1.4"
      ],
      "InitCards": [
        1,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.8_1.4",
        "0_0.8_1.4",
        "1_-0.8_0.7",
        "1_0.8_0.7"
      ],
      "InitCards": [
        0,
        0,
        0,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.8_-1.4",
        "0_0.8_-1.4",
        "1_-0.8_-0.7",
        "1_0.8_-0.7"
      ],
      "InitCards": [
        0,
        1,
        3,
        3
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

export const LEVEL_MEDIUM_8_DATA: LevelData = {
  "Id": 18,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.0_1.25",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": 1.25
    },
    {
      "Id": "0_1.0_1.25",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": 1.25
    },
    {
      "Id": "0_-1.0_-1.25",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": -1.25
    },
    {
      "Id": "0_1.0_-1.25",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": -1.25
    },
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_1.25",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.25
    },
    {
      "Id": "1_0.0_-1.25",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.25
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.65",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.65
    },
    {
      "Id": "2_0.0_-0.65",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.65
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.0_1.25",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        2,
        2,
        2,
        2,
        3,
        3,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.0_1.25",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        1,
        1
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.0_-1.25",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.0_-1.25",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.0",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_1.25",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.0_1.25",
        "0_1.0_1.25"
      ],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_-1.25",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.0_-1.25",
        "0_1.0_-1.25"
      ],
      "InitCards": [
        1,
        1,
        2,
        3,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        2,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.65",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_0.0_1.25",
        "1_0.0_0.0"
      ],
      "InitCards": [
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.65",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_0.0_-1.25",
        "1_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
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

export const LEVEL_MEDIUM_9_DATA: LevelData = {
  "Id": 19,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.0_1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.0_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.4
    },
    {
      "Id": "0_-1.3_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.3,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.3_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.3,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-1.3_1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.3,
      "ZPosition": 1.4
    },
    {
      "Id": "0_1.3_-1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.3,
      "ZPosition": -1.4
    },
    {
      "Id": "1_-0.65_0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.65,
      "ZPosition": 0.7
    },
    {
      "Id": "1_0.65_-0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.65,
      "ZPosition": -0.7
    },
    {
      "Id": "1_0.65_0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.65,
      "ZPosition": 0.7
    },
    {
      "Id": "1_-0.65_-0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.65,
      "ZPosition": -0.7
    },
    {
      "Id": "2_0.0_0.5",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.5
    },
    {
      "Id": "2_0.0_-0.5",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.5
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.4",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.3_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        0,
        0,
        1
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.3_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        3,
        3,
        3,
        4
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.3_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
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
      "Id": "0_1.3_-1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.65_0.7",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_1.4",
        "0_-1.3_0.0",
        "0_-1.3_1.4"
      ],
      "InitCards": [
        0,
        2,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.65_-0.7",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_-1.4",
        "0_1.3_0.0",
        "0_1.3_-1.4"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.65_0.7",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_1.4",
        "0_1.3_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.65_-0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_-1.4",
        "0_-1.3_0.0"
      ],
      "InitCards": [
        1,
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
      "Id": "2_0.0_0.5",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_-0.65_0.7",
        "1_0.65_0.7"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_0.65_-0.7",
        "1_-0.65_-0.7"
      ],
      "InitCards": [
        0,
        1,
        2,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_-0.65_0.7",
        "1_0.65_-0.7",
        "1_0.65_0.7",
        "1_-0.65_-0.7",
        "2_0.0_0.5",
        "2_0.0_-0.5"
      ],
      "InitCards": [
        0,
        1,
        2,
        3
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

export const LEVEL_MEDIUM_10_DATA: LevelData = {
  "Id": 20,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-2.1_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.1,
      "ZPosition": 1.3
    },
    {
      "Id": "0_-0.7_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 1.3
    },
    {
      "Id": "0_0.7_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 1.3
    },
    {
      "Id": "0_2.1_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.1,
      "ZPosition": 1.3
    },
    {
      "Id": "0_-1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-2.1_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.1,
      "ZPosition": -1.3
    },
    {
      "Id": "0_-0.7_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": -1.3
    },
    {
      "Id": "0_0.7_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": -1.3
    },
    {
      "Id": "0_2.1_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.1,
      "ZPosition": -1.3
    },
    {
      "Id": "1_-2.1_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -2.1,
      "ZPosition": 0.65
    },
    {
      "Id": "1_0.0_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.65
    },
    {
      "Id": "1_2.1_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 2.1,
      "ZPosition": 0.65
    },
    {
      "Id": "1_-2.1_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -2.1,
      "ZPosition": -0.65
    },
    {
      "Id": "1_0.0_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.65
    },
    {
      "Id": "1_2.1_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 2.1,
      "ZPosition": -0.65
    },
    {
      "Id": "2_-1.4_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_1.4_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-0.7_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.7_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2.1_1.3",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_1.3",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_1.3",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2.1_1.3",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2.1_-1.3",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        3,
        3,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_-1.3",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_-1.3",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2.1_-1.3",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-2.1_0.65",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-2.1_1.3",
        "0_-1.4_0.0"
      ],
      "InitCards": [
        0,
        2,
        2,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.65",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.7_1.3",
        "0_0.7_1.3"
      ],
      "InitCards": [
        0,
        0,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_2.1_0.65",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_2.1_1.3",
        "0_1.4_0.0"
      ],
      "InitCards": [
        0,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-2.1_-0.65",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-1.4_0.0",
        "0_-2.1_-1.3"
      ],
      "InitCards": [
        0,
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
      "Id": "1_0.0_-0.65",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_-0.7_-1.3",
        "0_0.7_-1.3"
      ],
      "InitCards": [
        1,
        2,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_2.1_-0.65",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.4_0.0",
        "0_2.1_-1.3"
      ],
      "InitCards": [
        0,
        1,
        3,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-1.4_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.4_0.0",
        "1_-2.1_0.65",
        "1_-2.1_-0.65"
      ],
      "InitCards": [
        1,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_0.0_0.65",
        "1_0.0_-0.65"
      ],
      "InitCards": [
        0,
        1,
        1,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_1.4_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_1.4_0.0",
        "1_2.1_0.65",
        "1_2.1_-0.65"
      ],
      "InitCards": [
        0,
        1,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_-0.7_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-1.4_0.0",
        "1_0.0_0.65",
        "1_0.0_-0.65",
        "2_-1.4_0.0",
        "2_0.0_0.0"
      ],
      "InitCards": [
        1,
        2,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.7_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_1.4_0.0",
        "1_0.0_0.65",
        "1_0.0_-0.65",
        "2_0.0_0.0",
        "2_1.4_0.0"
      ],
      "InitCards": [
        0,
        3,
        4,
        4
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

export const LEVEL_HARD_1_DATA: LevelData = {
  "Id": 21,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_0.8_0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.75
    },
    {
      "Id": "0_-0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "0_0.8_-0.75",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.75
    },
    {
      "Id": "1_-0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.8_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_0.8_0.75",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_-0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_0.8_-0.75",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.8_0.75",
        "0_-0.8_-0.75"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.8_0.75",
        "0_0.8_-0.75"
      ],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        2
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

export const LEVEL_HARD_2_DATA: LevelData = {
  "Id": 22,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_0.0_1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.0_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.4
    },
    {
      "Id": "0_-1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.4_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.2_0.0",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.2_0.0",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0.0_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_1.4_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.2_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.4_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        0,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.2_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.4_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
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
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        1,
        2
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

export const LEVEL_HARD_3_DATA: LevelData = {
  "Id": 23,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.8_1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 1.4
    },
    {
      "Id": "0_-0.8_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-0.8_-1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.8,
      "ZPosition": -1.4
    },
    {
      "Id": "0_0.8_1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.8_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.8_-1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.8,
      "ZPosition": -1.4
    },
    {
      "Id": "1_-0.8_0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.7
    },
    {
      "Id": "1_-0.8_-0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.7
    },
    {
      "Id": "1_0.8_0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.7
    },
    {
      "Id": "1_0.8_-0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.7
    },
    {
      "Id": "2_0.0_0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.7
    },
    {
      "Id": "2_0.0_-0.7",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.7
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.8_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.8_-1.4",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_1.4",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.8_-1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.7",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.8_1.4",
        "0_-0.8_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_-0.7",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.8_0.0",
        "0_-0.8_-1.4"
      ],
      "InitCards": [
        0,
        1,
        1,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_0.7",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.8_1.4",
        "0_0.8_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_-0.7",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.8_0.0",
        "0_0.8_-1.4"
      ],
      "InitCards": [
        2,
        2,
        3,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-0.8_1.4",
        "0_-0.8_0.0",
        "0_0.8_1.4",
        "0_0.8_0.0",
        "1_-0.8_0.7",
        "1_0.8_0.7"
      ],
      "InitCards": [
        0,
        0,
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
      "Id": "2_0.0_-0.7",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.8_0.0",
        "0_-0.8_-1.4",
        "0_0.8_0.0",
        "0_0.8_-1.4",
        "1_-0.8_-0.7",
        "1_0.8_-0.7"
      ],
      "InitCards": [
        0,
        1,
        2,
        2,
        2,
        4
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

export const LEVEL_HARD_4_DATA: LevelData = {
  "Id": 24,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.0_1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.4
    },
    {
      "Id": "0_0.0_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.4
    },
    {
      "Id": "0_-1.3_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.3,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.3_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.3,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-1.3_1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.3,
      "ZPosition": 1.4
    },
    {
      "Id": "0_1.3_-1.4",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.3,
      "ZPosition": -1.4
    },
    {
      "Id": "1_-0.65_0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.65,
      "ZPosition": 0.7
    },
    {
      "Id": "1_0.65_-0.7",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.65,
      "ZPosition": -0.7
    },
    {
      "Id": "1_0.65_0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.65,
      "ZPosition": 0.7
    },
    {
      "Id": "1_-0.65_-0.7",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.65,
      "ZPosition": -0.7
    },
    {
      "Id": "2_0.0_0.5",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.5
    },
    {
      "Id": "2_0.0_-0.5",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.5
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.4",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.3_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.3_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.3_1.4",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        3,
        3,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.3_-1.4",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.65_0.7",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_1.4",
        "0_-1.3_0.0",
        "0_-1.3_1.4"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.65_-0.7",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_-1.4",
        "0_1.3_0.0",
        "0_1.3_-1.4"
      ],
      "InitCards": [
        2,
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
      "Id": "1_0.65_0.7",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_1.4",
        "0_1.3_0.0"
      ],
      "InitCards": [
        1,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.65_-0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_0.0_0.0",
        "0_0.0_-1.4",
        "0_-1.3_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.5",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_-0.65_0.7",
        "1_0.65_0.7"
      ],
      "InitCards": [
        0,
        0,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_0.65_-0.7",
        "1_-0.65_-0.7"
      ],
      "InitCards": [
        0,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.0",
        "1_-0.65_0.7",
        "1_0.65_-0.7",
        "1_0.65_0.7",
        "1_-0.65_-0.7",
        "2_0.0_0.5",
        "2_0.0_-0.5"
      ],
      "InitCards": [
        0,
        1,
        3,
        3
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

export const LEVEL_HARD_5_DATA: LevelData = {
  "Id": 25,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.0_1.2",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 1.2
    },
    {
      "Id": "0_1.0_1.2",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 1.2
    },
    {
      "Id": "0_-1.0_-1.2",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": -1.2
    },
    {
      "Id": "0_1.0_-1.2",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": -1.2
    },
    {
      "Id": "0_-1.5_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.5_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.0_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.0_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": 0.65
    },
    {
      "Id": "1_1.0_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": 0.65
    },
    {
      "Id": "1_-1.0_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": -0.65
    },
    {
      "Id": "1_1.0_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": -0.65
    },
    {
      "Id": "2_0.0_0.65",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.65
    },
    {
      "Id": "2_0.0_-0.65",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.65
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.0_1.2",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        4,
        4
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.0_1.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.0_-1.2",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.0_-1.2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_-1.5_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.5_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.0_0.65",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.0_1.2",
        "0_-1.5_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.0_0.65",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_1.0_1.2",
        "0_1.5_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
        2,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.0_-0.65",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_-1.0_-1.2",
        "0_-1.5_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.0_-0.65",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.0_-1.2",
        "0_1.5_0.0",
        "0_0.0_0.0"
      ],
      "InitCards": [
        0,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.65",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.0_1.2",
        "0_1.0_1.2",
        "0_0.0_0.0",
        "1_-1.0_0.65",
        "1_1.0_0.65"
      ],
      "InitCards": [
        1,
        1,
        1,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.65",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.0_-1.2",
        "0_1.0_-1.2",
        "0_0.0_0.0",
        "1_-1.0_-0.65",
        "1_1.0_-0.65"
      ],
      "InitCards": [
        0,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.0_0.0",
        "2_0.0_0.65",
        "2_0.0_-0.65"
      ],
      "InitCards": [
        0,
        1,
        1,
        2
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

export const LEVEL_HARD_6_DATA: LevelData = {
  "Id": 26,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.7_1.5",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 1.5
    },
    {
      "Id": "0_0.7_1.5",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 1.5
    },
    {
      "Id": "0_-0.7_-1.5",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": -1.5
    },
    {
      "Id": "0_0.7_-1.5",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": -1.5
    },
    {
      "Id": "0_-1.8_0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.8,
      "ZPosition": 0.7
    },
    {
      "Id": "0_-1.8_-0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.8,
      "ZPosition": -0.7
    },
    {
      "Id": "0_1.8_0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.8,
      "ZPosition": 0.7
    },
    {
      "Id": "0_1.8_-0.7",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.8,
      "ZPosition": -0.7
    },
    {
      "Id": "1_-1.05_0.85",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.05,
      "ZPosition": 0.85
    },
    {
      "Id": "1_1.05_0.85",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.05,
      "ZPosition": 0.85
    },
    {
      "Id": "1_-1.05_-0.85",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.05,
      "ZPosition": -0.85
    },
    {
      "Id": "1_1.05_-0.85",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.05,
      "ZPosition": -0.85
    },
    {
      "Id": "2_0.0_0.85",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.85
    },
    {
      "Id": "2_0.0_-0.85",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.85
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.7_1.5",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_1.5",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_-1.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        3,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_-1.5",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.8_0.7",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        3,
        4
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.8_-0.7",
      "TypeId": 2,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.8_0.7",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        3,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.8_-0.7",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_-1.05_0.85",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.7_1.5",
        "0_-1.8_0.7"
      ],
      "InitCards": [
        0,
        0,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.05_0.85",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.7_1.5",
        "0_1.8_0.7"
      ],
      "InitCards": [
        0,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.05_-0.85",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_-0.7_-1.5",
        "0_-1.8_-0.7"
      ],
      "InitCards": [
        1,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.05_-0.85",
      "TypeId": 2,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.7_-1.5",
        "0_1.8_-0.7"
      ],
      "InitCards": [
        1,
        1,
        2,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_0.85",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-0.7_1.5",
        "0_0.7_1.5",
        "1_-1.05_0.85",
        "1_1.05_0.85"
      ],
      "InitCards": [
        0,
        0,
        1,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.0_-0.85",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.7_-1.5",
        "0_0.7_-1.5",
        "1_-1.05_-0.85",
        "1_1.05_-0.85"
      ],
      "InitCards": [
        0,
        0,
        1,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "2_0.0_0.85",
        "2_0.0_-0.85"
      ],
      "InitCards": [
        0,
        1,
        3,
        4
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

export const LEVEL_HARD_7_DATA: LevelData = {
  "Id": 27,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.4_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 1.3
    },
    {
      "Id": "0_0.0_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.3
    },
    {
      "Id": "0_1.4_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 1.3
    },
    {
      "Id": "0_-0.9_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.9,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.9_0.0",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.9,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-1.4_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": -1.3
    },
    {
      "Id": "0_0.0_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.3
    },
    {
      "Id": "0_1.4_-1.4",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": -1.3
    },
    {
      "Id": "1_-1.2_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": 0.65
    },
    {
      "Id": "1_1.2_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 0.65
    },
    {
      "Id": "1_-1.2_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": -0.65
    },
    {
      "Id": "1_1.2_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": -0.65
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_-0.7_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.7_0.0",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.4_1.3",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_1.3",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.4_1.3",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.9_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.9_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        2,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.4_-1.3",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.3",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_1.4_-1.4",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.2_0.65",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-1.4_1.3",
        "0_-0.9_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        1
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.2_0.65",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_1.4_1.3",
        "0_0.9_0.0"
      ],
      "InitCards": [
        0,
        2,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.2_-0.65",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "0_-1.4_-1.3"
      ],
      "InitCards": [
        0,
        1,
        1,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.2_-0.65",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.9_0.0",
        "0_1.4_-1.4"
      ],
      "InitCards": [
        1,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "0_0.9_0.0"
      ],
      "InitCards": [
        0,
        0,
        0,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-0.7_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "1_-1.2_0.65",
        "1_-1.2_-0.65",
        "1_0.0_0.0"
      ],
      "InitCards": [
        1,
        1,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.7_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.9_0.0",
        "1_1.2_0.65",
        "1_1.2_-0.65",
        "1_0.0_0.0"
      ],
      "InitCards": [
        0,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.9_0.0",
        "0_0.9_0.0",
        "1_0.0_0.0",
        "2_-0.7_0.0",
        "2_0.7_0.0"
      ],
      "InitCards": [
        1,
        1,
        3,
        4
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

export const LEVEL_HARD_8_DATA: LevelData = {
  "Id": 28,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-2.0_0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -2.0,
      "ZPosition": 0.8
    },
    {
      "Id": "0_0.0_0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.8
    },
    {
      "Id": "0_2.0_0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 2.0,
      "ZPosition": 0.8
    },
    {
      "Id": "0_-2.0_-0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -2.0,
      "ZPosition": -0.8
    },
    {
      "Id": "0_0.0_-0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.8
    },
    {
      "Id": "0_2.0_-0.8",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 2.0,
      "ZPosition": -0.8
    },
    {
      "Id": "1_-1.0_0.8",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 0.8
    },
    {
      "Id": "1_1.0_0.8",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 0.8
    },
    {
      "Id": "1_-1.0_-0.8",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": -0.8
    },
    {
      "Id": "1_1.0_-0.8",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": -0.8
    },
    {
      "Id": "2_-1.0_0.0",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_1.0_0.0",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2.0_0.8",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        2,
        2,
        3,
        3,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_0.8",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        2,
        2,
        2,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2.0_0.8",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        2,
        3,
        3,
        4
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2.0_-0.8",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
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
      "Id": "0_0.0_-0.8",
      "TypeId": 3,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        3,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2.0_-0.8",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.0_0.8",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-2.0_0.8",
        "0_0.0_0.8"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.0_0.8",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_0.8",
        "0_2.0_0.8"
      ],
      "InitCards": [
        0,
        0,
        0,
        0,
        1,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.0_-0.8",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-2.0_-0.8",
        "0_0.0_-0.8"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.0_-0.8",
      "TypeId": 3,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.0_-0.8",
        "0_2.0_-0.8"
      ],
      "InitCards": [
        1,
        2,
        3,
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
      "Id": "2_-1.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-1.0_0.8",
        "1_-1.0_-0.8"
      ],
      "InitCards": [
        0,
        1,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_1.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_1.0_0.8",
        "1_1.0_-0.8"
      ],
      "InitCards": [
        0,
        0,
        3,
        4
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

export const LEVEL_HARD_9_DATA: LevelData = {
  "Id": 29,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.7_1.1",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.7,
      "ZPosition": 1.1
    },
    {
      "Id": "0_-0.5_1.1",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.5,
      "ZPosition": 1.1
    },
    {
      "Id": "0_0.5_1.1",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.5,
      "ZPosition": 1.1
    },
    {
      "Id": "0_1.7_1.1",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.7,
      "ZPosition": 1.1
    },
    {
      "Id": "0_-1.7_-1.1",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.7,
      "ZPosition": -1.1
    },
    {
      "Id": "0_-0.5_-1.1",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.5,
      "ZPosition": -1.1
    },
    {
      "Id": "0_0.5_-1.1",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.5,
      "ZPosition": -1.1
    },
    {
      "Id": "0_1.7_-1.1",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.7,
      "ZPosition": -1.1
    },
    {
      "Id": "1_-1.1_1.1",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.1,
      "ZPosition": 1.1
    },
    {
      "Id": "1_1.1_1.1",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.1,
      "ZPosition": 1.1
    },
    {
      "Id": "1_-1.1_-1.1",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.1,
      "ZPosition": -1.1
    },
    {
      "Id": "1_1.1_-1.1",
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.1,
      "ZPosition": -1.1
    },
    {
      "Id": "1_0.0_0.0",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_-0.6_0.0",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.6_0.0",
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.0_0.0",
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.7_1.1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 3,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.5_1.1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "0_0.5_1.1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 4,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.7_1.1",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        2,
        3,
        4,
        4
      ],
      "IsHidden": true,
      "LockedTurn": 3,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.7_-1.1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        3,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.5_-1.1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.5_-1.1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.7_-1.1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.1_1.1",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-1.7_1.1",
        "0_-0.5_1.1"
      ],
      "InitCards": [
        0,
        0,
        0,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.1_1.1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.5_1.1",
        "0_1.7_1.1"
      ],
      "InitCards": [
        0,
        1,
        3,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.1_-1.1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.7_-1.1",
        "0_-0.5_-1.1"
      ],
      "InitCards": [
        1,
        2,
        2,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_1.1_-1.1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.5_-1.1",
        "0_1.7_-1.1"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 3,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-0.5_1.1",
        "0_0.5_1.1",
        "0_-0.5_-1.1",
        "0_0.5_-1.1"
      ],
      "InitCards": [
        3,
        3,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-0.6_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-0.5_1.1",
        "0_-0.5_-1.1",
        "1_0.0_0.0"
      ],
      "InitCards": [
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.6_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.5_1.1",
        "0_0.5_-1.1",
        "1_0.0_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.0_0.0",
        "2_-0.6_0.0",
        "2_0.6_0.0"
      ],
      "InitCards": [
        0,
        2,
        3,
        3
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

export const LEVEL_HARD_10_DATA: LevelData = {
  "Id": 30,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-2.1_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.1,
      "ZPosition": 1.3
    },
    {
      "Id": "0_-0.7_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 1.3
    },
    {
      "Id": "0_0.7_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 1.3
    },
    {
      "Id": "0_2.1_1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.1,
      "ZPosition": 1.3
    },
    {
      "Id": "0_-2.1_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -2.1,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-0.7_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.7_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "0_2.1_0.0",
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 2.1,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-2.1_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.1,
      "ZPosition": -1.3
    },
    {
      "Id": "0_-0.7_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": -1.3
    },
    {
      "Id": "0_0.7_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": -1.3
    },
    {
      "Id": "0_2.1_-1.3",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.1,
      "ZPosition": -1.3
    },
    {
      "Id": "1_-2.1_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -2.1,
      "ZPosition": 0.65
    },
    {
      "Id": "1_-0.7_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": 0.65
    },
    {
      "Id": "1_0.7_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": 0.65
    },
    {
      "Id": "1_2.1_0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 2.1,
      "ZPosition": 0.65
    },
    {
      "Id": "1_-2.1_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -2.1,
      "ZPosition": -0.65
    },
    {
      "Id": "1_-0.7_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": -0.65
    },
    {
      "Id": "1_0.7_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": -0.65
    },
    {
      "Id": "1_2.1_-0.65",
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 2.1,
      "ZPosition": -0.65
    },
    {
      "Id": "2_-1.4_0.65",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": 0.65
    },
    {
      "Id": "2_1.4_0.65",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": 0.65
    },
    {
      "Id": "2_-1.4_-0.65",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -1.4,
      "ZPosition": -0.65
    },
    {
      "Id": "2_1.4_-0.65",
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 1.4,
      "ZPosition": -0.65
    },
    {
      "Id": "3_-0.7_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.7_0.0",
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "4_0.0_0.0",
      "LayerId": 4,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2.1_1.3",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        2,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_1.3",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_1.3",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2.1_1.3",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2.1_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_0.0",
      "TypeId": 2,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2.1_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        2,
        2,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2.1_-1.3",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-0.7_-1.3",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.7_-1.3",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_2.1_-1.3",
      "TypeId": 2,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-2.1_0.65",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-2.1_1.3",
        "0_-2.1_0.0"
      ],
      "InitCards": [
        1,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.7_0.65",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-0.7_1.3",
        "0_-0.7_0.0"
      ],
      "InitCards": [
        0,
        0,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.7_0.65",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.7_1.3",
        "0_0.7_0.0"
      ],
      "InitCards": [
        1,
        2,
        3,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_2.1_0.65",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_2.1_1.3",
        "0_2.1_0.0"
      ],
      "InitCards": [
        0,
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-2.1_-0.65",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_-2.1_0.0",
        "0_-2.1_-1.3"
      ],
      "InitCards": [
        1,
        2,
        3,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.7_-0.65",
      "TypeId": 2,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.7_0.0",
        "0_-0.7_-1.3"
      ],
      "InitCards": [
        0,
        0,
        0,
        2,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.7_-0.65",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_0.7_0.0",
        "0_0.7_-1.3"
      ],
      "InitCards": [
        0,
        0,
        2,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_2.1_-0.65",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_2.1_0.0",
        "0_2.1_-1.3"
      ],
      "InitCards": [
        0,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-1.4_0.65",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-2.1_1.3",
        "0_-0.7_1.3",
        "0_-2.1_0.0",
        "0_-0.7_0.0",
        "1_-2.1_0.65",
        "1_-0.7_0.65"
      ],
      "InitCards": [
        0,
        1,
        3,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_1.4_0.65",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.7_1.3",
        "0_2.1_1.3",
        "0_0.7_0.0",
        "0_2.1_0.0",
        "1_0.7_0.65",
        "1_2.1_0.65"
      ],
      "InitCards": [
        1,
        1,
        2,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-1.4_-0.65",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_-2.1_0.0",
        "0_-0.7_0.0",
        "0_-2.1_-1.3",
        "0_-0.7_-1.3",
        "1_-2.1_-0.65",
        "1_-0.7_-0.65"
      ],
      "InitCards": [
        2,
        4,
        4,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_1.4_-0.65",
      "TypeId": 2,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0.7_0.0",
        "0_2.1_0.0",
        "0_0.7_-1.3",
        "0_2.1_-1.3",
        "1_0.7_-0.65",
        "1_2.1_-0.65"
      ],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_-0.7_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-0.7_0.0",
        "1_-0.7_0.65",
        "1_-0.7_-0.65",
        "2_-1.4_0.65",
        "2_-1.4_-0.65"
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
      "Id": "3_0.7_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0.7_0.0",
        "1_0.7_0.65",
        "1_0.7_-0.65",
        "2_1.4_0.65",
        "2_1.4_-0.65"
      ],
      "InitCards": [
        0,
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "4_0.0_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-0.7_0.0",
        "0_0.7_0.0",
        "1_-0.7_0.65",
        "1_0.7_0.65",
        "1_-0.7_-0.65",
        "1_0.7_-0.65",
        "3_-0.7_0.0",
        "3_0.7_0.0"
      ],
      "InitCards": [
        1,
        1,
        3,
        4
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

export interface PresetLevel {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  data: LevelData;
}

export const PRESET_LEVELS: PresetLevel[] = [
  {
    id: "easy_1",
    name: "Easy 1: Dual Pillars",
    difficulty: "easy",
    description: "Two twin vertical columns bridged by top-tier cross-pieces. Intro to physical layer stacking.",
    data: LEVEL_EASY_1_DATA
  },
  {
    id: "easy_2",
    name: "Easy 2: The Cross",
    difficulty: "easy",
    description: "Four vertical foundation boxes arranged in a quad-block supporting dual horizontal bridging bars.",
    data: LEVEL_EASY_2_DATA
  },
  {
    id: "easy_3",
    name: "Easy 3: Trio Steps",
    difficulty: "easy",
    description: "A 3-tiered pyramid stepping cleanly from 4 foundation boxes up to an apex capstone.",
    data: LEVEL_EASY_3_DATA
  },
  {
    id: "easy_4",
    name: "Easy 4: Feeder Intro",
    difficulty: "easy",
    description: "Introduction to Feeder Trays resting directly atop a sturdy multi-box foundation.",
    data: LEVEL_EASY_4_DATA
  },
  {
    id: "easy_5",
    name: "Easy 5: Diamond Gate",
    difficulty: "easy",
    description: "Two symmetrically placed Mystery Boxes concealed on the ground layer, supporting mid-tier struts and a capstone.",
    data: LEVEL_EASY_5_DATA
  },
  {
    id: "easy_6",
    name: "Easy 6: Winged Citadel",
    difficulty: "easy",
    description: "Winged H-matrix foundation with 2 symmetrically concealed Mystery Boxes on Layer 0 supporting 3 upper crossbars.",
    data: LEVEL_EASY_6_DATA
  },
  {
    id: "easy_7",
    name: "Easy 7: Twin Feeder Trays",
    difficulty: "easy",
    description: "Six wide foundation boxes supporting dual feeder trays across the columns.",
    data: LEVEL_EASY_7_DATA
  },
  {
    id: "easy_8",
    name: "Easy 8: Castle Battlement",
    difficulty: "easy",
    description: "Castle battlements in a square arena with turn-locked base boxes and 2 symmetrically concealed Mystery Boxes on Layer 0.",
    data: LEVEL_EASY_8_DATA
  },
  {
    id: "easy_9",
    name: "Easy 9: Honeycomb Fortress",
    difficulty: "easy",
    description: "Staggered 3-2 honeycomb foundation with 2 symmetrically concealed Mystery Boxes on Layer 0 supporting 3 mid struts and an apex feeder station.",
    data: LEVEL_EASY_9_DATA
  },
  {
    id: "easy_10",
    name: "Easy 10: Grand Cascade",
    difficulty: "easy",
    description: "Grand 16-box 4-tier step honeycomb ziggurat finale with 2 symmetrically placed Mystery Boxes on Layer 0.",
    data: LEVEL_EASY_10_DATA
  },
  {
    id: "medium_1",
    name: "Medium 1: Level 1 (Tutorial - Warmup)",
    difficulty: "medium",
    description: "Four foundation boxes supporting two interlocking top crossbars in a balanced square footprint.",
    data: LEVEL_MEDIUM_1_DATA
  },
  {
    id: "medium_2",
    name: "Medium 2: Level 2 (Cross Block)",
    difficulty: "medium",
    description: "Greek cross foundation supporting 3 interlocking upper crossbars.",
    data: LEVEL_MEDIUM_2_DATA
  },
  {
    id: "medium_3",
    name: "Medium 3: Level 3 (Tray Delivery)",
    difficulty: "medium",
    description: "Staggered 3-2 honeycomb foundation supporting 3 mid struts and an apex feeder station in a balanced footprint.",
    data: LEVEL_MEDIUM_3_DATA
  },
  {
    id: "medium_4",
    name: "Medium 4: Classic Conveyor",
    difficulty: "medium",
    description: "Dual 3-box vertical columns bridged by mid-tier struts and dual upper feeder stations.",
    data: LEVEL_MEDIUM_4_DATA
  },
  {
    id: "medium_5",
    name: "Medium 5: Level 5 (Pyramid Multi-Tier)",
    difficulty: "medium",
    description: "True 4-tier step pyramid with 2 symmetrically placed Mystery Boxes on Layer 0 supporting 3 mid-tier bars, 2 upper struts, and an apex feeder station.",
    data: LEVEL_MEDIUM_5_DATA
  },
  {
    id: "medium_6",
    name: "Medium 6: Level 6 (Spiral Shuffle)",
    difficulty: "medium",
    description: "Greek cross foundation supporting 4 mid-tier spiral bars and dual upper feeder stations across 4 colors with 2 symmetric Mystery Boxes on Layer 0.",
    data: LEVEL_MEDIUM_6_DATA
  },
  {
    id: "medium_7",
    name: "Medium 7: Level 7 (Turn Locks Challenge)",
    difficulty: "medium",
    description: "Hex-flank bastion arena guarded by turn locks requiring careful coordination to free underlying color boxes.",
    data: LEVEL_MEDIUM_7_DATA
  },
  {
    id: "medium_8",
    name: "Medium 8: Level 8 (8-Slot Factory)",
    difficulty: "medium",
    description: "High-capacity 8-slot megabox foundry featuring 2 symmetrically placed Mystery Megaboxes on Layer 0 and dual feeder trays.",
    data: LEVEL_MEDIUM_8_DATA
  },
  {
    id: "medium_9",
    name: "Medium 9: Double Cross Citadel",
    difficulty: "medium",
    description: "Multi-tier diamond star citadel with 2 symmetrically placed Mystery Boxes on Layer 0 stepping through 4 tiers to an apex feeder station.",
    data: LEVEL_MEDIUM_9_DATA
  },
  {
    id: "medium_10",
    name: "Medium 10: Grand Colosseum Finale",
    difficulty: "medium",
    description: "Epic 21-box 4-tier colosseum finale spanning 3 expansive rows with 2 symmetrically concealed Mystery Boxes on Layer 0.",
    data: LEVEL_MEDIUM_10_DATA
  },
  {
    id: "hard_1",
    name: "Hard 1: Warmup Alignment",
    difficulty: "hard",
    description: "Four foundation boxes supporting two interlocking top crossbars. Gentle warmup for Hard Mode.",
    data: LEVEL_HARD_1_DATA
  },
  {
    id: "hard_2",
    name: "Hard 2: Cross Interlock",
    difficulty: "hard",
    description: "A 5-box foundation arranged in a square cross supporting 3 interlocking upper bars.",
    data: LEVEL_HARD_2_DATA
  },
  {
    id: "hard_3",
    name: "Hard 3: Double Obelisk",
    difficulty: "hard",
    description: "Two 3-box vertical columns bridged by mid-tier struts and dual apex crossbars.",
    data: LEVEL_HARD_3_DATA
  },
  {
    id: "hard_4",
    name: "Hard 4: Hex Core Monolith",
    difficulty: "hard",
    description: "Seven-box diamond compass foundation supporting 4 mid-tier bastions, 2 upper struts, and an apex feeder station.",
    data: LEVEL_HARD_4_DATA
  },
  {
    id: "hard_5",
    name: "Hard 5: Octagon Matrix",
    difficulty: "hard",
    description: "Concentric square courtyard matrix with 2 symmetrically concealed Mystery Boxes on Layer 0 supporting 4 mid-tier bars and an apex feeder station.",
    data: LEVEL_HARD_5_DATA
  },
  {
    id: "hard_6",
    name: "Hard 6: Hexa-Color Citadel",
    difficulty: "hard",
    description: "Greek cross citadel with 8 perimeter base boxes and 2 symmetrically placed Mystery Boxes on Layer 0 supporting 4 mid struts and an apex station.",
    data: LEVEL_HARD_6_DATA
  },
  {
    id: "hard_7",
    name: "Hard 7: Dual Ziggurat Labyrinth",
    difficulty: "hard",
    description: "Staggered 3-2-3 honeycomb matrix foundation supporting 5 mid struts, 2 upper crossbars, and an apex feeder station.",
    data: LEVEL_HARD_7_DATA
  },
  {
    id: "hard_8",
    name: "Hard 8: Ten-Slot Megaboxes",
    difficulty: "hard",
    description: "Massive 10-slot megabox bastion with dual feeder trays and 2 symmetrically placed Mystery Megaboxes on Layer 0.",
    data: LEVEL_HARD_8_DATA
  },
  {
    id: "hard_9",
    name: "Hard 9: Turnlock Gauntlet Fortress",
    difficulty: "hard",
    description: "Four-corner bastion citadel guarded by turn locks with 2 symmetrically concealed Mystery Boxes on Layer 0.",
    data: LEVEL_HARD_9_DATA
  },
  {
    id: "hard_10",
    name: "Hard 10: Cosmic Crucible Grand Master",
    difficulty: "hard",
    description: "The ultimate 27-box 5-tier master step ziggurat spanning 3 expansive rows with 2 symmetrically placed Mystery Boxes on Layer 0.",
    data: LEVEL_HARD_10_DATA
  },
];


export const SAMPLE_LEVELS = PRESET_LEVELS;
export const LEVEL_1_SAMPLE = LEVEL_EASY_1_DATA;
export const LEVEL_2_SAMPLE = LEVEL_EASY_2_DATA;
export const LEVEL_3_SAMPLE = LEVEL_EASY_3_DATA;
export const LEVEL_4_SAMPLE = LEVEL_EASY_4_DATA;
export const LEVEL_5_SAMPLE = LEVEL_EASY_5_DATA;
export const LEVEL_6_SAMPLE = LEVEL_EASY_6_DATA;
export const LEVEL_7_SAMPLE = LEVEL_EASY_7_DATA;
export const LEVEL_8_SAMPLE = LEVEL_EASY_8_DATA;
export const LEVEL_9_SAMPLE = LEVEL_EASY_9_DATA;
export const LEVEL_10_SAMPLE = LEVEL_EASY_10_DATA;
