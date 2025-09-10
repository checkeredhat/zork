import { RBITS, OFLAGS } from './flags.js';

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

export { GameObject, Room, Player };
