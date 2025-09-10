function parseCommand(command, vocabulary) {
    const words = command.toLowerCase().split(/\s+/);
    const verb = findWord(words[0], vocabulary.verbs);

    if (!verb) {
        // Handle directional commands as verbs
        const direction = findWord(words[0], vocabulary.directions);
        if (direction) {
            return { verb: direction.id.toUpperCase() }; // e.g., NORTH, SOUTH
        }
        return { error: "I don't know that verb." };
    }

    // Simple case: verb only (e.g., "look", "inventory")
    if (words.length === 1) {
        return { verb: verb.id };
    }

    const remainingWords = words.slice(1).join(' ');
    const withIndex = remainingWords.indexOf(' with ');

    let dobjString, iobjString;
    if (withIndex !== -1) {
        dobjString = remainingWords.substring(0, withIndex);
        iobjString = remainingWords.substring(withIndex + 6);
    } else {
        dobjString = remainingWords;
    }

    const dobj = findWord(dobjString, vocabulary.nouns);
    const iobj = iobjString ? findWord(iobjString, vocabulary.nouns) : null;

     // GWIM logic (Guess What I Mean) for motion
    if (verb.id === 'GO' || verb.id === 'ENTER') {
        const potentialRoom = findWord(dobjString, vocabulary.nouns); // Search all nouns for rooms
        if (potentialRoom && vocabulary.nouns.find(n => n.id === potentialRoom.id)) {
             return { verb: verb.id, dobj: potentialRoom.id, iobj: null };
        }
         const direction = findWord(words[1], vocabulary.directions);
         if(direction) {
            return { verb: direction.id.toUpperCase() };
         }
    }

    return {
        verb: verb.id,
        dobj: dobj ? dobj.id : null,
        iobj: iobj ? iobj.id : null,
        words: words,
        error: !dobj && dobjString ? `I don't see a ${dobjString} here.` : null
    };
}


function findWord(word, wordList) {
    const target = word.toLowerCase();

    return wordList.find(entry =>
        entry.id.toLowerCase() === target ||
        (entry.synonyms && entry.synonyms.includes(target))
    );
}

export { parseCommand };
