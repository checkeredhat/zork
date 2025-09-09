/**
 * This file replicates the bitmask flag system from the original Zork MDL source.
 * Instead of parsing the MDL files, we manually define the flags and their
 * corresponding bitwise values, as this is a more robust and maintainable
 * approach for a JavaScript port.
 */

/**
 * RBITS defines the flags that can be applied to rooms.
 * The values are bitmasks, allowing multiple flags to be combined into a single integer.
 * Source: zork/lcf/defs.63
 */
export const RBITS = {
  RLANDBIT:   1 << 0,  // on land
  RWATERBIT:  1 << 1,  // water room
  RAIRBIT:    1 << 2,  // mid-air room
  RSACREDBIT: 1 << 3,  // thief not allowed
  RFILLBIT:   1 << 4,  // can fill bottle here
  RMUNGBIT:   1 << 5,  // room has been munged
  RBUCKBIT:   1 << 6,  // this room is a bucket
  RHOUSEBIT:  1 << 7,  // This room is part of the house
};

/**
 * OFLAGS defines the flags that can be applied to game objects.
 * The values are bitmasks, allowing multiple flags to be combined into a single integer.
 * Source: zork/lcf/defs.63
 */
export const OFLAGS = {
  OVISON:       1 << 0,  // visible?
  READBIT:      1 << 1,  // readable?
  TAKEBIT:      1 << 2,  // takeable?
  DOORBIT:      1 << 3,  // object is door
  TRANSBIT:     1 << 4,  // object is transparent
  FOODBIT:      1 << 5,  // object is food
  NDESCBIT:     1 << 6,  // object not describable
  DRINKBIT:     1 << 7,  // object is drinkable
  CONTBIT:      1 << 8,  // object can be opened/closed
  LIGHTBIT:     1 << 9,  // object can provide light
  VICBIT:       1 << 10, // object is victim
  BURNBIT:      1 << 11, // object is flammable
  FLAMEBIT:     1 << 12, // object is on fire
  TOOLBIT:      1 << 13, // object is a tool
  TURNBIT:      1 << 14, // object can be turned
  VEHBIT:       1 << 15, // object is a vehicle
  FINDMEBIT:    1 << 16, // can be reached from a vehicle
  SLEEPBIT:     1 << 17, // object is asleep
  SEARCHBIT:    1 << 18, // allow multi-level access into this
  SACREDBIT:    1 << 19, // thief can't take this
  TIEBIT:       1 << 20, // object can be tied
  ECHO_ROOM_BIT:1 << 21, // nothing can be taken in echo room
  ACTORBIT:     1 << 22, // object is an actor
  WEAPONBIT:    1 << 23, // object is a weapon
  FIGHTBIT:     1 << 24, // object is in melee
  VILLAIN:      1 << 25, // object is a bad guy
  STAGGERED:    1 << 26, // object can't fight this turn
  TRYTAKEBIT:   1 << 27, // object wants to handle not being taken
  NO_CHECK_BIT: 1 << 28, // ignore checks (in put & drop): for EVERY and VALUA
};

/**
 * Checks if a specific bit is set in a flag word.
 * Replicates the logic of TRNN and RTRNN.
 * @param {number} flagWord - The RBITS or OFLAGS value from a room or object.
 * @param {number} bit - The bitmask to check (e.g., RBITS.RWATERBIT).
 * @returns {boolean}
 */
export function hasFlag(flagWord, bit) {
  return (flagWord & bit) !== 0;
}

/**
 * Sets a bit in a flag word.
 * Replicates TRO and RTRO.
 * @param {number} flagWord - The current flag word.
 * @param {number} bit - The bitmask to set.
 * @returns {number} The new flagWord.
 */
export function setFlag(flagWord, bit) {
  return flagWord | bit;
}

/**
 * Clears a bit from a flag word.
 * Replicates TRZ and RTRZ.
 * @param {number} flagWord - The current flag word.
 * @param {number} bit - The bitmask to clear.
 * @returns {number} The new flagWord.
 */
export function clearFlag(flagWord, bit) {
  return flagWord & ~bit;
}
