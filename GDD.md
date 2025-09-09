# Game Design Document: Zork.js

## 1. Introduction

This document outlines the design for Zork.js, a web-based port of the original 1977 MDL version of the classic text adventure game, Zork. The goal of this project is to create a faithful replica of the original game that can be played in any modern web browser.

### 1.1. Game Summary

Zork is a text-based adventure game in which the player explores the Great Underground Empire (GUE) in search of treasure. The game is known for its rich, detailed world, its challenging puzzles, and its witty, conversational parser.

### 1.2. Design Goals

*   **Authenticity:** To create a version of Zork that is as close as possible to the original 1977 MDL version in terms of gameplay, puzzles, and text.
*   **Accessibility:** To make the game accessible to a wider audience by porting it to a web-based platform.
*   **Modernization:** To add some modern conveniences, such as a more user-friendly interface, without compromising the core gameplay experience.

## 2. Gameplay

### 2.1. Core Mechanics

The player interacts with the game world by typing text commands. The parser interprets these commands and responds with a description of the results. The player can move between rooms, pick up and use objects, interact with characters, and solve puzzles.

### 2.2. Player Actions

The player can perform a wide variety of actions, including:
*   **Movement:** `north`, `south`, `east`, `west`, `up`, `down`, etc.
*   **Object Interaction:** `take`, `drop`, `open`, `close`, `read`, `examine`, etc.
*   **Character Interaction:** `attack`, `give`, `ask`, `tell`, etc.
*   **Other:** `look`, `inventory`, `score`, `quit`, etc.

### 2.3. Puzzles

Zork is famous for its clever and challenging puzzles. These puzzles often require the player to use objects in creative ways, to pay close attention to the text descriptions, and to think outside the box. Some of the most famous puzzles include the cyclops, the loud room, and the maze.

## 3. World

### 3.1. The Great Underground Empire

The game is set in the Great Underground Empire, a vast and dangerous underground world. The empire is filled with strange creatures, ancient ruins, and valuable treasures.

### 3.2. Rooms

The game is divided into a large number of rooms, each with its own unique description and set of objects and characters. The player can move between rooms by typing directional commands.

### 3.3. Objects

The game contains a wide variety of objects that the player can interact with. These objects can be used to solve puzzles, to fight monsters, or to gain access to new areas.

### 3.4. Characters

The game features a small cast of non-player characters (NPCs) that the player can interact with. These characters can provide clues, help the player solve puzzles, or act as obstacles. The most notable characters are the thief and the cyclops.

## 4. Rooms

| ID | Name | Description |
| --- | --- | --- |
| ALICE | Tea Room | You are in a small square room, in the center of which is a large oblong table, no doubt set for afternoon tea. It is clear from the objects on the table that the users were indeed mad. In the eastern corner of the room is a small hole (no more that four inches high). There are passageways leading away to the west and the northwest. |
| ALISM | Posts Room | You are in an enormous room, in the center of which are four wooden posts delineating a rectanular area, above which is what appears to be a wooden roof. In fact, all objects in this room appear to be abnormally large. To the east is a passageway. There is a large chasm on the west and the northwest. |
| ALITR | Pool Room | You are in a large room, one half of which is depressed. There is a large leak in the ceiling through which brown colored goop is falling. The only exit to this room is to the west. |
| ATLAN | Atlantis Room | You are in an ancient room, long buried by the Reservoir.  There are exits here to the southeast and upward. |
| ATTIC | Attic | You are in the attic. The only exit is stairs that lead down. |
| BARRE | Barrel | You are in a barrel. Congratulations. Etched into the side of the barrel is the word 'Geronimo!'. |
| BATS | Bat Room | You are in a small room that smells of bat droppings. A passage leads to the east. |
| BEACH | Sandy Beach | You are on a large sandy beach at the shore of the river, which is flowing quickly by. A path runs beside the river to the south here. |
| BLADD | Ladder Bottom | You are in a rather wide room. On one side is the bottom of a narrow wooden ladder. To the northeast and the south are passages leaving the room. |
| BLROO | Strange Passage | You are in a long passage. To the south is one entrance. On the east there is an old wooden door, with a large hole in it (about cyclops sized). |
| BOOM | Gas Room | You are in a small room which smells strongly of coal gas. |
| BSHAF | Lower Shaft | You are in a small square room which is at the bottom of a long shaft. To the east is a passageway and to the northeast a very narrow passage. In the shaft can be seen a heavy iron chain. |
| BWELL | Circular Room | You are in a damp circular room, whose walls are made of brick and mortar. The roof of this room is not visible, but there appear to be some etchings on the walls. There is a passageway to the west. |
| CAGED | Cage | You are trapped inside an iron cage. |
| CAGER | Dingy Closet | You are in a dingy closet adjacent to the machine room. On one wall is a small sticker which says\n\t\tProtected by\n\t\t  FROBOZZ\n\t     Magic Alarm Company\n\t      (Hello, footpad!)\n |
| CANY1 | Deep Canyon | You are on the south edge of a deep canyon. Passages lead off to the east, south, and northwest. You can hear the sound of flowing water below. |
| CAROU | Round room | You are in a large, circular room with smooth, featureless walls. The room is rotating slowly. |
| CAVE1 | Cave | You are in a small cave with an entrance to the north and a stairway leading down. |
| CAVE2 | Cave | You are in a tiny cave with entrances west and north, and a dark, forbidding staircase leading down. |
| CAVE3 | Damp Cave | You are in a cave.  Passages exit to the south and to the east, but the cave narrows to a crack to the west.  The earth is particularly damp here. |
| CAVE4 | Engravings Cave | You have entered a cave with passages leading north and southeast. |
| CELLA | Cellar | You are in the cellar. A passage leads to the east, another to the south. A steep, slippery ramp descends to the west. The trap door is above you. |
| CHAS1 | Chasm | A chasm runs southwest to northeast. You are on the south edge; the path exits to the south and to the east. |
| CHAS2 | West of Chasm | You are on the west edge of a chasm, the bottom of which cannot be seen. The east side is sheer rock, providing no exits. A narrow passage goes west, and the path you are on continues to the north and south. |
| CHAS3 | Ancient Chasm | A chasm, evidently produced by an ancient river, runs through the cave here.  Passages lead off in all directions. |
| CLBOT | Canyon Bottom | You are beneath the walls of the river canyon which may be climbable here. There is a small stream here, which is the lesser part of the runoff of Aragain Falls. To the north is a narrow path. |
| CLEAR | Clearing | You are in a clearing, with a forest surrounding you on all sides. A path leads south. |
| CLMID | Rocky Ledge | You are on a ledge about halfway up the wall of the river canyon. You can see from here that the main flow from Aragain Falls twists along a passage which it is impossible to enter. Below you is the canyon bottom. Above you is more cliff, which still appears climbable. |
| CLTOP | Canyon View | You are at the top of the Great Canyon on its south wall. From here there is a marvelous view of the Canyon and parts of the Frigid River upstream. Across the canyon, the walls of the White Cliffs still appear to loom far above. Following the Canyon upstream (north and northwest), Aragain Falls may be seen, complete with rainbow. Fortunately, my vision is better than average and I can discern the top of the Flood Control Dam #3 far to the distant north. To the west and south can be seen an immense forest, stretching for miles around. It is possible to climb down into the canyon from here. |
| CMACH | Machine Room | You are in a room with a square button, a round button, and a triangular button. |
| CRAW1 | Rocky Crawl | You are in a crawlway with a three-foot high ceiling. Your footing is very unsure here due to the assortment of rocks underfoot. Passages can be seen in the east, west, and northwest corners of the passage. |
| CRAW2 | Steep Crawlway | You are in a steep and narrow crawlway. There are two exits nearby to the south and southwest. |
| CRAW3 | Narrow Crawlway | You are in a narrow crawlway. The crawlway leads from north to south. However the south passage divides to the south and southwest. |
| CRAW4 | North-South Crawlway | You are in a north-south crawlway; a passage goes to the east also. There is a hole above, but it provides no opportunities for climbing. |
| CYCLO | Cyclops Room | You are in a large room, obviously the chamber of the cyclops, who is sleeping on the floor. There is a staircase leading up. |
| DAM | Dam | You are standing on the top of the Frotz Dam, which was constructed in 1934. The dam is made of reinforced concrete, and is quite impressive. The spillway is to the north. The reservoir is to the south. |
| DEAD1 | Dead End | Dead End |
| DEAD2 | Dead End | You are in a dead end. |
| DEAD3 | Dead End | Dead End |
| DEAD4 | Dead End | Dead End |
| DEAD5 | Dead end | Dead end |
| DEAD6 | Dead end | Dead end |
| DEAD7 | Dead End | Dead End |
| DOCK | Dam Base | You are at the base of Flood Control Dam #3, which looms above you and to the north. The river Frigid is flowing by here. Across the river are the White Cliffs which seem to form a giant wall stretching from north to south along the east shore of the river as it winds its way downstream. |
| DOME | Dome Room | You are in a large dome-shaped room. |
| ECHO | Loud Room | You are in a large room with a ceiling which cannot be detected from the ground. There is a narrow passage from east to west and a stone stairway leading upward.  The room is extremely noisy.  In fact, it is difficult to hear yourself think. |
| EGYPT | Egyptian Room | You are in a room which looks like an Egyptian tomb. There is an ascending staircase in the room as well as doors, east and south. |
| EHOUS | Behind House | You are behind the white house. A path leads into the forest to the east. In one corner of the house there is a small window which is slightly ajar. |
| ENTRA | Mine Entrance | You are standing at the entrance of what might have been a coal mine. To the northeast and the northwest are entrances to the mine, and there is another exit on the south end of the room. |
| FALLS | Aragain Falls | You are at the top of Aragain Falls, an enormous waterfall with a drop of about 450 feet. The only path here is on the north end. |
| FANTE | Shore | You are on the shore of the River. The river here seems somewhat treacherous. A path travels from north to south here, the south end quickly turning around a sharp corner. |
| FCHMP | Moby lossage | You have gone over the falls and are now a soggy memory. |
| FORE1 | Forest | You are in a forest, with trees in all directions around you. |
| FORE2 | Forest | You are in a dimly lit forest, with large trees all around. To the east, there appears to be sunlight. |
| FORE3 | Forest | You are in a dimly lit forest, with large trees all around. To the east, there appears to be sunlight. |
| FORE4 | Forest | You are in a large forest, with trees obstructing all views except to the east, where a small clearing may be seen through the trees. |
| FORE5 | Forest | You are in a forest, with trees in all directions around you. |
| GALLE | Gallery | You are in an art gallery. Most of the paintings which were here have been stolen by vandals with exceptional taste. The vandals left through either the north or south exits. |
| ICY | Glacier Room | This is a large room, which is totally empty. It is also rather cold. |
| KITCH | Kitchen | You are in the kitchen of the white house. A table seems to have been used recently for the preparation of food. A passage leads to the west and a dark staircase can be seen leading upward. A dark chimney leads down and to the east is a small window which is open. |
| LAVA | Lava Room | You are in a small room, whose walls are formed by an old lava flow. There are exits here to the west and the south. |
| LEDG2 | Narrow Ledge | You are on a narrow ledge overlooking the inside of an old dormant volcano. This ledge appears to be about in the middle between the floor below and the rim above. There is an exit here to the south. |
| LEDG3 | Volcano View | You are on a ledge in the middle of a large volcano.  Below you the volcano bottom can be seen and above is the rim of the volcano. A couple of ledges can be seen on the other side of the volcano; it appears that this ledge is intermediate in elevation between those on the other side.  The exit from this room is to the east. |
| LEDG4 | Wide Ledge | You are on a wide ledge high into the volcano. The rim of the volcano is about 200 feet above and there is a precipitous drop below to the bottom. There is a small door to the south. |
| LIBRA | Library | You are in a room which must have been a large library, probably for the royal family. All of the shelves appear to have been gnawed to pieces by unfriendly gnomes. To the north is an exit. |
| LLD1 | Entrance to Hades | You are at the entrance to the Land of the Living Dead. A gate, decorated with strange carvings, is here. The gate is open. A dark passage leads to the east. |
| LLD2 | Land of the Living Dead | You are in the Land of the Living Dead, a large desolate room. Although it is apparently uninhabited, you can hear the sounds of thousands of lost souls weeping and moaning. |
| LOBBY | Dam Lobby | This room appears to have been the waiting room for groups touring the dam. There are exits here to the north and east marked 'Private', though the doors are open, and an exit to the south. |
| LROOM | Living Room | You are in the living room. There is a doorway to the east, a wooden door with strange gothic lettering to the west, which appears to be nailed shut, a trophy case, and a large oriental rug in the center of the room. |
| MACHI | Machine Room | You are in a large room which seems to be air-conditioned. In one corner there is a machine (?) which is shaped somewhat like a clothes dryer. On the 'panel' there is a switch which is labelled in a dialect of Swahili. Fortunately, I know this dialect and the label translates to START. The switch does not appear to be manipulable by any human hand (unless the fingers are about 1/16 by 1/4 inch). On the front of the machine is a large lid. |
| MAGNE | Low Room | You are in a low room with exits in all directions. A robot is here. |
| MAINT | Maintenance Room | You are in what appears to have been the maintenance room for Flood Control Dam #3, judging by the assortment of tool chests around the room. Apparently, this room has been ransacked recently, for most of the valuable equipment is gone. On the wall in front of you is a panel of buttons, which are labelled in EBCDIC. However, they are of different colors: Blue, Yellow, Brown, and Red. The doors to this room are in the west and south ends. |
| MAZ10 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZ11 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZ12 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZ13 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZ14 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZ15 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE1 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE2 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE3 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE4 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE5 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE6 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE7 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE8 | Maze | You are in a maze of twisty little passages, all alike. |
| MAZE9 | Maze | You are in a maze of twisty little passages, all alike. |
| MGRAI | Grail Room | You are standing in a small circular room with a pedestal. A set of stairs leads up, and passages leave to the east and west. |
| MGRAT | Grating Room | You are in a small room with a grating on the floor. The grating is locked. |
| MINE1 | Coal Mine | You are in a non-descript part of a coal mine. |
| MINE2 | Coal Mine | You are in a non-descript part of a coal mine. |
| MINE3 | Coal Mine | You are in a non-descript part of a coal mine. |
| MINE4 | Coal Mine | You are in a non-descript part of a coal mine. |
| MINE5 | Coal Mine | You are in a non-descript part of a coal mine. |
| MINE6 | Coal Mine | You are in a non-descript part of a coal mine. |
| MINE7 | Coal Mine | You are in a non-descript part of a coal mine. |
| MIRR1 | Mirror Room | You are in a large room containing a mirror. |
| MIRR2 | Mirror Room | You are in a large room containing a mirror. |
| MPEAR | Pearl Room | This is a former broom closet. The exits are to the east and west. |
| MTORC | Torch Room | You are in a small room with a pedestal. A wooden door leads to the west. |
| MTROL | The Troll Room | You are in a small room with passages off in all directions. Bloodstains and deep scratches (perhaps made by an axe) mar the walls. |
| NHOUS | North of House | You are facing the north side of a white house. There is no door here, and all the windows are barred. |
| PASS1 | East-West Passage | You are in a narrow east-west passageway. There is a narrow stairway leading down at the north end of the room. |
| PASS3 | Cold Passage | You are in a cold and damp corridor where a long east-west passageway intersects with a northward path. |
| PASS4 | Winding Passage | You are in a winding passage. It seems that there is only an exit on the east end although the whirring from the round room can be heard faintly to the north. |
| PASS5 | North-South Passage | You are in a high north-south passage, which forks to the northeast. |
| POG | End of Rainbow | You are on a small beach on the continuation of the Frigid River past the Falls. The beach is narrow due to the presence of the White Cliffs. The river canyon opens here and sunlight shines in from above. A rainbow crosses over the falls to the west and a narrow path continues to the southeast. |
| RAINB | Rainbow Room | You are on top of a rainbow (I bet you never thought you would walk on a rainbow), with a magnificent view of the Falls. The rainbow travels east-west here. There is an NBC Commissary here. |
| RAVI1 | Deep Ravine | You are in a deep ravine at a crossing with an east-west crawlway. Some stone steps are at the south of the ravine and a steep staircase descends. |
| RCAVE | Rocky Shore | You are on the west shore of the river. An entrance to a cave is to the northwest. The shore is very rocky here. |
| RESEN | Reservoir North | You are at the north end of a large reservoir. |
| RESES | Reservoir South | You are on the southern shore of a large reservoir. |
| RIDDL | Riddle Room | This is a room which is bare on all sides. There is an exit down. To the east is a great door made of stone. Above the stone, the following words are written: 'No man shall enter this room without solving this riddle:\n  What is tall as a house,\n\t  round as a cup, \n\t  and all the king's horses can't draw it up?' |
| RIVR1 | Frigid River | You are on the River Frigid in the vicinity of the Dam. The river flows quietly here. There is a landing on the west shore. |
| RIVR2 | Frigid River | The River turns a corner here making it impossible to see the Dam. The White Cliffs loom on the east bank and large rocks prevent landing on the west. |
| RIVR3 | Frigid River | The river descends here into a valley. There is a narrow beach on the east below the cliffs and there is some shore on the west which may be suitable. In the distance a faint rumbling can be heard. |
| RIVR4 | Frigid River | The river is running faster here and the sound ahead appears to be that of rushing water. On the west shore is a sandy beach. A small area of beach can also be seen below the Cliffs. |
| RIVR5 | Frigid River | The sound of rushing water is nearly unbearable here. On the west shore is a large landing area. |
| RUBYR | Ruby Room | You are in a small chamber behind the remains of the Great Glacier. To the south and west are small passageways. |
| SAFE | Dusty Room | You are in a dusty old room which is virtually featureless, except for an exit on the north side. |
| SHOUS | South of House | You are facing the south side of a white house. There is no door here, and all the windows are barred. |
| SLIDE | Slide Room | You are in a small chamber, which appears to have been part of a coal mine. On the south wall of the chamber the letters "Granite Wall" are etched in the rock. To the east is a long passage and there is a steep metal slide twisting downward. From the appearance of the slide, an attempt to climb up it would be impossible. To the north is a small opening. |
| SMELL | Smelly Room | You are in a small non-descript room. However, from the direction of a small descending staircase a foul odor can be detected. To the east is a narrow path. |
| SQUEE | Squeaky Room | You are a small room. Strange squeaky sounds may be heard coming from the passage at the west end. You may also escape to the south. |
| STREA | Stream | You are standing on a path beside a flowing stream. The path travels to the north and the east. |
| STUDI | Studio | You are in what appears to have been an artist's studio. The walls and floors are splattered with paints of 69 different colors. Strangely enough, nothing of value is hanging here. At the north and northwest of the room are open doors (also covered with paint). An extremely dark and narrow chimney leads up from a fireplace; although you might be able to get up it, it seems unlikely you could get back down. |
| TCAVE | Small Cave | You are in a small cave whose exits are on the south and northwest. |
| TEMP1 | Temple | You are in the west end of a large temple. On the south wall is an ancient inscription, probably a prayer in a long-forgotten language. The north wall is solid granite. The entrance at the west end of the room is through huge marble pillars. |
| TEMP2 | Altar | You are in the east end of a large temple. In front of you is what appears to be an altar. |
| TIMBE | Timber Room | You are in a long and narrow passage, which is cluttered with broken timbers. A wide passage comes from the north and turns at the southwest corner of the room into a very narrow passageway. |
| TLADD | Ladder Top | You are in a very small room. In the corner is a rickety wooden ladder, leading downward. It might be safe to descend. There is also a staircase leading upward. |
| TOMB | Tomb of the Unknown Implementer | You are in the Tomb of the Unknown Implementer.\nA hollow voice says:  "That's not a bug, it's a feature!" |
| TREAS | Treasure Room | This is a large room, whose north wall is solid granite. A number of discarded bags, which crumble at your touch, are scattered about on the floor. |
| TSHAF | Shaft Room | You are in a large room, in the middle of which is a small shaft descending through the floor into darkness below. To the west and the north are exits from this room. Constructed over the top of the shaft is a metal framework to which a heavy iron chain is attached. |
| TUNNE | Wooden Tunnel | You are in a narrow tunnel with large wooden beams running across the ceiling and around the walls. A path from the south splits into paths running west and northeast. |
| TWELL | Top of Well | You are at the top of the well. Well done. There are etchings on the side of the well. There is a small crack across the floor at the entrance to a room on the east, but it can be crossed easily. |
| VAIR1 | Volcano Core | You are about one hundred feet above the bottom of the volcano. The top of the volcano is clearly visible here. |
| VAIR2 | Volcano Core | You are about two hundred feet above the volcano floor. Looming above is the rim of the volcano. There is a small ledge on the west side. |
| VAIR3 | Volcano Core | You are high above the floor of the volcano. From here the rim of the volcano looks very narrow and you are very near it. To the east is what appears to be a viewing ledge, too thin to land on. |
| VAIR4 | Volcano Core | You are near the rim of the volcano which is only about 15 feet across. To the west, there is a place to land on a wide ledge. |
| VLBOT | Volcano Bottom | You are at the bottom of a large dormant volcano. High above you light may be seen entering from the cone of the volcano. The only exit here is to the north. |
| WCLF1 | White Cliffs Beach | You are on a narrow strip of beach which runs along the base of the White Cliffs. The only path here is a narrow one, heading south along the Cliffs. |
| WCLF2 | White Cliffs Beach | You are on a rocky, narrow strip of beach beside the Cliffs. A narrow path leads north along the shore. |
| WHOUS | West of House | You are in an open field west of a big white house, with a boarded front door. |

## 5. Objects

| ID | Name | Description |
| --- | --- | --- |
| ##### | cretin | You are here |
| ADVER | leaflet | There is a small leaflet here. |
| AXE | bloody axe | a bloody axe |
| BAGCO | bag of coins | An old leather bag, bulging with coins, is here. |
| BALLO | basket | There is a very large and extremely heavy wicker basket with a cloth bag here. Inside the basket is a metal receptacle of some kind. Attached to the basket on the outside is a piece of wire. |
| BAR | platinum bar | There is a large platinum bar here. |
| BELL | bell | There is a small brass bell here. |
| BLABE | blue label | There is a blue label here. |
| BLAMP | broken lamp | There is a broken brass lantern here. |
| BLANT | burned-out lantern | There is a burned-out lantern here. |
| BLBK | blue book | There is a blue book here. |
| BLICE | piece of cake with blue icing | There is a piece of cake with blue (ecch) icing here. |
| BONES | skeleton | A skeleton, probably the remains of a luckless adventurer, lies here. |
| BOOK | book | There is a large black book here. |
| BOTTL | glass bottle | A bottle is sitting on the table. |
| BRACE | sapphire bracelet | There is a sapphire-encrusted bracelet here. |
| BRICK | a square clay brick | a square clay brick |
| BROPE | braided wire | braided wire |
| BUCKE | wooden bucket | There is a wooden bucket here, 3 feet in diameter and 3 feet high. |
| BUOY | red buoy | There is a red buoy here (probably a warning). |
| CAGE | mangled cage | There is a mangled cage here. |
| CANDL | pair of candles | There are two candles here. |
| CARD | card | There is a card with writing on it here. |
| CBAG | cloth bag | cloth bag |
| CHALI | chalice | There is a silver chalice, intricately engraved, here. |
| COAL | small pile of coal | There is a small heap of coal here. |
| COFFI | gold coffin | There is a solid-gold coffin, used for the burial of Ramses II, here. |
| COKES | bunch of Coke bottles | Many empty Coke bottles are here. Alas, they can't hold water. |
| CROWN | crown | The excessively gaudy crown of Lord Dimwit Flathead is here. |
| CYCLO | cyclops | cyclops |
| DBALL | broken balloon | There is a balloon here, broken into pieces. |
| DBOAT | plastic boat (with hole) | There is a pile of plastic here with a large hole in it. |
| DIAMO | huge diamond | There is an enormous diamond (perfectly cut) here. |
| ECAKE | piece of 'Eat Me' cake | There is a piece of cake here with the words 'Eat Me' on it. |
| EMERA | large emerald | There is an emerald here. |
| FBASK | basket | basket |
| FLASK | glass flask filled with liquid | A stoppered glass flask with a skull-and-crossbones marking is here. The flask is filled with some clear liquid. |
| FOOD | hot pepper sandwich | A hot pepper sandwich is here. |
| FUSE | wire coil | There is a coil of thin shiny wire here. |
| GARLI | clove of garlic | There is a clove of garlic here. |
| GHOST | A ghostly figure floats in the air. | A ghostly figure floats in the air. |
| GNOME | Volcano Gnome | There is a nervous Volcano Gnome here. |
| GRAIL | grail | There is an extremely valuable (perhaps original) grail here. |
| GRBK | green book | There is a green book here. |
| GRUE | lurking grue | lurking grue |
| GUANO | hunk of bat guano | There is a hunk of bat guano here. |
| GUIDE | tour guidebook | There are tour guidebooks here. |
| GUNK | piece of vitreous slag | There is a small piece of vitreous slag here. |
| HEADS | set of poled heads | There are four heads here, mounted securely on poles. |
| HOOK1 | hook | There is a small hook attached to the rock here. |
| HOOK2 | hook | There is a small hook attached to the rock here. |
| IBOAT | plastic inflatable boat | There is a folded pile of plastic here which has a small valve attached. |
| ICE | glacier | A mass of ice fills the western half of the room. |
| IRBOX | iron box | There is a dented iron box here. |
| JADE | an exquisite jade figurine | There is an exquisite jade figurine here. |
| KEYS | set of skeleton keys | There is a set of skeleton keys here. |
| KNIFE | knife | knife |
| LABEL | tan label | There is a tan label here. |
| LAMP | lamp | A battery-powered brass lantern is on the trophy case. |
| LCASE | large case | There is a large case here, containing objects which you used to possess. |
| LEAVE | pile of leaves | There is a pile of leaves on the ground. |
| LISTS | stack of listings | There is an enormous stack of line-printer paper here. It is barely readable. |
| MACHI | machine | machine |
| MAILB | small mailbox | There is a small mailbox here. |
| MATCH | matchbook | There is a matchbook whose cover says 'Visit Beautiful FCD#3' here. |
| ORICE | piece of cake with orange icing | There is a piece of cake with orange icing here. |
| PAINT | painting | A masterpiece by a neglected genius is here. |
| PAPER | newspaper | newspaper |
| PEARL | pearl necklace | There is a pearl necklace here with hundreds of large pearls. |
| POOL | pool of sewage | The leak has submerged the depressed area in a pool of sewage. |
| POT | pot filled with gold | There is a pot of gold here. |
| PUBK | purple book | There is a purple book here. |
| PUMP | hand-held air pump | There is a small pump here. |
| PUTTY | viscous material | There is some gunk here |
| RBOAT | magic boat | There is an inflated boat here. |
| RBTLB | green piece of paper | There is a green piece of paper here. |
| RCAGE | iron cage | There is an iron cage in the middle of the room. |
| RDICE | piece of cake with red icing | There is a piece of cake with red icing here. |
| RECEP | receptacle | receptacle |
| REFL1 | mirror | mirror |
| REFL2 | mirror | mirror |
| RKNIF | rusty knife | There is a rusty knife here. |
| ROBOT | A shiny metal robot. | A shiny metal robot. |
| ROPE | rope | A coiled rope is here. |
| RUBY | ruby | There is a moby ruby lying here. |
| RUG | carpet | carpet |
| SAFE | box | box |
| SAFFR | tin of spices | There is a tin of rare spices here. |
| SBAG | sandwich bag | On the table is an elongated brown sack, smelling of hot peppers. |
| SCREW | screwdriver | There is a screwdriver here. |
| SHOVE | shovel | There is a large shovel here. |
| SPHER | crystal sphere | There is a beautiful crystal sphere here. |
| SSLOT | hole | hole |
| STAMP | stamp | There is a Flathead Commemorative stamp here. |
| STATU | statue | There is a beautiful statue here. |
| STICK | broken sharp stick | A sharp stick, which appears to have been broken at one end, is here. |
| STILL | vicious-looking stilletto | There is a vicious-looking stilletto here. |
| STRAD | fancy violin | There is a Stradavarius here. |
| SWORD | sword | On hooks above the mantelpiece hangs an elvish sword of great antiquity. |
| TBASK | basket | At the end of the chain is a basket. |
| TCASE | trophy case | trophy case |
| THIEF | There is a suspicious-looking individual, holding a bag, leaning against one wall. He is armed with a vicious-looking stilletto. | There is a suspicious-looking individual, holding a bag, leaning against one wall. He is armed with a vicious-looking stilletto. |
| TOMB | tomb | There is a tomb here, made of the finest marble, and large enough for four headless corpses. On one end is the cryptic inscription:\n\t\t    \n\t\t      \"Feel Free.\"\n |
| TORCH | torch | There is an ivory torch here. |
| TRIDE | crystal trident | Neptune's own crystal trident is here. |
| TROLL | A nasty-looking troll, brandishing a bloody axe. | A nasty-looking troll, brandishing a bloody axe. |
| TRUNK | an old trunk, bulging with assorted jewels | an old trunk, bulging with assorted jewels |
| TUBE | tube | There is an object which looks like a tube of toothpaste here. |
| WATER | quantity of water | quantity of water |
| WHBK | white book | There is a white book here. |
| WRENC | wrench | There is a wrench here. |
| ZORKM | priceless zorkmid | There is an engraved zorkmid coin here. |
