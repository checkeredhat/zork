import { GameObject, Room, Player } from './models.js';
import {
    hasFlag,
    setFlag,
    clearFlag,
    RBITS,
    OFLAGS,
    FBITS,
} from './flags.js';

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
        const direction = action.verb.replace('GO ', '');
        const exit = room.exits[direction];

        if (!exit) {
            return "You can't go that way.";
        }

        // Handle simple string-based exits
        if (typeof exit === 'string') {
            game.player.location = exit;
            const targetRoom = game.rooms.get(exit);
            targetRoom.rbits = setFlag(targetRoom.rbits, RBITS.RDESCBIT);
            if (targetRoom.roomAction) {
                executeRoomAction(targetRoom.roomAction, game, targetRoom);
            }
            return '';
        }

        // Handle conditional exits (object-based)
        if (typeof exit === 'object' && exit.destination) {
            if (evaluateCondition(exit.condition, game)) {
                game.player.location = exit.destination;
                const targetRoom = game.rooms.get(exit.destination);
                targetRoom.rbits = setFlag(targetRoom.rbits, RBITS.RDESCBIT);
                if (exit.action) {
                    executeRoomAction(exit.action, game, targetRoom);
                }
                if (targetRoom.roomAction) {
                    executeRoomAction(targetRoom.roomAction, game, targetRoom);
                }
                return '';
            } else {
                return exit.message || "You can't go that way.";
            }
        }

        // Handle blocked exits (object with 'blocked' message)
        if (typeof exit === 'object' && exit.blocked) {
            return exit.blocked;
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
            if (dobj.id === 'WIND1') {
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

        if (troll.trollState.hits === undefined) {
            troll.trollState.hits = 0;
        }
        troll.trollState.hits++;

        if (troll.trollState.hits >= 2) {
             troll.trollState.unconscious = true;
             troll.description = "The troll is lying on the ground, unconscious.";
             game.globalFlags.set('TROLL-FLAG', true);
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
    NORTHEAST: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO NE' }),
    NORTHWEST: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO NW' }),
    SOUTHEAST: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO SE' }),
    SOUTHWEST: (d, i, g, a) => actionHandlers.GO(d, i, g, { ...a, verb: 'GO SW' }),
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

    UNLOCK: (dobj, iobj, game) => {
        if (!dobj) return "Unlock what?";
        if (!iobj) return "Unlock it with what?";

        if (dobj.id === 'GRAT2' && iobj.id === 'KEYS') {
            if (!hasFlag(dobj.oflags, OFLAGS.LOCKBIT)) {
                return "The grating is already unlocked.";
            }
            dobj.oflags = clearFlag(dobj.oflags, OFLAGS.LOCKBIT);
            return "The grating is unlocked.";
        }

        return "You can't unlock that.";
    },

    PLUG: (dobj, iobj, game) => {
        // Simplified version of the MDL LEAK-FUNCTION.
        // The original also stopped a clock.
        if (dobj.id === 'LEAK' && iobj.id === 'PUTTY') {
            game.globalFlags.set('LEAK-FIXED', true);
            return "By some miracle of elven technology, you have managed to stop the leak in the dam.";
        }
        return "You can't plug that.";
    },

    RUB: (dobj, iobj, game) => {
        if (!dobj) return "Rub what?";

        if (dobj.id === 'REFL1' || dobj.id === 'REFL2') {
            if (game.globalFlags.get('MIRROR_BROKEN')) {
                return "The mirror is broken into many pieces.";
            }

            const room1Id = game.player.location;
            const room2Id = room1Id === 'MIRR1' ? 'MIRR2' : 'MIRR1';

            const room1 = game.rooms.get(room1Id);
            const room2 = game.rooms.get(room2Id);

            // Swap objects between rooms
            const room1Objects = Array.from(game.objects.values()).filter(o => o.location === room1Id);
            const room2Objects = Array.from(game.objects.values()).filter(o => o.location === room2Id);

            room1Objects.forEach(o => { o.location = room2Id; });
            room2Objects.forEach(o => { o.location = room1Id; });

            // Move player
            game.player.location = room2Id;
            game.rooms.get(room2Id).rbits = setFlag(game.rooms.get(room2Id).rbits, RBITS.RDESCBIT);

            return "There is a rumble from deep within the earth and the room shakes.";
        }

        if (dobj.id === 'LAMP') {
            return "Rubbing the brass lantern has no effect.";
        }
        return "You can't rub that.";
    },

    BURN: (dobj, iobj, game) => {
        if (!dobj) return "Burn what?";
        if (!iobj) return "Burn it with what?";

        if (!hasFlag(dobj.oflags, OFLAGS.BURNBIT)) {
            return "You can't burn that.";
        }
        if (!hasFlag(iobj.oflags, OFLAGS.FLAMEBIT)) {
            return "You can't burn it with that.";
        }

        if (dobj.location === 'IN_INVENTORY') {
            return `DEATH: The ${dobj.name} catches fire. Unfortunately, you were holding it at the time.`;
        }

        if (dobj.id === 'FUSE') {
            dobj.location = 'NOWHERE'; // The fuse is burned up
            return "The fuse burns brightly and is gone.";
        }

        dobj.location = 'NOWHERE';
        return `The ${dobj.name} catches fire and is consumed.`;
    },

    GIVE: (dobj, iobj, game) => {
        if (!dobj) return "What do you want to give?";
        if (!iobj) return "Who do you want to give it to?";

        if (iobj.id === 'GNOME') {
            if (dobj.trophyValue > 0) {
                game.globalFlags.set('GNOME-PLEASED', true);
                dobj.location = 'NOWHERE';
                return `The gnome, delighted with the ${dobj.name}, shows you a secret passage to the south.`;
            } else {
                dobj.location = 'NOWHERE';
                return `The gnome crunches the ${dobj.name} in his rock-hard hands.`;
            }
        }

        return "You can't give that to them.";
    },

    TELL: (dobj, iobj, game, action) => {
        if (!dobj) return "Tell whom?";
        if (!hasFlag(dobj.oflags, OFLAGS.ACTORBIT)) {
            return "You can't talk to that.";
        }

        if (dobj.id === 'ROBOT') {
            const command = action.command;
            if (command && command.toLowerCase().includes('east')) {
                const room = game.rooms.get(dobj.location);
                const exit = room.exits['EAST'];
                if (exit) {
                    dobj.location = exit;
                    return "The robot trundles east.";
                } else {
                    return "The robot can't go that way.";
                }
            }
            return "The robot does not understand.";
        }

        return "They don't seem to be listening.";
    },

    PUSH: (dobj, iobj, game) => {
        if (!dobj) return "Push what?";

        const machine = game.objects.get('MACHI');
        if (!machine.machineState) {
            machine.machineState = [];
        }

        let sound = "You can't push that.";
        let buttonPressed = null;

        if (dobj.id === 'SQBUT') {
            buttonPressed = 'SQUARE';
            sound = "A whirring sound may be heard from the machinery.";
        } else if (dobj.id === 'RNBUT') {
            buttonPressed = 'ROUND';
            sound = "A clanking noise is heard.";
        } else if (dobj.id === 'TRBUT') {
            buttonPressed = 'TRIANGLE';
            sound = "A humming sound is heard from the machine.";
        }

        if (buttonPressed) {
            machine.machineState.push(buttonPressed);
            if (machine.machineState.length > 3) {
                machine.machineState.shift(); // Keep only the last 3 presses
            }
            return sound;
        }

        return sound;
    }
};

// Add a generic 'ENTER' handler that maps to GO
actionHandlers.ENTER = (dobj, iobj, game, action) => {
    // In Zork, "enter" is often a synonym for "go" but can be more contextual.
    const room = game.rooms.get(game.player.location);

    // If no direct object, see if there's an obvious thing to enter.
    if (!dobj) {
        // Is there an open window in the room?
        const window = Array.from(game.objects.values()).find(o => o.location === room.id && o.id === 'WIND1');
        if (window && hasFlag(window.oflags, OFLAGS.OPENBIT)) {
            dobj = window;
        }
    }

    // Special case for entering the window
    if (dobj && dobj.id === 'WIND1') {
        if (hasFlag(dobj.oflags, OFLAGS.OPENBIT)) {
            game.player.location = 'KITCH';
            game.rooms.get('KITCH').rbits = setFlag(game.rooms.get('KITCH').rbits, RBITS.RDESCBIT);
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

function executeRoomAction(action, game, room) {
    switch (action) {
        case 'COFFIN-CURE':
            game.globalFlags.set('EGYPT-FLAG', false);
            break;
        case 'MAZE-11':
            let grateDesc = "Above you is a grating locked with a skull-and-crossbones lock.";
            if (game.globalFlags.get('GRATING-UNLOCKED')) {
                grateDesc = "Above you is a grating.";
            }
            if (game.globalFlags.get('GRATING-OPEN')) {
                grateDesc = "Above you is an open grating with sunlight pouring in.";
            }
            return `You are in a small room near the maze. There are twisty passages in the immediate vicinity.\n${grateDesc}`;
        case 'CAROUSEL-ROOM':
            if (!room.carouselState) {
                room.carouselState = 0;
            }
            room.carouselState = (room.carouselState + 1) % 8; // There are 8 directions
            const exits = [
                "NORTH", "SOUTH", "EAST", "WEST",
                "NW", "NE", "SE", "SW"
            ];
            const destinations = [
                "CAVE4", "CAVE4", "MGRAI", "PASS1",
                "CANY1", "PASS5", "PASS4", "MAZE1"
            ];
            const newExits = {};
            for (let i = 0; i < exits.length; i++) {
                const newIndex = (i + room.carouselState) % exits.length;
                newExits[exits[i]] = destinations[newIndex];
            }
            room.exits = newExits;
            break;
        case 'CMACH-ROOM':
            const machine = game.objects.get('MACHI');
            if (machine.machineState && machine.machineState.join(',') === 'SQUARE,ROUND,TRIANGLE') {
                room.exits['EAST'] = 'SECRE';
                machine.machineState = []; // Reset the machine state
                return "The eastern wall of the room slowly swings open, revealing a passage.";
            }
            break;
        default:
            break;
    }
}

function evaluateCondition(condition, game) {
    if (!condition) return true; // No condition means the exit is always open

    const flagName = condition.replace(/\"/g, '');

    // Check for object-based conditions
    switch (flagName) {
        case 'TRAP-DOOR':
            const trapDoor = game.objects.get('TRAP-DOOR');
            return trapDoor && hasFlag(trapDoor.oflags, OFLAGS.OPENBIT);
        case 'KITCHEN-WINDOW':
            const window = game.objects.get('WIND1');
            return window && hasFlag(window.oflags, OFLAGS.OPENBIT);
        case 'GRATING-UNLOCKED': // This is a made-up flag for now
            const grating = game.objects.get('GRAT2');
            return grating && !hasFlag(grating.oflags, OFLAGS.LOCKBIT);
        case 'GNOME-FUNCTION':
            const gnome = game.objects.get('GNOME');
            // The gnome blocks the way unless he is pleased.
            // This is a placeholder for the real logic.
            return game.globalFlags.get('GNOME-PLEASED');
    }

    // Check for global flags
    return game.globalFlags.get(flagName) === true;
}


export { applyAction };
