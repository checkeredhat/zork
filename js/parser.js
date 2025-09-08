class Parser {
    constructor(vocabulary) {
        this.vocabulary = vocabulary;
        this.verbs = this._buildReverseMap(vocabulary.verbs);
        this.directions = this._buildReverseMap(vocabulary.directions);
    }

    _buildReverseMap(map) {
        const reverseMap = {};
        for (const key in map) {
            reverseMap[key] = key;
            for (const synonym of map[key]) {
                reverseMap[synonym] = key;
            }
        }
        return reverseMap;
    }

    parse(inputText, context) {
        const tokens = inputText.toLowerCase().trim().split(/\s+/);
        const filteredTokens = tokens.filter(t => !this.vocabulary.buzzwords.includes(t));

        if (filteredTokens.length === 0) {
            return { error: "I can't hear you." };
        }

        let verb = null;
        let directObject = null;

        const verbToken = filteredTokens[0];

        // Check if it's a known verb
        if (this.verbs[verbToken]) {
            verb = this.verbs[verbToken];
        }
        // Check if it's a direction (which implies a "go" verb)
        else if (this.directions[verbToken]) {
            verb = 'go';
            directObject = this.directions[verbToken];
            return { verb, directObject, indirectObject: null };
        } else {
            return { error: `I don't know the verb "${verbToken}".` };
        }

        // Find the direct object if more tokens exist
        if (filteredTokens.length > 1) {
            const objectTokens = filteredTokens.slice(1);
            const availableObjects = [...context.roomObjects, ...context.inventoryObjects];

            directObject = this.findObject(objectTokens, availableObjects);

            if (!directObject) {
                 return { error: `I can't see a "${objectTokens.join(' ')}" here.`};
            }
        }

        return { verb, directObject, indirectObject: null };
    }

    findObject(objectTokens, availableObjects) {
        for (const obj of availableObjects) {
            // Check against object names (e.g., "sword", "orcrist")
            const nameMatch = objectTokens.every(token => obj.names.includes(token));

            if (nameMatch) return obj;

            // Check against adjectives + name (e.g., "elvish sword")
            const adjectiveMatch = objectTokens.length > 1 &&
                                   obj.adjectives.includes(objectTokens[0]) &&
                                   obj.names.includes(objectTokens[1]);

            if (adjectiveMatch) return obj;
        }
        return null;
    }
}
