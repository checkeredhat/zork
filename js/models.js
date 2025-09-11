import { RBITS, OFLAGS } from './flags.js';

class GameObject {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.initialDescription = data.initialDescription;
        this.text = data.text; // Text for readable objects
        this.location = null; // Will be set by the game engine
        this.oflags = data.flags || 0; // Bitmask for OFLAGS, parser uses 'flags'

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
    }
}

class Room {
    constructor(data) {
        this.id = data.id;
        this.name = data.shortDesc; // Was data.name
        this.description = data.longDesc; // Was data.description
        this.exits = data.exits || {};     // Standard exits
        this.objects = data.objects || []; // IDs of objects initially in the room
        this.rbits = data.rbits || 0;      // Bitmask for RBITS

        // Additional properties derived from MDL, keeping original names for clarity
        this.longDescription = data.longDesc;
        this.shortDescription = data.shortDesc;
        this.action = data.action || null; // MDL RACTION
        this.value = data.value || 0;      // MDL RVAL
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

export { GameObject, Room, Player };
