class Parser {
    constructor(vocabulary) {
        this.vocabulary = vocabulary;
        // Create a flat map of all synonyms to their canonical verb
        this.verbSynonyms = this._buildReverseMap(vocabulary.verbs);
        // Create a flat map for directions
        this.directionSynonyms = this._buildReverseMap(vocabulary.directions);
    }

    _buildReverseMap(map) {
        const reverseMap = {};
        for (const key in map) {
            // The key itself is a valid token
            reverseMap[key] = key;
            // All synonyms also map to the key
            for (const synonym of map[key]) {
                reverseMap[synonym] = key;
            }
        }
        return reverseMap;
    }

    findObject(tokens, availableObjects) {
        if (!tokens || tokens.length === 0) {
            return null;
        }

        let bestMatch = { obj: null, score: 0 };

        for (const obj of availableObjects) {
            const objectNames = obj.names || [];
            const objectAdjectives = obj.adjectives || [];
            let currentScore = 0;
            let nameFound = false;

            // Check if any of the object's primary names are in the token list
            for (const name of objectNames) {
                if (tokens.includes(name)) {
                    currentScore += 10; // Strong score for matching the noun
                    nameFound = true;
                    break;
                }
            }

            // Only proceed if a name was matched, to avoid matching on adjectives alone
            if (nameFound) {
                // Award points for matching adjectives
                for (const adj of objectAdjectives) {
                    if (tokens.includes(adj)) {
                        currentScore += 5;
                    }
                }

                // Penalize for extra words in the input that don't match anything
                const allObjectWords = new Set([...objectNames, ...objectAdjectives]);
                for (const token of tokens) {
                    if (!allObjectWords.has(token)) {
                        currentScore -= 2;
                    }
                }

                if (currentScore > bestMatch.score) {
                    bestMatch = { obj: obj, score: currentScore };
                }
            }
        }

        // Only return a match if it's reasonably confident
        return bestMatch.score > 5 ? bestMatch.obj : null;
    }

    parse(inputText, context) {
        const originalTokens = inputText.toLowerCase().trim().split(/\s+/);
        const tokens = originalTokens.filter(t => !this.vocabulary.buzzwords.includes(t));

        if (tokens.length === 0) {
            return { error: "I beg your pardon?" };
        }

        // --- Step 1: Handle single-word commands ---
        if (tokens.length === 1) {
            const token = tokens[0];
            if (this.directionSynonyms[token]) {
                return { verb: 'go', directObject: this.directionSynonyms[token], indirectObject: null };
            }
            if (this.verbSynonyms[token]) {
                const verb = this.verbSynonyms[token];
                // Handle verbs that can be used alone (inventory, look, quit)
                 if (['inven', 'look', 'quit', 'score', 'brief', 'super', 'unbri', 'unsup', 'time', 'wait', 'yell', 'jump', 'pray', 'zork', 'templ', 'treas'].includes(verb)) {
                    return { verb: verb, directObject: null, indirectObject: null };
                } else {
                    return { error: `What do you want to ${verb}?` };
                }
            }
            // If it's not a verb or direction, assume it's an object to be examined
            const obj = this.findObject(tokens, [...context.roomObjects, ...context.inventoryObjects]);
            if(obj) {
                return { verb: 'exami', directObject: obj, indirectObject: null };
            }
        }

        // --- Step 2: Find verb and preposition indices ---
        let verb = null, verbIndex = -1;
        let prep = null, prepIndex = -1;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (verbIndex === -1 && this.verbSynonyms[token]) {
                verb = this.verbSynonyms[token];
                verbIndex = i;
            }
            if (prepIndex === -1 && this.vocabulary.prepositions.includes(token)) {
                prep = token;
                prepIndex = i;
            }
        }

        // --- Step 3: Handle no-verb commands (e.g., "north", "troll") ---
        if (verbIndex === -1) {
            if (this.directionSynonyms[tokens[0]]) {
                 return { verb: 'go', directObject: this.directionSynonyms[tokens[0]], indirectObject: null };
            }
            // Assume it's an object to be examined
            const obj = this.findObject(tokens, [...context.roomObjects, ...context.inventoryObjects]);
             if(obj) {
                return { verb: 'exami', directObject: obj, indirectObject: null };
            } else {
                return { error: `I don't understand that sentence.` };
            }
        }

        // --- Step 4: Parse based on verb and preposition position ---
        let directObjectTokens = [];
        let indirectObjectTokens = [];

        if (prepIndex !== -1 && verbIndex < prepIndex) {
            // If the preposition immediately follows the verb (e.g., "look at"),
            // then the following words are the direct object.
            if (prepIndex === verbIndex + 1) {
                directObjectTokens = tokens.slice(prepIndex + 1);
            } else {
                // Otherwise, it's a VERB...DO...PREP...IO structure
                directObjectTokens = tokens.slice(verbIndex + 1, prepIndex);
                indirectObjectTokens = tokens.slice(prepIndex + 1);
            }
        } else {
            // Structure: VERB ... DIRECT_OBJECT (no preposition)
            directObjectTokens = tokens.slice(verbIndex + 1);
        }

        // --- Step 5: Find the actual game objects ---
        const availableObjects = [...context.roomObjects, ...context.inventoryObjects];
        // --- Step 5: Find the actual game objects ---
        let directObject = null;
        let indirectObject = null;

        // Special handling for the 'go' verb
        if (verb === 'go') {
            if (directObjectTokens.length > 0 && this.directionSynonyms[directObjectTokens[0]]) {
                directObject = this.directionSynonyms[directObjectTokens[0]];
            } else {
                return { error: "Where do you want to go?" };
            }
        } else {
            directObject = this.findObject(directObjectTokens, availableObjects);
        }

        indirectObject = this.findObject(indirectObjectTokens, availableObjects);

        // --- Step 6: Validate and return ---
        if (verb !== 'go' && directObjectTokens.length > 0 && !directObject) {
            return { error: `I can't see a "${directObjectTokens.join(' ')}" here.` };
        }
        if (indirectObjectTokens.length > 0 && !indirectObject) {
            return { error: `I can't see a "${indirectObjectTokens.join(' ')}" here.` };
        }

        return { verb, directObject, indirectObject };
    }
}

// Export the class for use in Node.js (for testing)
module.exports = Parser;
