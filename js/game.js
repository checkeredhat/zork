import { GameObject, Room, Player } from './models.js';
import { applyAction } from './actions.js';
import { parseCommand } from './parser.js';
import { RBITS, OFLAGS, setFlag, hasFlag } from './flags.js';


class Game {
    constructor(data) {
        this.objects = new Map(Object.values(data.objects).map(o => [o.id, new GameObject(o)]));
        this.rooms = new Map(Object.values(data.rooms).map(r => [r.id, new Room(r)]));
        this.player = new Player({ location: 'WHOUS' }); // Starting location
        this.vocabulary = data.vocabulary;
        this.deathMessages = data.deathMessages;
        this.globalFlags = new Map();

        this.initObjectLocations();
    }

    initObjectLocations() {
        console.log('Initializing object locations...');
        // Set initial locations for objects based on room data
        for (const room of this.rooms.values()) {
            if (room.objects) {
                for (const objectId of room.objects) {
                    if (this.objects.has(objectId)) {
                        this.objects.get(objectId).location = room.id;
                        console.log(`Set location of ${objectId} to ${room.id}`);
                    } else {
                        console.log(`Object ${objectId} in room ${room.id} not found in master object list.`);
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
            result = this.look(); // Replace result with room description
            currentRoom.rbits &= ~RBITS.RDESCBIT; // Clear the flag
        }


        return result.trim();
    }

    findObject(objectId) {
        if (!objectId) return null;

        // First, check player's inventory
        let obj = Array.from(this.objects.values()).find(o => o.id === objectId && o.location === 'IN_INVENTORY');
        if (obj) {
            return obj;
        }

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
        let description = room.description;

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
            // Use initialDescription if available, otherwise description.
            // This is a simplification of Zork's behavior.
            const objectDescriptions = objectsInRoom.map((obj) => {
                return obj.initialDescription || obj.description;
            }).filter(desc => desc); // Filter out empty descriptions
            if (objectDescriptions.length > 0) {
                 description += '\n' + objectDescriptions.join('\n');
            }
        }
        return description;
    }
}

export { Game };
