
/* Zork Data */
const objectsData = {
    "#####": {
        "id": "#####",
        "name": "#####",
        "synonyms": [
            "You are here"
        ],
        "initialDescription": "cretin",
        "action": "(Not"
    },
    "ADVER": {
        "id": "ADVER",
        "name": "ADVER",
        "synonyms": [
            "PAMPH",
            "LEAFL",
            "BOOKL"
        ],
        "initialDescription": "There is a small leaflet here.",
        "description": "leaflet",
        "action": "(Not",
        "canBeContainedBy": "MAILB",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 2,
        "capacity": 0
    },
    "ATABL": {
        "id": "ATABL",
        "name": "ATABL",
        "synonyms": [
            "TABLE"
        ],
        "description": "large oblong table",
        "action": "(Not",
        "contents": [
            "ECAKE",
            "ORICE",
            "RDICE",
            "BLICE"
        ],
        "adjectives": [
            "LARGE OBLON"
        ]
    },
    "AXE": {
        "id": "AXE",
        "name": "AXE",
        "initialDescription": "There is a bloody axe here.",
        "description": "bloody axe",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 25,
        "capacity": 0,
        "adjectives": [
            "BLOOD"
        ]
    },
    "BAGCO": {
        "id": "BAGCO",
        "name": "BAGCO",
        "synonyms": [
            "BAG",
            "COINS"
        ],
        "initialDescription": "An old leather bag, bulging with coins, is here.",
        "description": "bag of coins",
        "action": "(Not",
        "light": 0,
        "value": 10,
        "trophyValue": 5,
        "size": 15,
        "capacity": 0,
        "adjectives": [
            "LEATH"
        ]
    },
    "BALLO": {
        "id": "BALLO",
        "name": "BALLO",
        "synonyms": [
            "BASKE"
        ],
        "initialDescription": "There is a very large and extremely heavy wicker basket with a cloth bag here. Inside the basket is a metal receptacle of some kind. Attached to the basket on the outside is a piece of wire.",
        "description": "basket",
        "action": "BALLOON",
        "contents": [
            "CBAG",
            "BROPE",
            "RECEP"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 70,
        "capacity": 100,
        "adjectives": [
            "WICKE"
        ]
    },
    "BAR": {
        "id": "BAR",
        "name": "BAR",
        "synonyms": [
            "PLATI"
        ],
        "initialDescription": "There is a large platinum bar here.",
        "description": "platinum bar",
        "action": "(Not",
        "light": 0,
        "value": 12,
        "trophyValue": 10,
        "size": 20,
        "capacity": 0
    },
    "BELL": {
        "id": "BELL",
        "name": "BELL",
        "initialDescription": "There is a small brass bell here.",
        "description": "bell",
        "longDescription": "Lying in a corner of the room is a small brass bell.",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0,
        "adjectives": [
            "BRASS"
        ]
    },
    "BLABE": {
        "id": "BLABE",
        "name": "BLABE",
        "synonyms": [
            "LABEL"
        ],
        "initialDescription": "There is a blue label here.",
        "description": "blue label",
        "action": "(Not",
        "canBeContainedBy": "BALLO",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 1,
        "capacity": 0,
        "adjectives": [
            "BLUE"
        ],
        "text": "!!!! FROBOZZ MAGIC BALLOON COMPANY !!!! Hello, Aviator! Instructions for use: To get into balloon, say 'Board' To leave balloon, say 'Disembark' To land, say 'Land' Warranty: No warranty is expressed or implied. You're on your own, sport! Good Luck."
    },
    "BLAMP": {
        "id": "BLAMP",
        "name": "BLAMP",
        "synonyms": [
            "LAMP",
            "LANTE"
        ],
        "initialDescription": "There is a broken brass lantern here.",
        "description": "broken lamp",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 0,
        "capacity": 0,
        "adjectives": [
            "BROKE"
        ]
    },
    "BLANT": {
        "id": "BLANT",
        "name": "BLANT",
        "synonyms": [
            "LANTE",
            "LAMP"
        ],
        "initialDescription": "There is a burned-out lantern here.",
        "description": "burned-out lantern",
        "longDescription": "The deceased adventurer's useless lantern is here.",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 20,
        "capacity": 0,
        "adjectives": [
            "USED",
            "BURNE",
            "DEAD",
            "USELE"
        ]
    },
    "BLBK": {
        "id": "BLBK",
        "name": "BLBK",
        "synonyms": [
            "BOOK"
        ],
        "initialDescription": "There is a blue book here.",
        "description": "blue book",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 2,
        "adjectives": [
            "BLUE"
        ]
    },
    "BLICE": {
        "id": "BLICE",
        "name": "BLICE",
        "synonyms": [
            "CAKE",
            "ICING"
        ],
        "description": "blue icing",
        "action": "(Not",
        "canBeContainedBy": "ATABL",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0,
        "adjectives": [
            "BLUE",
            "ECCH"
        ]
    },
    "BONES": {
        "id": "BONES",
        "name": "BONES",
        "synonyms": [
            "SKELE",
            "BODY"
        ],
        "initialDescription": "A skeleton, probably the remains of a luckless adventurer, lies here.",
        "action": "SKELETON",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "BOOK": {
        "id": "BOOK",
        "name": "BOOK",
        "synonyms": [
            "PRAYE",
            "BIBLE",
            "GOODB"
        ],
        "initialDescription": "There is a large black book here.",
        "description": "book",
        "longDescription": "On the altar is a large black book, open to page 569.",
        "action": "BLACK-BOOK",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0,
        "adjectives": [
            "BLACK"
        ]
    },
    "BOTTL": {
        "id": "BOTTL",
        "name": "BOTTL",
        "synonyms": [
            "CONTA",
            "PITCH"
        ],
        "initialDescription": "A clear glass bottle is here.",
        "description": "glass bottle",
        "longDescription": "A bottle is sitting on the table.",
        "action": "BOTTLE-FUNCTION",
        "contents": [
            "WATER"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 4,
        "adjectives": [
            "GLASS"
        ]
    },
    "BOTTLE": {
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
    "BRICK": {
        "id": "BRICK",
        "name": "BRICK",
        "synonyms": [
            "BRICK"
        ],
        "initialDescription": "There is a square brick here which feels like clay.",
        "description": "brick",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 9,
        "capacity": 2,
        "adjectives": [
            "SQUAR CLAY"
        ]
    },
    "BROPE": {
        "id": "BROPE",
        "name": "BROPE",
        "synonyms": [
            "WIRE"
        ],
        "description": "braided wire",
        "action": "WIRE-FUNCTION",
        "canBeContainedBy": "BALLO",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0,
        "adjectives": [
            "BRAID"
        ]
    },
    "BUCKE": {
        "id": "BUCKE",
        "name": "BUCKE",
        "initialDescription": "There is a wooden bucket here, 3 feet in diameter and 3 feet high.",
        "description": "wooden bucket",
        "action": "BUCKET",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 100,
        "capacity": 100,
        "adjectives": [
            "WOODE"
        ]
    },
    "BUOY": {
        "id": "BUOY",
        "name": "BUOY",
        "initialDescription": "There is a red buoy here (probably a warning).",
        "description": "red buoy",
        "action": "(Not",
        "contents": [
            "EMERA"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 20,
        "adjectives": [
            "RED"
        ]
    },
    "CAGE": {
        "id": "CAGE",
        "name": "CAGE",
        "initialDescription": "There is a mangled cage here.",
        "description": "mangled cage",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 60,
        "capacity": 0
    },
    "CANDL": {
        "id": "CANDL",
        "name": "CANDL",
        "initialDescription": "There are two candles here.",
        "description": "pair of candles",
        "longDescription": "On the two ends of the altar are burning candles.",
        "action": "CANDLES",
        "light": 1,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0
    },
    "CARD": {
        "id": "CARD",
        "name": "CARD",
        "synonyms": [
            "NOTE"
        ],
        "initialDescription": "There is a card with writing on it here.",
        "description": "card",
        "action": "(Not",
        "canBeContainedBy": "SAFE",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 1,
        "capacity": 0,
        "text": "Warning: This room was constructed over very weak rock strata. Detonation of explosives in this room is strictly prohibited! Frobozz Magic Cave Company per M. Agrippa, foreman"
    },
    "CBAG": {
        "id": "CBAG",
        "name": "CBAG",
        "synonyms": [
            "BAG"
        ],
        "description": "cloth bag",
        "action": "(Not",
        "canBeContainedBy": "BALLO",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0,
        "adjectives": [
            "CLOTH"
        ]
    },
    "CHALI": {
        "id": "CHALI",
        "name": "CHALI",
        "synonyms": [
            "CUP GOBLE"
        ],
        "initialDescription": "There is a silver chalice, intricately engraved, here.",
        "description": "chalice",
        "action": "CHALICE",
        "light": 0,
        "value": 10,
        "trophyValue": 10,
        "size": 10,
        "capacity": 5
    },
    "COAL": {
        "id": "COAL",
        "name": "COAL",
        "synonyms": [
            "HEAP",
            "CHARC"
        ],
        "initialDescription": "There is a small heap of coal here.",
        "description": "small pile of coal",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 20,
        "capacity": 0
    },
    "COFFI": {
        "id": "COFFI",
        "name": "COFFI",
        "synonyms": [
            "CASKE"
        ],
        "initialDescription": "There is a solid-gold coffin, used for the burial of Ramses II, here.",
        "description": "gold coffin",
        "action": "(Not",
        "light": 0,
        "value": 3,
        "trophyValue": 7,
        "size": 55,
        "capacity": 35,
        "adjectives": [
            "GOLD"
        ]
    },
    "COKES": {
        "id": "COKES",
        "name": "COKES",
        "synonyms": [
            "BOTTL"
        ],
        "initialDescription": "Many empty Coke bottles are here. Alas, they can't hold water.",
        "description": "bunch of Coke bottles",
        "longDescription": "There is a large pile of empty Coke bottles here, evidently produced by the implementers during their long struggle to win totally.",
        "action": "COKE-BOTTLES",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 15,
        "adjectives": [
            "COKE"
        ]
    },
    "CROWN": {
        "id": "CROWN",
        "name": "CROWN",
        "initialDescription": "Lord Dimwit's crown is here.",
        "description": "crown",
        "longDescription": "The excessively gaudy crown of Lord Dimwit Flathead is here.",
        "action": "(Not",
        "canBeContainedBy": "SAFE",
        "light": 0,
        "value": 15,
        "trophyValue": 10,
        "size": 10,
        "capacity": 0,
        "adjectives": [
            "GAUDY"
        ]
    },
    "CYCLO": {
        "id": "CYCLO",
        "name": "CYCLO",
        "synonyms": [
            "ONE-E MONST"
        ],
        "description": "cyclops",
        "action": "CYCLOPS",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 10000
    },
    "DBALL": {
        "id": "DBALL",
        "name": "DBALL",
        "synonyms": [
            "BALLO BASKE"
        ],
        "initialDescription": "There is a balloon here, broken into pieces.",
        "description": "broken balloon",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 40,
        "capacity": 0,
        "adjectives": [
            "BROKE"
        ]
    },
    "DBOAT": {
        "id": "DBOAT",
        "name": "DBOAT",
        "synonyms": [
            "BOAT PLAST PILE"
        ],
        "initialDescription": "There is a pile of plastic here with a large hole in it.",
        "description": "plastic boat (with hole)",
        "action": "DBOAT-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 20,
        "capacity": 0
    },
    "DIAMO": {
        "id": "DIAMO",
        "name": "DIAMO",
        "synonyms": [
            "PERFE"
        ],
        "initialDescription": "There is an enormous diamond (perfectly cut) here.",
        "description": "huge diamond",
        "action": "(Not",
        "light": 0,
        "value": 10,
        "trophyValue": 6,
        "size": 5,
        "capacity": 0
    },
    "ECAKE": {
        "id": "ECAKE",
        "name": "ECAKE",
        "synonyms": [
            "CAKE"
        ],
        "initialDescription": "There is a piece of cake here with the words 'Eat Me' on it.",
        "description": "piece of 'Eat Me' cake",
        "action": "EATME-FUNCTION",
        "canBeContainedBy": "ATABL",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0,
        "adjectives": [
            "EATME",
            "EAT-M"
        ]
    },
    "EMERA": {
        "id": "EMERA",
        "name": "EMERA",
        "initialDescription": "There is an emerald here.",
        "description": "large emerald",
        "action": "(Not",
        "canBeContainedBy": "BUOY",
        "light": 0,
        "value": 5,
        "trophyValue": 10,
        "size": 5,
        "capacity": 0
    },
    "FLASK": {
        "id": "FLASK",
        "name": "glass flask",
        "synonyms": [],
        "adjectives": [
            "GLASS"
        ],
        "description": "glass flask filled with liquid",
        "initialDescription": "A stoppered glass flask with a skull-and-crossbones marking is here. The flask is filled with some clear liquid.",
        "flags": {
            "isTransparent": true,
            "isVisible": true,
            "isTakeable": true,
            "isContainer": true
        },
        "value": 10,
        "trophyValue": 5,
        "size": 10,
        "action": "FLASK-FUNCTION"
    },
    "FOOD": {
        "id": "FOOD",
        "name": "FOOD",
        "synonyms": [
            "SANDW",
            "LUNCH",
            "PEPPE",
            "DINNE",
            "SNACK"
        ],
        "initialDescription": "A hot pepper sandwich is here.",
        "description": ".lunch",
        "action": "(Not",
        "canBeContainedBy": "SBAG",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0
    },
    "FRONT-DOOR": {
        "id": "FRONT-DOOR",
        "name": "door",
        "synonyms": [
            "door",
            "front door",
            "boarded door",
            "FRONT"
        ],
        "description": "The front door is boarded and you can't remove the boards.",
        "flags": {
            "isScenery": true,
            "isNotDescribed": true,
            "isDoor": true
        }
    },
    "FUSE": {
        "id": "FUSE",
        "name": "FUSE",
        "synonyms": [
            "COIL WIRE"
        ],
        "initialDescription": "There is a coil of thin shiny wire here.",
        "description": "wire coil",
        "action": "FUSE-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 1,
        "capacity": 0,
        "adjectives": [
            "SHINY THIN"
        ]
    },
    "GARLI": {
        "id": "GARLI",
        "name": "GARLI",
        "synonyms": [
            "CLOVE"
        ],
        "initialDescription": "There is a clove of garlic here.",
        "description": "clove of garlic",
        "action": "(Not",
        "canBeContainedBy": "SBAG",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0
    },
    "GHOST": {
        "id": "GHOST",
        "name": "GHOST",
        "synonyms": [
            "SPIRI",
            "FIEND"
        ],
        "action": "GHOST-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "GNOME": {
        "id": "GNOME",
        "name": "GNOME",
        "synonyms": [
            "TROLL"
        ],
        "initialDescription": "There is a nervous Volcano Gnome here.",
        "description": "Volcano Gnome",
        "action": "GNOME-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "GRAIL": {
        "id": "GRAIL",
        "name": "GRAIL",
        "synonyms": [
            "CUP",
            "GOBLE"
        ],
        "initialDescription": "There is an extremely valuable (perhaps original) grail here.",
        "description": "grail",
        "action": "(Not",
        "light": 0,
        "value": 2,
        "trophyValue": 5,
        "size": 10,
        "capacity": 5
    },
    "GRBK": {
        "id": "GRBK",
        "name": "GRBK",
        "synonyms": [
            "BOOK"
        ],
        "initialDescription": "There is a green book here.",
        "description": "green book",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 2,
        "adjectives": [
            "GREEN"
        ]
    },
    "GRUE": {
        "id": "GRUE",
        "name": "GRUE",
        "description": "lurking grue",
        "action": "GRUE-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 0,
        "capacity": 0,
        "adjectives": [
            "LURKI"
        ]
    },
    "GUANO": {
        "id": "GUANO",
        "name": "GUANO",
        "synonyms": [
            "CRAP SHIT HUNK"
        ],
        "initialDescription": "There is a hunk of bat guano here.",
        "description": "hunk of bat guano",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 20,
        "capacity": 0
    },
    "GUIDE": {
        "id": "GUIDE",
        "name": "GUIDE",
        "synonyms": [
            "BOOK"
        ],
        "initialDescription": "There are tour guidebooks here.",
        "description": "tour guidebook",
        "longDescription": "Some guidebooks entitled 'Flood Control Dam #3' are on the reception desk.",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0,
        "adjectives": [
            "TOUR"
        ]
    },
    "GUNK": {
        "id": "GUNK",
        "name": "GUNK",
        "synonyms": [
            "MESS",
            "SLAG"
        ],
        "initialDescription": "There is a small piece of vitreous slag here.",
        "description": "piece of vitreous slag",
        "action": "GUNK-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0,
        "adjectives": [
            "VITRE"
        ]
    },
    "HEADS": {
        "id": "HEADS",
        "name": "HEADS",
        "synonyms": [
            "HEAD POLE POLES PDL BKD TAA MARC IMPLE LOSER"
        ],
        "initialDescription": "There are four heads here, mounted securely on poles.",
        "description": "set of poled heads",
        "action": "HEAD-FUNCTION"
    },
    "HOOK1": {
        "id": "HOOK1",
        "name": "HOOK1",
        "synonyms": [
            "HOOK"
        ],
        "initialDescription": "There is a small hook attached to the rock here.",
        "description": "hook",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "HOOK2": {
        "id": "HOOK2",
        "name": "HOOK2",
        "synonyms": [
            "HOOK"
        ],
        "initialDescription": "There is a small hook attached to the rock here.",
        "description": "hook",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "HOUSE": {
        "id": "HOUSE",
        "name": "house",
        "description": "The house is a beautiful colonial house which is painted white. It is clear that the owners must have been extremely wealthy.",
        "flags": {
            "isScenery": true,
            "isNotDescribed": true
        }
    },
    "IBOAT": {
        "id": "IBOAT",
        "name": "IBOAT",
        "synonyms": [
            "BOAT PLAST PILE"
        ],
        "initialDescription": "There is a folded pile of plastic here which has a small valve attached.",
        "description": "plastic inflatable boat",
        "action": "IBOAT-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 20,
        "capacity": 0
    },
    "ICE": {
        "id": "ICE",
        "name": "ICE",
        "synonyms": [
            "GLACI"
        ],
        "initialDescription": "A mass of ice fills the western half of the room.",
        "description": "glacier",
        "action": "GLACIER",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "IRBOX": {
        "id": "IRBOX",
        "name": "iron box",
        "synonyms": [
            "BOX"
        ],
        "adjectives": [
            "IRON",
            "DENTE"
        ],
        "description": "iron box",
        "initialDescription": "There is a dented iron box here.",
        "flags": {
            "isVisible": true,
            "isTakeable": true,
            "isContainer": true
        },
        "size": 40,
        "trophyValue": 20,
        "contents": [
            "STRAD"
        ]
    },
    "JADE": {
        "id": "JADE",
        "name": "JADE",
        "synonyms": [
            "FIGUR"
        ],
        "initialDescription": "There is an exquisite jade figurine here.",
        "description": "jade figurine",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 5,
        "size": 10,
        "capacity": 0
    },
    "KEYS": {
        "id": "KEYS",
        "name": "KEYS",
        "initialDescription": "There is a set of skeleton keys here.",
        "description": "set of skeleton keys",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0
    },
    "KNIFE": {
        "id": "KNIFE",
        "name": "KNIFE",
        "synonyms": [
            "BLADE"
        ],
        "initialDescription": "There is a nasty-looking knife lying here.",
        "description": "knife",
        "longDescription": "On a table is a nasty-looking knife.",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0,
        "adjectives": [
            "NASTY"
        ]
    },
    "LABEL": {
        "id": "LABEL",
        "name": "LABEL",
        "synonyms": [
            "FINEP"
        ],
        "initialDescription": "There is a tan label here.",
        "description": "tan label",
        "action": "(Not",
        "canBeContainedBy": "RBOAT",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 2,
        "capacity": 0,
        "adjectives": [
            "TAN"
        ]
    },
    "LAMP": {
        "id": "LAMP",
        "name": "LAMP",
        "synonyms": [
            "LANTE"
        ],
        "initialDescription": "There is a brass lantern (battery-powered) here.",
        "description": "lamp",
        "longDescription": "A battery-powered brass lantern is on the trophy case.",
        "action": "LANTERN",
        "light": -1,
        "value": 0,
        "trophyValue": 0,
        "size": 15,
        "capacity": 0,
        "adjectives": [
            "BRASS"
        ]
    },
    "LANTERN": {
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
    "LCASE": {
        "id": "LCASE",
        "name": "LCASE",
        "synonyms": [
            "CASE"
        ],
        "initialDescription": "There is a large case here, containing objects which you used to possess.",
        "description": "large case",
        "action": "(Not",
        "adjectives": [
            "LARGE"
        ]
    },
    "LEAVE": {
        "id": "LEAVE",
        "name": "LEAVE",
        "synonyms": [
            "LEAF",
            "PILE"
        ],
        "initialDescription": "There is a pile of leaves on the ground.",
        "description": "pile of leaves",
        "action": "LEAF-PILE",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 25,
        "capacity": 0
    },
    "LISTS": {
        "id": "LISTS",
        "name": "LISTS",
        "synonyms": [
            "PAPER LIST PRINT LISTI STACK"
        ],
        "initialDescription": "There is an enormous stack of line-printer paper here. It is barely readable.",
        "description": "stack of listings",
        "longDescription": "There is a gigantic pile of line-printer output here. Although the paper once contained useful information, almost nothing can be distinguished now.",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 70,
        "text": "The rest is, alas, unintelligible (as were the implementers)."
    },
    "MACHI": {
        "id": "MACHI",
        "name": "MACHI",
        "synonyms": [
            "PDP10",
            "DRYER",
            "LID"
        ],
        "description": "machine",
        "action": "MACHINE-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 50
    },
    "MAILB": {
        "id": "MAILB",
        "name": "MAILB",
        "synonyms": [
            "BOX"
        ],
        "initialDescription": "There is a small mailbox here.",
        "description": "mailbox",
        "action": "(Not",
        "contents": [
            "ADVER"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 10
    },
    "MAILBOX": {
        "id": "MAILBOX",
        "name": "mailbox",
        "synonyms": [
            "MAIL",
            "BOX"
        ],
        "description": "A small mailbox",
        "initialDescription": "There is a mailbox here.",
        "flags": {
            "isContainer": true,
            "isVisible": true,
            "isOpen": false,
            "isTakeable": false
        },
        "capacity": 10,
        "contents": [
            "ADVER"
        ]
    },
    "MAT": {
        "id": "MAT",
        "name": "mat",
        "synonyms": [
            "rubber mat",
            "welcome mat"
        ],
        "description": "A rubber mat saying 'Welcome to Zork!' lies by the door.",
        "flags": {
            "isScenery": true,
            "isNotDescribed": true
        }
    },
    "MATCH": {
        "id": "MATCH",
        "name": "MATCH",
        "synonyms": [
            "FLINT"
        ],
        "initialDescription": "There is a matchbook whose cover says 'Visit Beautiful FCD#3' here.",
        "description": "matchbook",
        "action": "MATCH-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 2,
        "capacity": 0
    },
    "NEST": {
        "id": "NEST",
        "name": "nest",
        "description": "There is a nest here, containing a jewel-encrusted egg.",
        "flags": {
            "isContainer": true,
            "isVisible": true,
            "isScenery": true
        }
    },
    "ORICE": {
        "id": "ORICE",
        "name": "ORICE",
        "description": "orange icing",
        "action": "(Not",
        "canBeContainedBy": "ATABL",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0,
        "adjectives": [
            "ORANG",
            "ECCH"
        ]
    },
    "PAINT": {
        "id": "PAINT",
        "name": "PAINT",
        "synonyms": [
            "ART CANVA MASTE"
        ],
        "initialDescription": "A masterpiece by a neglected genius is here.",
        "description": "painting",
        "longDescription": "Fortunately, there is still one chance for you to be a vandal, for on the far wall is a work of unparalleled beauty.",
        "action": "PAINTING",
        "light": 0,
        "value": 4,
        "trophyValue": 7,
        "size": 15,
        "capacity": 0
    },
    "PAPER": {
        "id": "PAPER",
        "name": "PAPER",
        "synonyms": [
            "NEWSP",
            "ISSUE",
            "REPOR",
            "MAGAZ",
            "NEWS"
        ],
        "description": "newspaper",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 2,
        "capacity": 0
    },
    "PEARL": {
        "id": "PEARL",
        "name": "PEARL",
        "synonyms": [
            "NECKL"
        ],
        "initialDescription": "There is a pearl necklace here with hundreds of large pearls.",
        "description": "pearl necklace",
        "action": "(Not",
        "light": 0,
        "value": 9,
        "trophyValue": 5,
        "size": 10,
        "capacity": 0
    },
    "POOL": {
        "id": "POOL",
        "name": "pool of sewage",
        "synonyms": [
            "SEWAG"
        ],
        "adjectives": [
            "LARGE"
        ],
        "description": "pool of sewage",
        "initialDescription": "The leak has submerged the depressed area in a pool of sewage.",
        "flags": {
            "isVisible": true,
            "isWater": true,
            "isVictim": true,
            "isScenery": true
        }
    },
    "POT": {
        "id": "POT",
        "name": "POT",
        "initialDescription": "There is a pot of gold here.",
        "description": "pot filled with gold",
        "longDescription": "At the end of the rainbow is a pot of gold.",
        "action": "(Not",
        "light": 0,
        "value": 10,
        "trophyValue": 10,
        "size": 15,
        "capacity": 0,
        "adjectives": [
            "GOLD"
        ]
    },
    "PUBK": {
        "id": "PUBK",
        "name": "PUBK",
        "synonyms": [
            "BOOK"
        ],
        "initialDescription": "There is a purple book here.",
        "description": "purple book",
        "action": "(Not",
        "contents": [
            "STAMP"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 2,
        "adjectives": [
            "PURPL"
        ]
    },
    "PUMP": {
        "id": "PUMP",
        "name": "PUMP",
        "synonyms": [
            "AIR-P AIRPU"
        ],
        "initialDescription": "There is a small pump here.",
        "description": "hand-held air pump",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0
    },
    "PUTTY": {
        "id": "PUTTY",
        "name": "PUTTY",
        "synonyms": [
            "MATER",
            "GUNK",
            "GLUE"
        ],
        "initialDescription": "There is some gunk here",
        "description": "viscous material",
        "action": "(Not",
        "canBeContainedBy": "TUBE",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 6,
        "capacity": 0,
        "adjectives": [
            "VISCO"
        ]
    },
    "RBOAT": {
        "id": "RBOAT",
        "name": "RBOAT",
        "synonyms": [
            "BOAT"
        ],
        "initialDescription": "There is an inflated boat here.",
        "description": "magic boat",
        "action": "RBOAT-FUNCTION",
        "contents": [
            "LABEL"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 20,
        "capacity": 100,
        "adjectives": [
            "PLAST SEAWO"
        ]
    },
    "RBTLB": {
        "id": "RBTLB",
        "name": "RBTLB",
        "synonyms": [
            "PAPER"
        ],
        "initialDescription": "There is a green piece of paper here.",
        "description": "green piece of paper",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 3,
        "capacity": 0,
        "adjectives": [
            "GREEN"
        ],
        "text": "!!!! FROBOZZ MAGIC ROBOT COMPANY !!!! Hello, Master! I am a late-model robot, trained at MIT Tech to perform various simple household functions. Instructions for use: To activate me, use the following formula: >TELL ROBOT '' The quotation marks are required! Warranty: No warranty is expressed or implied. At your service!"
    },
    "RCAGE": {
        "id": "RCAGE",
        "name": "RCAGE",
        "synonyms": [
            "CAGE"
        ],
        "initialDescription": "There is an iron cage in the middle of the room.",
        "description": "iron cage",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 0,
        "capacity": 0,
        "adjectives": [
            "IRON"
        ]
    },
    "RDICE": {
        "id": "RDICE",
        "name": "RDICE",
        "synonyms": [
            "ICING"
        ],
        "description": "red icing",
        "action": "(Not",
        "canBeContainedBy": "ATABL",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0,
        "adjectives": [
            "RED",
            "ECCH"
        ]
    },
    "RECEP": {
        "id": "RECEP",
        "name": "RECEP",
        "description": "receptacle",
        "action": "(Not",
        "canBeContainedBy": "BALLO",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 6
    },
    "REFL1": {
        "id": "REFL1",
        "name": "REFL1",
        "synonyms": [
            "MIRRO"
        ],
        "description": "mirror",
        "action": "MIRROR-MIRROR",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "REFL2": {
        "id": "REFL2",
        "name": "REFL2",
        "synonyms": [
            "MIRRO"
        ],
        "description": "mirror",
        "action": "MIRROR-MIRROR",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0
    },
    "RKNIF": {
        "id": "RKNIF",
        "name": "RKNIF",
        "synonyms": [
            "KNIFE"
        ],
        "initialDescription": "There is a rusty knife here.",
        "description": "rusty knife",
        "longDescription": "Beside the skeleton is a rusty knife.",
        "action": "RUSTY-KNIFE",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 20,
        "capacity": 0,
        "adjectives": [
            "RUSTY"
        ]
    },
    "ROBOT": {
        "id": "ROBOT",
        "name": "ROBOT",
        "synonyms": [
            "R2D2 C3PO ROBBY"
        ],
        "initialDescription": "There is a robot here.",
        "description": "robot",
        "action": "ROBOT-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 0,
        "capacity": 0
    },
    "ROPE": {
        "id": "ROPE",
        "name": "ROPE",
        "synonyms": [
            "HEMP",
            "COIL"
        ],
        "initialDescription": "There is a large coil of rope here.",
        "description": "rope",
        "longDescription": "A large coil of rope is lying in the corner.",
        "action": "ROPE-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0
    },
    "RUBY": {
        "id": "RUBY",
        "name": "RUBY",
        "synonyms": [
            "RUBY"
        ],
        "initialDescription": "There is a moby ruby lying here.",
        "description": "ruby",
        "longDescription": "On the floor lies a moby ruby.",
        "action": "(Not",
        "light": 0,
        "value": 15,
        "trophyValue": 8,
        "size": 5,
        "capacity": 0
    },
    "RUG": {
        "id": "RUG",
        "name": "RUG",
        "synonyms": [
            "CARPE"
        ],
        "description": "carpet",
        "action": "RUG",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 0,
        "adjectives": [
            "ORIEN"
        ]
    },
    "SACK": {
        "id": "SACK",
        "synonyms": [
            "BAG"
        ],
        "adjectives": [
            "LEATH"
        ],
        "description": "leather sack",
        "initialDescription": "There is an old leather bag here.",
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
    "SAFE": {
        "id": "SAFE",
        "name": "SAFE",
        "synonyms": [
            "BOX"
        ],
        "description": "box",
        "action": "SAFE-FUNCTION",
        "contents": [
            "CROWN",
            "CARD"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 15
    },
    "SAFFR": {
        "id": "SAFFR",
        "name": "tin of rare spices",
        "synonyms": [
            "TIN"
        ],
        "adjectives": [
            "RARE"
        ],
        "description": "tin of rare spices",
        "initialDescription": "There is a tin of rare spices here.",
        "flags": {
            "isVisible": true,
            "isTakeable": true,
            "isFood": true
        },
        "value": 10,
        "trophyValue": 5,
        "size": 5
    },
    "SBAG": {
        "id": "SBAG",
        "name": "SBAG",
        "synonyms": [
            "BAG",
            "SACK",
            "BAGGI"
        ],
        "initialDescription": "A sandwich bag is here.",
        "description": "sandwich bag",
        "longDescription": "On the table is an elongated brown sack, smelling of hot peppers.",
        "action": "(Not",
        "contents": [
            "GARLI",
            "FOOD"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 3,
        "capacity": 15,
        "adjectives": [
            "BROWN"
        ]
    },
    "SCREW": {
        "id": "SCREW",
        "name": "SCREW",
        "initialDescription": "There is a screwdriver here.",
        "description": "screwdriver",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 5,
        "capacity": 0
    },
    "SHOVE": {
        "id": "SHOVE",
        "name": "SHOVE",
        "initialDescription": "There is a large shovel here.",
        "description": "shovel",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 15,
        "capacity": 0
    },
    "SPHER": {
        "id": "SPHER",
        "name": "SPHER",
        "synonyms": [
            "BALL"
        ],
        "initialDescription": "There is a beautiful crystal sphere here.",
        "description": "crystal sphere",
        "action": "SPHERE-FUNCTION",
        "light": 0,
        "value": 6,
        "trophyValue": 6,
        "size": 10,
        "capacity": 0,
        "adjectives": [
            "CRYST",
            "GLASS"
        ]
    },
    "SSLOT": {
        "id": "SSLOT",
        "name": "SSLOT",
        "synonyms": [
            "SLOT HOLE"
        ],
        "description": "hole",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 10
    },
    "STAMP": {
        "id": "STAMP",
        "name": "STAMP",
        "initialDescription": "There is a Flathead Commemorative stamp here.",
        "description": "stamp",
        "action": "(Not",
        "canBeContainedBy": "PUBK",
        "light": 0,
        "value": 4,
        "trophyValue": 10,
        "size": 1,
        "capacity": 0
    },
    "STATU": {
        "id": "STATU",
        "name": "STATU",
        "synonyms": [
            "SCULP ROCK"
        ],
        "initialDescription": "There is a beautiful statue here.",
        "description": "statue",
        "action": "(Not",
        "light": 0,
        "value": 10,
        "trophyValue": 13,
        "size": 8,
        "capacity": 0
    },
    "STICK": {
        "id": "STICK",
        "name": "STICK",
        "initialDescription": "There is a broken sharp stick here.",
        "description": "broken sharp stick",
        "longDescription": "A sharp stick, which appears to have been broken at one end, is here.",
        "action": "STICK-FUNCTION",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 3,
        "capacity": 0,
        "adjectives": [
            "SHARP BROKE"
        ]
    },
    "STILL": {
        "id": "STILL",
        "name": "STILL",
        "initialDescription": "There is a vicious-looking stilletto here.",
        "description": "stilletto",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0,
        "adjectives": [
            "VICIO"
        ]
    },
    "STRAD": {
        "id": "STRAD",
        "name": "Stradivarius",
        "synonyms": [
            "VIOLI"
        ],
        "adjectives": [
            "FANCY"
        ],
        "description": "fancy violin",
        "initialDescription": "There is a Stradivarius here.",
        "flags": {
            "isVisible": true,
            "isTakeable": true
        },
        "value": 10,
        "trophyValue": 10,
        "size": 10,
        "canBeContainedBy": "IRBOX"
    },
    "SWORD": {
        "id": "SWORD",
        "name": "SWORD",
        "synonyms": [
            "ORCRI",
            "GLAMD",
            "BLADE"
        ],
        "initialDescription": "There is an elvish sword here.",
        "description": "sword",
        "longDescription": "On hooks above the mantelpiece hangs an elvish sword of great antiquity.",
        "action": "SWORD",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 30,
        "capacity": 0,
        "adjectives": [
            "ELVIS"
        ]
    },
    "TCASE": {
        "id": "TCASE",
        "name": "TCASE",
        "synonyms": [
            "CASE"
        ],
        "initialDescription": "There is a trophy case here.",
        "description": "trophy case",
        "action": "TROPHY-CASE",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "adjectives": [
            "TROPH"
        ]
    },
    "THIEF": {
        "id": "THIEF",
        "name": "THIEF",
        "synonyms": [
            "ROBBE CROOK CRIME CRIMI BANDI GENT GENTL MAN SHADY THUG BAGMA MAFIA"
        ],
        "description": "thief",
        "action": "ROBBER-FUNCTION",
        "contents": [
            "STILL"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 4
    },
    "TOMB": {
        "id": "TOMB",
        "name": "TOMB",
        "synonyms": [
            "GRAVE"
        ],
        "initialDescription": "There is a tomb here, made of the finest marble, and large enough for four headless corpses. On one end is the cryptic inscription:",
        "description": "tomb",
        "action": "HEAD-FUNCTION",
        "text": "Here lie the implementers, whose heads were placed on poles by the Keeper of the Dungeon for amazing untastefulness."
    },
    "TORCH": {
        "id": "TORCH",
        "name": "TORCH",
        "initialDescription": "There is an ivory torch here.",
        "description": "torch",
        "longDescription": "Sitting on the pedestal is a flaming torch, made of ivory.",
        "action": "(Not",
        "light": 1,
        "value": 14,
        "trophyValue": 6,
        "size": 20,
        "capacity": 0,
        "adjectives": [
            "IVORY"
        ]
    },
    "TRAP-DOOR": {
        "id": "TRAP-DOOR",
        "name": "trap door",
        "synonyms": [
            "trapdoor",
            "cover",
            "TRAPD",
            "TRAP-"
        ],
        "adjectives": [
            "trap",
            "dusty"
        ],
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
    "TRIDE": {
        "id": "TRIDE",
        "name": "TRIDE",
        "synonyms": [
            "FORK"
        ],
        "initialDescription": "Neptune's own crystal trident is here.",
        "description": "crystal trident",
        "longDescription": "On the shore lies Neptune's own crystal trident.",
        "action": "(Not",
        "light": 0,
        "value": 4,
        "trophyValue": 11,
        "size": 20,
        "capacity": 0,
        "adjectives": [
            "CRYST"
        ]
    },
    "TROLL": {
        "id": "TROLL",
        "name": "TROLL",
        "description": "troll",
        "action": "TROLL",
        "contents": [
            "AXE"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "capacity": 2
    },
    "TROPHY-CASE": {
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
    "TRUNK": {
        "id": "TRUNK",
        "name": "TRUNK",
        "synonyms": [
            "CHEST"
        ],
        "initialDescription": "There is an old trunk here, bulging with assorted jewels.",
        "description": "trunk with jewels",
        "longDescription": "Lying half buried in the mud is an old trunk, bulging with jewels.",
        "action": "(Not",
        "light": 0,
        "value": 15,
        "trophyValue": 8,
        "size": 35,
        "capacity": 0
    },
    "TUBE": {
        "id": "TUBE",
        "name": "TUBE",
        "initialDescription": "There is an object which looks like a tube of toothpaste here.",
        "description": "tube",
        "action": "TUBE-FUNCTION",
        "contents": [
            "PUTTY"
        ],
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 7
    },
    "WATER": {
        "id": "WATER",
        "name": "WATER",
        "synonyms": [
            "LIQUI",
            "H2O"
        ],
        "initialDescription": "Water",
        "description": "quantity of water",
        "longDescription": "There is some water here",
        "action": "WATER-FUNCTION",
        "canBeContainedBy": "BOTTL",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 4,
        "capacity": 0
    },
    "WHBK": {
        "id": "WHBK",
        "name": "WHBK",
        "synonyms": [
            "BOOK"
        ],
        "initialDescription": "There is a white book here.",
        "description": "white book",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 2,
        "adjectives": [
            "WHITE"
        ]
    },
    "WINDOW": {
        "id": "WINDOW",
        "name": "window",
        "synonyms": [
            "win",
            "WINDO"
        ],
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
    "WRENC": {
        "id": "WRENC",
        "name": "WRENC",
        "initialDescription": "There is a wrench here.",
        "description": "wrench",
        "action": "(Not",
        "light": 0,
        "value": 0,
        "trophyValue": 0,
        "size": 10,
        "capacity": 0
    },
    "WRENCH": {
        "id": "WRENCH",
        "name": "wrench",
        "synonyms": [],
        "description": "wrench",
        "initialDescription": "There is a wrench here.",
        "flags": {
            "isVisible": true,
            "isTakeable": true,
            "isTool": true
        },
        "size": 5
    },
    "ZORKM": {
        "id": "ZORKM",
        "name": "ZORKM",
        "synonyms": [
            "COIN"
        ],
        "initialDescription": "There is an engraved zorkmid coin here.",
        "description": "priceless zorkmid",
        "longDescription": "On the floor is a gold zorkmid coin (a valuable collector's item).",
        "action": "(Not",
        "light": 0,
        "value": 10,
        "trophyValue": 12,
        "size": 10,
        "capacity": 0,
        "adjectives": [
            "GOLD"
        ]
    }
};
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
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["MAILBOX", "ADVER", "MAT", "FRONT-DOOR"]
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
        "flags": { "isOnLand": true, "isLit": true },
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
        "flags": { "isOnLand": true, "isLit": true },
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
        "conditionalExits": {
            "WEST": { "target": "MGRAT", "conditionFlag": "KEY-FLAG", "conditionValue": "CLEAR", "message": "The grating is locked" }
        },
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["LEAVES", "GRAT2"]
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
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["BOTTLE", "SACK"]
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
        "description": "You are in the living room. There is a doorway to the east. To the west is a wooden door with strange gothic lettering, which is closed. A dark staircase leads up and down. There is a trophy case here.",
        "exits": {
            "EAST": "KITCHEN",
            "UP": "UP-STAIRS",
            "DOWN": "CELLAR"
        },
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["TROPHY-CASE", "LANTERN", "RUG", "SWORD"]
    },
    {
        "id": "CELLAR",
        "name": "Cellar",
        "description": "You are in a dark and damp cellar with a narrow passage leading north. To the west is a circular room with a railing.",
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
    },
    {
        "id": "MAZE1",
        "name": "Maze",
        "description": "You are in a maze.",
        "longDescription": "You are in a maze.",
        "exits": {
            "WEST": "MTROL",
            "NORTH": "MAZE1",
            "SOUTH": "MAZE2",
            "EAST": "MAZE4"
        },
        "flags": { "isMaze": true, "isOnLand": true, "isLit": true }
    },
    {
        "id": "MAZE2",
        "name": "Maze",
        "description": "You are in a maze.",
        "longDescription": "You are in a maze.",
        "exits": {
            "SOUTH": "MAZE1",
            "NORTH": "MAZE4",
            "EAST": "MAZE3"
        },
        "flags": { "isMaze": true, "isOnLand": true, "isLit": true }
    },
    {
        "id": "MAZE3",
        "name": "Maze",
        "description": "You are in a maze.",
        "longDescription": "You are in a maze.",
        "exits": {
            "WEST": "MAZE2",
            "NORTH": "MAZE4",
            "UP": "MAZE5"
        },
        "flags": { "isMaze": true, "isOnLand": true, "isLit": true }
    },
    {
        "id": "MAZE4",
        "name": "Maze",
        "description": "You are in a maze.",
        "longDescription": "You are in a maze.",
        "exits": {
            "WEST": "MAZE3",
            "NORTH": "MAZE1",
            "EAST": "DEAD1"
        },
        "flags": { "isMaze": true, "isOnLand": true, "isLit": true }
    },
    {
        "id": "DEAD1",
        "name": "Dead End",
        "description": "You are in a dead end.",
        "longDescription": "You are in a dead end.",
        "exits": {
            "SOUTH": "MAZE4"
        },
        "flags": { "isOnLand": true, "isLit": true }
    },
    {
        "id": "MAZE5",
        "name": "Maze",
        "description": "You are in a maze.",
        "longDescription": "You are in a maze.",
        "exits": {
            "EAST": "DEAD2",
            "NORTH": "MAZE3",
            "SW": "MAZE6"
        },
        "flags": { "isMaze": true, "isOnLand": true, "isLit": true },
        "objects": ["BONES", "BAGCO", "KEYS", "BLANT", "RKNIF"]
    },
    {
        "id": "DEAD2",
        "name": "Dead End",
        "description": "You are in a dead end.",
        "longDescription": "You are in a dead end.",
        "exits": {
            "WEST": "MAZE5"
        },
        "flags": { "isOnLand": true, "isLit": true }
    },
    {
        "id": "MAZE6",
        "name": "Maze",
        "description": "You are in a maze.",
        "longDescription": "You are in a maze.",
        "exits": {
            "DOWN": "MAZE5",
            "EAST": "MAZE7",
            "WEST": "MAZE6",
            "UP": "MAZE9"
        },
        "flags": { "isMaze": true, "isOnLand": true, "isLit": true }
    },
    {
        "id": "MGRAT",
        "name": "Grating Room",
        "description": "You are in the Grating Room.",
        "longDescription": "Grating Room",
        "exits": {
            "SW": "MAZ11"
        },
        "conditionalExits": {
            "UP": { "target": "CLEAR", "conditionFlag": "KEY-FLAG", "conditionValue": "CLEAR", "message": "The grating is locked" }
        },
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["GRAT2"]
    },
    {
        "id": "STREA",
        "name": "Stream",
        "description": "You are in a stream. The stream travels to the north and the east.",
        "longDescription": "Stream",
        "exits": {
            "EAST": "RESES",
            "NORTH": "ICY"
        },
        "flags": { "isWater": true, "isOnLand": true, "isLit": true },
        "objects": ["FUSE"]
    },
    {
        "id": "EGYPT",
        "name": "Egyptian Room",
        "description": "You are in a room which looks like an Egyptian tomb. There is an ascending staircase in the room as well as doors, east and south.",
        "longDescription": "Egyptian Room",
        "exits": {
            "UP": "ICY",
            "SOUTH": "LEDG3"
        },
        "conditionalExits": {
            "EAST": { "target": "CRAW1", "conditionFlag": "EGYPT-FLAG", "conditionValue": "CRAW1", "message": "The passage is too narrow to accomodate coffins." }
        },
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["COFFI"]
    },
    {
        "id": "ICY",
        "name": "Glacier Room",
        "description": "You are in the Glacier Room.",
        "longDescription": "Glacier Room",
        "exits": {
            "NORTH": "STREA",
            "EAST": "EGYPT"
        },
        "conditionalExits": {
            "WEST": { "target": "RUBYR", "conditionFlag": "GLACIER-FLAG", "conditionValue": "RUBYR", "message": "The glacier blocks the way." }
        },
        "flags": { "isOnLand": true, "isLit": true }
    },
    {
        "id": "TEMP1",
        "name": "West Temple",
        "description": "You are in the west end of a large temple. On the south wall is an ancient inscription, probably a prayer in a long-forgotten language. The north wall is solid granite. The entrance at the west end of the room is through huge marble pillars.",
        "longDescription": "Temple",
        "exits": {
            "WEST": "MGRAT",
            "EAST": "TEMP2"
        },
        "flags": { "isSacred": true, "isLit": true, "isOnLand": true },
        "objects": ["PRAYE", "BELL"]
    },
    {
        "id": "TEMP2",
        "name": "East Temple",
        "description": "You are in the east end of a large temple. In front of you is what appears to be an altar.",
        "longDescription": "Altar",
        "exits": {
            "WEST": "TEMP1"
        },
        "flags": { "isSacred": true, "isLit": true, "isOnLand": true },
        "objects": ["BOOK", "CANDL", "TRUNK"]
    },
    {
        "id": "CYCLO",
        "name": "Cyclops Room",
        "description": "You are in a room with an exit on the west side, and a staircase leading up. The cyclops, perhaps affected by a drug in your drink, is sleeping.",
        "longDescription": "Cyclops Room",
        "exits": {
            "WEST": "MAZ15"
        },
        "conditionalExits": {
            "NORTH": { "target": "BLROO", "conditionFlag": "MAGIC-FLAG", "message": "The north wall is solid rock." },
            "UP": { "target": "TREAS", "conditionFlag": "CYCLOPS-FLAG", "message": "The cyclops doesn't look like he'll let you past." }
        },
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["CYCLO"]
    },
    {
        "id": "TREAS",
        "name": "Treasure Room",
        "description": "This is a large room, whose north wall is solid granite. A number of discarded bags, which crumble at your touch, are scattered about on the floor.",
        "longDescription": "Treasure Room",
        "exits": {
            "DOWN": "CYCLO"
        },
        "flags": { "isOnLand": true, "isLit": true, "isSacred": true },
        "objects": ["CHALI"]
    },
    {
        "id": "TWELL",
        "name": "Top of Well",
        "description": "You are at the top of the well. Well done. There are etchings on the side of the well. There is a small crack across the floor at the entrance to a room on the east, but it can be crossed easily.",
        "longDescription": "Top of Well",
        "exits": {
            "EAST": "ALICE"
        },
        "conditionalExits": {
            "DOWN": { "target": "BWELL", "message": "It's a long way down!" }
        },
        "flags": { "isOnLand": true, "isLit": true, "canFillBucket": true, "isWater": false }
    },
    {
        "id": "BWELL",
        "name": "Damp Circular Room",
        "description": "You are in a damp circular room, whose walls are made of brick and mortar.",
        "longDescription": "Damp Circular Room",
        "exits": {
            "UP": "TWELL"
        },
        "flags": { "isOnLand": true, "isLit": true },
        "objects": ["BRICK"]
    }
];
const vocabularyData = {
    "adjectives": [
        "brown", "nasty", "elvish", "brassy", "broken",
        "bloody",
        "leather",
        "platinum",
        "used", "burned", "dead", "useless",
        "glass",
        "rusty",
        "dented", "iron",
        "fancy",
        "one-eyed", "monstrous",
        "plastic", "with_hole",
        "shiny", "thin",
        "blue", "green", "purple", "white",
        "large",
        "crystal"
    ],
    "buzzwords": [
        "by", "is", "one", "it", "a", "the", "an", "this", "over",
        "of", "in", "on"
    ],
    "prepositions": [
        "with", "at", "to", "in", "on", "under", "into", "down",
        "out", "from", "up", "between", "behind", "through", "beside",
        "onto", "from_within"
    ],
    "verbs": [
        {"id": "ATTACK", "synonyms": ["hit", "fight", "strike", "chop", "kill", "murde", "slay", "dispa"]},
        {"id": "OPEN", "synonyms": ["open"]},
        {"id": "READ", "synonyms": ["skim", "scan"]},
        {"id": "TAKE", "synonyms": ["get", "carry", "pick", "grab"]},
        {"id": "DROP", "synonyms": ["leave", "put", "place"]},
        {"id": "LOOK", "synonyms": ["l", "stare", "gaze", "descr", "what", "whats", "what'"]},
        {"id": "EXAMINE", "synonyms": ["exami", "inspect", "check"]},
        {"id": "GO", "synonyms": ["walk", "run", "move"]},
        {"id": "MOVE", "synonyms": ["push", "pull", "shove", "move"]},
        {"id": "TURN-ON", "synonyms": ["on", "light", "ignit"]},
        {"id": "TURN-OFF", "synonyms": ["off", "extin", "douse"]},
        {"id": "GIVE", "synonyms": ["hand", "donat"]},
        {"id": "PLUG", "synonyms": ["plug"]},
        {"id": "RUB", "synonyms": ["cares", "touch", "fondl"]},
        {"id": "BURN", "synonyms": ["burn", "light"]},
        {"id": "CLOSE", "synonyms": ["close"]},
        {"id": "UNLOCK", "synonyms": ["unloc"]},
        {"id": "LOCK", "synonyms": ["lock"]},
        {"id": "TIE", "synonyms": ["tie"]},
        {"id": "RING", "synonyms": ["ring", "peal"]},
        {"id": "EAT", "synonyms": ["eat"]},
        {"id": "DRINK", "synonyms": ["drink"]},
        {"id": "BRUSH", "synonyms": ["brush"]},
        {"id": "UNTIE", "synonyms": ["untie"]},
        {"id": "THROW", "synonyms": ["throw", "toss"]},
        {"id": "MUNG", "synonyms": ["mung", "break"]},
        {"id": "SAVE", "synonyms": ["save"]},
        {"id": "RESTORE", "synonyms": ["resto"]},
        {"id": "QUIT", "synonyms": ["quit"]},
        {"id": "INVENTORY", "synonyms": ["inven", "list"]},
        {"id": "SCORE", "synonyms": ["score"]},
        {"id": "HELP", "synonyms": ["help", "info"]},
        {"id": "JUMP", "synonyms": ["leap", "vault"]},
        {"id": "ENTER", "synonyms": ["enter"]}
    ],
    "nouns": [
        {"id": "ADVER", "synonyms": ["pamphlet", "leaflet", "booklet"]},
        {"id": "AXE", "synonyms": ["bloody axe"]},
        {"id": "BAGCO", "synonyms": ["bag", "coins", "leather bag"]},
        {"id": "BAR", "synonyms": ["plati", "platinum bar"]},
        {"id": "BELL", "synonyms": ["brass bell"]},
        {"id": "LANTERN", "synonyms": ["lantern", "lamp", "brass lantern"]},
        {"id": "BLANT", "synonyms": ["lantern", "lamp", "burned-out lantern"]},
        {"id": "BOTTLE", "synonyms": ["glass bottle", "conta", "pitch"]},
        {"id": "KNIFE", "synonyms": ["nasty-looking knife"]},
        {"id": "LEAVES", "synonyms": ["pile", "leaves"]},
        {"id": "MAILBOX", "synonyms": ["mail", "box", "small mailbox"]},
        {"id": "NEST", "synonyms": ["egg", "jewel-encrusted egg"]},
        {"id": "ROPE", "synonyms": ["hemp", "coil", "large coil of rope"]},
        {"id": "SACK", "synonyms": ["bag", "leather sack"]},
        {"id": "SWORD", "synonyms": ["orcri", "glamd", "blade", "elvish sword"]},
        {"id": "TROPHY-CASE", "synonyms": ["case", "trophy case"]},
        {"id": "TRAP-DOOR", "synonyms": ["trapdoor", "cover", "trap", "dusty trap door"]},
        {"id": "TROLL", "synonyms": ["nasty-looking troll", "volcano gnome"]},
        {"id": "WATER", "synonyms": ["liqui", "h2o", "quantity of water"]},
        {"id": "WINDOW", "synonyms": ["win", "window"]},
        {"id": "HOUSE", "synonyms": ["white house"]},
        {"id": "MAT", "synonyms": ["rubber mat", "welcome mat"]},
        {"id": "FRONT-DOOR", "synonyms": ["door", "front door", "boarded door"]},
        {"id": "RKNIF", "synonyms": ["knife", "rusty knife"]},
        {"id": "GRAT2", "synonyms": ["grating", "grate"]},
        {"id": "ZORKMID", "synonyms": ["zorkm", "coin", "gold coin"]},
        {"id": "SAFE", "synonyms": ["box"]},
        {"id": "CARD", "synonyms": ["note"]},
        {"id": "FUSE", "synonyms": ["coil", "wire", "shiny wire"]},
        {"id": "BALLO", "synonyms": ["basket", "wicker basket"]},
        {"id": "PUMP", "synonyms": ["air-p", "airpu", "hand pump"]},
        {"id": "RBOAT", "synonyms": ["boat", "inflated boat"]},
        {"id": "CROWN", "synonyms": ["jeweled crown", "crown"]},
        {"id": "GRAIL", "synonyms": ["valuable grail", "original grail", "grail"]},
        {"id": "PLATINUM BAR", "synonyms": ["platinum bar"]},
        {"id": "KEYS", "synonyms": ["keys"]},
        {"id": "RUG", "synonyms": ["rug", "carpet"]}
    ],
    "directions": [
        {"id": "DOWN", "synonyms": ["d"]},
        {"id": "EAST", "synonyms": ["e"]},
        {"id": "EXIT", "synonyms": ["out", "leave"]},
        {"id": "NORTH", "synonyms": ["n"]},
        {"id": "SOUTH", "synonyms": ["s"]},
        {"id": "UP", "synonyms": ["u"]},
        {"id": "WEST", "synonyms": ["w"]},
        {"id": "NORTHEAST", "synonyms": ["ne"]},
        {"id": "NORTHWEST", "synonyms": ["nw"]},
        {"id": "SOUTHEAST", "synonyms": ["se"]},
        {"id": "SOUTHWEST", "synonyms": ["sw"]},
        {"id": "CROSS", "synonyms": ["cross"]},
        {"id": "CLIMB", "synonyms": ["climb"]}
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
/* Zork Game Code */
// RBITS: Room flags (Expanded based on MDL sources)
const RBITS = {
    RSEEN: 1 << 0,     // Player has been in the room
    RLIGHT: 1 << 1,    // Room is lit (MDL RLIGHT?)
    RDESC: 1 << 2,     // Room has a long description
    RMAZE: 1 << 3,     // Room is part of a maze
    RBUCK: 1 << 4,     // Player can fill a bucket here (MDL RBUCKBIT)
    RWATER: 1 << 5,    // Room is on/in water
    RFILL: 1 << 6,     // Room can be filled with water (MDL RFILLBIT)
    RHERE: 1 << 7,     // Something is here
    RNWALL: 1 << 8,    // No wall separating from another room
    RSACRD: 1 << 9,    // Sacred room (MDL RSACREDBIT)
    RWIN: 1 << 10,     // Player has won
    RSTRNG: 1 << 11,   // Player is strengthened here
    RART: 1 << 12,     // Room contains an artifact
    RCLIMB: 1 << 13,   // Room can be climbed
    RDIR: 1 << 14,     // Directional room
    NONLAND: 1 << 15,  // Not on land (This appears to be inverted in JS based on MDL RLANDBIT)
    RLAND: 1 << 16,    // Room is on land (MDL RLANDBIT, inverse of NONLAND in JS)
    RHOUSE: 1 << 17,   // Room is part of the house (MDL RHOUSEBIT)
    RDESCBIT: 1 << 18  // Force room description (internal VM flag)
};

// OFLAGS: Object flags (Expanded based on MDL sources)
const OFLAGS = {
    TAKEBIT: 1 << 0,       // Object can be taken
    DOORBIT: 1 << 1,       // Object is a door
    OPENBIT: 1 << 2,       // Object is open (MDL OOPEN?)
    LOCKBIT: 1 << 3,       // Object is locked (Not directly in provided MDL, but implied for doors)
    CONTBIT: 1 << 4,       // Object is a container
    BURNBIT: 1 << 5,       // Object is flammable (MDL BURNBIT)
    WEAPONBIT: 1 << 6,     // Object is a weapon
    READBIT: 1 << 7,       // Object is readable
    SACREDBIT: 1 << 8,     // Object is sacred
    TOOLBIT: 1 << 9,       // Object is a tool
    DRINKBIT: 1 << 10,     // Object is drinkable
    FOODBIT: 1 << 11,      // Object is food (MDL FOODBIT)
    TIEBIT: 1 << 12,       // Object can be tied (MDL TIEBIT)
    VEHBIT: 1 << 13,       // Object is a vehicle
    OVISON: 1 << 14,       // Object is visible (MDL OVISON)
    VILLAIN: 1 << 15,      // Object is a villain (MDL VILLAIN)
    VICBIT: 1 << 16,       // Object is a victim/can be attacked (MDL VICBIT)
    SLEEPBIT: 1 << 17,     // Object can be slept on
    SEARCHBIT: 1 << 18,    // Object can be searched
    CLIMBBIT: 1 << 19,     // Object can be climbed
    SCENERYBIT: 1 << 20,   // Object is scenery
    INVISIBLE: 1 << 21,    // Object is invisible
    DISARMEDBIT: 1 << 22,  // Object is disarmed (e.g., a trap)
    NOTDESCBIT: 1 << 23,   // Object is not described separately (MDL NDESCBIT)
    TRYTAKEBIT: 1 << 24    // Attempt to take object (MDL TRYTAKEBIT)
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

        // Additional properties from MDL
        this.synonyms = data.synonyms || [];
        this.adjectives = data.adjectives || [];
        this.capacity = data.capacity || 0;
        this.size = data.size || 0;
        this.value = data.value || 0;         // MDL OFVAL
        this.trophyValue = data.trophyValue || 0; // MDL OTVAL
        this.damage = data.damage || 0;       // For weapons (MDL implied by WEAPONBIT)
        this.health = data.health || 0;       // For villains (MDL implied by VICBIT)
        this.contents = data.contents || [];  // Objects contained within this object
        this.canBeContainedBy = data.canBeContainedBy || null; // What can contain this object (MDL OCAN)
        this.action = data.action || null;    // MDL OACTION
        this.trollState = {}; // For troll-specific logic

        this.initOFlags();
    }

    initOFlags() {
        this.oflags = 0;
        // Map boolean flags to bitmask
        if (this.flags.isTakeable) this.oflags |= OFLAGS.TAKEBIT;
        if (this.flags.isDoor) this.oflags |= OFLAGS.DOORBIT;
        if (this.flags.isOpen) this.oflags |= OFLAGS.OPENBIT;
        if (this.flags.isLocked) this.oflags |= OFLAGS.LOCKBIT;
        if (this.flags.isContainer) this.oflags |= OFLAGS.CONTBIT;
        if (this.flags.isFlammable) this.oflags |= OFLAGS.BURNBIT;
        if (this.flags.isWeapon) this.oflags |= OFLAGS.WEAPONBIT;
        if (this.flags.isReadable) this.oflags |= OFLAGS.READBIT;
        if (this.flags.isSacred) this.oflags |= OFLAGS.SACREDBIT;
        if (this.flags.isTool) this.oflags |= OFLAGS.TOOLBIT;
        if (this.flags.isDrinkable) this.oflags |= OFLAGS.DRINKBIT;
        if (this.flags.isFood) this.oflags |= OFLAGS.FOODBIT;
        if (this.flags.isTieable) this.oflags |= OFLAGS.TIEBIT;
        if (this.flags.isVehicle) this.oflags |= OFLAGS.VEHBIT;
        if (this.flags.isVisible) this.oflags |= OFLAGS.OVISON;
        if (this.flags.isVillain) this.oflags |= OFLAGS.VILLAIN;
        if (this.flags.isVictim) this.oflags |= OFLAGS.VICBIT; // Can be attacked
        if (this.flags.isSleptOn) this.oflags |= OFLAGS.SLEEPBIT;
        if (this.flags.isSearchable) this.oflags |= OFLAGS.SEARCHBIT;
        if (this.flags.isClimbable) this.oflags |= OFLAGS.CLIMBBIT;
        if (this.flags.isScenery) this.oflags |= OFLAGS.SCENERYBIT;
        if (this.flags.isInvisible) this.oflags |= OFLAGS.INVISIBLE;
        if (this.flags.isDisarmed) this.oflags |= OFLAGS.DISARMEDBIT;
        if (this.flags.isNotDescribed) this.oflags |= OFLAGS.NOTDESCBIT;
        if (this.flags.isTryTakeable) this.oflags |= OFLAGS.TRYTAKEBIT;
        // Keep isLight for dynamic state rather than static flag
    }
}

class Room {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.exits = data.exits || {};     // Standard exits
        this.conditionalExits = data.conditionalExits || {}; // For MDL #CEXIT
        this.objects = data.objects || []; // IDs of objects initially in the room
        this.flags = data.flags || {};     // Original boolean flags
        this.rbits = 0;                    // Bitmask for RBITS

        // Additional properties derived from MDL
        this.longDescription = data.longDescription || data.description; // MDL RDESC1
        this.shortDescription = data.shortDescription || data.name; // MDL RDESC2
        this.action = data.action || null; // MDL RACTION
        this.value = data.value || 0;      // MDL RVAL

        this.initRFlags();
    }

    initRFlags() {
        this.rbits = 0;
        // Map boolean flags to bitmask
        if (this.flags.isSeen) this.rbits |= RBITS.RSEEN;
        if (this.flags.isLit) this.rbits |= RBITS.RLIGHT;
        if (this.flags.hasLongDescription) this.rbits |= RBITS.RDESC;
        if (this.flags.isMaze) this.rbits |= RBITS.RMAZE;
        if (this.flags.canFillBucket) this.rbits |= RBITS.RBUCK;
        if (this.flags.isWater) this.rbits |= RBITS.RWATER;
        if (this.flags.canBeFilled) this.rbits |= RBITS.RFILL;
        if (this.flags.somethingIsHere) this.rbits |= RBITS.RHERE;
        if (this.flags.noNorthWall) this.rbits |= RBITS.RNWALL;
        if (this.flags.isSacred) this.rbits |= RBITS.RSACRD;
        if (this.flags.playerWon) this.rbits |= RBITS.RWIN;
        if (this.flags.playerStrengthened) this.rbits |= RBITS.RSTRNG;
        if (this.flags.containsArtifact) this.rbits |= RBITS.RART;
        if (this.flags.isClimbable) this.rbits |= RBITS.RCLIMB;
        if (this.flags.isDirectional) this.rbits |= RBITS.RDIR;
        if (this.flags.isNonLand) this.rbits |= RBITS.NONLAND; // MDL inverted mapping
        if (this.flags.isOnLand) this.rbits |= RBITS.RLAND; // Direct mapping for clarity
        if (this.flags.isHouse) this.rbits |= RBITS.RHOUSE;
        // RDESCBIT is a dynamic flag, not static room property
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

class Exit {
    constructor({
        direction,
        roomId,
        condition = null, // Can be a flag name (string) or a function
        message = null // Message to show if exit is blocked
    }) {
        this.direction = direction;
        this.roomId = roomId;
        this.condition = condition;
        this.message = message;
    }
}
class UI {
    constructor(terminalElement, inputElement) {
        this.terminalElement = terminalElement;
        this.inputElement = inputElement;
        this.buffer = [];
        this.MAX_LINES = 24;
        this.prompt = '> ';
        this.onInputCallback = null;

        window.addEventListener('click', () => {
            this.inputElement.focus();
        });
        this.terminalElement.addEventListener('wheel', (e) => e.preventDefault());
    }

    render() {
        const displayBuffer = this.buffer.slice(-this.MAX_LINES);

        // Add cursor to the last line for rendering
        if (displayBuffer.length > 0) {
            const lastLineIndex = displayBuffer.length - 1;
            // Create a temporary copy to modify for rendering
            const tempLine = displayBuffer[lastLineIndex];
            displayBuffer[lastLineIndex] = tempLine + '<span class="cursor"></span>';
        }

        this.terminalElement.innerHTML = displayBuffer.join('\n');
        this.terminalElement.scrollTop = this.terminalElement.scrollHeight;
    }

    // For initial game output
    start(initialText) {
        const lines = initialText.split('\n');
        this.buffer.push(...lines);
        this.buffer.push(this.prompt);
        this.render();
    }

    updateInput(text) {
        if (this.buffer.length > 0) {
            // The last line is always the input line
            this.buffer[this.buffer.length - 1] = this.prompt + text;
            this.render();
        }
    }

    onInput(callback) {
        this.onInputCallback = callback;

        this.inputElement.addEventListener('input', () => {
            this.updateInput(this.inputElement.value);
        });

        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = this.inputElement.value;
                this.inputElement.value = '';

                // 1. Lock the input line into history
                this.buffer[this.buffer.length - 1] = this.prompt + command;

                // 2. Send input to game engine and get output
                const gameOutput = this.onInputCallback(command);

                // 3. Append game response
                if (gameOutput) {
                    const lines = gameOutput.split('\n');
                    // If the last line of output is empty, remove it, as we add our own prompt
                    if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
                        lines.pop();
                    }
                    this.buffer.push(...lines);
                }

                // 4. Finally, append the new prompt for the next input
                this.buffer.push(this.prompt);

                // Trim buffer
                while (this.buffer.length > this.MAX_LINES) {
                    this.buffer.shift();
                }

                this.render();
            }
        });
    }

    // This method is not needed if the logic is handled in onInput
    display() {}
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
            return `${dobj.name}: Taken.`;
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
        if (hasFlag(dobj.oflags, OFLAGS.CONTBIT)) {
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
            const leaflet = game.objects.get('ADVER');
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
            trapDoor.location = game.player.location;
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

        troll.trollState = troll.trollState || { unconscious: false, hits: 0 };

        troll.trollState.hits++;

        if (troll.trollState.hits >= 2) {
             troll.trollState.unconscious = true;
             troll.description = "The troll is lying on the ground, unconscious.";
             return "The troll is knocked out!";
        } else {
             return "A furious but glancing blow is struck.\nThe troll's axe barely misses your ear.";
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

        // Set initial locations for objects contained within other objects
        for (const container of this.objects.values()) {
            if (container.contents && container.contents.length > 0) {
                for (const objectId of container.contents) {
                    if (this.objects.has(objectId)) {
                        this.objects.get(objectId).location = container.id;
                    }
                }
            }
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
        let description = `${room.name}\n${room.description}`;

        const objectsInRoom = Array.from(this.objects.values()).filter(
            (obj) => obj.location === room.id &&
                     !hasFlag(obj.oflags, OFLAGS.INVISIBLE) &&
                     !hasFlag(obj.oflags, OFLAGS.NOTDESCBIT)
        );

        // Sort objects based on the order in the room's object list
        objectsInRoom.sort((a, b) => {
            const aIndex = room.objects.indexOf(a.id);
            const bIndex = room.objects.indexOf(b.id);
            return aIndex - bIndex;
        });

        if (objectsInRoom.length > 0) {
            description += '\n' + objectsInRoom.map((obj) => obj.longDescription || obj.initialDescription).join('\n');
        }
        return description;
    }
}

// Main entry point for the browser-based game.
async function main() {
    // Get references to the DOM elements
    const terminalElement = document.getElementById('terminal');
    const inputElement = document.getElementById('input');

    // Instantiate the UI and Game
    const ui = new UI(terminalElement, inputElement);
    const game = new Game({
        objects: objectsData,
        rooms: roomsData,
        vocabulary: vocabularyData,
        deathMessages: deathMessagesData
    });

    // Set up the input handler. The callback passed to onInput
    // will be executed when the user enters a command. It passes
    // the command to the game's tick function and returns the result.
    ui.onInput((command) => {
        return game.tick(command);
    });

    // Display the initial room description to start the game.
    const initialOutput = game.look();
    ui.start(initialOutput);
}

// Start the game when the DOM is ready
document.addEventListener('DOMContentLoaded', main);
