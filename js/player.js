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

        // AFLAGS
        this.flags = {
            isStaggered: false,
            ...flags
        };
    }
}
