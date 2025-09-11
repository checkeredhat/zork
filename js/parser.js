function findBestNounMatch(sentence, nouns) {
    let bestMatch = null;

    for (const noun of nouns) {
        const allNames = [noun.id.toLowerCase(), ...(noun.synonyms || []).map(s => s.toLowerCase())];
        for (const name of allNames) {
            if (sentence.includes(name)) {
                // Prioritize longer matches to handle cases like "sandwich bag" vs "bag"
                if (!bestMatch || name.length > bestMatch.matchedName.length) {
                    bestMatch = { ...noun, matchedName: name };
                }
            }
        }
    }
    return bestMatch;
}


function parseCommand(command, vocabulary) {
    const words = command.toLowerCase().split(/\s+/);
    const verbWord = words[0];
    const verb = (vocabulary.verbs || []).find(v => v.id.toLowerCase() === verbWord || (v.synonyms && v.synonyms.map(s => s.toLowerCase()).includes(verbWord)));

    if (!verb) {
        const direction = (vocabulary.directions || []).find(d => d.id.toLowerCase() === verbWord || (d.synonyms && d.synonyms.map(s => s.toLowerCase()).includes(verbWord)));
        if (direction) {
            return { verb: direction.id.toUpperCase() };
        }
        return { error: `I don't know the verb "${verbWord}".` };
    }

    if (words.length === 1) {
        return { verb: verb.id };
    }

    const remainingSentence = words.slice(1).join(' ');
    let dobjString = remainingSentence;
    let iobjString = null;

    // Handle indirect objects (e.g., "attack troll with sword")
    const withKeywords = [' with ', ' using ', ' on '];
    let withIndex = -1;
    let withKeyword = null;

    for(const keyword of withKeywords) {
        const index = remainingSentence.indexOf(keyword);
        if (index !== -1) {
            withIndex = index;
            withKeyword = keyword;
            break;
        }
    }

    if (withIndex !== -1) {
        dobjString = remainingSentence.substring(0, withIndex);
        iobjString = remainingSentence.substring(withIndex + withKeyword.length);
    }

    const dobj = findBestNounMatch(dobjString, vocabulary.nouns);
    const iobj = iobjString ? findBestNounMatch(iobjString, vocabulary.nouns) : null;

    return {
        verb: verb.id,
        dobj: dobj ? dobj.id : null,
        iobj: iobj ? iobj.id : null,
        error: !dobj && dobjString ? `I can't see a "${dobjString.trim()}" here.` : null
    };
}


export { parseCommand };
