import { LevelData } from "../types/level";

export const LEVEL_EASY_1_DATA: LevelData = {
  "Id": 1,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.2_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.2_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.2_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.2_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.2_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1.2_0"
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
      "Id": "0_0_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_0_0"
      ],
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
      "Id": "0_1.2_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_1.2_0"
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
      "Id": "1_-1.2_0",
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
      "Id": "1_0_0",
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
      "Id": "1_1.2_0",
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.4_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.4,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.4_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.4,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.1_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.1,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.1_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.1,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0_0.9",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.9
    },
    {
      "Id": "1_0_-0.9",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.9
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.4_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1.1_0",
        "1_0_0.9",
        "1_0_-0.9"
      ],
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
      "Id": "0_0.4_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_1.1_0",
        "1_0_0.9",
        "1_0_-0.9"
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
      "Id": "1_-1.1_0",
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
      "Id": "1_1.1_0",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "1_0_0.9",
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
      "Id": "1_0_-0.9",
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_0_0",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-0.6_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.6_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_-1.3_0.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.3,
      "ZPosition": 0.5
    },
    {
      "Id": "2_-1.3_-0.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.3,
      "ZPosition": -0.5
    },
    {
      "Id": "2_1.3_0.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.3,
      "ZPosition": 0.5
    },
    {
      "Id": "2_1.3_-0.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.3,
      "ZPosition": -0.5
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-0.6_0",
        "1_0.6_0"
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
      "Id": "1_-0.6_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_-1.3_0.5",
        "2_-1.3_-0.5"
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
      "Id": "1_0.6_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_1.3_0.5",
        "2_1.3_-0.5"
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
      "Id": "2_-1.3_0.5",
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
      "Id": "2_-1.3_-0.5",
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
      "Id": "2_1.3_0.5",
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
      "Id": "2_1.3_-0.5",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
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

export const LEVEL_EASY_4_DATA: LevelData = {
  "Id": 4,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_0_0",
      "NodeId": 4,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1_0.8",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 0.8
    },
    {
      "Id": "1_1_0.8",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 0.8
    },
    {
      "Id": "1_-1_-0.8",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": -0.8
    },
    {
      "Id": "1_1_-0.8",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": -0.8
    },
    {
      "Id": "1_0_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0_0"
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
      "Id": "1_-1_0.8",
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
      "Id": "1_1_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_-1_-0.8",
      "TypeId": 2,
      "BoxColor": 0,
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
      "Id": "1_1_-0.8",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "1_0_0",
      "TypeId": 2,
      "BoxColor": 0,
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.6_0.6",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 45.0,
      "XPosition": -0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "0_0.6_-0.6",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 45.0,
      "XPosition": 0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "1_0_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_1.3",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 45.0,
      "XPosition": 0.0,
      "ZPosition": 1.3
    },
    {
      "Id": "2_1.3_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 45.0,
      "XPosition": 1.3,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_-1.3",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 45.0,
      "XPosition": 0.0,
      "ZPosition": -1.3
    },
    {
      "Id": "2_-1.3_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 45.0,
      "XPosition": -1.3,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.6_0.6",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_0_0"
      ],
      "InitCards": [
        0,
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
      "Id": "0_0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_0_0"
      ],
      "InitCards": [
        0,
        0,
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
      "Id": "1_0_0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        1,
        4,
        4
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_1.3",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "2_1.3_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "2_0_-1.3",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "2_-1.3_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        1,
        1,
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

export const LEVEL_EASY_6_DATA: LevelData = {
  "Id": 6,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.6_0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "0_0.6_0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "0_-0.6_-0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "0_0.6_-0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "1_-1.2_1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "1_1.2_1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "1_-1.2_-1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": -1.2
    },
    {
      "Id": "1_1.2_-1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": -1.2
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.6_0.6",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1.2_1.2"
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
      "Id": "0_0.6_0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_1.2_1.2"
      ],
      "InitCards": [
        0,
        0,
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
      "Id": "0_-0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_-1.2_-1.2"
      ],
      "InitCards": [
        0,
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
      "Id": "0_0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_1.2_-1.2"
      ],
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
      "Id": "1_-1.2_1.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "1_1.2_1.2",
      "TypeId": 2,
      "BoxColor": 4,
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
      "Id": "1_-1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
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
      "Id": "1_1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        4,
        4,
        4,
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

export const LEVEL_EASY_7_DATA: LevelData = {
  "Id": 7,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.6_0",
      "NodeId": 4,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.6_0",
      "NodeId": 4,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.2_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 1.0
    },
    {
      "Id": "1_0_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.0
    },
    {
      "Id": "1_1.2_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 1.0
    },
    {
      "Id": "1_-1.2_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": -1.0
    },
    {
      "Id": "1_0_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_1.2_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": -1.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.6_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_0.6_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_-1.2_1",
      "TypeId": 2,
      "BoxColor": 0,
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
      "Id": "1_0_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
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
      "Id": "1_1.2_1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
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
      "Id": "1_-1.2_-1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_0_-1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_1.2_-1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
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

export const LEVEL_EASY_8_DATA: LevelData = {
  "Id": 8,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_0_0",
      "NodeId": 4,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-0.6_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.6_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_-1.3_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.3,
      "ZPosition": 1.0
    },
    {
      "Id": "2_0_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.0
    },
    {
      "Id": "2_1.3_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.3,
      "ZPosition": 1.0
    },
    {
      "Id": "2_-1.3_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.3,
      "ZPosition": -1.0
    },
    {
      "Id": "2_1.3_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.3,
      "ZPosition": -1.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-0.6_0",
        "1_0.6_0"
      ],
      "InitCards": [
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
      "Id": "1_-0.6_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
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
      "Id": "1_0.6_0",
      "TypeId": 2,
      "BoxColor": 2,
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
      "Id": "2_-1.3_1",
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
      "Id": "2_0_1",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "2_1.3_1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
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
      "Id": "2_-1.3_-1",
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
      "Id": "2_1.3_-1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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

export const LEVEL_EASY_9_DATA: LevelData = {
  "Id": 9,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.2_0.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 0.8
    },
    {
      "Id": "0_1.2_0.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 0.8
    },
    {
      "Id": "0_-1.2_-0.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": -0.8
    },
    {
      "Id": "0_1.2_-0.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": -0.8
    },
    {
      "Id": "1_-1.2_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.2_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.9",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.9
    },
    {
      "Id": "2_0.0_-0.9",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.9
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.2_0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
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
      "Id": "0_1.2_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
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
      "Id": "0_-1.2_-0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_1.2_-0.8",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
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
      "Id": "1_-1.2_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.2_0.8",
        "0_-1.2_-0.8"
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
      "Id": "1_1.2_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_1.2_0.8",
        "0_1.2_-0.8"
      ],
      "InitCards": [
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
      "Id": "1_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
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
      "Id": "2_0.0_0.9",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_0.0_0.0"
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
      "Id": "2_0.0_-0.9",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.0_0.0"
      ],
      "InitCards": [
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

export const LEVEL_EASY_10_DATA: LevelData = {
  "Id": 10,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.7_0",
      "NodeId": 4,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.7_0",
      "NodeId": 4,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0_0.9",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.9
    },
    {
      "Id": "0_0_-0.9",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.9
    },
    {
      "Id": "1_-1.1_1.1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.1,
      "ZPosition": 1.1
    },
    {
      "Id": "1_1.1_1.1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.1,
      "ZPosition": 1.1
    },
    {
      "Id": "1_-1.1_-1.1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.1,
      "ZPosition": -1.1
    },
    {
      "Id": "1_1.1_-1.1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.1,
      "ZPosition": -1.1
    },
    {
      "Id": "1_-1.8_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.8_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.8,
      "ZPosition": 0.0
    },
    {
      "Id": "2_-1.8_1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.8,
      "ZPosition": 1.1
    },
    {
      "Id": "2_0_1.8",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.8
    },
    {
      "Id": "2_1.8_1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.8,
      "ZPosition": 1.1
    },
    {
      "Id": "2_-1.8_-1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.8,
      "ZPosition": -1.1
    },
    {
      "Id": "2_0_-1.8",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.8
    },
    {
      "Id": "2_1.8_-1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.8,
      "ZPosition": -1.1
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.7_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
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
      "Id": "0_0.7_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_0.9",
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
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_-0.9",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "1_-1.1_1.1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_-1.8_1.1"
      ],
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
      "Id": "1_1.1_1.1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "2_1.8_1.1"
      ],
      "InitCards": [
        0,
        1,
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
      "Id": "1_-1.1_-1.1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_-1.8_-1.1"
      ],
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
      "Id": "1_1.1_-1.1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_1.8_-1.1"
      ],
      "InitCards": [
        0,
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
      "Id": "1_-1.8_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_1.8_0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
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
      "Id": "2_-1.8_1.1",
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
      "Id": "2_0_1.8",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "2_1.8_1.1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "2_-1.8_-1.1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "2_0_-1.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "2_1.8_-1.1",
      "TypeId": 2,
      "BoxColor": 1,
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "1_1_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 1.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_0",
      "TypeId": 1,
      "BoxColor": 0,
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
      "Id": "0_1_0",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
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
      "Id": "1_-1_1",
      "TypeId": 1,
      "BoxColor": 0,
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
      "Id": "1_1_1",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
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

export const LEVEL_MEDIUM_2_DATA: LevelData = {
  "Id": 12,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_0_1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_0_-1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_-1_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0_2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 2.0
    },
    {
      "Id": "1_0_-2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -2.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_0_-1",
      "TypeId": 1,
      "BoxColor": 1,
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
      "Id": "1_-1_0",
      "TypeId": 1,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_1_0",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
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
      "Id": "1_0_2",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
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
      "Id": "1_0_-2",
      "TypeId": 1,
      "BoxColor": 2,
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_1_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "0_1_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_-1_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_2",
      "NodeId": 3,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 2.0
    },
    {
      "Id": "2_0_-2",
      "NodeId": 3,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -2.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_1",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
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
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1_-1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1_0",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        2,
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
      "BlockedNodes": [],
      "InitCards": [
        0,
        0
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
      "Id": "2_0_-2",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [],
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

export const LEVEL_MEDIUM_4_DATA: LevelData = {
  "Id": 14,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-0.7_0",
      "NodeId": 4,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0.7_0",
      "NodeId": 4,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.7,
      "ZPosition": 0.0
    },
    {
      "Id": "0_0_0.8",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.8
    },
    {
      "Id": "0_0_-0.8",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.8
    },
    {
      "Id": "1_-1_1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "1_1_1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "1_-1_-1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_1_-1",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "2_-1.5_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "2_1.5_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_1.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.5
    },
    {
      "Id": "2_0_-1.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.5
    },
    {
      "Id": "2_0_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-0.7_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [
        "2_-1.5_0",
        "2_0_0"
      ],
      "InitCards": [
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
      "Id": "0_0.7_0",
      "TypeId": 4,
      "BoxColor": 5,
      "BlockedNodes": [
        "2_1.5_0",
        "2_0_0"
      ],
      "InitCards": [
        0,
        0,
        2,
        4
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_0.8",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_0_1.5",
        "2_0_0"
      ],
      "InitCards": [
        1,
        1,
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
      "Id": "0_0_-0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_0_-1.5",
        "2_0_0"
      ],
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
      "Id": "1_-1_1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_-1.5_0"
      ],
      "InitCards": [
        0,
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
      "Id": "1_1_1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "2_1.5_0"
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
      "Id": "1_-1_-1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "2_-1.5_0"
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
      "Id": "1_1_-1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_1.5_0"
      ],
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
      "Id": "2_-1.5_0",
      "TypeId": 2,
      "BoxColor": 2,
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
      "Id": "2_1.5_0",
      "TypeId": 2,
      "BoxColor": 4,
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
      "Id": "2_0_1.5",
      "TypeId": 2,
      "BoxColor": 0,
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
      "Id": "2_0_-1.5",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "2_0_0",
      "TypeId": 2,
      "BoxColor": 2,
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_0_0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-0.6_0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "1_0.6_0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "1_-0.6_-0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "1_0.6_-0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "2_-1.2_0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "2_1.2_0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_1.2",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.2
    },
    {
      "Id": "2_0_-1.2",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.2
    },
    {
      "Id": "3_-0.6_0",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.6_0",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_0",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
        1,
        3,
        3,
        4,
        4
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.6_0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0_0"
      ],
      "InitCards": [
        0,
        1,
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
      "Id": "1_0.6_0.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0_0"
      ],
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
      "Id": "1_-0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0_0"
      ],
      "InitCards": [
        1,
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
      "Id": "1_0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0_0"
      ],
      "InitCards": [
        0,
        0,
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
      "Id": "2_-1.2_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-0.6_0.6",
        "1_-0.6_-0.6"
      ],
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
      "Id": "2_1.2_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_0.6_0.6",
        "1_0.6_-0.6"
      ],
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
      "Id": "2_0_1.2",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-0.6_0.6",
        "1_0.6_0.6"
      ],
      "InitCards": [
        1,
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
      "Id": "2_0_-1.2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_-0.6_-0.6",
        "1_0.6_-0.6"
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
      "Id": "3_-0.6_0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0_0",
        "1_-0.6_0.6",
        "1_-0.6_-0.6",
        "2_-1.2_0"
      ],
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
      "Id": "3_0.6_0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_0_0",
        "1_0.6_0.6",
        "1_0.6_-0.6",
        "2_1.2_0"
      ],
      "InitCards": [
        0,
        2,
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

export const LEVEL_MEDIUM_6_DATA: LevelData = {
  "Id": 16,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1_1",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 45.0,
      "XPosition": -1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_1_1",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 315.0,
      "XPosition": 1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_1_-1",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 225.0,
      "XPosition": 1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 135.0,
      "XPosition": -1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_0_2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 2.0
    },
    {
      "Id": "1_2_0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 2.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0_-2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -2.0
    },
    {
      "Id": "1_-2_0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -2.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-1_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_1_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0_1",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_1_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_1_-1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_-1_-1",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_0_2",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_2_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
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
      "Id": "1_0_-2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_-2_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "2_0_0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "3_-1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-1_1",
        "0_-1_-1"
      ],
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
      "Id": "3_1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_1_1",
        "0_1_-1"
      ],
      "InitCards": [
        0,
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
      "Id": "3_0_1",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-1_1",
        "0_1_1"
      ],
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_1_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_-1_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "0_1_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_-1_0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1_0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0_1",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.0
    },
    {
      "Id": "1_0_-1",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.0
    },
    {
      "Id": "2_0_0",
      "NodeId": 2,
      "LayerId": 2,
      "YRotation": 45.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-1_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_1_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1_1",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_1_1",
      "TypeId": 1,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
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
      "BlockedNodes": [],
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
      "Id": "0_1_-1",
      "TypeId": 1,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
        2,
        2,
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
      "BlockedNodes": [],
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
      "Id": "1_1_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_0_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_0_-1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "2_0_0",
      "TypeId": 3,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_-1_0",
        "1_1_0",
        "1_0_1",
        "1_0_-1"
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
      "Id": "3_-1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-1_0",
        "2_0_0"
      ],
      "InitCards": [
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
      "Id": "3_1_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_1_0",
        "2_0_0"
      ],
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-2_1",
      "NodeId": 2,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_2_1",
      "NodeId": 2,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_-2_-1",
      "NodeId": 2,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.0,
      "ZPosition": -1.0
    },
    {
      "Id": "0_2_-1",
      "NodeId": 2,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_0_1",
      "NodeId": 2,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.0
    },
    {
      "Id": "1_0_-1",
      "NodeId": 2,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.0
    },
    {
      "Id": "2_-1_0",
      "NodeId": 5,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "2_1_0",
      "NodeId": 5,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2_1",
      "TypeId": 3,
      "BoxColor": 0,
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
      "Id": "0_2_1",
      "TypeId": 3,
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
      "Id": "0_-2_-1",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [],
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
      "Id": "0_2_-1",
      "TypeId": 3,
      "BoxColor": 3,
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
      "Id": "1_0_1",
      "TypeId": 3,
      "BoxColor": 4,
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
      "Id": "1_0_-1",
      "TypeId": 3,
      "BoxColor": 0,
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
      "Id": "2_-1_0",
      "TypeId": 6,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0_1",
        "1_0_-1"
      ],
      "InitCards": [
        0,
        0,
        0,
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
      "Id": "2_1_0",
      "TypeId": 6,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0_1",
        "1_0_-1"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        3,
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

export const LEVEL_MEDIUM_9_DATA: LevelData = {
  "Id": 19,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.2_1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "0_1.2_1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "0_-1.2_-1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": -1.2
    },
    {
      "Id": "0_1.2_-1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": -1.2
    },
    {
      "Id": "1_-1.2_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.2_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.0_1.2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.2
    },
    {
      "Id": "1_0.0_-1.2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.2
    },
    {
      "Id": "2_-0.6_0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 45.0,
      "XPosition": -0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "2_0.6_0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 315.0,
      "XPosition": 0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "2_-0.6_-0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 135.0,
      "XPosition": -0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "2_0.6_-0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 225.0,
      "XPosition": 0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "3_0.0_0.4",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.4
    },
    {
      "Id": "3_0.0_-0.4",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.4
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.2_1.2",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
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
      "Id": "0_1.2_1.2",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "0_-1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 2,
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
      "Id": "0_1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
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
      "Id": "1_-1.2_0.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_1.2_0.0",
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
      "Id": "1_0.0_1.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_0.0_-1.2",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
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
      "Id": "2_-0.6_0.6",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-1.2_1.2",
        "1_-1.2_0.0",
        "1_0.0_1.2"
      ],
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
      "Id": "2_0.6_0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_1.2_1.2",
        "1_1.2_0.0",
        "1_0.0_1.2"
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
      "Id": "2_-0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.2_-1.2",
        "1_-1.2_0.0",
        "1_0.0_-1.2"
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
      "Id": "2_0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_1.2_-1.2",
        "1_1.2_0.0",
        "1_0.0_-1.2"
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
      "Id": "3_0.0_0.4",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.0_1.2",
        "2_-0.6_0.6",
        "2_0.6_0.6"
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
      "Id": "3_0.0_-0.4",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.0_-1.2",
        "2_-0.6_-0.6",
        "2_0.6_-0.6"
      ],
      "InitCards": [
        0,
        3,
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

export const LEVEL_MEDIUM_10_DATA: LevelData = {
  "Id": 20,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-2.0_1.5",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.0,
      "ZPosition": 1.5
    },
    {
      "Id": "0_0.0_1.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.8
    },
    {
      "Id": "0_2.0_1.5",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.0,
      "ZPosition": 1.5
    },
    {
      "Id": "0_-2.2_0.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.2,
      "ZPosition": 0.0
    },
    {
      "Id": "0_2.2_0.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.2,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-2.0_-1.5",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.0,
      "ZPosition": -1.5
    },
    {
      "Id": "0_0.0_-1.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.8
    },
    {
      "Id": "0_2.0_-1.5",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.0,
      "ZPosition": -1.5
    },
    {
      "Id": "1_-1.2_1.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -1.2,
      "ZPosition": 1.0
    },
    {
      "Id": "1_1.2_1.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 1.2,
      "ZPosition": 1.0
    },
    {
      "Id": "1_-1.5_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.5_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.2_-1.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -1.2,
      "ZPosition": -1.0
    },
    {
      "Id": "1_1.2_-1.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 1.2,
      "ZPosition": -1.0
    },
    {
      "Id": "2_-0.6_0.5",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": 0.5
    },
    {
      "Id": "2_0.6_0.5",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": 0.5
    },
    {
      "Id": "2_-0.6_-0.5",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": -0.5
    },
    {
      "Id": "2_0.6_-0.5",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": -0.5
    },
    {
      "Id": "3_0.0_0.0",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-1.2_0.0_T",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "3_1.2_0.0_T",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2.0_1.5",
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
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_1.8",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "0_2.0_1.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_-2.2_0.0",
      "TypeId": 2,
      "BoxColor": 3,
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
      "Id": "0_2.2_0.0",
      "TypeId": 2,
      "BoxColor": 4,
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
      "Id": "0_-2.0_-1.5",
      "TypeId": 2,
      "BoxColor": 0,
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
      "Id": "0_0.0_-1.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_2.0_-1.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "1_-1.2_1.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-2.0_1.5"
      ],
      "InitCards": [
        1,
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
      "Id": "1_1.2_1.0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_2.0_1.5"
      ],
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
      "Id": "1_-1.5_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-2.2_0.0"
      ],
      "InitCards": [
        0,
        1,
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
      "Id": "1_1.5_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_2.2_0.0"
      ],
      "InitCards": [
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
      "Id": "1_-1.2_-1.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-2.0_-1.5"
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
      "Id": "1_1.2_-1.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_2.0_-1.5"
      ],
      "InitCards": [
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
      "Id": "2_-0.6_0.5",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_-1.2_1.0",
        "1_-1.5_0.0"
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
      "Id": "2_0.6_0.5",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_1.2_1.0",
        "1_1.5_0.0"
      ],
      "InitCards": [
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
      "Id": "2_-0.6_-0.5",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_-1.5_0.0",
        "1_-1.2_-1.0"
      ],
      "InitCards": [
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
      "Id": "2_0.6_-0.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_1.5_0.0",
        "1_1.2_-1.0"
      ],
      "InitCards": [
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
      "Id": "3_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "2_-0.6_0.5",
        "2_0.6_0.5",
        "2_-0.6_-0.5",
        "2_0.6_-0.5"
      ],
      "InitCards": [
        0,
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
      "Id": "3_-1.2_0.0_T",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-1.2_1.0",
        "1_-1.5_0.0",
        "1_-1.2_-1.0",
        "2_-0.6_0.5",
        "2_-0.6_-0.5"
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
    },
    {
      "Id": "3_1.2_0.0_T",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_1.2_1.0",
        "1_1.5_0.0",
        "1_1.2_-1.0",
        "2_0.6_0.5",
        "2_0.6_-0.5"
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

export const LEVEL_HARD_1_DATA: LevelData = {
  "Id": 21,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.2_1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "0_1.2_1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "0_-1.2_-1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": -1.2
    },
    {
      "Id": "0_1.2_-1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": -1.2
    },
    {
      "Id": "1_-0.6_0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "1_0.6_0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "1_-0.6_-0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "1_0.6_-0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "2_0_0.6",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.6
    },
    {
      "Id": "2_0_-0.6",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.6
    },
    {
      "Id": "3_-0.5_0",
      "NodeId": 0,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -0.5,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.5_0",
      "NodeId": 0,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.5,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.2_1.2",
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
      "Id": "0_1.2_1.2",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "0_-1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 2,
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
      "Id": "0_1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 4,
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
      "Id": "1_-0.6_0.6",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.2_1.2"
      ],
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
      "Id": "1_0.6_0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_1.2_1.2"
      ],
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
      "Id": "1_-0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.2_-1.2"
      ],
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
      "Id": "1_0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_1.2_-1.2"
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
      "Id": "2_0_0.6",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-0.6_0.6",
        "1_0.6_0.6"
      ],
      "InitCards": [
        0,
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
      "Id": "2_0_-0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_-0.6_-0.6",
        "1_0.6_-0.6"
      ],
      "InitCards": [
        0,
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
      "Id": "3_-0.5_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-0.6_0.6",
        "1_-0.6_-0.6",
        "2_0_0.6",
        "2_0_-0.6"
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
    },
    {
      "Id": "3_0.5_0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_0.6_0.6",
        "1_0.6_-0.6",
        "2_0_0.6",
        "2_0_-0.6"
      ],
      "InitCards": [
        0,
        1,
        1,
        1,
        1,
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

export const LEVEL_HARD_2_DATA: LevelData = {
  "Id": 22,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.2_1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "0_1.2_1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 1.2
    },
    {
      "Id": "0_1.2_-1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 180.0,
      "XPosition": 1.2,
      "ZPosition": -1.2
    },
    {
      "Id": "0_-1.2_-1.2",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 270.0,
      "XPosition": -1.2,
      "ZPosition": -1.2
    },
    {
      "Id": "1_0_1.2",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.2
    },
    {
      "Id": "1_1.2_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0_-1.2",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 180.0,
      "XPosition": 0.0,
      "ZPosition": -1.2
    },
    {
      "Id": "1_-1.2_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 270.0,
      "XPosition": -1.2,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_0",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 45.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-0.8_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.8_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0_0.8",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.8
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.2_1.2",
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
      "Id": "0_1.2_1.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.2_-1.2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
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
      "Id": "1_0_1.2",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
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
      "Id": "1_1.2_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_0_-1.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "1_-1.2_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
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
      "Id": "2_0_0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "3_-0.8_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-1.2_0",
        "2_0_0"
      ],
      "InitCards": [
        0,
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
      "Id": "3_0.8_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_1.2_0",
        "2_0_0"
      ],
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
      "Id": "3_0_0.8",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0_1.2",
        "2_0_0"
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.5_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": 1.0
    },
    {
      "Id": "0_-1.5_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": -1.0
    },
    {
      "Id": "1_-1.5_0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": 0.5
    },
    {
      "Id": "1_-1.5_-0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": -0.5
    },
    {
      "Id": "2_-1.5_0",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-1.5_0",
      "NodeId": 0,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.5_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": 1.0
    },
    {
      "Id": "0_1.5_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": -1.0
    },
    {
      "Id": "1_1.5_0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": 0.5
    },
    {
      "Id": "1_1.5_-0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": -0.5
    },
    {
      "Id": "2_1.5_0",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "3_1.5_0",
      "NodeId": 0,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 1.5,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.5_1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        1,
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
      "Id": "0_-1.5_-1",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "1_-1.5_0.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.5_1"
      ],
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
      "Id": "1_-1.5_-0.5",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_-1.5_-1"
      ],
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
      "Id": "2_-1.5_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.5_1",
        "0_-1.5_-1",
        "1_-1.5_0.5",
        "1_-1.5_-0.5"
      ],
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
      "Id": "3_-1.5_0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_-1.5_0.5",
        "1_-1.5_-0.5",
        "2_-1.5_0"
      ],
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
      "Id": "0_1.5_1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_1.5_-1",
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
      "Id": "1_1.5_0.5",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.5_1"
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
      "Id": "1_1.5_-0.5",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_1.5_-1"
      ],
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
      "Id": "2_1.5_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_1.5_1",
        "0_1.5_-1",
        "1_1.5_0.5",
        "1_1.5_-0.5"
      ],
      "InitCards": [
        0,
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
      "Id": "3_1.5_0",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_1.5_0.5",
        "1_1.5_-0.5",
        "2_1.5_0"
      ],
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.6_0.9",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 30.0,
      "XPosition": -1.6,
      "ZPosition": 0.9
    },
    {
      "Id": "0_0.0_1.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.8
    },
    {
      "Id": "0_1.6_0.9",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 330.0,
      "XPosition": 1.6,
      "ZPosition": 0.9
    },
    {
      "Id": "0_-1.6_-0.9",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 150.0,
      "XPosition": -1.6,
      "ZPosition": -0.9
    },
    {
      "Id": "0_0.0_-1.8",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.8
    },
    {
      "Id": "0_1.6_-0.9",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 210.0,
      "XPosition": 1.6,
      "ZPosition": -0.9
    },
    {
      "Id": "1_-0.8_0.8",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -0.8,
      "ZPosition": 0.8
    },
    {
      "Id": "1_0.8_0.8",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 0.8,
      "ZPosition": 0.8
    },
    {
      "Id": "1_-0.8_-0.8",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -0.8,
      "ZPosition": -0.8
    },
    {
      "Id": "1_0.8_-0.8",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 0.8,
      "ZPosition": -0.8
    },
    {
      "Id": "2_-0.6_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.6_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.0_0.7",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.7
    },
    {
      "Id": "3_0.0_-0.7",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.7
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.6_0.9",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
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
      "Id": "0_0.0_1.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
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
      "Id": "0_1.6_0.9",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
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
      "Id": "0_-1.6_-0.9",
      "TypeId": 2,
      "BoxColor": 3,
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
      "Id": "0_0.0_-1.8",
      "TypeId": 2,
      "BoxColor": 4,
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
      "Id": "0_1.6_-0.9",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "1_-0.8_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.6_0.9"
      ],
      "InitCards": [
        1,
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
      "Id": "1_0.8_0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_1.6_0.9"
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
      "Id": "1_-0.8_-0.8",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-1.6_-0.9"
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
      "Id": "1_0.8_-0.8",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_1.6_-0.9"
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
      "Id": "2_-0.6_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-0.8_0.8",
        "1_-0.8_-0.8"
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
      "Id": "2_0.6_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_0.8_0.8",
        "1_0.8_-0.8"
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
      "Id": "2_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-0.8_0.8",
        "1_0.8_0.8",
        "1_-0.8_-0.8",
        "1_0.8_-0.8"
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
      "Id": "3_0.0_0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-0.8_0.8",
        "1_0.8_0.8",
        "2_-0.6_0.0",
        "2_0.6_0.0",
        "2_0.0_0.0"
      ],
      "InitCards": [
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
      "Id": "3_0.0_-0.7",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-0.8_-0.8",
        "1_0.8_-0.8",
        "2_-0.6_0.0",
        "2_0.6_0.0",
        "2_0.0_0.0"
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

export const LEVEL_HARD_5_DATA: LevelData = {
  "Id": 25,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_0_1.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.5
    },
    {
      "Id": "0_1.1_1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 45.0,
      "XPosition": 1.1,
      "ZPosition": 1.1
    },
    {
      "Id": "0_1.5_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "0_1.1_-1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 135.0,
      "XPosition": 1.1,
      "ZPosition": -1.1
    },
    {
      "Id": "0_0_-1.5",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 180.0,
      "XPosition": 0.0,
      "ZPosition": -1.5
    },
    {
      "Id": "0_-1.1_-1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 225.0,
      "XPosition": -1.1,
      "ZPosition": -1.1
    },
    {
      "Id": "0_-1.5_0",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 270.0,
      "XPosition": -1.5,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-1.1_1.1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 315.0,
      "XPosition": -1.1,
      "ZPosition": 1.1
    },
    {
      "Id": "1_-0.6_0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "1_0.6_0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 0.6,
      "ZPosition": 0.6
    },
    {
      "Id": "1_-0.6_-0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "1_0.6_-0.6",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 0.6,
      "ZPosition": -0.6
    },
    {
      "Id": "2_-0.5_0",
      "NodeId": 4,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.5,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.5_0",
      "NodeId": 4,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.5,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_0_1.5",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        4,
        6,
        9,
        9
      ],
      "IsHidden": true,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.1_1.1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
        4,
        4,
        6,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.5_0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_1.1_-1.1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        0,
        4,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_-1.5",
      "TypeId": 2,
      "BoxColor": 6,
      "BlockedNodes": [],
      "InitCards": [
        1,
        4,
        6,
        9,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.1_-1.1",
      "TypeId": 2,
      "BoxColor": 9,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        2,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.5_0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        2,
        2,
        4,
        6,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.1_1.1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        2,
        4,
        4,
        6,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.6_0.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0_1.5",
        "0_-1.5_0",
        "0_-1.1_1.1"
      ],
      "InitCards": [
        0,
        2,
        6,
        9,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.6_0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0_1.5",
        "0_1.1_1.1",
        "0_1.5_0"
      ],
      "InitCards": [
        0,
        2,
        2,
        4,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 6,
      "BlockedNodes": [
        "0_0_-1.5",
        "0_-1.1_-1.1",
        "0_-1.5_0"
      ],
      "InitCards": [
        1,
        1,
        1,
        2,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.6_-0.6",
      "TypeId": 2,
      "BoxColor": 9,
      "BlockedNodes": [
        "0_1.5_0",
        "0_1.1_-1.1",
        "0_0_-1.5"
      ],
      "InitCards": [
        1,
        6,
        6,
        6,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-0.5_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-0.6_0.6",
        "1_-0.6_-0.6"
      ],
      "InitCards": [
        0,
        0,
        2,
        2,
        4,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0.5_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.6_0.6",
        "1_0.6_-0.6"
      ],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
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

export const LEVEL_HARD_6_DATA: LevelData = {
  "Id": 26,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.5_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": 1.0
    },
    {
      "Id": "0_0_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_1.5_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": 1.0
    },
    {
      "Id": "0_-1.5_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.5,
      "ZPosition": -1.0
    },
    {
      "Id": "0_0_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -1.0
    },
    {
      "Id": "0_1.5_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.5,
      "ZPosition": -1.0
    },
    {
      "Id": "1_-0.8_0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": 0.5
    },
    {
      "Id": "1_0.8_0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": 0.5
    },
    {
      "Id": "1_-0.8_-0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -0.8,
      "ZPosition": -0.5
    },
    {
      "Id": "1_0.8_-0.5",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 0.8,
      "ZPosition": -0.5
    },
    {
      "Id": "2_0_0",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-0.6_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.6_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.5_1",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        1,
        1,
        1,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_1",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        4,
        6,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.5_1",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        4,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.5_-1",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [],
      "InitCards": [
        0,
        0,
        2,
        2,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0_-1",
      "TypeId": 2,
      "BoxColor": 6,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        4,
        4,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.5_-1",
      "TypeId": 2,
      "BoxColor": 9,
      "BlockedNodes": [],
      "InitCards": [
        0,
        6,
        6,
        6,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-0.8_0.5",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_-1.5_1",
        "0_0_1"
      ],
      "InitCards": [
        4,
        6,
        6,
        9,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_0.5",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_0_1",
        "0_1.5_1"
      ],
      "InitCards": [
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
      "Id": "1_-0.8_-0.5",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-1.5_-1",
        "0_0_-1"
      ],
      "InitCards": [
        0,
        1,
        6,
        6,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "1_0.8_-0.5",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0_-1",
        "0_1.5_-1"
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
      "Id": "2_0_0",
      "TypeId": 3,
      "BoxColor": 6,
      "BlockedNodes": [
        "0_0_1",
        "0_0_-1",
        "1_-0.8_0.5",
        "1_0.8_0.5",
        "1_-0.8_-0.5",
        "1_0.8_-0.5"
      ],
      "InitCards": [
        2,
        2,
        2,
        2,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_-0.6_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-0.8_0.5",
        "1_-0.8_-0.5",
        "2_0_0"
      ],
      "InitCards": [
        1,
        1,
        2,
        2,
        4,
        9
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "3_0.6_0",
      "TypeId": 5,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.8_0.5",
        "1_0.8_-0.5",
        "2_0_0"
      ],
      "InitCards": [
        1,
        2,
        2,
        4,
        4,
        6
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-2.0_1.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_-2.0_-1.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.0,
      "ZPosition": -1.0
    },
    {
      "Id": "0_0.0_1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.2
    },
    {
      "Id": "0_0.0_-1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.2
    },
    {
      "Id": "0_2.0_1.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.0,
      "ZPosition": 1.0
    },
    {
      "Id": "0_2.0_-1.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.0,
      "ZPosition": -1.0
    },
    {
      "Id": "1_-1.2_0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -1.2,
      "ZPosition": 0.6
    },
    {
      "Id": "1_-1.2_-0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -1.2,
      "ZPosition": -0.6
    },
    {
      "Id": "1_1.2_0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 1.2,
      "ZPosition": 0.6
    },
    {
      "Id": "1_1.2_-0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 1.2,
      "ZPosition": -0.6
    },
    {
      "Id": "2_-0.6_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.6_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.6
    },
    {
      "Id": "2_0.0_-0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.6
    },
    {
      "Id": "3_-1.4_0.0",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -1.4,
      "ZPosition": 0.0
    },
    {
      "Id": "3_1.4_0.0",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 1.4,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2.0_1.0",
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
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2.0_-1.0",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "0_0.0_1.2",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_0.0_-1.2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        1,
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
      "Id": "0_2.0_1.0",
      "TypeId": 2,
      "BoxColor": 4,
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
      "Id": "0_2.0_-1.0",
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
      "Id": "1_-1.2_0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-2.0_1.0"
      ],
      "InitCards": [
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
      "Id": "1_-1.2_-0.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_-2.0_-1.0"
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
      "Id": "1_1.2_0.6",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_2.0_1.0"
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
      "Id": "1_1.2_-0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_2.0_-1.0"
      ],
      "InitCards": [
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
      "Id": "2_-0.6_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1.2_0.6",
        "1_-1.2_-0.6"
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
      "Id": "2_0.6_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_1.2_0.6",
        "1_1.2_-0.6"
      ],
      "InitCards": [
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
      "Id": "2_0.0_0.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_0.0_1.2"
      ],
      "InitCards": [
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
      "Id": "2_0.0_-0.6",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_0.0_-1.2"
      ],
      "InitCards": [
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
      "Id": "3_-1.4_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-1.2_0.6",
        "1_-1.2_-0.6",
        "2_-0.6_0.0"
      ],
      "InitCards": [
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
      "Id": "3_1.4_0.0",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_1.2_0.6",
        "1_1.2_-0.6",
        "2_0.6_0.0"
      ],
      "InitCards": [
        1,
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

export const LEVEL_HARD_8_DATA: LevelData = {
  "Id": 28,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.2_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": 1.0
    },
    {
      "Id": "0_1.2_1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": 1.0
    },
    {
      "Id": "0_-1.2_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.2,
      "ZPosition": -1.0
    },
    {
      "Id": "0_1.2_-1",
      "NodeId": 0,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.2,
      "ZPosition": -1.0
    },
    {
      "Id": "1_-0.6_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "1_0.6_0",
      "NodeId": 0,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0_0.8",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.8
    },
    {
      "Id": "2_0_-0.8",
      "NodeId": 0,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.8
    },
    {
      "Id": "3_-1_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": -1.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_1_0",
      "NodeId": 4,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 1.0,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.2_1",
      "TypeId": 3,
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
      "Id": "0_1.2_1",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        0,
        1,
        1,
        1,
        2,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-1.2_-1",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_1.2_-1",
      "TypeId": 3,
      "BoxColor": 4,
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
      "Id": "1_-0.6_0",
      "TypeId": 3,
      "BoxColor": 6,
      "BlockedNodes": [
        "0_-1.2_1",
        "0_-1.2_-1"
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
      "Id": "1_0.6_0",
      "TypeId": 3,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_1.2_1",
        "0_1.2_-1"
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
      "Id": "2_0_0.8",
      "TypeId": 3,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_-0.6_0",
        "1_0.6_0"
      ],
      "InitCards": [
        0,
        1,
        4,
        6,
        6,
        6
      ],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "2_0_-0.8",
      "TypeId": 3,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-0.6_0",
        "1_0.6_0"
      ],
      "InitCards": [
        2,
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
      "Id": "3_-1_0",
      "TypeId": 6,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_-1.2_1",
        "0_-1.2_-1",
        "1_-0.6_0"
      ],
      "InitCards": [
        0,
        0,
        0,
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
      "Id": "3_1_0",
      "TypeId": 6,
      "BoxColor": 5,
      "BlockedNodes": [
        "0_1.2_1",
        "0_1.2_-1",
        "1_0.6_0"
      ],
      "InitCards": [
        1,
        2,
        2,
        4,
        6,
        6,
        6,
        6
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
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.8_1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.8,
      "ZPosition": 1.2
    },
    {
      "Id": "0_1.8_1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.8,
      "ZPosition": 1.2
    },
    {
      "Id": "0_-1.8_-1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.8,
      "ZPosition": -1.2
    },
    {
      "Id": "0_1.8_-1.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 1.8,
      "ZPosition": -1.2
    },
    {
      "Id": "0_0.0_1.5",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.5
    },
    {
      "Id": "0_0.0_-1.5",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.5
    },
    {
      "Id": "1_-1.0_0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -1.0,
      "ZPosition": 0.6
    },
    {
      "Id": "1_1.0_0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 1.0,
      "ZPosition": 0.6
    },
    {
      "Id": "1_-1.0_-0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -1.0,
      "ZPosition": -0.6
    },
    {
      "Id": "1_1.0_-0.6",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 1.0,
      "ZPosition": -0.6
    },
    {
      "Id": "2_-0.6_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.6_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "2_0.0_0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 0.6
    },
    {
      "Id": "2_0.0_-0.6",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -0.6
    },
    {
      "Id": "3_-0.6_0.0_T",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.6_0.0_T",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.8_1.2",
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
      "IsHidden": false,
      "LockedTurn": 3,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.8_1.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
        1,
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
      "Id": "0_-1.8_-1.2",
      "TypeId": 2,
      "BoxColor": 2,
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
      "LockedTurn": 4,
      "IsCardsHidden": false
    },
    {
      "Id": "0_1.8_-1.2",
      "TypeId": 2,
      "BoxColor": 3,
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
      "Id": "0_0.0_1.5",
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
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "0_0.0_-1.5",
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
      "Id": "1_-1.0_0.6",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-1.8_1.2"
      ],
      "InitCards": [
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
      "Id": "1_1.0_0.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_1.8_1.2"
      ],
      "InitCards": [
        0,
        0,
        2,
        3,
        3
      ],
      "IsHidden": false,
      "LockedTurn": 2,
      "IsCardsHidden": false
    },
    {
      "Id": "1_-1.0_-0.6",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-1.8_-1.2"
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
      "Id": "1_1.0_-0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_1.8_-1.2"
      ],
      "InitCards": [
        1,
        2,
        2,
        2,
        2
      ],
      "IsHidden": false,
      "LockedTurn": 3,
      "IsCardsHidden": false
    },
    {
      "Id": "2_-0.6_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "1_-1.0_0.6",
        "1_-1.0_-0.6"
      ],
      "InitCards": [
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
      "Id": "2_0.6_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_1.0_0.6",
        "1_1.0_-0.6"
      ],
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
      "Id": "2_0.0_0.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_-1.0_0.6",
        "1_1.0_0.6"
      ],
      "InitCards": [
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
      "Id": "2_0.0_-0.6",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_-1.0_-0.6",
        "1_1.0_-0.6"
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
      "Id": "3_-0.6_0.0_T",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_-1.0_0.6",
        "1_-1.0_-0.6",
        "2_-0.6_0.0",
        "2_0.0_0.6",
        "2_0.0_-0.6"
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
      "Id": "3_0.6_0.0_T",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_1.0_0.6",
        "1_1.0_-0.6",
        "2_0.6_0.0",
        "2_0.0_0.6",
        "2_0.0_-0.6"
      ],
      "InitCards": [
        1,
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

export const LEVEL_HARD_10_DATA: LevelData = {
  "Id": 30,
  "MaxCardsOnBelt": 0,
  "BoardNodes": [
    {
      "Id": "0_-2.4_1.6",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.4,
      "ZPosition": 1.6
    },
    {
      "Id": "0_0.0_2.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 2.2
    },
    {
      "Id": "0_2.4_1.6",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.4,
      "ZPosition": 1.6
    },
    {
      "Id": "0_-2.6_0.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.6,
      "ZPosition": 0.0
    },
    {
      "Id": "0_2.6_0.0",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.6,
      "ZPosition": 0.0
    },
    {
      "Id": "0_-2.4_-1.6",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -2.4,
      "ZPosition": -1.6
    },
    {
      "Id": "0_0.0_-2.2",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -2.2
    },
    {
      "Id": "0_2.4_-1.6",
      "NodeId": 1,
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": 2.4,
      "ZPosition": -1.6
    },
    {
      "Id": "1_-1.6_1.2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 45.0,
      "XPosition": -1.6,
      "ZPosition": 1.2
    },
    {
      "Id": "1_0.0_1.5",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": 1.5
    },
    {
      "Id": "1_1.6_1.2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 315.0,
      "XPosition": 1.6,
      "ZPosition": 1.2
    },
    {
      "Id": "1_-1.8_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": -1.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_1.8_0.0",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 0.0,
      "XPosition": 1.8,
      "ZPosition": 0.0
    },
    {
      "Id": "1_-1.6_-1.2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 135.0,
      "XPosition": -1.6,
      "ZPosition": -1.2
    },
    {
      "Id": "1_0.0_-1.5",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 90.0,
      "XPosition": 0.0,
      "ZPosition": -1.5
    },
    {
      "Id": "1_1.6_-1.2",
      "NodeId": 1,
      "LayerId": 1,
      "YRotation": 225.0,
      "XPosition": 1.6,
      "ZPosition": -1.2
    },
    {
      "Id": "2_-0.8_0.8",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 45.0,
      "XPosition": -0.8,
      "ZPosition": 0.8
    },
    {
      "Id": "2_0.8_0.8",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 315.0,
      "XPosition": 0.8,
      "ZPosition": 0.8
    },
    {
      "Id": "2_-0.8_-0.8",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 135.0,
      "XPosition": -0.8,
      "ZPosition": -0.8
    },
    {
      "Id": "2_0.8_-0.8",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 225.0,
      "XPosition": 0.8,
      "ZPosition": -0.8
    },
    {
      "Id": "2_0.0_0.0",
      "NodeId": 1,
      "LayerId": 2,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.0
    },
    {
      "Id": "3_-0.6_0.0",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": -0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.6_0.0",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 90.0,
      "XPosition": 0.6,
      "ZPosition": 0.0
    },
    {
      "Id": "3_0.0_0.6",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": 0.6
    },
    {
      "Id": "3_0.0_-0.6",
      "NodeId": 1,
      "LayerId": 3,
      "YRotation": 0.0,
      "XPosition": 0.0,
      "ZPosition": -0.6
    },
    {
      "Id": "4_-0.7_0.7_T",
      "NodeId": 1,
      "LayerId": 4,
      "YRotation": 45.0,
      "XPosition": -0.7,
      "ZPosition": 0.7
    },
    {
      "Id": "4_0.7_-0.7_T",
      "NodeId": 1,
      "LayerId": 4,
      "YRotation": 45.0,
      "XPosition": 0.7,
      "ZPosition": -0.7
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2.4_1.6",
      "TypeId": 2,
      "BoxColor": 0,
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
      "Id": "0_0.0_2.2",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [],
      "InitCards": [
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
      "Id": "0_2.4_1.6",
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
      "LockedTurn": 0,
      "IsCardsHidden": false
    },
    {
      "Id": "0_-2.6_0.0",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_2.6_0.0",
      "TypeId": 2,
      "BoxColor": 4,
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
      "Id": "0_-2.4_-1.6",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "0_0.0_-2.2",
      "TypeId": 2,
      "BoxColor": 1,
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
      "Id": "0_2.4_-1.6",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [],
      "InitCards": [
        0,
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
      "Id": "1_-1.6_1.2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-2.4_1.6"
      ],
      "InitCards": [
        0,
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
      "Id": "1_0.0_1.5",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.0_2.2"
      ],
      "InitCards": [
        0,
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
      "Id": "1_1.6_1.2",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_2.4_1.6"
      ],
      "InitCards": [
        1,
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
      "Id": "1_-1.8_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "0_-2.6_0.0"
      ],
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
      "Id": "1_1.8_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "0_2.6_0.0"
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
      "Id": "1_-1.6_-1.2",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "0_-2.4_-1.6"
      ],
      "InitCards": [
        2,
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
      "Id": "1_0.0_-1.5",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "0_0.0_-2.2"
      ],
      "InitCards": [
        0,
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
      "Id": "1_1.6_-1.2",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [
        "0_2.4_-1.6"
      ],
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
      "Id": "2_-0.8_0.8",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "1_-1.6_1.2",
        "1_0.0_1.5"
      ],
      "InitCards": [
        1,
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
      "Id": "2_0.8_0.8",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "1_0.0_1.5",
        "1_1.6_1.2"
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
      "Id": "2_-0.8_-0.8",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_-1.6_-1.2",
        "1_0.0_-1.5"
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
      "Id": "2_0.8_-0.8",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_0.0_-1.5",
        "1_1.6_-1.2"
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
      "Id": "2_0.0_0.0",
      "TypeId": 2,
      "BoxColor": 0,
      "BlockedNodes": [],
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
      "Id": "3_-0.6_0.0",
      "TypeId": 2,
      "BoxColor": 1,
      "BlockedNodes": [
        "2_-0.8_0.8",
        "2_-0.8_-0.8",
        "2_0.0_0.0"
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
      "Id": "3_0.6_0.0",
      "TypeId": 2,
      "BoxColor": 2,
      "BlockedNodes": [
        "2_0.8_0.8",
        "2_0.8_-0.8",
        "2_0.0_0.0"
      ],
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
      "Id": "3_0.0_0.6",
      "TypeId": 2,
      "BoxColor": 3,
      "BlockedNodes": [
        "1_0.0_1.5",
        "2_-0.8_0.8",
        "2_0.8_0.8",
        "2_0.0_0.0"
      ],
      "InitCards": [
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
      "Id": "3_0.0_-0.6",
      "TypeId": 2,
      "BoxColor": 4,
      "BlockedNodes": [
        "1_0.0_-1.5",
        "2_-0.8_-0.8",
        "2_0.8_-0.8",
        "2_0.0_0.0"
      ],
      "InitCards": [
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
      "Id": "4_-0.7_0.7_T",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.0_1.5",
        "2_-0.8_0.8",
        "2_0.0_0.0",
        "3_-0.6_0.0",
        "3_0.0_0.6"
      ],
      "InitCards": [
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
      "Id": "4_0.7_-0.7_T",
      "TypeId": 1,
      "BoxColor": 5,
      "BlockedNodes": [
        "1_0.0_-1.5",
        "2_0.8_-0.8",
        "2_0.0_0.0",
        "3_0.6_0.0",
        "3_0.0_-0.6"
      ],
      "InitCards": [
        1,
        2,
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
    description: "Two 2-tier pillars teaching basic vertical overlap with 6 boxes",
    data: LEVEL_EASY_1_DATA
  },
  {
    id: "easy_2",
    name: "Easy 2: The Cross",
    difficulty: "easy",
    description: "A symmetric plus-sign locked by dual bridge boxes",
    data: LEVEL_EASY_2_DATA
  },
  {
    id: "easy_3",
    name: "Easy 3: Trio Steps",
    difficulty: "easy",
    description: "3-tier stepped pyramid with 7 six-slot boxes and 3 colors",
    data: LEVEL_EASY_3_DATA
  },
  {
    id: "easy_4",
    name: "Easy 4: Feeder Intro",
    difficulty: "easy",
    description: "Top Feeder Tray loaded with cards to supply 5 colored boxes below",
    data: LEVEL_EASY_4_DATA
  },
  {
    id: "easy_5",
    name: "Easy 5: Diamond Gate",
    difficulty: "easy",
    description: "Diamond formation with central support pillars across 3 colors",
    data: LEVEL_EASY_5_DATA
  },
  {
    id: "easy_6",
    name: "Easy 6: Six-Pack Grid",
    difficulty: "easy",
    description: "8 six-slot boxes in an interlocking 2-layer matrix",
    data: LEVEL_EASY_6_DATA
  },
  {
    id: "easy_7",
    name: "Easy 7: Twin Feeder Trays",
    difficulty: "easy",
    description: "Two top feeder trays supplying spare cards to 6 colored boxes below",
    data: LEVEL_EASY_7_DATA
  },
  {
    id: "easy_8",
    name: "Easy 8: Castle Battlement",
    difficulty: "easy",
    description: "3-tier castle battlement layout with 3 colors and a crown tray loaded with cards",
    data: LEVEL_EASY_8_DATA
  },
  {
    id: "easy_9",
    name: "Easy 9: Twin Fortress",
    difficulty: "easy",
    description: "Dual tower ramparts connected by a central bridge with feeder tray support. Zero spawners.",
    data: LEVEL_EASY_9_DATA
  },
  {
    id: "easy_10",
    name: "Easy 10: Grand Cascade",
    difficulty: "easy",
    description: "16 boxes across 3 layers with 4 colors and dual feeder trays testing conveyor mastery",
    data: LEVEL_EASY_10_DATA
  },
  {
    id: "medium_1",
    name: "Medium 1: Level 1 (Tutorial - Warmup)",
    difficulty: "medium",
    description: "Simple 4-box introductory level with Red and Blue sorting",
    data: LEVEL_MEDIUM_1_DATA
  },
  {
    id: "medium_2",
    name: "Medium 2: Level 2 (Cross Block)",
    difficulty: "medium",
    description: "6 boxes across 2 layers with spatial overlap blocking",
    data: LEVEL_MEDIUM_2_DATA
  },
  {
    id: "medium_3",
    name: "Medium 3: Level 3 (Tray Delivery)",
    difficulty: "medium",
    description: "Introduction to Neutral Trays providing card feeds for sorting",
    data: LEVEL_MEDIUM_3_DATA
  },
  {
    id: "medium_4",
    name: "Medium 4: Classic Conveyor",
    difficulty: "medium",
    description: "13 boxes across 3 layers with standard 4-color sorting and 2 top feeder trays",
    data: LEVEL_MEDIUM_4_DATA
  },
  {
    id: "medium_5",
    name: "Medium 5: Level 5 (Pyramid Multi-Tier)",
    difficulty: "medium",
    description: "11 boxes arranged in a 4-layer stepped pyramid with 4 colors",
    data: LEVEL_MEDIUM_5_DATA
  },
  {
    id: "medium_6",
    name: "Medium 6: Level 6 (Spiral Shuffle)",
    difficulty: "medium",
    description: "12 boxes in a rotating pinwheel formation with 5 colors",
    data: LEVEL_MEDIUM_6_DATA
  },
  {
    id: "medium_7",
    name: "Medium 7: Level 7 (Turn Locks Challenge)",
    difficulty: "medium",
    description: "Turn-locked boxes requiring strategic sequencing",
    data: LEVEL_MEDIUM_7_DATA
  },
  {
    id: "medium_8",
    name: "Medium 8: Level 8 (8-Slot Factory)",
    difficulty: "medium",
    description: "High-capacity 8-slot boxes and extra-wide delivery trays",
    data: LEVEL_MEDIUM_8_DATA
  },
  {
    id: "medium_9",
    name: "Medium 9: Double Cross Citadel",
    difficulty: "medium",
    description: "Concentric multi-layer fortress with four interlocking bastions and dual feeder tray support. 0 spawners.",
    data: LEVEL_MEDIUM_9_DATA
  },
  {
    id: "medium_10",
    name: "Medium 10: Grand Colosseum Finale",
    difficulty: "medium",
    description: "Grand 21-box amphitheater with concentric tiered seating surrounding a central apex platform. 0 spawners.",
    data: LEVEL_MEDIUM_10_DATA
  },
  {
    id: "hard_1",
    name: "Hard 1: Fortress Quad",
    difficulty: "hard",
    description: "4-tier fortress layout with interlocking corner bastions",
    data: LEVEL_HARD_1_DATA
  },
  {
    id: "hard_2",
    name: "Hard 2: Pinwheel Vortex",
    difficulty: "hard",
    description: "5-color spiral formation with 3 feeder trays guarding the perimeter",
    data: LEVEL_HARD_2_DATA
  },
  {
    id: "hard_3",
    name: "Hard 3: Double Obelisk",
    difficulty: "hard",
    description: "Twin 3-tier towers requiring balanced simultaneous unpacking",
    data: LEVEL_HARD_3_DATA
  },
  {
    id: "hard_4",
    name: "Hard 4: Hex Core Monolith",
    difficulty: "hard",
    description: "Concentric hexagonal fortress surrounding a central pillar with dual upper-tier feeder trays. 0 spawners.",
    data: LEVEL_HARD_4_DATA
  },
  {
    id: "hard_5",
    name: "Hard 5: Octagon Matrix",
    difficulty: "hard",
    description: "8-sided perimeter with 6 vibrant colors and 2 central feeder trays",
    data: LEVEL_HARD_5_DATA
  },
  {
    id: "hard_6",
    name: "Hard 6: Hexa-Color Citadel",
    difficulty: "hard",
    description: "Stepped citadel requiring mastery over 6 colors with 2 feeder trays",
    data: LEVEL_HARD_6_DATA
  },
  {
    id: "hard_7",
    name: "Hard 7: Dual Ziggurat Labyrinth",
    difficulty: "hard",
    description: "Twin 4-tier step-pyramids bridged by central cross struts with dual crown trays. 0 spawners.",
    data: LEVEL_HARD_7_DATA
  },
  {
    id: "hard_8",
    name: "Hard 8: Ten-Slot Megaboxes",
    difficulty: "hard",
    description: "High-capacity 8-slot and 10-slot boxes requiring high conveyor throughput",
    data: LEVEL_HARD_8_DATA
  },
  {
    id: "hard_9",
    name: "Hard 9: Turnlock Gauntlet Fortress",
    difficulty: "hard",
    description: "Four-tier fortified complex guarded by turn-locked outer gates. 0 spawners.",
    data: LEVEL_HARD_9_DATA
  },
  {
    id: "hard_10",
    name: "Hard 10: Cosmic Crucible Grand Master",
    difficulty: "hard",
    description: "The ultimate 27-box, 5-tier master challenge. Dense nested geometry requiring master-class route planning. 0 spawners.",
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
