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

export { GameObject, Room, Player };
