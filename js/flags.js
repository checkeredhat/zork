// Bitwise flags for game objects and rooms

// RBITS: Room flags
const RBITS = {
    RSEEN: 1 << 0, // Player has been in the room
    RLIGHT: 1 << 1, // Room is lit
    RDESC: 1 << 2, // Room has a long description
    RMAZE: 1 << 3, // Room is part of a maze
    RBUCK: 1 << 4, // Player can fill a bucket here
    RWATER: 1 << 5, // Room is on/in water
    RFILL: 1 << 6, // Room can be filled with water
    RHERE: 1 << 7, // Something is here
    RNWALL: 1 << 8, // No wall separating from another room
    RSACRD: 1 << 9, // Sacred room
    RWIN: 1 << 10, // Player has won
    RSTRNG: 1 << 11, // Player is strengthened here
    RART: 1 << 12, // Room contains an artifact
    RCLIMB: 1 << 13, // Room can be climbed
    RDIR: 1 << 14, // Directional room
    NONLAND: 1 << 15, // Not on land
    RDESCBIT: 1 << 16, // Force room description
};

// OFLAGS: Object flags
const OFLAGS = {
    TAKEBIT: 1 << 0, // Object can be taken
    DOORBIT: 1 << 1, // Object is a door
    OPENBIT: 1 << 2, // Object is open
    LOCKBIT: 1 << 3, // Object is locked
    CONTBIT: 1 << 4, // Object is a container
    DRINKBIT: 1 << 5, // Object is drinkable
    FOODBIT: 1 << 6, // Object is edible
    BURNBIT: 1 << 7, // Object is flammable
    WEAPONBIT: 1 << 8, // Object is a weapon
    FIGHTBIT: 1 << 9, // Object can be fought
    READBIT: 1 << 10, // Object can be read
    TRANSBIT: 1 << 11, // Object is a vehicle/transport
    LIGHTBIT: 1 << 12, // Object provides light
    ONBIT: 1 << 13, // Object is on
    VICBIT: 1 << 14, // Object is a victim
    FINDIM: 1 << 15, // Object is inside another object
    SACREDBIT: 1 << 16, // Object is sacred
    SLEEPBIT: 1 << 17, // Object can be slept on
    SEARCHBIT: 1 << 18, // Object can be searched
    CLIMBBIT: 1 << 19, // Object can be climbed
    SCENERYBIT: 1 << 20, // Object is scenery
    INVISIBLE: 1 << 21, // Object is invisible
    DISARMEDBIT: 1 << 22, // Object is disarmed (e.g., a trap)
    NOTDESCBIT: 1 << 23, // Object is not described separately
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
