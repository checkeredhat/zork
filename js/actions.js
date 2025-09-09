// js/actions.js

const actions = {
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

    'WINDOW-FUNCTION': (game, verb) => {
        const window = game.objects['WIND1'] || game.objects['WIND2'];
        if (verb === 'open') {
            if (window.flags.isOpen) {
                game.ui.display("It's already open.");
            } else {
                window.flags.isOpen = true;
                game.ui.display("With great effort, you open the window.");
            }
            return true;
        } else if (verb === 'close') {
            if (!window.flags.isOpen) {
                game.ui.display("It's already closed.");
            } else {
                window.flags.isOpen = false;
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
                    if (coal) {
                        machine.contents = machine.contents.filter(objId => objId !== 'COAL');
                        machine.contents.push('DIAMO');
                        game.objects['DIAMO'].room = null;
                        game.objects['DIAMO'].canContain = 'MACHI';
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
    'CYCLOPS': (game, verb, directObject, indirectObject) => {
        const cyclops = game.objects['CYCLO'];
        if (verb === 'attack') {
            game.ui.display("The cyclops is much larger and stronger than you. Attacking it would be suicide.");
            return true;
        }
        if (verb === 'give' && directObject && directObject.id === 'FOOD') {
            game.ui.display("The cyclops seems to like the food. He eats it, then becomes very sleepy and dozes off. You can now pass him.");
            cyclops.flags.isVillain = false;
            cyclops.description = "The cyclops is sleeping peacefully.";
            game.player.inventory = game.player.inventory.filter(obj => obj.id !== 'FOOD');
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

    'ROBBER-FUNCTION': (game, verb, directObject, indirectObject) => {
        const thief = game.objects['THIEF'];
        if (verb === 'attack') {
            game.attack(thief);
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
    }
};

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

    'FUSE-FUNCTION': (game, verb, directObject) => {
        if (verb === 'burn') {
            game.ui.display("The wire starts to burn.");
            game.timers.push({ turns: 2, action: 'FUSE_BURN_OUT', targetId: 'FUSE' });
            return true;
        }
        if (verb === 'FUSE_BURN_OUT') {
            const fuse = game.objects['FUSE'];
            const brick = game.objects['BRICK'];

            // Hide the fuse
            fuse.flags.isVisible = false;

            const fuseContainer = Object.values(game.objects).find(obj => obj.contents && obj.contents.includes('FUSE'));

            if (fuseContainer && fuseContainer.id === 'BRICK') {
                // Hide the brick
                brick.flags.isVisible = false;
                brick.room = null;

                const brickContainer = Object.values(game.objects).find(obj => obj.contents && obj.contents.includes('BRICK'));
                const brickRoom = brick.room;

                if (brickRoom === game.player.room) {
                    game.ui.display("The resulting explosion throws you against the walls, causing your untimely demise.");
                    game.gameOver('BOMB');
                } else if (brickRoom && brickRoom.id === 'SAFE') {
                     if (brickContainer && brickContainer.id === 'SSLOT') {
                        game.ui.display("There is an explosion nearby.");
                        game.isSafeOpen = true;
                        game.objects['SAFE'].flags.isOpen = true;
                        // In a more complete implementation, this would trigger another timer for room collapse.
                     } else {
                        game.ui.display("There is an explosion nearby.");
                     }
                } else {
                    game.ui.display("There is an explosion nearby.");
                }

            } else {
                game.ui.display("The wire rapidly burns into nothingness.");
            }
            return true;
        }
        return false;
    },

window.gameActions = actions;
