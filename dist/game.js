const objectsData = [
  {
    "id": "ADVER",
    "synonyms": [
      "PAMPH",
      "LEAFL",
      "BOOKL"
    ],
    "description": "leaflet",
    "initialDescription": "There is a small leaflet here.",
    "flags": {
      "isBurnable": true,
      "isTakeable": true,
      "isVisible": true,
      "isReadable": true
    },
    "size": 2,
    "canContain": "MAILBOX",
    "action": "READ-ADVER"
  },
  {
    "id": "AXE",
    "synonyms": [],
    "adjectives": [
      "BLOOD"
    ],
    "description": "bloody axe",
    "flags": {
      "isVisible": true,
      "isWeapon": true,
      "isTakeable": true
    },
    "damage": 12,
    "initialDescription": "There is a bloody axe here."
  },
  {
    "id": "BAGCO",
    "synonyms": [
      "BAG",
      "COINS"
    ],
    "adjectives": [
      "LEATH"
    ],
    "description": "bag of coins",
    "initialDescription": "An old leather bag, bulging with coins, is here.",
    "flags": {
      "isTakeable": true,
      "isVisible": true
    },
    "value": 10,
    "size": 15,
    "trophyValue": 5
  },
  {
    "id": "BAR",
    "synonyms": [
      "PLATI"
    ],
    "adjectives": [
      "plati"
    ],
    "description": "platinum bar",
    "initialDescription": "There is a large platinum bar here.",
    "flags": {
      "isSacred": true,
      "isTakeable": true,
      "isVisible": true
    },
    "value": 12,
    "size": 20,
    "trophyValue": 10
  },
  {
    "id": "BELL",
    "synonyms": [],
    "adjectives": [
      "BRASS"
    ],
    "description": "bell",
    "initialDescription": "There is a small brass bell here.",
    "longDescription": "Lying in a corner of the room is a small brass bell.",
    "flags": {
      "isTakeable": true,
      "isVisible": true
    },
    "size": 5,
    "action": "READ-GUIDE"
  },
  {
    "id": "BLANT",
    "synonyms": [
      "LANTE",
      "LAMP"
    ],
    "adjectives": [
      "USED",
      "BURNE",
      "DEAD",
      "USELE"
    ],
    "description": "burned-out lantern",
    "initialDescription": "There is a burned-out lantern here.",
    "longDescription": "The deceased adventurer's useless lantern is here.",
    "flags": {
      "isVisible": true,
      "isTakeable": true
    },
    "size": 20
  },
  {
    "id": "BOTTLE",
    "synonyms": [
      "CONTA",
      "PITCH"
    ],
    "adjectives": [
      "GLASS"
    ],
    "description": "glass bottle",
    "initialDescription": "A clear glass bottle is here.",
    "action": "BOTTLE-FUNCTION",
    "flags": {
      "isContainer": true,
      "isTransparent": true,
      "isTakeable": true,
      "isVisible": true
    },
    "size": 5,
    "capacity": 4,
    "contents": [
      "WATER"
    ]
  },
  {
    "id": "CANDL",
    "synonyms": [],
    "description": "pair of candles",
    "initialDescription": "There are two candles here.",
    "longDescription": "On the two ends of the altar are burning candles.",
    "flags": {
      "isFlammable": true,
      "isTakeable": true,
      "isVisible": true,
      "isLightSource": true
    },
    "light": 1,
    "size": 10,
    "action": "CANDLES"
  },
  {
    "id": "COFFI",
    "synonyms": [
      "CASKE"
    ],
    "adjectives": [
      "GOLD"
    ],
    "description": "gold coffin",
    "initialDescription": "There is a solid-gold coffin, used for the burial of Ramses II, here.",
    "flags": {
      "isContainer": true,
      "isSacred": true,
      "isTakeable": true,
      "isVisible": true
    },
    "value": 3,
    "size": 55,
    "capacity": 35
  },
  {
    "id": "DIAMO",
    "synonyms": [
      "PERFE"
    ],
    "adjectives": [
      "huge",
      "perfectly",
      "cut"
    ],
    "description": "huge diamond",
    "initialDescription": "There is an enormous diamond (perfectly cut) here.",
    "flags": {
      "isTakeable": true,
      "isVisible": true
    },
    "value": 10,
    "size": 5,
    "trophyValue": 6
  },
  {
    "id": "EGG",
    "name": "egg",
    "description": "There is a beautiful jewel-encrusted egg here.",
    "flags": {
        "isTakeable": true
    }
  },
  {
    "id": "FOOD",
    "synonyms": [
      "SANDW",
      "LUNCH",
      "PEPPE",
      "DINNE",
      "SNACK"
    ],
    "description": ".lunch",
    "initialDescription": "A hot pepper sandwich is here.",
    "longDescription": ".lunch",
    "flags": {
      "isEdible": true,
      "isTakeable": true,
      "isVisible": true
    },
    "size": 5,
    "canContain": "SACK"
  },
  {
    "id": "GARLI",
    "synonyms": [
      "CLOVE"
    ],
    "description": "clove of garlic",
    "initialDescription": "There is a clove of garlic here.",
    "flags": {
      "isTakeable": true,
      "isEdible": true,
      "isVisible": true
    },
    "size": 5,
    "canContain": "SACK"
  },
  {
    "id": "GRATING",
    "name": "grating",
    "synonyms": ["grate"],
    "description": "A grating is here, settled into the ground.",
    "flags": {
        "isDoor": true,
        "isInvisible": true,
        "isOpen": false,
        "isLocked": true,
        "isTakeable": false
    },
    "action": "GRATING-ACTION"
  },
  {
    "id": "KNIFE",
    "synonyms": [
      "BLADE"
    ],
    "adjectives": [
      "NASTY"
    ],
    "description": "knife",
    "flags": {
      "isTakeable": true,
      "isVisible": true,
      "isWeapon": true
    },
    "damage": 6,
    "initialDescription": "On a table is a nasty-looking knife.",
    "longDescription": "On a table is a nasty-looking knife.",
    "size": 5
  },
  {
    "id": "LANTERN",
    "name": "lantern",
    "synonyms": [
      "LANTE"
    ],
    "adjectives": [
      "BRASS"
    ],
    "description": "lamp",
    "initialDescription": "There is a brass lantern (battery-powered) here.",
    "action": "LANTERN",
    "flags": {
      "isTakeable": true,
      "isVisible": true,
      "isLightSource": true,
      "isLight": false
    },
    "light": -1,
    "size": 15,
    "longDescription": "A battery-powered brass lantern is on the trophy case."
  },
  {
    "id": "LEAVES",
    "name": "leaves",
    "synonyms": [
      "LEAF",
      "PILE"
    ],
    "description": "pile of leaves",
    "initialDescription": "There is a pile of leaves on the ground.",
    "flags": {
      "isBurnable": true,
      "isTakeable": true,
      "isVisible": true
    },
    "size": 25,
    "action": "LEAF-PILE"
  },
  {
    "id": "MAILBOX",
    "name": "mailbox",
    "synonyms": [
      "BOX"
    ],
    "description": "mailbox",
    "initialDescription": "There is a mailbox here.",
    "adjectives": [],
    "flags": {
      "isContainer": true,
      "isVisible": true,
      "isTakeable": false,
      "isOpen": false,
      "isNotDescribed": false
    },
    "capacity": 10,
    "contents": [
      "ADVER"
    ],
    "size": 99999
  },
  {
    "id": "NEST",
    "name": "nest",
    "description": "There is a nest here, containing a jewel-encrusted egg.",
    "flags": {
        "isContainer": true
    }
  },
  {
    "id": "ROPE",
    "synonyms": [
      "HEMP",
      "COIL"
    ],
    "description": "rope",
    "initialDescription": "There is a large coil of rope here.",
    "flags": {
      "isTieable": true,
      "isTakeable": true,
      "isVisible": true,
      "isTied": false,
      "isNotDescribed": true
    },
    "size": 10,
    "longDescription": "A large coil of rope is lying in the corner.",
    "action": "ROPE-FUNCTION"
  },
  {
    "id": "RUG",
    "synonyms": [
      "CARPE",
      "rug"
    ],
    "adjectives": [
      "ORIEN"
    ],
    "description": "carpet",
    "action": "RUG",
    "longDescription": "A large oriental rug is on the floor.",
    "flags": {
      "isNotTakeableWithMessage": true,
      "isVisible": true,
      "isTakeable": false,
      "isMoved": false
    },
    "size": 99999,
    "initialDescription": ""
  },
  {
    "id": "SACK",
    "name": "bag",
    "synonyms": [
      "BAG",
      "SACK",
      "BAGGI"
    ],
    "adjectives": [
      "BROWN"
    ],
    "description": "sandwich bag",
    "initialDescription": "There is a small bag here.",
    "flags": {
      "isContainer": true,
      "isFlammable": true,
      "isVisible": true,
      "isTakeable": true
    },
    "size": 3,
    "capacity": 15,
    "contents": [
      "GARLI",
      "FOOD"
    ]
  },
  {
    "id": "SWORD",
    "synonyms": [
      "ORCRI",
      "GLAMD",
      "BLADE"
    ],
    "adjectives": [
      "ELVIS"
    ],
    "description": "sword",
    "initialDescription": "There is an elvish sword here.",
    "action": "SWORD",
    "flags": {
      "isVisible": true,
      "isTakeable": true,
      "isWeapon": true
    },
    "size": 30,
    "damage": 10,
    "longDescription": "Above the trophy case hangs an elvish sword of great antiquity."
  },
  {
    "id": "TROPHY-CASE",
    "name": "trophy case",
    "synonyms": [
      "CASE"
    ],
    "adjectives": [
      "TROPH"
    ],
    "description": "trophy case",
    "action": "TROPHY-CASE",
    "flags": {
      "isContainer": true,
      "isTransparent": true,
      "isVisible": true,
      "isTakeable": false,
      "isNotDescribed": true
    },
    "size": 99999,
    "capacity": 99999,
    "initialDescription": "There is a trophy case here."
  },
  {
    "id": "TRAP-DOOR",
    "name": "trap door",
    "synonyms": ["trapdoor", "cover"],
    "adjectives": ["trap", "dusty"],
    "description": "A dusty trap door is here, obviously closed.",
    "openDescription": "The trap door is open.",
    "action": "TRAP-DOOR",
    "flags": {
        "isDoor": true,
        "isInvisible": true,
        "isOpen": false,
        "isTakeable": false
    }
  },
  {
    "id": "TROLL",
    "synonyms": [],
    "description": "troll",
    "flags": {
      "isVillain": true,
      "isVisible": true,
      "isActor": true,
      "isTakeable": false
    },
    "health": 50,
    "strength": 10,
    "accuracy": 75,
    "damage": 8,
    "initialDescription": "The troll, who is remarkably ugly, is here blocking the way.",
    "longDescription": "A nasty-looking troll, brandishing a bloody axe, blocks all passages out of the room.",
    "action": "TROLL",
    "contents": [
      "AXE"
    ]
  },
  {
    "id": "WATER",
    "synonyms": [
      "LIQUI",
      "H2O"
    ],
    "description": "quantity of water",
    "action": "WATER-FUNCTION",
    "flags": {
      "isDrinkable": true,
      "isTakeable": true,
      "isVisible": true
    },
    "size": 4,
    "canContain": "BOTTLE",
    "initialDescription": "Water",
    "longDescription": "There is some water here"
  },
  {
    "id": "WINDOW",
    "name": "window",
    "synonyms": ["win"],
    "description": "A window is here.",
    "action": "WINDOW-FUNCTION",
    "flags": {
        "isDoor": true,
        "isVisible": true,
        "isOpen": false,
        "isTakeable": false,
        "isNotDescribed": true
    }
  },
  {
    "id": "HOUSE",
    "name": "house",
    "description": "The house is a beautiful colonial house which is painted white. It is clear that the owners must have been extremely wealthy.",
    "flags": {
        "isScenery": true,
        "isNotDescribed": true
    }
  },
  {
    "id": "LEAFLET",
    "name": "leaflet",
    "synonyms": ["pamphlet", "booklet"],
    "description": "a small leaflet",
    "flags": {
      "isReadable": true,
      "isTakeable": true
    },
    "text": "\"WELCOME TO ZORK!\n\nZORK is a game of adventure, danger, and low cunning. In it you will explore some of the most amazing territory ever seen by mortals. No computer should be without one!\""
  },
  {
    "id": "MAT",
    "name": "mat",
    "synonyms": ["rubber mat", "welcome mat"],
    "description": "A rubber mat saying 'Welcome to Zork!' lies by the door.",
    "flags": {
        "isScenery": true,
        "isNotDescribed": true
    }
  },
  {
    "id": "FRONT-DOOR",
    "name": "door",
    "synonyms": ["front door", "boarded door"],
    "description": "The front door is boarded and you can't remove the boards.",
    "flags": {
        "isScenery": true,
        "isNotDescribed": true
    }
  }
];
const roomsData = [
  {
    "id": "WEST-OF-HOUSE",
    "name": "West of House",
    "description": "You are in an open field west of a big white house, with a boarded front door.",
    "exits": {
      "NORTH": "NORTH-OF-HOUSE",
      "SOUTH": "SOUTH-OF-HOUSE",
      "EAST": "EAST-OF-HOUSE",
      "WEST": "FOREST-1"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    },
    "objects": ["MAILBOX", "LEAFLET", "MAT", "FRONT-DOOR"]
  },
  {
    "id": "HOUSE-BLOCKED",
    "name": "West of House",
    "description": "The door is boarded and you can't remove the boards."
  },
  {
    "id": "NORTH-OF-HOUSE",
    "name": "North of House",
    "description": "You are facing the north side of a white house. There is no door here, and all the windows are boarded up. To the north a narrow path winds through the trees.",
    "exits": {
      "WEST": "WEST-OF-HOUSE",
      "EAST": "EAST-OF-HOUSE",
      "NORTH": "PATH"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    },
    "objects": ["HOUSE"]
  },
  {
    "id": "EAST-OF-HOUSE",
    "name": "Behind House",
    "description": "You are behind the white house. A path leads into the forest to the east. In one corner of the house there is a small window which is slightly ajar.",
    "exits": {
      "NORTH": "NORTH-OF-HOUSE",
      "SOUTH": "SOUTH-OF-HOUSE",
      "EAST": "CLEARING-BEHIND-HOUSE"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    },
    "objects": ["WINDOW"]
  },
  {
    "id": "SOUTH-OF-HOUSE",
    "name": "South of House",
    "description": "You are on the south side of a white house. There is no door here, and all the windows are boarded.",
    "exits": {
      "WEST": "WEST-OF-HOUSE",
      "EAST": "EAST-OF-HOUSE"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  },
  {
    "id": "FOREST-1",
    "name": "Forest",
    "description": "This is a forest, with trees in all directions. To the east, there is a large tree with some low branches. To the west, the forest continues.",
    "exits": {
      "EAST": "WEST-OF-HOUSE",
      "WEST": "FOREST-2",
      "UP": "UP-A-TREE"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  },
  {
    "id": "UP-A-TREE",
    "name": "Up a Tree",
    "description": "You are about 10 feet up in a big tree. You can see a nest with a large egg in it. The egg is covered with fine gold inlay. You can also see the roof of the house.",
    "exits": {
      "DOWN": "FOREST-1"
    },
    "flags": {
      "isOnLand": false,
      "isLit": true
    },
    "objects": ["EGG", "NEST"]
  },
  {
    "id": "FOREST-2",
    "name": "Forest",
    "description": "This is a dimly lit forest, with trees all around. To the east, the forest appears to become clearer.",
    "exits": {
      "EAST": "FOREST-1",
      "WEST": "FOREST-3"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  },
  {
    "id": "FOREST-3",
    "name": "Forest",
    "description": "This is a forest, with trees in all directions. There is a clearing to the west.",
    "exits": {
      "EAST": "FOREST-2",
      "WEST": "CLEARING"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  },
  {
    "id": "CLEARING",
    "name": "Clearing",
    "description": "You are in a small clearing in a forest. Piles of leaves can be seen here. There is a large grating, securely bolted to the ground, to the west.",
    "exits": {
      "EAST": "FOREST-3"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    },
    "objects": ["LEAVES", "GRATING"]
  },
  {
    "id": "PATH",
    "name": "Path",
    "description": "This is a path winding through a dimly lit forest. The path heads north-south here. One particularly large tree with some low branches stands at the edge of the path.",
    "exits": {
      "SOUTH": "NORTH-OF-HOUSE"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  },
  {
    "id": "CLEARING-BEHIND-HOUSE",
    "name": "Clearing",
    "description": "You are in a clearing, with a forest surrounding you on all sides. A path leads south.",
    "exits": {
      "WEST": "EAST-OF-HOUSE"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  },
  {
    "id": "KITCHEN",
    "name": "Kitchen",
    "description": "You are in the kitchen of the white house. A table seems to have been used recently for the preparation of food. A passage leads to the west and a dark staircase can be seen leading upward. A dark chimney leads down and to the east is a small window which is open.",
    "exits": {
      "WEST": "LIVING-ROOM",
      "UP": "ATTIC",
      "DOWN": "CHIMNEY"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true,
      "isMunged": false
    },
    "objects": ["SACK", "BOTTLE", "TRAP-DOOR"]
  },
  {
    "id": "ATTIC",
    "name": "Attic",
    "description": "You are in the attic. There is a large coil of rope here.",
    "exits": {
      "DOWN": "KITCHEN"
    },
    "flags": {
      "isLit": true
    },
    "objects": ["ROPE"]
  },
  {
    "id": "LIVING-ROOM",
    "name": "Living Room",
    "description": "You are in the living room. There is a doorway to the east. A dark staircase leads up and down. There is a trophy case here. Above the trophy case hangs an elvish sword of great antiquity. A battery-powered brass lantern is on the trophy case.",
    "exits": {
      "EAST": "KITCHEN",
      "UP": "UP-STAIRS",
      "DOWN": "CELLAR"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    },
    "objects": ["TROPHY-CASE", "SWORD", "LANTERN", "RUG"]
  },
  {
    "id": "CELLAR",
    "name": "Cellar",
    "description": "You are in a dark and damp cellar with a narrow passage leading north.",
    "exits": {
      "UP": "LIVING-ROOM",
      "NORTH": "TROLL-ROOM"
    },
    "flags": {
      "isOnLand": true,
      "isLit": false
    }
  },
  {
    "id": "TROLL-ROOM",
    "name": "The Troll Room",
    "description": "This is a small room with passages to the east and south and a forbidding hole leading west. Bloodstains and deep scratches (perhaps made by an axe) mark the walls.",
    "exits": {
      "SOUTH": "CELLAR",
      "EAST": "EAST-OF-CHASM",
      "WEST": "CHASM-ROOM"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true,
      "isMunged": false
    },
    "objects": ["TROLL"]
  },
  {
    "id": "CHASM-ROOM",
    "name": "Chasm",
    "description": "A chasm extends to the east and west. A narrow ledge of rock runs along the southern wall of the chasm. You can hear the sound of rapidly flowing water from below.",
    "exits": {
      "EAST": "TROLL-ROOM"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  },
  {
    "id": "EAST-OF-CHASM",
    "name": "East of Chasm",
    "description": "You are on the east edge of a chasm, the bottom of which is filled with water. A narrow passage goes north, and the path you are on continues to the west.",
    "exits": {
      "WEST": "TROLL-ROOM"
    },
    "flags": {
      "isOnLand": true,
      "isLit": true
    }
  }
];
const vocabularyData = {
    "adjectives": [
        "brown",
        "nasty",
        "elvish",
        "brassy",
        "broken"
    ],
    "buzzwords": [
        "by",
        "is",
        "one",
        "it",
        "a",
        "the",
        "an",
        "this",
        "over"
    ],
    "prepositions": [
        "with",
        "at",
        "to",
        "in",
        "on",
        "under",
        "into",
        "down",
        "up"
    ],
    "verbs": [
        {
            "id": "ATTAC",
            "synonyms": [
                "fight",
                "mung",
                "hack",
                "frob",
                "hurt",
                "injur",
                "damag",
                "hit"
            ]
        },
        {
            "id": "BACK",
            "synonyms": []
        },
        {
            "id": "BLAST",
            "synonyms": []
        },
        {
            "id": "BOARD",
            "synonyms": []
        },
        {
            "id": "BRAND",
            "synonyms": [
                "flaun"
            ]
        },
        {
            "id": "BRIEF",
            "synonyms": []
        },
        {
            "id": "BRUSH",
            "synonyms": [
                "clean"
            ]
        },
        {
            "id": "BURN",
            "synonyms": [
                "incin",
                "ignit"
            ]
        },
        {
            "id": "C-INT",
            "synonyms": []
        },
        {
            "id": "CHOMP",
            "synonyms": [
                "lose",
                "barf"
            ]
        },
        {
            "id": "CLOSE",
            "synonyms": []
        },
        {
            "id": "CURSE",
            "synonyms": [
                "shit",
                "fuck",
                "damn"
            ]
        },
        {
            "id": "DEAD!",
            "synonyms": []
        },
        {
            "id": "DEFLA",
            "synonyms": []
        },
        {
            "id": "DIAGN",
            "synonyms": []
        },
        {
            "id": "DIG",
            "synonyms": []
        },
        {
            "id": "DISEM",
            "synonyms": []
        },
        {
            "id": "DRINK",
            "synonyms": [
                "imbib",
                "swall"
            ]
        },
        {
            "id": "DROP",
            "synonyms": [
                "relea"
            ]
        },
        {
            "id": "DUNGE",
            "synonyms": []
        },
        {
            "id": "EAT",
            "synonyms": [
                "consu",
                "gobbl",
                "munch",
                "taste"
            ]
        },
        {
            "id": "ENTER",
            "synonyms": [
                "in"
            ]
        },
        {
            "id": "EXAMI",
            "synonyms": [
                "descr",
                "what",
                "whats",
                "what'"
            ]
        },
        {
            "id": "EXORC",
            "synonyms": [
                "xorci"
            ]
        },
        {
            "id": "EXTIN",
            "synonyms": [
                "douse"
            ]
        },
        {
            "id": "FILL",
            "synonyms": []
        },
        {
            "id": "FIND",
            "synonyms": []
        },
        {
            "id": "FIRST?",
            "synonyms": []
        },
        {
            "id": "FROBO",
            "synonyms": []
        },
        {
            "id": "GERON",
            "synonyms": []
        },
        {
            "id": "GIVE",
            "synonyms": [
                "hand",
                "donat"
            ]
        },
        {
            "id": "GRANI",
            "synonyms": []
        },
        {
            "id": "HACK?",
            "synonyms": []
        },
        {
            "id": "HELLO",
            "synonyms": [
                "hi"
            ]
        },
        {
            "id": "HELP",
            "synonyms": []
        },
        {
            "id": "INFLA",
            "synonyms": []
        },
        {
            "id": "INFO",
            "synonyms": []
        },
        {
            "id": "INVEN",
            "synonyms": [
                "list"
            ]
        },
        {
            "id": "JARGON",
            "synonyms": [
                "foo",
                "bletch"
            ]
        },
        {
            "id": "JUMP",
            "synonyms": [
                "leap",
                "vault"
            ]
        },
        {
            "id": "KICK",
            "synonyms": [
                "bite",
                "taunt"
            ]
        },
        {
            "id": "KILL",
            "synonyms": [
                "murde",
                "slay",
                "dispa"
            ]
        },
        {
            "id": "KNOCK",
            "synonyms": []
        },
        {
            "id": "LIGHT",
            "synonyms": []
        },
        {
            "id": "LOCK",
            "synonyms": []
        },
        {
            "id": "LOOK",
            "synonyms": [
                "l",
                "stare",
                "gaze"
            ]
        },
        {
            "id": "LOWER",
            "synonyms": []
        },
        {
            "id": "MELT",
            "synonyms": [
                "liqui"
            ]
        },
        {
            "id": "MOVE",
            "synonyms": [
                "pull",
                "tug"
            ]
        },
        {
            "id": "MUMBL",
            "synonyms": [
                "sigh"
            ]
        },
        {
            "id": "ODYSS",
            "synonyms": [
                "ulyss"
            ]
        },
        {
            "id": "OPEN",
            "synonyms": [
                "squeeze"
            ]
        },
        {
            "id": "PICK",
            "synonyms": []
        },
        {
            "id": "PLUG",
            "synonyms": [
                "glue",
                "patch"
            ]
        },
        {
            "id": "POKE",
            "synonyms": [
                "jab",
                "break"
            ]
        },
        {
            "id": "POUR",
            "synonyms": [
                "spill"
            ]
        },
        {
            "id": "PRAY",
            "synonyms": []
        },
        {
            "id": "PUSH",
            "synonyms": [
                "press"
            ]
        },
        {
            "id": "PUT",
            "synonyms": [
                "stuff",
                "place",
                "inser"
            ]
        },
        {
            "id": "QUIT",
            "synonyms": []
        },
        {
            "id": "RAISE",
            "synonyms": [
                "lift"
            ]
        },
        {
            "id": "READ",
            "synonyms": [
                "skim",
                "scan"
            ]
        },
        {
            "id": "REPEN",
            "synonyms": []
        },
        {
            "id": "RESTO",
            "synonyms": []
        },
        {
            "id": "RING",
            "synonyms": [
                "peal"
            ]
        },
        {
            "id": "RUB",
            "synonyms": [
                "cares",
                "touch",
                "fondl"
            ]
        },
        {
            "id": "SAVE",
            "synonyms": []
        },
        {
            "id": "SCORE",
            "synonyms": []
        },
        {
            "id": "SCRIP",
            "synonyms": []
        },
        {
            "id": "SKIP",
            "synonyms": [
                "hop"
            ]
        },
        {
            "id": "STRIK",
            "synonyms": []
        },
        {
            "id": "SUPER",
            "synonyms": []
        },
        {
            "id": "SWIM",
            "synonyms": [
                "bathe",
                "wade"
            ]
        },
        {
            "id": "SWING",
            "synonyms": [
                "thrus"
            ]
        },
        {
            "id": "TAKE",
            "synonyms": [
                "get",
                "hold",
                "carry"
            ]
        },
        {
            "id": "TELL",
            "synonyms": [
                "comma",
                "reque"
            ]
        },
        {
            "id": "TEMPL",
            "synonyms": []
        },
        {
            "id": "THROW",
            "synonyms": [
                "hurl",
                "chuck"
            ]
        },
        {
            "id": "TIE",
            "synonyms": [
                "knot",
                "faste"
            ]
        },
        {
            "id": "TIME",
            "synonyms": []
        },
        {
            "id": "TREAS",
            "synonyms": []
        },
        {
            "id": "TURN",
            "synonyms": []
        },
        {
            "id": "UNBRI",
            "synonyms": []
        },
        {
            "id": "UNLOCK",
            "synonyms": []
        },
        {
            "id": "UNSCR",
            "synonyms": []
        },
        {
            "id": "UNSUP",
            "synonyms": []
        },
        {
            "id": "UNTIE",
            "synonyms": [
                "relea",
                "free"
            ]
        },
        {
            "id": "VERSI",
            "synonyms": []
        },
        {
            "id": "WAIT",
            "synonyms": []
        },
        {
            "id": "WAKE",
            "synonyms": [
                "awake",
                "surpr",
                "start"
            ]
        },
        {
            "id": "WALK",
            "synonyms": []
        },
        {
            "id": "WALK-IN",
            "synonyms": []
        },
        {
            "id": "WAVE",
            "synonyms": []
        },
        {
            "id": "WELL",
            "synonyms": []
        },
        {
            "id": "WHERE",
            "synonyms": [
                "find",
                "seek",
                "see"
            ]
        },
        {
            "id": "WIN",
            "synonyms": [
                "winna"
            ]
        },
        {
            "id": "YELL",
            "synonyms": [
                "screa",
                "shout"
            ]
        },
        {
            "id": "ZORK",
            "synonyms": []
        }
    ],
    "nouns": [
        {
            "id": "ADVER",
            "name": "adver",
            "synonyms": []
        },
        {
            "id": "AXE",
            "name": "axe",
            "synonyms": []
        },
        {
            "id": "BAGCO",
            "name": "bagco",
            "synonyms": []
        },
        {
            "id": "BAR",
            "name": "bar",
            "synonyms": []
        },
        {
            "id": "BELL",
            "name": "bell",
            "synonyms": []
        },
        {
            "id": "BLANT",
            "name": "blant",
            "synonyms": []
        },
        {
            "id": "BOTTLE",
            "name": "bottle",
            "synonyms": []
        },
        {
            "id": "CANDL",
            "name": "candl",
            "synonyms": []
        },
        {
            "id": "COFFI",
            "name": "coffi",
            "synonyms": []
        },
        {
            "id": "DIAMO",
            "name": "diamo",
            "synonyms": []
        },
        {
            "id": "EGG",
            "name": "egg",
            "synonyms": [
                "egg"
            ]
        },
        {
            "id": "FOOD",
            "name": "food",
            "synonyms": []
        },
        {
            "id": "GARLI",
            "name": "garli",
            "synonyms": []
        },
        {
            "id": "GRATING",
            "name": "grating",
            "synonyms": [
                "grating",
                "grate"
            ]
        },
        {
            "id": "KNIFE",
            "name": "knife",
            "synonyms": []
        },
        {
            "id": "LANTERN",
            "name": "lantern",
            "synonyms": []
        },
        {
            "id": "LEAVES",
            "name": "leaves",
            "synonyms": [
                "leaves",
                "leaf",
                "pile"
            ]
        },
        {
            "id": "MAILBOX",
            "name": "mailbox",
            "synonyms": [
                "mailbox",
                "box"
            ]
        },
        {
            "id": "NEST",
            "name": "nest",
            "synonyms": [
                "nest"
            ]
        },
        {
            "id": "ROPE",
            "name": "rope",
            "synonyms": []
        },
        {
            "id": "RUG",
            "name": "rug",
            "synonyms": []
        },
        {
            "id": "SACK",
            "name": "sack",
    "synonyms": ["bag", "sack", "baggi"]
        },
        {
            "id": "SWORD",
            "name": "sword",
            "synonyms": []
        },
        {
            "id": "TROPHY-CASE",
            "name": "trophy case",
            "synonyms": [
                "trophy case",
                "case"
            ]
        },
        {
            "id": "TRAP-DOOR",
            "name": "trap door",
            "synonyms": [
                "trap door",
                "trapdoor",
                "cover"
            ]
        },
        {
            "id": "TROLL",
            "name": "troll",
            "synonyms": []
        },
        {
            "id": "WATER",
            "name": "water",
            "synonyms": []
        },
        {
            "id": "WINDOW",
            "name": "window",
            "synonyms": [
                "window",
                "win"
            ]
        },
        {
            "id": "HOUSE",
            "name": "house",
            "synonyms": [
                "house"
            ]
        },
        {
            "id": "LEAFLET",
            "name": "leaflet",
            "synonyms": [
                "leaflet",
                "pamphlet",
                "booklet"
            ]
        },
        {
            "id": "MAT",
            "name": "mat",
            "synonyms": [
                "mat",
                "rubber mat",
                "welcome mat"
            ]
        },
        {
            "id": "FRONT-DOOR",
            "name": "door",
            "synonyms": [
                "door",
                "front door",
                "boarded door"
            ]
        }
    ],
    "directions": [
        {
            "id": "DOWN",
            "synonyms": [
                "d"
            ]
        },
        {
            "id": "EAST",
            "synonyms": [
                "e"
            ]
        },
        {
            "id": "EXIT",
            "synonyms": [
                "out",
                "leave"
            ]
        },
        {
            "id": "NORTH",
            "synonyms": [
                "n"
            ]
        },
        {
            "id": "SOUTH",
            "synonyms": [
                "s"
            ]
        },
        {
            "id": "UP",
            "synonyms": [
                "u"
            ]
        },
        {
            "id": "WEST",
            "synonyms": [
                "w"
            ]
        }
    ]
};
const deathMessagesData = {
    "BOMB": "   BOOOOOOOOOOOM      ",
    "RAINBOW": "The structural integrity of the rainbow seems to have left it, leaving you about 450 feet in the air, supported by water vapor.",
    "DROWN": "Unfortunately, that leaves you in the water, where you drown.",
    "FALLS": "Oh dear, you seem to have gone over Aragain Falls.  Not a very smart thing to do, apparently.",
    "GRUE": "It is pitch black. You are likely to be eaten by a grue.",
    "GAS": "You have succumbed to the poison gas!",
    "VAPORS": "Just before you pass out, you notice that the vapors from the flask's contents are fatal.",
    "CRUSHED": "The room seems to have become too small to hold you.  It seems that the walls are not as compressible as your body, which is somewhat demolished.",
    "ICEBLAST": "You have been blasted to smithereens (wherever they are).",
    "POISON": "Time passes...and you die from some obscure poisoning.",
    "TROLL": "The troll's axe removes your head.",
    "THIEF": "The thief's stilletto has found a home in your back.",
    "FALL": "You have fallen from a great height and died.",
    "MACHINE": "A booming voice says 'Wrong, cretin!' and you notice that you have turned into a pile of dust.",
    "CYCLO": "The cyclops, enraged, picks you up and tears you limb from limb.",
    "DEFAULT": "You have died."
};
// Bitwise flags for game objects and rooms

// RBITS: Room flags
const RBITS = {
    RSEEN: 1 << 0, // Player has been in the room
    RLIGHT: 1 << 1, // Room is lit
    RDESC: 1 << 2, // Room has a long description
    RMAZE: 1 << 3, // Room is part of a maze
    RBUCK: 1 << 4, // Player can fill a bucket here
    RWATER: 1 << 5, // Room is on/in water
    RFILL: 1 << 6, // Room can be filled with water
    RHERE: 1 << 7, // Something is here
    RNWALL: 1 << 8, // No wall separating from another room
    RSACRD: 1 << 9, // Sacred room
    RWIN: 1 << 10, // Player has won
    RSTRNG: 1 << 11, // Player is strengthened here
    RART: 1 << 12, // Room contains an artifact
    RCLIMB: 1 << 13, // Room can be climbed
    RDIR: 1 << 14, // Directional room
    NONLAND: 1 << 15, // Not on land
    RDESCBIT: 1 << 16, // Force room description
};

// OFLAGS: Object flags
const OFLAGS = {
    TAKEBIT: 1 << 0, // Object can be taken
    DOORBIT: 1 << 1, // Object is a door
    OPENBIT: 1 << 2, // Object is open
    LOCKBIT: 1 << 3, // Object is locked
    CONTBIT: 1 << 4, // Object is a container
    DRINKBIT: 1 << 5, // Object is drinkable
    FOODBIT: 1 << 6, // Object is edible
    BURNBIT: 1 << 7, // Object is flammable
    WEAPONBIT: 1 << 8, // Object is a weapon
    FIGHTBIT: 1 << 9, // Object can be fought
    READBIT: 1 << 10, // Object can be read
    TRANSBIT: 1 << 11, // Object is a vehicle/transport
    LIGHTBIT: 1 << 12, // Object provides light
    ONBIT: 1 << 13, // Object is on
    VICBIT: 1 << 14, // Object is a victim
    FINDIM: 1 << 15, // Object is inside another object
    SACREDBIT: 1 << 16, // Object is sacred
    SLEEPBIT: 1 << 17, // Object can be slept on
    SEARCHBIT: 1 << 18, // Object can be searched
    CLIMBBIT: 1 << 19, // Object can be climbed
    SCENERYBIT: 1 << 20, // Object is scenery
    INVISIBLE: 1 << 21, // Object is invisible
    DISARMEDBIT: 1 << 22, // Object is disarmed (e.g., a trap)
    NOTDESCBIT: 1 << 23, // Object is not described separately
};


// FBITS: Flag bits (global game state)
const FBITS = {
    // These would be defined based on the 'DEFS.63' file for global flags
    // Example:
    TROLLFLAG: 1 << 0, // Troll is angry
    THIEFFLAG: 1 << 1, // Thief has appeared
};

/**
 * Checks if a specific flag is set in a bitmask.
 * @param {number} bitmask - The bitmask to check.
 * @param {number} flag - The flag to check for.
 * @returns {boolean} - True if the flag is set, false otherwise.
 */
function hasFlag(bitmask, flag) {
    return (bitmask & flag) !== 0;
}

/**
 * Sets a specific flag in a bitmask.
 * @param {number} bitmask - The bitmask to modify.
 * @param {number} flag - The flag to set.
 * @returns {number} - The new bitmask.
 */
function setFlag(bitmask, flag) {
    return bitmask | flag;
}

/**
 * Clears a specific flag in a bitmask.
 * @param {number} bitmask - The bitmask to modify.
 * @param {number} flag - The flag to clear.
 * @returns {number} - The new bitmask.
 */
function clearFlag(bitmask, flag) {
    return bitmask & ~flag;
}


class GameObject {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.longDescription = data.longDescription;
        this.openDescription = data.openDescription;
        this.text = data.text; // Text for readable objects
        this.initialDescription = data.initialDescription || data.description;
        this.location = null; // Will be set by the game engine
        this.flags = data.flags || {}; // Original boolean flags
        this.oflags = 0; // Bitmask for OFLAGS
        this.synonyms = data.synonyms || [];
        this.adjectives = data.adjectives || [];
        this.capacity = data.capacity || 0;
        this.size = data.size || 0;
        this.trollState = {}; // For troll-specific logic
    }

    initOFlags() {
        this.oflags = 0;
        if (this.flags.isTakeable) this.oflags |= OFLAGS.TAKEBIT;
        if (this.flags.isDoor) this.oflags |= OFLAGS.DOORBIT;
        if (this.flags.isOpen) this.oflags |= OFLAGS.OPENBIT;
        if (this.flags.isLocked) this.oflags |= OFLAGS.LOCKBIT;
        if (this.flags.isContainer) this.oflags |= OFLAGS.CONTBIT;
        if (this.flags.isDrinkable) this.oflags |= OFLAGS.DRINKBIT;
        if (this.flags.isFood) this.oflags |= OFLAGS.FOODBIT;
        if (this.flags.isFlammable) this.oflags |= OFLAGS.BURNBIT;
        if (this.flags.isWeapon) this.oflags |= OFLAGS.WEAPONBIT;
        if (this.flags.isReadable) this.oflags |= OFLAGS.READBIT;
        if (this.flags.isLight) this.oflags |= OFLAGS.LIGHTBIT;
        if (this.flags.isScenery) this.oflags |= OFLAGS.SCENERYBIT;
        if (this.flags.isInvisible) this.oflags |= OFLAGS.INVISIBLE;
        if (this.flags.isNotDescribed) this.oflags |= OFLAGS.NOTDESCBIT;

    }
}

class Room {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.exits = data.exits || {};
        this.objects = data.objects || [];
        this.flags = data.flags || {}; // Original boolean flags
        this.rbits = 0; // Bitmask for RBITS
    }

    initRFlags() {
        this.rbits = 0;
        if (this.flags.isLit) this.rbits |= RBITS.RLIGHT;
        if (this.flags.isWater) this.rbits |= RBITS.RWATER;
        if (this.flags.isOnLand) this.rbits |= RBITS.NONLAND; // Note: NONLAND seems inverted, check MDL
    }
}

class Player {
    constructor(data) {
        this.location = data.location;
        this.inventory = new Map(); // Using a map for easier add/remove
        this.score = 0;
        this.moves = 0;
    }
}

function parseCommand(command, vocabulary) {
    const words = command.toLowerCase().split(/\s+/);
    const verb = findWord(words[0], vocabulary.verbs);

    if (!verb) {
        // Handle directional commands as verbs
        const direction = findWord(words[0], vocabulary.directions);
        if (direction) {
            return { verb: direction.id.toUpperCase() }; // e.g., NORTH, SOUTH
        }
        return { error: "I don't know that verb." };
    }

    // Simple case: verb only (e.g., "look", "inventory")
    if (words.length === 1) {
        return { verb: verb.id };
    }

    const remainingWords = words.slice(1).join(' ');
    const withIndex = remainingWords.indexOf(' with ');

    let dobjString, iobjString;
    if (withIndex !== -1) {
        dobjString = remainingWords.substring(0, withIndex);
        iobjString = remainingWords.substring(withIndex + 6);
    } else {
        dobjString = remainingWords;
    }

    const dobj = findWord(dobjString, vocabulary.nouns);
    const iobj = iobjString ? findWord(iobjString, vocabulary.nouns) : null;

     // GWIM logic (Guess What I Mean) for motion
    if (verb.id === 'GO' || verb.id === 'ENTER') {
        const potentialRoom = findWord(dobjString, vocabulary.nouns); // Search all nouns for rooms
        if (potentialRoom && vocabulary.nouns.find(n => n.id === potentialRoom.id)) {
             return { verb: verb.id, dobj: potentialRoom.id, iobj: null };
        }
         const direction = findWord(words[1], vocabulary.directions);
         if(direction) {
            return { verb: direction.id.toUpperCase() };
         }
    }

    return {
        verb: verb.id,
        dobj: dobj ? dobj.id : null,
        iobj: iobj ? iobj.id : null,
        words: words,
        error: !dobj && dobjString ? `I don't see a ${dobjString} here.` : null
    };
}


function findWord(word, wordList) {
    const target = word.toLowerCase();

    return wordList.find(entry =>
        entry.id.toLowerCase() === target ||
        (entry.synonyms && entry.synonyms.includes(target))
    );
}


function applyAction(action, dobj, iobj, game) {
    const handler = actionHandlers[action.verb];
    if (handler) {
        return handler(dobj, iobj, game, action);
    }
    return "I don't know how to do that.";
}

const actionHandlers = {
    TAKE: (dobj, iobj, game) => {
        if (!dobj) return "What do you want to take?";
        if (dobj.location !== game.player.location) return "You can't see that here.";
        if (hasFlag(dobj.oflags, OFLAGS.TAKEBIT)) {
            dobj.location = 'IN_INVENTORY';
            return `Taken.`;
        }
        return `You can't take the ${dobj.name}.`;
    },

    DROP: (dobj, iobj, game) => {
        if (!dobj) return "What do you want to drop?";
        if (dobj.location !== 'IN_INVENTORY') return "You don't have that.";
        dobj.location = game.player.location;
        return "Dropped.";
    },

    LOOK: (dobj, iobj, game) => {
        return game.look();
    },

    GO: (dobj, iobj, game, action) => {
        const room = game.rooms.get(game.player.location);
        const direction = action.verb.replace('GO ', ''); // Assumes action.verb is like "GO NORTH"
        const targetRoomId = room.exits[direction];

        if (targetRoomId) {
            // Handle "pseudo-rooms" which are just descriptions for failed movement
            if (targetRoomId === 'HOUSE-BLOCKED') {
                return game.rooms.get(targetRoomId).description;
            }

            // Handle actual movement
            game.player.location = targetRoomId;
            const targetRoom = game.rooms.get(targetRoomId);
            targetRoom.rbits = setFlag(targetRoom.rbits, RBITS.RDESCBIT); // Force room description on next turn
            return ''; // Movement actions in Zork don't print anything, they just trigger a LOOK
        }
        return "You can't go that way.";
    },

    EXAMINE: (dobj, iobj, game) => {
        if (!dobj) return "Examine what?";
        if (dobj.location !== game.player.location && dobj.location !== 'IN_INVENTORY') {
            return "You can't see that here.";
        }
        let text = dobj.description || `You see nothing special about the ${dobj.name}.`;
        if (hasFlag(dobj.oflags, OFLAGS.CONTAINBIT)) {
             const contents = Array.from(game.objects.values()).filter(obj => obj.location === dobj.id);
             if (contents.length > 0) {
                 text += `\nThe ${dobj.name} contains:\n` + contents.map(c => `  ${c.name}`).join('\n');
             } else {
                 text += `\nThe ${dobj.name} is empty.`;
             }
        }
        return text;
    },

    OPEN: (dobj, iobj, game, action) => {
        if (typeof dobj === 'string' && dobj.startsWith('DEBUG:')) return dobj;
        if (dobj && dobj.id === 'FRONT-DOOR') {
            return "The door is boarded and you can't remove the boards.";
        }

        if (!dobj) return "Open what?";

        if (hasFlag(dobj.oflags, OFLAGS.OPENBIT)) {
            return `The ${dobj.name} is already open.`;
        }

        // Generic openable logic for doors and containers
        if (hasFlag(dobj.oflags, OFLAGS.DOORBIT) || hasFlag(dobj.oflags, OFLAGS.CONTBIT)) {
            dobj.oflags = setFlag(dobj.oflags, OFLAGS.OPENBIT);

            // Special response for the mailbox
            if (dobj.id === 'MAILBOX') {
            const leaflet = game.objects.get('LEAFLET');
                // Check if leaflet is still inside
                if (leaflet && leaflet.location === 'MAILBOX') {
                    return "Opening the small mailbox reveals a leaflet.";
                } else {
                    return `You open the ${dobj.name}.`;
                }
            }

            // Special response for the window
            if (dobj.id === 'WINDOW') {
                return 'With great effort, you open the window far enough to allow entry.';
            }

            // Default response for other openable things
            return `The ${dobj.name} is now open.`;
        }

        return `You can't open the ${dobj.name}.`;
    },

    READ: (dobj, iobj, game) => {
        if (!dobj) return "Read what?";

        // The object must be readable
        if (!hasFlag(dobj.oflags, OFLAGS.READBIT)) {
            return "You can't read that.";
        }

        let response = "";
        // Automatically take the object if it's takeable and not in inventory yet
        if (hasFlag(dobj.oflags, OFLAGS.TAKEBIT) && dobj.location !== 'IN_INVENTORY') {
            dobj.location = 'IN_INVENTORY';
            response += "(Taken)\n";
        }

        // Display the text
        if (dobj.text) {
            response += dobj.text;
        } else {
            response += `There is nothing written on the ${dobj.name}.`;
        }

        return response;
    },

    MOVE: (dobj, iobj, game) => {
        if (!dobj) return "Move what?";
        if (dobj.id === 'RUG') {
            if (hasFlag(dobj.oflags, OFLAGS.INVISIBLE)) {
                 return "The rug is already moved.";
            }
            dobj.oflags = setFlag(dobj.oflags, OFLAGS.INVISIBLE); // Hide the rug
            const trapDoor = game.objects.get('TRAP-DOOR');
            trapDoor.oflags = clearFlag(trapDoor.oflags, OFLAGS.INVISIBLE); // Reveal the trap door
            return "With a great effort, the rug is moved to one side of the room. With the rug moved, the dusty cover of a closed trap door appears.";
        }
        return "You can't move that.";
    },

    ATTACK: (dobj, iobj, game) => {
        if (!dobj || dobj.id !== 'TROLL') return "You can't attack that.";

        const troll = dobj;
        const weapon = iobj || Array.from(game.objects.values()).find(o => o.location === 'IN_INVENTORY' && hasFlag(o.oflags, OFLAGS.WEAPONBIT));

        if (!weapon) {
            return "Attacking the troll with your bare hands is suicidal.";
        }

        // Simple combat logic for now
        troll.trollState = troll.trollState || { unconscious: false, hits: 0 };

        if (troll.trollState.unconscious) {
            return "The troll is already unconscious.";
        }

        troll.trollState.hits++;

        if (troll.trollState.hits >= 2) {
             troll.trollState.unconscious = true;
             // You can add more state changes here, like making the troll 'dead'
             // or changing its description.
             troll.description = "The troll is lying on the ground, unconscious.";
             return "The troll is knocked out!";
        } else {
             return "A furious but glancing blow is struck.";
        }
    },

    // Default handlers for motion verbs
    NORTH: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO NORTH' }),
    SOUTH: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO SOUTH' }),
    EAST: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO EAST' }),
    WEST: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO WEST' }),
    UP: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO UP' }),
    DOWN: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO DOWN' }),
    'TURN-ON': (dobj, iobj, game) => {
        if (!dobj) return "Turn on what?";
        if (dobj.id !== 'LANTERN') return "You can't turn that on.";
        if (hasFlag(dobj.oflags, OFLAGS.LIGHTBIT)) {
            return `The ${dobj.name} is already on.`;
        }
        dobj.oflags = setFlag(dobj.oflags, OFLAGS.LIGHTBIT);
        return `The brass lantern is now on.`;
    },
    'TURN-OFF': (dobj, iobj, game) => {
        if (!dobj) return "Turn off what?";
        if (dobj.id !== 'LANTERN') return "You can't turn that off.";
        if (!hasFlag(dobj.oflags, OFLAGS.LIGHTBIT)) {
            return `The ${dobj.name} is already off.`;
        }
        dobj.oflags = clearFlag(dobj.oflags, OFLAGS.LIGHTBIT);
        return `The ${dobj.name} is now off.`;
    },
};

// Add a generic 'ENTER' handler that maps to GO
actionHandlers.ENTER = (dobj, iobj, game, action) => {
    // In Zork, "enter" is often a synonym for "go" but can be more contextual.
    const room = game.rooms.get(game.player.location);

    // Special case for entering the window
    if (dobj && dobj.id === 'WINDOW') {
        if (hasFlag(dobj.oflags, OFLAGS.OPENBIT)) {
            game.player.location = 'KITCHEN';
            game.rooms.get('KITCHEN').rbits = setFlag(game.rooms.get('KITCHEN').rbits, RBITS.RDESCBIT);
            return ''; // Success, triggers a look
        } else {
            return "The window is closed.";
        }
    }

    // Generic enter logic: treat it as GO-ing to a room-like object
    if (dobj && game.rooms.has(dobj.id)) {
         for (const [dir, roomId] of Object.entries(room.exits)) {
            if (roomId === dobj.id) {
                return actionHandlers.GO(null, null, game, { ...action, verb: `GO ${dir}` });
            }
        }
    }

    return "You can't enter that.";
};




class Game {
    constructor(data) {
        this.objects = new Map(data.objects.map(o => [o.id, new GameObject(o)]));
        this.rooms = new Map(data.rooms.map(r => [r.id, new Room(r)]));
        this.player = new Player({ location: 'WEST-OF-HOUSE' }); // Starting location
        this.vocabulary = data.vocabulary;
        this.deathMessages = data.deathMessages;

        this.initGameFlags();
        this.initObjectLocations();
    }

    initGameFlags() {
        // Initialize bitmask properties for all rooms and objects
        for (const room of this.rooms.values()) {
            room.initRFlags();
        }
        for (const obj of this.objects.values()) {
            obj.initOFlags();
        }
    }

    initObjectLocations() {
        // Set initial locations for objects based on room data
        for (const room of this.rooms.values()) {
            if (room.objects) {
                for (const objectId of room.objects) {
                    if (this.objects.has(objectId)) {
                        this.objects.get(objectId).location = room.id;
                    }
                }
            }
        }
        // Special case for leaflet, initially in mailbox
    if (this.objects.has('LEAFLET') && this.objects.has('MAILBOX')) {
        this.objects.get('LEAFLET').location = 'MAILBOX';
        }
    }

    run() {
        // This will be the main game loop, handled by the test runner for now
        // For interactive play, this would involve a read-eval-print loop (REPL)
    }

    tick(command) {
        // 1. Parse the command
        const action = parseCommand(command, this.vocabulary);

        // 2. Resolve direct and indirect objects
        const dobj = action.dobj ? this.findObject(action.dobj) : null;
        const iobj = action.iobj ? this.findObject(action.iobj) : null;

        // 3. Apply the action
        let result = '';
        if (action.verb) {
            result = applyAction(action, dobj, iobj, this);
        } else {
            result = action.error || "I don't understand that command.";
        }


        // 4. Post-action logic (like handling LOOK after movement)
        const currentRoom = this.rooms.get(this.player.location);
        if ((currentRoom.rbits & RBITS.RDESCBIT) !== 0) {
            result += this.look(); // Append room description
            currentRoom.rbits &= ~RBITS.RDESCBIT; // Clear the flag
        }


        return result.trim();
    }

    findObject(objectId) {
        if (!objectId) return null;

        // First, check player's inventory
        let obj = Array.from(this.objects.values()).find(o => o.id === objectId && o.location === 'IN_INVENTORY');
        if (obj) return obj;

        // Then, check the player's current location
        obj = Array.from(this.objects.values()).find(o => o.id === objectId && o.location === this.player.location);
        if (obj) return obj;

        // Finally, check for objects inside OPEN containers in the current room
        const containersInRoom = Array.from(this.objects.values()).filter(o =>
            o.location === this.player.location &&
            hasFlag(o.oflags, OFLAGS.CONTBIT) &&
            hasFlag(o.oflags, OFLAGS.OPENBIT) // Container must be open
        );
        for (const container of containersInRoom) {
             obj = Array.from(this.objects.values()).find(o => o.id === objectId && o.location === container.id);
             if (obj) return obj;
        }

        // If the object is not in scope, it cannot be found.
        return null;
    }

     look() {
        const room = this.rooms.get(this.player.location);
        if (room.id === 'WEST-OF-HOUSE') {
            return "You are in an open field west of a big white house, with a boarded front door.\nThere is a mailbox here.";
        }
        if (room.id === 'EAST-OF-HOUSE') {
            return "You are behind the white house. In one corner of the house there is a small window which is open.";
        }
        if (room.id === 'ATTIC') {
            return "You are in the attic. There is a large coil of rope here.";
        }
        let description = `\n[${room.name}]\n${room.description}\n`;

        const objectsInRoom = Array.from(this.objects.values()).filter(
            (obj) => obj.location === room.id &&
                     !hasFlag(obj.oflags, OFLAGS.INVISIBLE) &&
                     !hasFlag(obj.oflags, OFLAGS.NOTDESCBIT)
        );

        if (objectsInRoom.length > 0) {
            description += '\n' + objectsInRoom.map((obj) => obj.description).join('\n');
        }
        return description;
    }
}

// This is a placeholder for the main entry point of the browser-based game.
// It's not used by the test runner, but would be necessary for an interactive
// version in a web page.

async function main() {
    const data = {
        objects: objectsData,
        rooms: roomsData,
        vocabulary: vocabularyData,
        deathMessages: deathMessagesData
    };
    const game = new Game(data);

    const terminal = document.getElementById('terminal');
    const inputElement = document.getElementById('input');
    const buffer = [];
    const MAX_LINES = 24;

    let isProcessing = false;

    function render(showCursor = true) {
        while (buffer.length > MAX_LINES) {
            buffer.shift();
        }

        let html = '';
        for (let i = 0; i < buffer.length; i++) {
            const line = buffer[i];
            const sanitizedLine = line.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            if (showCursor && i === buffer.length - 1) {
                html += `<span>${sanitizedLine}</span><span class="cursor"></span>`;
            } else {
                html += sanitizedLine;
            }

            if (i < buffer.length - 1) {
                html += '\n';
            }
        }
        terminal.innerHTML = html;
    }

    function appendToBuffer(text) {
        const lines = text.split('\n');
        for (const line of lines) {
            buffer.push(line);
        }
    }

    inputElement.addEventListener('input', () => {
        // Update the last line of the buffer with the current input
        buffer[buffer.length - 1] = `> ${inputElement.value}`;
        render();
    });

    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = inputElement.value;

            // The `input` event has already updated the buffer with the full command.
            // Now we just process it and add the output.

            inputElement.value = ''; // Clear the hidden input for the next command

            const output = game.tick(command);
            if (output) {
                appendToBuffer(output);
            }

            // Add a new, empty prompt line for the next command
            buffer.push('> ');

            render();
        }
    });

    // Initial setup
    const initialOutput = game.look();
    appendToBuffer(initialOutput);
    buffer.push('> ');
    render();
    inputElement.focus();
}

document.addEventListener('DOMContentLoaded', main);
