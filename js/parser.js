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

        const firstToken = filteredTokens[0];

        // Is the first token a direction? (e.g., "north")
        if (this.directions[firstToken]) {
            verb = 'go';
            directObject = this.directions[firstToken];
            return { verb, directObject, indirectObject: null };
        }

        // Is the first token a verb?
        if (this.verbs[firstToken]) {
            verb = this.verbs[firstToken];
        } else {
            return { error: `I don't know the verb "${firstToken}".` };
        }

        // Handle 'go' verb specifically (e.g., "go north")
        if (verb === 'go') {
            if (filteredTokens.length > 1 && this.directions[filteredTokens[1]]) {
                directObject = this.directions[filteredTokens[1]];
                return { verb, directObject, indirectObject: null };
            } else {
                return { error: "Where do you want to go?" };
            }
        }

        // Find the direct object for other verbs
        if (filteredTokens.length > 1) {
            const objectTokens = filteredTokens.slice(1);
            const availableObjects = [...context.roomObjects, ...context.inventoryObjects];

            directObject = this.findObject(objectTokens, availableObjects);

            if (!directObject) {
                return { error: `I can't see a "${objectTokens.join(' ')}" here.` };
            }
        }

        return { verb, directObject, indirectObject: null };
    }

    findObject(objectTokens, availableObjects) {
        let bestMatch = null;
        let highestScore = -1;

        for (const obj of availableObjects) {
            const nameTokens = [];
            const adjTokens = [];
            const otherTokens = [];

            for (const token of objectTokens) {
                if (obj.names.includes(token)) {
                    nameTokens.push(token);
                } else if ((obj.adjectives || []).includes(token)) {
                    adjTokens.push(token);
                } else {
                    otherTokens.push(token);
                }
            }

            if (!nameMatch) {
                continue; // This object is not a candidate if no name matches
            }

            // Check that all remaining tokens are valid adjectives for the object
            const adjectivesMatch = remainingTokens.every(token => (obj.adjectives || []).includes(token));

            if (adjectivesMatch) {
                return obj; // Found a match

            }
        }
        return bestMatch;
    }
}
