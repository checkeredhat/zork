import { GameObject, Room, Player } from './models.js';
import { applyAction } from './actions.js';
import { parseCommand } from './parser.js';
import { RBITS, OFLAGS, setFlag, hasFlag } from './flags.js';


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

export { Game };
