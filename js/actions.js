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
            return '';
        }

        // Handle conditional exits (object-based)
        if (typeof exit === 'object' && exit.destination) {
            if (evaluateCondition(exit.condition, game)) {
                game.player.location = exit.destination;
                const targetRoom = game.rooms.get(exit.destination);
                targetRoom.rbits = setFlag(targetRoom.rbits, RBITS.RDESCBIT);
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
    }

    // Check for global flags
    return game.globalFlags.get(flagName) === true;
}


export { applyAction };
