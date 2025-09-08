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
        if (inputText.toLowerCase().startsWith('robot,')) {
            return { verb: 'robot', directObject: inputText.substring(6).trim() };
        }

        const tokens = inputText.toLowerCase().trim().split(/\s+/);
        const filteredTokens = tokens.filter(t => !this.vocabulary.buzzwords.includes(t));

        if (filteredTokens.length === 0) {
            return { error: "I can't hear you." };
        }

        let verb = null;
        let directObject = null;
        let indirectObject = null;

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

        const availableObjects = [...context.roomObjects, ...context.inventoryObjects];

        // Handle verbs with prepositions
        const preposition = filteredTokens.find(t => this.vocabulary.prepositions.includes(t));
        if (preposition) {
            const prepIndex = filteredTokens.indexOf(preposition);
            if (prepIndex > 1 && prepIndex < filteredTokens.length - 1) {
                const directObjectTokens = filteredTokens.slice(1, prepIndex);
                const indirectObjectTokens = filteredTokens.slice(prepIndex + 1);

                directObject = this.findObject(directObjectTokens, context.inventoryObjects);
                indirectObject = this.findObject(indirectObjectTokens, context.roomObjects);

                if (!directObject) {
                    return { error: `You don't have a "${directObjectTokens.join(' ')}".` };
                }
                if (!indirectObject) {
                    return { error: `I can't see a "${indirectObjectTokens.join(' ')}" here.` };
                }

                return { verb, directObject, indirectObject };
            }
        }

        // Find the direct object for other verbs
        if (filteredTokens.length > 1) {
            const objectTokens = filteredTokens.slice(1);
            directObject = this.findObject(objectTokens, availableObjects);

            if (!directObject) {
                return { error: `I can't see a "${objectTokens.join(' ')}" here.` };
            }
        }

        return { verb, directObject, indirectObject };
    }

    findObject(objectTokens, availableObjects) {
        for (const obj of availableObjects) {
            let mainName = null;
            // Find which of the object's names is in the tokens
            for (const name of obj.names) {
                if (objectTokens.includes(name)) {
                    mainName = name;
                    break;
                }
            }

            if (mainName) {
                // A name for the object was found in the input.
                // Now, check if the other tokens are valid adjectives for this object.
                const remainingTokens = objectTokens.filter(t => t !== mainName);
                const adjectivesMatch = remainingTokens.every(token => (obj.adjectives || []).includes(token));

                if (adjectivesMatch) {
                    return obj; // Found a perfect match
                }
            }
        }
        return null; // No matching object found
    }
}
