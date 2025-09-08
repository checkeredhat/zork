class GameObject {
    constructor({
        id,
        names = [],
        description,
        initialDescription,
        action = null,
        contents = [],
        capacity = 0,
        canContain = null,
        flags = {},
        isTouched = false,
        light = 0,
        findValue = 0,
        trophyValue = 0,
        size = 5,
        adjectives = [],
        room = null,
        text = null
    }) {
        this.id = id; // OID
        this.names = names; // ONAMES
        this.description = description; // ODESC2
        this.initialDescription = initialDescription; // ODESC1
        this.action = action; // OACTION
        this.contents = contents; // OCONTENTS
        this.capacity = capacity; // OCAPAC
        this.canContain = canContain; // OCAN

        // OFLAGS
        this.flags = {
            isVisible: true,
            isReadable: false,
            isTakeable: true,
            isDoor: false,
            isTransparent: false,
            isEdible: false,
            isNotDescribed: false,
            isDrinkable: false,
            isContainer: false,
            isLight: false,
            isVictim: false,
            isBurnable: false,
            isOn: false,
            isTool: false,
            isTurnable: false,
            isVehicle: false,
            isFindableFromVehicle: false,
            isAsleep: false,
            isSearchable: false,
            isSacred: false,
            isTieable: false,
            isActor: false,
            isWeapon: false,
            isFighting: false,
            isVillain: false,
            isStaggered: false,
            ...flags
        };

        this.isTouched = isTouched; // OTOUCH?
        this.light = light; // OLIGHT?
        this.findValue = findValue; // OFVAL
        this.trophyValue = trophyValue; // OTVAL
        this.size = size; // OSIZE
        this.adjectives = adjectives; // OADJS
        this.room = room; // OROOM
        this.text = text; // OREAD
    }
}
