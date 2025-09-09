import { OFLAGS, setFlag } from './flags.js';

class Player {
    constructor({
        room,
        inventory = [],
        score = 0,
        health = 100,
        vehicle = null,
        strength = 10,
        flags = {}
    }) {
        this.room = room; // AROOM
        this.inventory = inventory; // AOBJS
        this.score = score; // ASCORE
        this.vehicle = vehicle; // AVEHICLE
        this.strength = strength; // ASTRENGTH

        this.aflags = 0;
        this.initAFlags(flags);
    }

    initAFlags(flags) {
        // The Adventurer's flags (AFLAGS) in the original MDL are analogous to
        // Object flags (OFLAGS), so we reuse the same bitmask constants.
        let aflags = 0;

        const flagMap = {
            isStaggered: OFLAGS.STAGGERED,
        };

        for (const [key, value] of Object.entries(flags)) {
            if (flagMap[key] && value === true) {
                aflags = setFlag(aflags, flagMap[key]);
            }
        }

        this.aflags = aflags;
    }
}
