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

        // RBITS
        this.flags = {
            isOnLand: true,
            isWater: false,
            isAir: false,
            isSacred: false,
            canFillBottle: false,
            isMunged: false,
            isBucket: false,
            isHouse: false,
            ...flags
        };
    }
}
