import { OFLAGS, setFlag } from './flags.js';

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

        this.oflags = 0; // Initialize oflags bitmask
        this.initOFlags(flags); // Convert boolean flags to bitmask

        this.isTouched = isTouched; // OTOUCH?
        this.light = light; // OLIGHT?
        this.findValue = findValue; // OFVAL
        this.trophyValue = trophyValue; // OTVAL
        this.size = size; // OSIZE
        this.adjectives = adjectives; // OADJS
        this.room = room; // OROOM
        this.text = text; // OREAD
    }

    initOFlags(flags) {
        let oflags = 0;

        const flagMap = {
            isVisible: OFLAGS.OVISON,
            isReadable: OFLAGS.READBIT,
            isTakeable: OFLAGS.TAKEBIT,
            isDoor: OFLAGS.DOORBIT,
            isTransparent: OFLAGS.TRANSBIT,
            isEdible: OFLAGS.FOODBIT,
            isNotDescribed: OFLAGS.NDESCBIT,
            isDrinkable: OFLAGS.DRINKBIT,
            isContainer: OFLAGS.CONTBIT,
            isLightSource: OFLAGS.LIGHTBIT,
            isVictim: OFLAGS.VICBIT,
            isBurnable: OFLAGS.BURNBIT,
            isOn: OFLAGS.FLAMEBIT,
            isTool: OFLAGS.TOOLBIT,
            isTurnable: OFLAGS.TURNBIT,
            isVehicle: OFLAGS.VEHBIT,
            isFindableFromVehicle: OFLAGS.FINDMEBIT,
            isAsleep: OFLAGS.SLEEPBIT,
            isSearchable: OFLAGS.SEARCHBIT,
            isSacred: OFLAGS.SACREDBIT,
            isTieable: OFLAGS.TIEBIT,
            isActor: OFLAGS.ACTORBIT,
            isWeapon: OFLAGS.WEAPONBIT,
            isFighting: OFLAGS.FIGHTBIT,
            isVillain: OFLAGS.VILLAIN,
            isStaggered: OFLAGS.STAGGERED,
            isNotTakeableWithMessage: OFLAGS.TRYTAKEBIT,
        };

        for (const [key, value] of Object.entries(flags)) {
            if (flagMap[key] && value === true) {
                oflags = setFlag(oflags, flagMap[key]);
            }
        }

        this.oflags = oflags;
    }
}
