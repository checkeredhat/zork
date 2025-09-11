// RBITS: Room flags (Expanded based on MDL sources)
const RBITS = {
    RSEEN: 1 << 0,     // Player has been in the room
    RLIGHT: 1 << 1,    // Room is lit (MDL RLIGHT?)
    RDESC: 1 << 2,     // Room has a long description
    RMAZE: 1 << 3,     // Room is part of a maze
    RBUCK: 1 << 4,     // Player can fill a bucket here (MDL RBUCKBIT)
    RWATER: 1 << 5,    // Room is on/in water
    RFILL: 1 << 6,     // Room can be filled with water (MDL RFILLBIT)
    RHERE: 1 << 7,     // Something is here
    RNWALL: 1 << 8,    // No wall separating from another room
    RSACRD: 1 << 9,    // Sacred room (MDL RSACREDBIT)
    RWIN: 1 << 10,     // Player has won
    RSTRNG: 1 << 11,   // Player is strengthened here
    RART: 1 << 12,     // Room contains an artifact
    RCLIMB: 1 << 13,   // Room can be climbed
    RDIR: 1 << 14,     // Directional room
    RLAND: 1 << 15,    // Room is on land (MDL RLANDBIT)
    RHOUSE: 1 << 16,   // Room is part of the house (MDL RHOUSEBIT)
    RDESCBIT: 1 << 17  // Force room description (internal VM flag)
};

// OFLAGS: Object flags (Expanded based on MDL sources)
const OFLAGS = {
    TAKEBIT: 1 << 0,       // Object can be taken
    DOORBIT: 1 << 1,       // Object is a door
    OPENBIT: 1 << 2,       // Object is open (MDL OOPEN?)
    LOCKBIT: 1 << 3,       // Object is locked (Not directly in provided MDL, but implied for doors)
    CONTBIT: 1 << 4,       // Object is a container
    BURNBIT: 1 << 5,       // Object is flammable (MDL BURNBIT)
    WEAPONBIT: 1 << 6,     // Object is a weapon
    READBIT: 1 << 7,       // Object is readable
    SACREDBIT: 1 << 8,     // Object is sacred
    TOOLBIT: 1 << 9,       // Object is a tool
    DRINKBIT: 1 << 10,     // Object is drinkable
    FOODBIT: 1 << 11,      // Object is food (MDL FOODBIT)
    TIEBIT: 1 << 12,       // Object can be tied (MDL TIEBIT)
    VEHBIT: 1 << 13,       // Object is a vehicle
    OVISON: 1 << 14,       // Object is visible (MDL OVISON)
    VILLAIN: 1 << 15,      // Object is a villain (MDL VILLAIN)
    VICBIT: 1 << 16,       // Object is a victim/can be attacked (MDL VICBIT)
    SLEEPBIT: 1 << 17,     // Object can be slept on
    SEARCHBIT: 1 << 18,    // Object can be searched
    CLIMBBIT: 1 << 19,     // Object can be climbed
    SCENERYBIT: 1 << 20,   // Object is scenery
    INVISIBLE: 1 << 21,    // Object is invisible
    DISARMEDBIT: 1 << 22,  // Object is disarmed (e.g., a trap)
    NOTDESCBIT: 1 << 23,   // Object is not described separately (MDL NDESCBIT)
    TRYTAKEBIT: 1 << 24,   // Attempt to take object (MDL TRYTAKEBIT)
    FLAMEBIT: 1 << 25,     // Object is on fire
    ACTORBIT: 1 << 26      // Object is an actor (e.g. robot)
};


// FBITS: Flag bits (global game state)
const FBITS = {
    // These would be defined based on the 'DEFS.63' file for global flags
    // Example:
    TROLLFLAG: 1 << 0, // Troll is angry
    THIEFFLAG: 1 << 1, // Thief has appeared
};

/**
 * Checks if a specific flag is set in a bitmask.
 * @param {number} bitmask - The bitmask to check.
 * @param {number} flag - The flag to check for.
 * @returns {boolean} - True if the flag is set, false otherwise.
 */
function hasFlag(bitmask, flag) {
    return (bitmask & flag) !== 0;
}

/**
 * Sets a specific flag in a bitmask.
 * @param {number} bitmask - The bitmask to modify.
 * @param {number} flag - The flag to set.
 * @returns {number} - The new bitmask.
 */
function setFlag(bitmask, flag) {
    return bitmask | flag;
}

/**
 * Clears a specific flag in a bitmask.
 * @param {number} bitmask - The bitmask to modify.
 * @param {number} flag - The flag to clear.
 * @returns {number} - The new bitmask.
 */
function clearFlag(bitmask, flag) {
    return bitmask & ~flag;
}

export {
    RBITS,
    OFLAGS,
    FBITS,
    hasFlag,
    setFlag,
    clearFlag,
};
