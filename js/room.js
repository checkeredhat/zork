import { RBITS, setFlag } from './flags.js';

class Room {
    constructor({
        id,
        longDescription,
        shortDescription,
        isSeen = false,
        isLight = false,
        exits = [],
        objects = [],
        action = null,
        value = 0,
        flags = {}
    }) {
        this.id = id; // RID
        this.longDescription = longDescription; // RDESC1
        this.shortDescription = shortDescription; // RDESC2
        this.isSeen = isSeen; // RSEEN?
        this.isLight = isLight; // RLIGHT?
        this.exits = exits; // REXITS
        this.objects = objects; // ROBJS
        this.action = action; // RACTION
        this.value = value; // RVAL

        this.rbits = 0;
        this.initRFlags(flags);
    }

    initRFlags(flags) {
        let rbits = 0;

        const flagMap = {
            isOnLand: RBITS.RLANDBIT,
            isWater: RBITS.RWATERBIT,
            isAir: RBITS.RAIRBIT,
            isSacred: RBITS.RSACREDBIT,
            canFillBottle: RBITS.RFILLBIT,
            isMunged: RBITS.RMUNGBIT,
            isBucket: RBITS.RBUCKBIT,
            isHouse: RBITS.RHOUSEBIT,
        };

        // Set default flags
        rbits = setFlag(rbits, RBITS.RLANDBIT); // isOnLand is default

        for (const [key, value] of Object.entries(flags)) {
            if (flagMap[key] && value === true) {
                rbits = setFlag(rbits, flagMap[key]);
            }
        }

        this.rbits = rbits;
    }
}
