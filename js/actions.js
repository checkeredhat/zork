// js/actions.js

const actions = {
    'WINDOW-FUNCTION': (game, verb) => {
        const kitchenWindow = game.objects['KITCHEN-WINDOW'];
        const wind1 = game.objects['WIND1'];

        if (verb === 'open') {
            if (kitchenWindow.flags.isOpen) {
                game.ui.display("The window is already open.");
            } else {
                kitchenWindow.flags.isOpen = true;
                wind1.flags.isOpen = true;
                game.ui.display("With great effort, you open the window.");
            }
            return true;
        } else if (verb === 'close') {
            if (!kitchenWindow.flags.isOpen) {
                game.ui.display("The window is already closed.");
            } else {
                kitchenWindow.flags.isOpen = false;
                wind1.flags.isOpen = false;
                game.ui.display("The window closes.");
            }
            return true;
        }
        return false;
    },

    'KITCHEN': (game, verb, directObject, indirectObject, command) => {
        // This is a room-specific action to handle window operations without a direct object
        if (command && command.toLowerCase().includes('window')) {
            // The parser will give us the verb ('open' or 'close'). We can just call the main window function.
            return actions['WINDOW-FUNCTION'](game, verb);
        }
        return false;
    },

    'LEAF-PILE': (game, verb) => {
        if (verb === 'move') {
            const leaves = game.objects['LEAVE'];
            const grating = game.objects['GRAT1'];
            if (leaves.room === game.player.room) {
                game.ui.display("In disturbing the pile of leaves, you uncover a grating which was previously hidden from view.");
                leaves.room.objects = leaves.room.objects.filter(o => o.id !== 'LEAVE');
                delete leaves.room; // The leaves are scattered and gone
                grating.flags.isVisible = true;
                return true;
            }
        }
        return false;
    },

    'GRATING-ACTION': (game, verb, directObject, indirectObject) => {
        // directObject is the target (GRAT1), indirectObject is the tool (KEYS)
        const grating = directObject;

        if (verb === 'unlock') {
            if (indirectObject && indirectObject.id === 'KEYS') {
                if (grating.flags.isLocked === false) {
                    game.ui.display("The grating is already unlocked.");
                } else {
                    grating.flags.isLocked = false;
                    game.ui.display("The grating is now unlocked.");
                }
            } else {
                game.ui.display("You can't unlock the grating with that.");
            }
            return true;
        }

        if (verb === 'open') {
            if (grating.flags.isLocked) {
                game.ui.display("The grating is locked.");
                return true;
            }
            if (grating.flags.isOpen) {
                game.ui.display("It is already open.");
            } else {
                grating.flags.isOpen = true;
                game.ui.display("The grating opens to reveal a dark hole.");
            }
            return true;
        }

        if (verb === 'close') {
            if (!grating.flags.isOpen) {
                game.ui.display("It is already closed.");
            } else {
                grating.flags.isOpen = false;
                game.ui.display("You close the grating.");
            }
            return true;
        }

        if (verb === 'lock') {
            if (indirectObject && indirectObject.id === 'KEYS') {
                if (grating.flags.isLocked) {
                    game.ui.display("The grating is already locked.");
                } else {
                    if (grating.flags.isOpen) {
                        game.ui.display("You can't lock it while it's open.");
                    }
                    else {
                        grating.flags.isLocked = true;
                        game.ui.display("The grating is now locked.");
                    }
                }
            } else {
                game.ui.display("You can't lock it with that.");
            }
            return true;
        }

        return false;
    },

    'MAINT-ROOM': (game, verb, directObject, indirectObject) => {
        if (verb === 'plug') {
            if (directObject && directObject.id === 'LEAK') {
                if (indirectObject && indirectObject.id === 'PUTTY') {
                    const putty = game.objects['PUTTY'];
                    const hasPutty = game.player.inventory.includes(putty) || game.player.room.objects.includes(putty);

                    if (hasPutty) {
                        game.ui.display("By some miracle of elven technology, you have managed to stop the leak in the dam.");
                        game.damWaterLevel = 'low';

                        game.player.inventory = game.player.inventory.filter(o => o.id !== 'PUTTY');
                        game.player.room.objects = game.player.room.objects.filter(o => o.id !== 'PUTTY');

                        const leak = game.objects['LEAK'];
                        game.player.room.objects = game.player.room.objects.filter(o => o.id !== 'LEAK');
                        delete leak.room;

                        return true;
                    } else {
                        game.ui.display("You don't have any putty.");
                        return true;
                    }
                } else {
                    game.ui.display("You can't plug the leak with that.");
                    return true;
                }
            }
        }
        return false;
    },

    'LIVING-ROOM': (game, verb, directObject) => {
        const rug = game.objects['RUG'];
        const trapDoor = game.objects['TRAP-DOOR'];
        if (verb === 'move' && directObject.id === 'RUG') {
            if (rug.flags.isMoved) {
                game.ui.display("Having moved the carpet previously, you find it impossible to move it again.");
            } else {
                rug.flags.isMoved = true;
                trapDoor.flags.isVisible = true;
                game.ui.display("With a great effort, the rug is moved to one side of the room. With the rug moved, the dusty cover of a closed trap-door appears.");
            }
            return true;
        }
        return false;
    },

    'GLACIER': (game, verb, directObject) => {
        if (verb === 'throw') {
            if (directObject && directObject.id === 'TORCH') {
                const torch = directObject;
                if (torch.flags.isLit) {
                    game.ui.display("The torch hits the glacier and explodes into a great ball of flame, devouring the glacier. The water from the melting glacier rushes downstream, carrying the torch with it. In the place of the glacier, there is a passageway leading west.");
                    game.glacierMelted = true;
                    game.player.inventory = game.player.inventory.filter(obj => obj.id !== 'TORCH');
                    const ice = game.objects['ICE'];
                    const room = game.player.room;
                    room.objects = room.objects.filter(obj => obj.id !== 'ICE');
                    ice.room = null;
                } else {
                    game.ui.display("The glacier is unmoved by your ridiculous attempt.");
                }
            } else {
                game.ui.display("The glacier is unmoved by your ridiculous attempt.");
            }
            return true;
        } else if (verb === 'melt') {
             game.ui.display("How exactly are you going to melt this glacier?");
             return true;
        }
        return false;
    },

    'TROLL': (game, verb) => {
        const troll = game.objects['TROLL'];
        if (!troll.flags.isVillain) {
            return false;
        }
        if (verb === 'move') {
            game.ui.display("The troll spits in your face, saying 'Better luck next time.'");
            return true;
        }
        return false;
    },

    'TRAP-DOOR': (game, verb) => {
        const trapDoor = game.objects['TRAP-DOOR'];
        if (verb === 'open') {
            if (trapDoor.flags.isOpen) {
                game.ui.display("It's already open.");
            } else {
                trapDoor.flags.isOpen = true;
                game.ui.display("The door reluctantly opens to reveal a rickety staircase descending into darkness.");
            }
            return true;
        } else if (verb === 'close') {
            if (!trapDoor.flags.isOpen) {
                game.ui.display("It's already closed.");
            } else {
                trapDoor.flags.isOpen = false;
                game.ui.display("The door swings shut and closes.");
            }
            return true;
        }
        return false;
    },

    'READ-ADVER': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`(Taken)
"WELCOME TO DUNGEON!

DUNGEON is a game of adventure, danger, and low cunning. In it you will explore some of the most amazing territory ever seen by mortal man. Hardened adventurers have run screaming from the terrors contained within!

In DUNGEON the intrepid explorer delves into the forgotten secrets of a lost labyrinth deep in the bowels of the earth, searching for vast treasures long hidden from prying eyes, treasures guarded by fearsome monsters and diabolical traps!

No PDP-10 should be without one!"`);
            // In the original, taking the leaflet is automatic. We'll simulate that.
            const leaflet = game.objects['ADVER'];
            if (leaflet.room) {
                // Remove from room and add to inventory
                leaflet.room.objects = leaflet.room.objects.filter(obj => obj.id !== 'ADVER');
                game.player.inventory.push(leaflet);
                leaflet.room = null;
            }
            return true; // Handled
        }
        return false; // Not handled
    },

    'READ-BLABE': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"!!!! FROBOZZ MAGIC BALLOON COMPANY !!!!

Hello, Aviator!

Instructions for use:

   To get into balloon, say 'Board'
   To leave balloon, say 'Disembark'
   To land, say 'Land'

Warranty:

   No warranty is expressed or implied.  You're on your own, sport!

					Good Luck."`);
            return true;
        }
        return false;
    },

    'READ-GREEK': (game, verb) => {
        if (verb === 'read') {
            game.ui.display("This book is written in a tongue with which I am unfamiliar.");
            return true;
        }
        return false;
    },

    'READ-CARD': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"Warning:
    This room was constructed over very weak rock strata. Detonation of explosives in this room is strictly prohibited!
			Frobozz Magic Cave Company
			per M. Agrippa, foreman"`);
            return true;
        }
        return false;
    },

    'READ-GUIDE': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"Guide Book to Flood Control Dam #3

Flood Control Dam #3 (FCD#3) was constructed in year 783 of the Great Underground Empire to harness the destructive power of the Frigid River. This work was supported by a grant of 37 million zorkmids from the Central Bureaucracy and your omnipotent local tyrant Lord Dimwit Flathead the Excessive. This impressive structure is composed of 3.7 cubic feet of concrete, is 256 feet tall at the center, and 193 feet wide at the top. The reservoir created behind the dam has a volume of 37 billion cubic feet, an area of 12 million square feet, and a shore line of 36 thousand feet.

The construction of FCD#3 took 112 days from ground breaking to the dedication. It required a work force of 384 slaves, 34 slave drivers, 12 engineers, 2 turtle doves, and a partridge in a pear tree. The work was managed by a command team composed of 2345 bureaucrats, 2347 secretaries (at least two of which can type), 12,256 paper shufflers, 52,469 rubber stampers, 245,193 red tape processors, and nearly one million dead trees.

We will now point out some of the more interesting features of FCD#3 as we conduct you on a guided tour of the facilities:
1) You start your tour here in the Dam Lobby. You will notice on your right that ........."`);
            return true;
        }
        return false;
    },

    'READ-LABEL': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"!!!! FROBOZZ MAGIC BOAT COMPANY !!!!

Hello, Sailor!

Instructions for use:

   To get into boat, say 'Board'
   To leave boat, say 'Disembark'

   To get into a body of water, say 'Launch'
   To get to shore, say 'Land'

Warranty:

  This boat is guaranteed against all defects in parts and workmanship for a period of 76 milliseconds from date of purchase or until first used, whichever comes first.

Warning:
   This boat is made of plastic.		Good Luck!"`);
            return true;
        }
        return false;
    },

    'READ-LISTS': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"<DEFINE FEEL-FREE (LOSER)
<TELL \\"FEEL-FREE, CHOMPER!\\">>
...
The rest is, alas, unintelligible (as were the implementers)."`);
            return true;
        }
        return false;
    },

    'READ-PAPER': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"US NEWS & DUNGEON REPORT
12/12/77 - Late Dungeon Edition

In order to get a more-or-less working version, we have installed one with some known bugs..."`);
            return true;
        }
        return false;
    },

    'READ-RBTLB': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"!!!! FROBOZZ MAGIC ROBOT COMPANY !!!!

Hello, Master!

I am a late-model robot, trained at MIT Tech to perform various simple household functions.

Instructions for use:
To activate me, use the following formula:
>TELL ROBOT '<something to do>' <cr>
The quotation marks are required!

Warranty:
No warranty is expressed or implied.

At your service!"`);
            return true;
        }
        return false;
    },

    'READ-STAMP': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"---v----v----v----v----v----v----v----v---
| |
| |||||||||| LORD |
> !|||| | DIMWIT <
| |||| ---| FLATHEAD |
| |||C CC \\ |
> |||| _\\\\ |
| ||| (____| |
| || | |
> |______| Our <
| /   \\\\ Excessive |
| /     \\\\ Leader |
> | | |
| | | |
| |
> G.U.E. POSTAGE 3 Zorkmids <
| |
---^----^----^----^----^----^----^----^---"`);
            return true;
        }
        return false;
    },

    'READ-ZORKM': (game, verb) => {
        if (verb === 'read') {
            game.ui.display(`"--------------------------
/      Gold Zorkmid	 \\
/  T e n   T h o u s a n d   \\
/        Z O R K M I D S	   \\
/				    \\
/        ||||||||||||||||||	     \\
/        !||||		 ||||!	      \\
|	   |||   ^^  ^^   |||	       |
|	   |||	 OO  OO   |||	       |
| In Frobs  |||	   <<    |||  We Trust |
|	     || (______) ||	       |
|	      |          |	       |
|	      |__________|	       |
\\				      /
\\    -- Lord Dimwit Flathead --    /
\\    -- Beloved of Zorkers --    /
\\				   /
\\	     * 722 G.U.E. *       /
\\				 /
--------------------------"`);
            return true;
        }
        return false;
    },

    'DUMBWAITER': (game, verb) => {
        if (verb === 'raise') {
            if (game.isBasketAtTop) {
                game.ui.display("It's already at the top.");
            } else {
                const tshaft = game.rooms['TSHAF'];
                const bshaf = game.rooms['BSHAF'];
                const basket = game.objects['TBASK'];

                // Move basket from bottom to top
                bshaf.objects = bshaf.objects.filter(obj => obj.id !== basket.id);
                tshaft.objects.push(basket);
                basket.room = tshaft;

                game.isBasketAtTop = true;
                game.ui.display("The basket is raised to the top of the shaft.");
            }
            return true;
        } else if (verb === 'lower') {
            if (!game.isBasketAtTop) {
                game.ui.display("It's already at the bottom.");
            } else {
                const tshaft = game.rooms['TSHAF'];
                const bshaf = game.rooms['BSHAF'];
                const basket = game.objects['TBASK'];

                // Move basket from top to bottom
                tshaft.objects = tshaft.objects.filter(obj => obj.id !== basket.id);
                bshaf.objects.push(basket);
                basket.room = bshaf;

                game.isBasketAtTop = false;
                game.ui.display("The basket is lowered to the bottom of the shaft.");
            }
            return true;
        } else if (verb === 'take') {
            const currentRoomId = game.player.room.id;
            if ((game.isBasketAtTop && currentRoomId === 'TSHAF') || (!game.isBasketAtTop && currentRoomId === 'BSHAF')) {
                game.ui.display("The cage is securely fastened to the iron chain.");
            } else {
                game.ui.display("I don't see that here.");
            }
            return true;
        }
        return false;
    },

    'BOOM-ROOM': (game, verb, directObject) => {
        const isLightVerb = (verb === 'light' || verb === 'turn on');
        const hasLitObject = game.player.inventory.find(obj => (obj.id === 'CANDL' || obj.id === 'TORCH') && obj.flags.isLit);

        if (verb === 'walk-in' && hasLitObject) {
            const litObject = hasLitObject;
            game.ui.display(`Oh dear. It appears that the smell coming from this room was coal gas. I would have thought twice about carrying a ${litObject.description} in here.`);
            game.gameOver('BOMB');
            return true; // Handled
        }

        if (isLightVerb && (directObject.id === 'CANDL' || directObject.id === 'TORCH')) {
            game.ui.display(`I didn't realize that adventurers are stupid enough to light a ${directObject.description} in a room which reeks of coal gas. Fortunately, there is justice in the world.`);
            game.gameOver('BOMB');
            return true; // Handled
        }

        return false; // Not handled
    },

    'SWORD': (game) => {
        const sword = game.objects['SWORD'];
        if (!sword) return;

        const room = game.player.room;
        const villainsInRoom = room.objects.filter(obj => obj.flags.isVillain && obj.id !== 'THIEF'); // Thief is special

        if (villainsInRoom.length > 0) {
            // In the original, this is a demon that runs continuously.
            // For now, we'll just change the description when the player interacts with it.
            // A more complete solution would be to have a game tick that updates this.
            sword.description = "The elvish sword is glowing with a faint blue glow.";
            game.ui.display(sword.description);
        } else {
            // Reset description if no villains are present
            sword.description = "elvish sword";
        }
    },

    'WINDOW-FUNCTION': (game, verb, directObject) => {
        const window = directObject;
        const kitchenWindow = game.objects['KITCHEN-WINDOW'];
        if (verb === 'open') {
            if (window.flags.isOpen) {
                game.ui.display("It's already open.");
            } else {
                window.flags.isOpen = true;
                if (window.id === 'WIND1') {
                    kitchenWindow.flags.isOpen = true;
                }
                game.ui.display("With great effort, you open the window.");
            }
            return true;
        } else if (verb === 'close') {
            if (!window.flags.isOpen) {
                game.ui.display("It's already closed.");
            } else {
                window.flags.isOpen = false;
                if (window.id === 'WIND1') {
                    kitchenWindow.flags.isOpen = false;
                }
                game.ui.display("The window closes.");
            }
            return true;
        }
        return false;
    },

    'BATS-ROOM': (game, verb) => {
        if (verb === 'walk-in') {
            if (!game.player.inventory.find(obj => obj.id === 'GARLI')) {
                return window.gameActions['FLY-ME'](game);
            }
        } else if (verb === 'look') {
            if (game.player.inventory.find(obj => obj.id === 'GARLI')) {
                game.ui.display("You are in a small room which has only one door, to the east. In the corner of the room on the ceiling is a large vampire bat who is obviously deranged and holding his nose.");
                return true;
            }
        }
        return false;
    },

    'FLY-ME': (game) => {
        game.ui.display("A deranged giant vampire bat (a reject from WUMPUS) swoops down from his belfry and lifts you away....");
        const batDrops = ["MINE1", "MINE2", "MINE3", "MINE4", "MINE5", "MINE6", "MINE7", "TLADD", "BLADD"];
        const randomRoom = batDrops[Math.floor(Math.random() * batDrops.length)];
        game.player.room = game.rooms[randomRoom];
        game.look();
        return true;
    },

    'MACHINE-FUNCTION': (game, verb) => {
        const machine = game.objects['MACHI'];
        if (verb === 'open') {
            if (machine.flags.isOpen) {
                game.ui.display("It's already open.");
            } else {
                machine.flags.isOpen = true;
                game.ui.display("The lid opens.");
            }
            return true;
        } else if (verb === 'close') {
            if (!machine.flags.isOpen) {
                game.ui.display("It's already closed.");
            } else {
                machine.flags.isOpen = false;
                game.ui.display("The lid closes.");
            }
            return true;
        }
        return false;
    },

    'MSWITCH-FUNCTION': (game, verb, directObject, indirectObject) => {
        if (verb === 'turn') {
            if (indirectObject && indirectObject.id === 'SCREW') {
                const machine = game.objects['MACHI'];
                if (machine.flags.isOpen) {
                    game.ui.display("The machine doesn't seem to want to do anything.");
                } else {
                    game.ui.display("The machine comes to life (figuratively) with a dazzling display of colored lights and bizarre noises. After a few moments, the excitement abates.");
                    const coal = machine.contents.find(objId => objId === 'COAL');
                    const battery = machine.contents.find(objId => objId === 'BATTE');

                    if (coal) {
                        machine.contents = machine.contents.filter(objId => objId !== 'COAL');
                        machine.contents.push('DIAMO');
                        game.objects['DIAMO'].room = null; // Becomes a contained object
                        game.objects['DIAMO'].canContain = 'MACHI';
                    } else if (battery) {
                        machine.contents = machine.contents.filter(objId => objId !== 'BATTE');
                        machine.contents.push('RBATT');
                        game.objects['RBATT'].room = null; // Becomes a contained object
                        game.objects['RBATT'].canContain = 'MACHI';
                    } else if (machine.contents.length > 0) {
                        machine.contents = ['GUNK'];
                        game.objects['GUNK'].room = null;
                        game.objects['GUNK'].canContain = 'MACHI';
                    }
                }
            } else {
                game.ui.display("It seems that a " + (indirectObject ? indirectObject.description : "bare hand") + " won't do.");
            }
            return true;
        }
        return false;
    },

    'GUNK-FUNCTION': (game, verb) => {
        if (verb === 'take') {
            game.ui.display("The slag turns out to be rather insubstantial, and crumbles into dust at your touch. It must not have been very valuable.");
            const gunk = game.objects['GUNK'];
            if (gunk.room) {
                gunk.room.objects = gunk.room.objects.filter(obj => obj.id !== 'GUNK');
            } else if (gunk.canContain) {
                const container = game.objects[gunk.canContain];
                if (container) {
                    container.contents = container.contents.filter(objId => objId !== 'GUNK');
                }
            }
            return true;
        }
        return false;
    },

    'TUBE-FUNCTION': (game, verb, directObject, indirectObject) => {
        const tube = game.objects['TUBE'];
        if (verb === 'open') {
            if(tube.flags.isOpen) {
                game.ui.display("It's already open.");
            } else {
                tube.flags.isOpen = true;
                game.ui.display("You open the tube, and a viscous material oozes out.");
                const putty = game.objects['PUTTY'];
                putty.flags.isVisible = true;
                game.player.room.objects.push(putty);
            }
            return true;
        }
        return false;
    },
    'CHALICE': (game, verb) => {
        if (verb === 'take') {
            const thief = game.thief;
            const thiefObject = game.objects['THIEF'];
            // Check if the thief is present and not defeated
            if (thief.room === game.player.room && thiefObject.flags.isVillain) {
                game.ui.display("Realizing just in time that you'd be stabbed in the back if you attempted to take the chalice, you return to the fray.");
                return true; // Prevent the take action
            }
        }
        return false; // Otherwise, allow the default take action
    },

    'CYCLOPS': (game, verb, directObject) => {
        const cyclops = game.objects['CYCLO'];
        const player = game.player;

        if (verb === 'attack') {
            game.ui.display("The cyclops is much larger and stronger than you. Attacking it would be suicide.");
            return true;
        }

        if (verb === 'give' && directObject) {
            if (!player.inventory.includes(directObject)) {
                game.ui.display("You don't have that.");
                return true;
            }

            if (directObject.id === 'FOOD') {
                game.ui.display("The cyclops, who is not overly proud, graciously accepts the gift and not having the most discriminating tastes, gleefully eats it.");
                game.cyclopsIsThirsty = true;
                player.inventory = player.inventory.filter(obj => obj.id !== 'FOOD');
                game.ui.display("The cyclops now appears to be thirsty.");
                return true;
            }

            if (directObject.id === 'WATER') {
                if (game.cyclopsIsThirsty) {
                    game.ui.display("The cyclops drinks the water, then promptly falls asleep. The staircase is now unblocked.");
                    cyclops.flags.isVillain = false;
                    cyclops.description = "The cyclops is sleeping peacefully, snoring loudly.";
                    cyclops.initialDescription = "The cyclops is sleeping peacefully, snoring loudly.";
                    // Logic to remove water from bottle should be here or in the 'drink' action itself
                    const bottle = player.inventory.find(obj => obj.id === 'BOTTL');
                    if (bottle) {
                        bottle.contents = [];
                    }
                } else {
                    game.ui.display("The cyclops, not being thirsty, refuses your offer.");
                }
                return true;
            }

            game.ui.display("The cyclops is not so stupid as to eat THAT!");
            return true;
        }

        return false;
    },
    'CHALICE': (game, verb, directObject, indirectObject) => {
        // The chalice has no special actions in the original game.
        return false;
    },
    'PAINTING': (game, verb, directObject, indirectObject) => {
        if (verb === 'take') {
            game.ui.display("You take the painting. It's surprisingly heavy.");
            const painting = game.objects['PAINT'];
            game.player.room.objects = game.player.room.objects.filter(obj => obj.id !== 'PAINT');
            game.player.inventory.push(painting);
            return true;
        }
        return false;
    },
    'STILLETTO': (game, verb, directObject, indirectObject) => {
        // The stilletto is just a weapon. The combat system handles it.
        return false;
    },
    'ECHO-ROOM': (game, verb, directObject, indirectObject, command) => {
        if (game.isEchoFixed) {
            return false; // Don't handle if the echo is fixed
        }

        if (command.toLowerCase().trim() === 'echo') {
            game.isEchoFixed = true;
            game.ui.display("The acoustics of the room change subtly.");
        } else {
            game.ui.display(command);
        }

        return true; // Command is handled (or echoed)
    },

    'STICK-FUNCTION': (game, verb, directObject, indirectObject) => {
        if (verb === 'wave') {
            const room = game.player.room;
            if (room.id === 'FALLS' || room.id === 'POG') {
                const rainbow = game.objects['RAINB'];
                if (rainbow.flags.isSolid) {
                    rainbow.flags.isSolid = false;
                    game.ui.display("The rainbow seems to have become somewhat run-of-the-mill.");
                } else {
                    rainbow.flags.isSolid = true;
                    game.ui.display("Suddenly, the rainbow appears to become solid and, I venture, walkable (I think the giveaway was the stairs and bannister).");
                }
                return true;
            }
        }
        return false;
    },

    'MIRROR-MIRROR': (game, verb, directObject) => {
        if (verb === 'take') {
            game.ui.display("Nobody but a greedy surgeon would allow you to attempt that trick.");
            return true;
        }

        if (game.isMirrorBroken) {
            game.ui.display("The mirror is broken into many pieces.");
            return true;
        }

        if (verb === 'look' || verb === 'examine') {
            game.ui.display("There is an ugly person staring at you.");
            return true;
        }

        if (verb === 'mung' || verb === 'throw' || verb === 'attack') {
            game.isMirrorBroken = true;
            game.ui.display("You have broken the mirror. I hope you have a seven years supply of good luck handy.");
            return true;
        }

        if (verb === 'rub') {
            const currentRoomId = game.player.room.id;
            const otherRoomId = currentRoomId === 'MIRR1' ? 'MIRR2' : 'MIRR1';
            const currentRoom = game.rooms[currentRoomId];
            const otherRoom = game.rooms[otherRoomId];

            // Swap objects
            const currentObjects = [...currentRoom.objects];
            const otherObjects = [...otherRoom.objects];
            currentRoom.objects = otherObjects;
            otherRoom.objects = currentObjects;

            // Update object's room reference
            currentRoom.objects.forEach(obj => obj.room = currentRoom);
            otherRoom.objects.forEach(obj => obj.room = otherRoom);

            // Swap player
            game.player.room = otherRoom;

            game.ui.display("There is a rumble from deep within the earth and the room shakes.");
            game.look(); // Show the new room
            return true;
        }

        return false;
    },

    'BALLOON': (game, verb) => {
        const balloonObj = game.objects['BALLO'];
        if (game.player.vehicle !== balloonObj) {
            return false; // These actions only work inside the balloon
        }
        if (verb === 'land') {
            const currentRoom = game.player.room;
            const landingExit = currentRoom.exits.find(e => e.direction === 'LAND');
            if (landingExit) {
                game.ui.display("You have landed the balloon.");
                game.player.room = game.rooms[landingExit.roomId];
                game.look();
            } else {
                game.ui.display("You can't land here.");
            }
            return true;
        }
        return false;
    },

    'RECEPTACLE-ACTION': (game, verb, directObject, indirectObject) => {
        // directObject is the item being put (COAL), indirectObject is the container (RECEP)
        if (verb === 'put') {
            if (directObject.id === 'COAL') {
                game.balloon.fuel += 10; // Add 10 turns of fuel
                game.player.inventory = game.player.inventory.filter(o => o.id !== 'COAL');
                game.ui.display("The coal burns hot, and the balloon begins to rise.");
                if (!game.balloon.isInflated) {
                    game.balloon.isInflated = true;
                    // Move player into the balloon vehicle
                    game.player.vehicle = game.objects['BALLO'];
                }
                // For simplicity, let's just move the player to the air room
                game.player.room = game.rooms['VAIR1'];
                game.look();
                return true;
            } else {
                game.ui.display("That's not a suitable fuel.");
                return true;
            }
        }
        return false;
    },

    'ROBBER-FUNCTION': (game, verb, directObject) => {
        const thief = game.objects['THIEF'];
        const player = game.player;

        if (verb === 'attack') {
            // The main combat logic is in game.handleCombatRound
            game.attack(thief);
            return true;
        }

        if (verb === 'give' && directObject) {
            if (player.inventory.includes(directObject)) {
                // Handle the "brick bomb" case from MDL
                if (directObject.id === 'BRICK' && directObject.contents.includes('FUSE')) {
                     const fuse = game.objects['FUSE'];
                     if (fuse.timer) { // Assuming a timer is set when lit
                        game.ui.display("The thief seems rather offended by your offer. Do you think he's as stupid as you are?");
                        return true;
                     }
                }

                player.inventory = player.inventory.filter(obj => obj.id !== directObject.id);
                game.thief.inventory.push(directObject);
                game.ui.display(`The thief places the ${directObject.names[0]} in his bag and thanks you politely.`);
            } else {
                game.ui.display("You don't have that.");
            }
            return true;
        }

        if (verb === 'throw' && directObject) {
             if (player.inventory.includes(directObject)) {
                player.inventory = player.inventory.filter(obj => obj.id !== directObject.id);
                // In MDL, this has a chance to scare him off. For now, he just gets angry.
                thief.isAngry = true;
                game.ui.display(`You throw the ${directObject.names[0]} at the thief, who deftly catches it. He does not look pleased.`);
                game.thief.inventory.push(directObject);
             } else {
                game.ui.display("You don't have that.");
             }
             return true;
        }


        // This will be called from the combat system when the thief is defeated
        if (verb === 'dead') {
            game.ui.display("As the thief dies, the power of his magic decreases, and his booty remains.");
            thief.inventory.forEach(obj => {
                player.room.objects.push(obj);
            });
            thief.inventory = [];

            // If in treasure room, make items visible again
            if (player.room.id === 'TREAS') {
                player.room.objects.forEach(obj => {
                    if (obj.id !== 'THIEF' && obj.id !== 'CHALI') {
                        obj.flags.isVisible = true;
                    }
                });
                game.ui.display("The treasures of the room reappear!");
            }
            return true;
        }

        return false;
    },

    'LIVING-ROOM': (game, verb, directObject, indirectObject) => {
        const rug = game.objects['RUG'];
        const door = game.objects['DOOR'];

        if (verb === 'move' && directObject.id === 'RUG') {
            if (rug.flags.isMoved) {
                game.ui.display("Having moved the carpet previously, you find it impossible to move it again.");
            } else {
                rug.flags.isMoved = true;
                door.flags.isVisible = true;
                game.ui.display("With a great effort, the rug is moved to one side of the room. With the rug moved, the dusty cover of a closed trap-door appears.");
            }
            return true; // Action was handled
        }
        return false; // Action not handled by this function
    },

    'TRAP-DOOR': (game, verb) => {
        const door = game.objects['DOOR'];
        if (verb === 'open') {
            if (door.flags.isOpen) {
                game.ui.display("It's already open.");
            } else {
                door.flags.isOpen = true;
                game.ui.display("The door reluctantly opens to reveal a rickety staircase descending into darkness.");
            }
            return true;
        } else if (verb === 'close') {
            if (!door.flags.isOpen) {
                game.ui.display("It's already closed.");
            } else {
                door.flags.isOpen = false;
                game.ui.display("The door swings shut and closes.");
            }
            return true;
        }
        return false;
    },

    'LANTERN': (game, verb) => {
        const lantern = game.objects['LAMP'];
        if (verb === 'light' || verb === 'turn on') {
            if (lantern.light === 0) {
                game.ui.display("The lantern appears to be dead.");
            } else if (lantern.flags.isLit) {
                game.ui.display("The lantern is already on.");
            } else {
                lantern.flags.isLit = true;
                game.ui.display("The brass lantern is now on.");
            }
            return true;
        } else if (verb === 'turn off') {
            if (!lantern.flags.isLit) {
                game.ui.display("The lantern is already off.");
            } else {
                lantern.flags.isLit = false;
                game.ui.display("The brass lantern is now off.");
            }
            return true;
        }
        return false;
    },

    'MATCH-FUNCTION': (game, verb) => {
        const matches = game.objects['MATCH'];
        if (verb === 'light') {
            if (matches.light > 0) {
                matches.light--; // Use one match
                game.ui.display("One of the matches bursts into flame.");
                // In a real implementation, this would create a temporary light source.
                // For now, we just note the use.
                if (matches.light === 0) {
                    matches.description = "The matchbook is empty.";
                }
            } else {
                game.ui.display("The matchbook is empty.");
            }
            return true;
        }
        return false;
    },

    'CANDLES': (game, verb) => {
        const candles = game.objects['CANDL'];
        if (verb === 'light') {
            if (candles.flags.isLit) {
                game.ui.display("They're already lit.");
            } else {
                candles.flags.isLit = true;
                game.ui.display("The candles are now lit.");
            }
            return true;
        } else if (verb === 'extinguish') {
            if (!candles.flags.isLit) {
                game.ui.display("They're already out.");
            } else {
                candles.flags.isLit = false;
                game.ui.display("The candles are now out.");
            }
            return true;
        }
        return false;
    },

    'DBOAT-FUNCTION': (game, verb, directObject, indirectObject) => {
        if (verb === 'inflate') {
            game.ui.display("This boat will not inflate since some moron put a hole in it.");
            return true;
        }
        if (verb === 'plug') {
            if (indirectObject && indirectObject.id === 'PUTTY') {
                game.ui.display("Well done. The boat is repaired.");
                // Swap DBOAT for IBOAT
                const dboat = game.objects['DBOAT'];
                const iboat = game.objects['IBOAT'];
                if (game.player.inventory.includes(dboat)) {
                    game.player.inventory = game.player.inventory.filter(obj => obj.id !== 'DBOAT');
                    game.player.inventory.push(iboat);
                } else {
                    const room = dboat.room;
                    room.objects = room.objects.filter(obj => obj.id !== 'DBOAT');
                    room.objects.push(iboat);
                    iboat.room = room;
                }
                dboat.room = null;
            } else {
                game.ui.display(`Plugging the hole with ${indirectObject ? indirectObject.description : 'your finger'} doesn't seem to work.`);
            }
            return true;
        }
        return false;
    },

    'IBOAT-FUNCTION': (game, verb) => {
        if (verb === 'inflate') {
            const iboat = game.objects['IBOAT'];
            const pump = game.objects['PUMP'];
            if (!iboat.room) {
                 game.ui.display("The boat must be on the ground to be inflated.");
                 return true;
            }
            if (!game.player.inventory.includes(pump)) {
                game.ui.display("I don't think you have enough lung-power to inflate this boat.");
            } else {
                game.ui.display("The boat inflates and appears seaworthy.");
                // Swap IBOAT for RBOAT
                const rboat = game.objects['RBOAT'];
                const room = iboat.room;
                room.objects = room.objects.filter(obj => obj.id !== 'IBOAT');
                room.objects.push(rboat);
                rboat.room = room;
                iboat.room = null;
                game.deflateFlag = false; // Corresponds to DEFLATE!-FLAG
            }
            return true;
        }
        return false;
    },

    'RBOAT-FUNCTION': (game, verb) => {
        const rboat = game.objects['RBOAT'];
        if (verb === 'board') {
            const stick = game.objects['STICK'];
            if (game.player.inventory.includes(stick)) {
                game.ui.display("There is a hissing sound and the boat deflates.");
                // Swap RBOAT for DBOAT
                const dboat = game.objects['DBOAT'];
                const room = rboat.room;
                room.objects = room.objects.filter(obj => obj.id !== 'RBOAT');
                room.objects.push(dboat);
                dboat.room = room;
                rboat.room = null;
            } else {
                // Actual board logic will be in game.js
                return false;
            }
            return true;
        }
        if (verb === 'deflate') {
            if (game.player.vehicle === rboat) {
                game.ui.display("You can't deflate the boat while you're in it.");
            } else if (!rboat.room) {
                game.ui.display("The boat must be on the ground to be deflated.");
            } else {
                game.ui.display("The boat deflates.");
                 // Swap RBOAT for IBOAT
                const iboat = game.objects['IBOAT'];
                const room = rboat.room;
                room.objects = room.objects.filter(obj => obj.id !== 'RBOAT');
                room.objects.push(iboat);
                iboat.room = room;
                rboat.room = null;
                game.deflateFlag = true; // Corresponds to DEFLATE!-FLAG
            }
            return true;
        }
         if (verb === 'disembark') {
            if (game.player.room.id.includes("RIVR")) {
                 game.gameOver("DROWN");
                 return true;
            }
            return false; // let game.js handle it
        }
        return false;
    },

    'SAFE-FUNCTION': (game, verb) => {
        if (verb === 'open') {
            if (game.isSafeOpen) {
                game.ui.display("The box has no door!");
            } else {
                game.ui.display("The box is rusted and will not open.");
            }
            return true;
        }
        return false;
    },

    'BRICK-FUNCTION': (game, verb) => {
        if (verb === 'burn') {
            game.ui.display("Now you've done it. It seems that the brick has other properties than weight, namely the ability to blow you to smithereens.");
            game.gameOver('BOMB');
            return true;
        }
        return false;
    },

    'FUSE-FUNCTION': (game, verb) => {
        if (verb === 'burn') {
            game.ui.display("The wire starts to burn.");
            game.timers.push({ turns: 2, action: 'FUSE_BURN_OUT', targetId: 'FUSE' });
            return true;
        }
        if (verb === 'FUSE_BURN_OUT') {
            const fuse = game.objects['FUSE'];
            fuse.flags.isVisible = false;

            const fuseContainer = Object.values(game.objects).find(obj => obj.contents && obj.contents.includes('FUSE'));

            if (fuseContainer && fuseContainer.id === 'BRICK') {
                const brick = game.objects['BRICK'];
                const brickContainer = Object.values(game.objects).find(obj => obj.contents && obj.contents.includes('BRICK'));
                const slot = game.objects['SSLOT'];

                if (brickContainer === slot && slot.room.id === 'SAFE') {
                    game.ui.display("There is a loud explosion and the door of the safe is blown open.");
                    game.isSafeOpen = true;
                    game.objects['SAFE'].flags.isOpen = true;
                }
                else if (brick.room && brick.room.id === 'SAFE') {
                    game.ui.display("The resulting explosion shakes the room, and you are showered with plaster. This was a bad idea, as the room is built over weak rock strata. The floor collapses, and you die.");
                    game.gameOver('BOMB');
                }
                else if (brick.room === game.player.room) {
                    game.ui.display("The resulting explosion throws you against the walls, causing your untimely demise.");
                    game.gameOver('BOMB');
                }
                else if (game.player.inventory.includes(brick)) {
                    game.ui.display("The brick in your inventory explodes!");
                    game.gameOver('BOMB');
                }
                else {
                    game.ui.display("You hear a distant explosion.");
                }

                brick.flags.isVisible = false;
                if (brick.room) {
                    brick.room.objects = brick.room.objects.filter(o => o.id !== 'BRICK');
                    delete brick.room;
                }
                if (brickContainer) {
                    brickContainer.contents = brickContainer.contents.filter(id => id !== 'BRICK');
                }

            } else {
                game.ui.display("The wire rapidly burns into nothingness.");
            }
            return true;
        }
        return false;
    },

    'BUTTON-ACTION': (game, verb, directObject) => {
        if (verb === 'push') {
            const buttonId = directObject.id;
            const damLobby = game.rooms['LOBBY'];

            switch (buttonId) {
                case 'BUTN1': // Yellow
                    damLobby.description = "This is the dam lobby. To your left is a mural of the dam showing the spillway control gates, and a button to the right of it. The button is yellow. Above the button is a brass plaque saying 'YELLOW'.";
                    game.yellowButtonPushed = true;
                    break;
                case 'BUTN2': // Brown
                    damLobby.description = "This is the dam lobby. To your left is a mural of the dam showing the spillway control gates, and a button to the right of it. The button is brown. Above the button is a brass plaque saying 'BROWN'.";
                    game.brownButtonPushed = true;
                    break;
                case 'BUTN3': // Red
                    damLobby.description = "This is the dam lobby. To your left is a mural of the dam showing the spillway control gates, and a button to the right of it. The button is red. Above the button is a brass plaque saying 'RED'.";
                    game.redButtonPushed = true;
                    break;
                case 'BUTN4': // Blue
                    if (game.yellowButtonPushed && game.redButtonPushed && !game.brownButtonPushed && game.damWaterLevel === 'low') {
                        game.ui.display("There is a rumbling sound and a stream of water appears to burst from the dam, but it is evidently not enough to cause any damage.");
                        game.damGatesOpen = true;
                        // This also makes the TRUNK visible in the original
                        game.objects['TRUNK'].flags.isVisible = true;

                    } else {
                        game.ui.display("Click.");
                    }
                    // Reset for next attempt
                    game.yellowButtonPushed = false;
                    game.redButtonPushed = false;
                    game.brownButtonPushed = false;
                    break;
            }
            game.ui.display("Click.");
            return true;
        }
        return false;
    },

    'RIDDLE-ROOM': (game, verb, directObject, indirectObject, command) => {
        if (verb === 'say') {
            // The parser should give us the full command. We need to extract the said text.
            const saidText = command.substring(command.indexOf('say') + 4).replace(/"/g, '').trim();
            if (saidText.toLowerCase() === 'a well') {
                game.ui.display("The guardian of the door, a sphinx-like creature, is apparently satisfied and disappears in a puff of smoke, revealing the passage to the south.");
                game.riddleSolved = true; // You might use a global flag like this
                const sphinx = game.objects['SPHIN'];
                if (sphinx && sphinx.room) {
                    sphinx.room.objects = sphinx.room.objects.filter(o => o.id !== 'SPHIN');
                    delete sphinx.room;
                }
                const riddleFlag = game.objects['RIDDLE-FLAG'];
                if(riddleFlag) riddleFlag.flags.isOpen = true;
            } else {
                game.ui.display("The sphinx looks at you with a disdainful expression, and you notice that the door is still blocked.");
            }
            return true;
        }
        return false;
    },

    'EATME-FUNCTION': (game, verb, directObject) => {
        if (verb === 'eat') {
            if (game.playerSize === 'large') {
                game.ui.display("You can't get any larger!");
                return true;
            }
            game.ui.display("You eat the 'Eat Me' cake. You begin to grow larger and larger!");
            game.playerSize = 'large';
            // Remove cake from game
            if (directObject.room) {
                directObject.room.objects = directObject.room.objects.filter(o => o.id !== directObject.id);
            } else {
                game.player.inventory = game.player.inventory.filter(o => o.id !== directObject.id);
            }
            return true;
        }
        return false;
    },

    'CAKE-FUNCTION': (game, verb, directObject) => {
        if (verb === 'eat') {
            if (game.playerSize === 'small') {
                game.ui.display("You can't get any smaller!");
                return true;
            }
            game.ui.display(`You eat the ${directObject.description}. You begin to shrink!`);
            game.playerSize = 'small';
            // Remove icing from game
            if (directObject.room) {
                directObject.room.objects = directObject.room.objects.filter(o => o.id !== directObject.id);
            } else {
                game.player.inventory = game.player.inventory.filter(o => o.id !== directObject.id);
            }
            return true;
        }
        return false;
    },

    'FLASK-FUNCTION': (game, verb, directObject) => {
        if (verb === 'drink') {
             if (game.playerSize === 'small') {
                game.ui.display("You can't get any smaller!");
                return true;
            }
            game.ui.display("You drink the liquid from the flask. It has a strange, shrinking taste.");
            game.playerSize = 'small';
            // Empty the flask
            directObject.contents = [];
            directObject.description = "glass flask (empty)";
            return true;
        }
        return false;
    },

    'TDOOR-FUNCTION': (game, verb, directObject, indirectObject) => {
        const door = game.objects['TDOOR'];
        if (verb === 'unlock') {
            const key = game.player.inventory.find(o => o.id === 'TKEY');
            if (key) {
                if (door.flags.isLocked) {
                    door.flags.isLocked = false;
                    game.ui.display("The tiny door is now unlocked.");
                } else {
                    game.ui.display("It's already unlocked.");
                }
            } else {
                game.ui.display("You don't have the key.");
            }
            return true;
        }
        if (verb === 'open') {
            if (door.flags.isLocked) {
                game.ui.display("The tiny door is locked.");
            } else if (door.flags.isOpen) {
                game.ui.display("It's already open.");
            } else {
                door.flags.isOpen = true;
                game.ui.display("The tiny door opens.");
            }
            return true;
        }
        return false;
    },

    'ROBOT-FUNCTION': (game, verb, directObject, indirectObject, command) => {
        const robot = game.objects['ROBOT'];
        if (!robot) return false;

        // Handle 'give' to robot
        if (verb === 'give' && directObject && indirectObject && indirectObject.id === 'ROBOT') {
            if (directObject.id === 'WRENC') {
                if (robot.flags.panelOpen) {
                    game.ui.display("The panel is already open.");
                } else {
                    robot.flags.panelOpen = true;
                    const slot = game.objects['ROBOT-SLOT'];
                    if(slot) slot.flags.isVisible = true;
                    game.ui.display("The robot's panel opens, revealing a slot.");
                }
                return true;
            }
            if (directObject.id === 'SCREW') {
                robot.inventory.push(directObject);
                game.player.inventory = game.player.inventory.filter(o => o.id !== 'SCREW');
                game.ui.display("The robot takes the screwdriver and places it in a hidden compartment.");
                return true;
            }
        }

        // Handle 'put battery in slot' - this is a bit of a hack
        // The main 'put' logic in game.js would need to be aware of this special case.
        // A listener system on objects would be better. For now, we check it here.
        const slot = game.objects['ROBOT-SLOT'];
        if (slot && slot.contents && slot.contents.includes('RBATT') && !robot.flags.isCharged) {
            robot.flags.isCharged = true;
            robot.flags.panelOpen = false;
            slot.flags.isVisible = false;
            // remove battery from slot contents to prevent re-triggering
            slot.contents = [];
            game.ui.display("The robot's panel closes and the robot says, \"Ready.\"");
            return true;
        }


        // Handle 'tell robot "..."'
        if (verb === 'tell' && directObject && directObject.id === 'ROBOT') {
            if (!robot.flags.isCharged) {
                game.ui.display("The robot does not respond.");
                return true;
            }

            const robotCommand = command.substring(command.indexOf('robot') + 5).replace(/"/g, '').trim();
            const parts = robotCommand.split(' ');
            const robotVerb = parts[0].toLowerCase();
            const robotNoun = parts.length > 1 ? parts.slice(1).join(' ') : '';


            if (robotVerb === 'go') {
                const direction = robotNoun.toUpperCase();
                const robotRoom = robot.room;
                const exit = robotRoom.exits.find(e => e.direction === direction);
                if (exit && !exit.condition) {
                    robot.room = game.rooms[exit.roomId];
                    game.ui.display(`The robot rolls ${direction}.`);
                } else {
                    game.ui.display("The robot is unable to go that way.");
                }
                return true;
            }

            if (robotVerb === 'push') {
                const buttonName = robotNoun;
                const robotRoom = robot.room;
                const button = robotRoom.objects.find(o => o.names.map(n => n.toLowerCase()).includes(buttonName.toLowerCase()));

                if (button && button.action === 'BUTTON-ACTION') {
                    game.ui.display(`The robot pushes the ${buttonName} button.`);
                    actions['BUTTON-ACTION'](game, 'push', button);
                } else {
                    game.ui.display("The robot doesn't see that button here.");
                }
                return true;
            }

            game.ui.display("The robot does not understand that command.");
            return true;
        }

        return false;
    },

    'WIN-GAME': (game, verb) => {
        if (verb === 'walk-in') {
            game.ui.display("You have won! Your final score is " + game.player.score + " out of 350.");
            game.isGameOver = true;
            game.ui.inputElement.disabled = true;
            return true;
        }
        return false;
    }
};

window.gameActions = actions;
