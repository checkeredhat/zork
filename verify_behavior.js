// A script to verify the behavior of the Zork JS game against transcripts.

const fs = require('fs');

/**
 * Loads the game data from the JSON files.
 * @returns {{rooms: any, objects: any}}
 */
function loadGameData() {
    // Verbose annotation: This function reads the rooms.json and objects.json files
    // from the data/ directory and parses them as JSON. It returns an object
    // containing both data structures. This is the foundation of our game world simulation.
    const rooms = JSON.parse(fs.readFileSync('data/rooms.json', 'utf8'));
    const objects = JSON.parse(fs.readFileSync('data/objects.json', 'utf8'));
    return { rooms, objects };
}

/**
 * Parses a transcript file into a sequence of commands and expected outputs.
 * @param {string} transcriptPath - The path to the transcript file.
 * @returns {Array<{command: string, expectedOutput: string}>}
 */
function parseTranscript(transcriptPath) {
    // Verbose annotation: This function reads a transcript file and splits it into
    // turns. Each turn consists of a player command (prefixed with '>') and the
    // game's response. It returns an array of objects, where each object represents
    // a turn with a command and its expected output. This allows us to iterate
    // through the transcript and check each step of the game.
    const transcript = fs.readFileSync(transcriptPath, 'utf8');
    const turns = transcript.split(/(?=>)/); // Split on the '>' character

    return turns.map(turn => {
        const lines = turn.trim().split('\n');
        const command = lines.shift().replace('>', '').trim();
        const expectedOutput = lines.join('\n').trim();
        return { command, expectedOutput };
    }).filter(turn => turn.command); // Filter out any empty turns
}

/**
 * Simulates the game's response to a 'look' command.
 * @param {any} gameState - The current state of the game.
 * @param {any} gameData - The loaded game data (rooms, objects).
 * @returns {string} - The simulated output of the 'look' command.
 */
function simulateLook(gameState, gameData) {
    // Verbose annotation: This function simulates the 'LOOK' command. It gets the
    // current room from the gameState, retrieves the room's description, and then
    // lists the visible objects in the room. This is a crucial part of our
    // verification, as many discrepancies are related to room descriptions and
    // object visibility.
    const currentRoom = gameData.rooms[gameState.player.location];
    let output = currentRoom.name + '\n' + currentRoom.description;

    const roomObjects = (currentRoom.objects || [])
        .map(objId => {
            // The object might be a string ID or an object with an ID
            const id = typeof objId === 'string' ? objId : objId.id;
            return gameData.objects[id];
        })
        .filter(obj => obj && (!obj.flags || (obj.flags.isVisible && !obj.flags.isNotDescribed)));


    if (roomObjects.length > 0) {
        output += '\n';
        roomObjects.forEach(obj => {
            if (obj.initialDescription && (!obj.flags || !obj.flags.isNotDescribed)) {
                output += '\n' + obj.initialDescription;
            }
        });
    }

    return output.trim();
}

/**
 * Simulates moving the player to a new location.
 * @param {any} gameState - The current state of the game.
 * @param {any} gameData - The loaded game data.
 * @param {string} direction - The direction to move.
 * @returns {{output: string, newState: any}}
 */
function simulateGo(gameState, gameData, direction) {
    const currentRoom = gameData.rooms[gameState.player.location];
    const newLocationId = currentRoom.exits[direction.toUpperCase()];

    if (newLocationId && gameData.rooms[newLocationId]) {
        const newGameState = { ...gameState, player: { ...gameState.player, location: newLocationId } };
        const output = simulateLook(newGameState, gameData);
        return { output, newState: newGameState };
    } else {
        return { output: "You can't go that way.", newState: gameState };
    }
}

/**
 * Simulates taking an object.
 * @param {any} gameState - The current state of the game.
 * @param {any} gameData - The loaded game data.
 * @param {string} objectName - The name of the object to take.
 * @returns {{output: string, newState: any}}
 */
function simulateTake(gameState, gameData, objectName) {
    const currentRoom = gameData.rooms[gameState.player.location];
    const objectId = (currentRoom.objects || []).find(objId => {
        const obj = gameData.objects[objId];
        if (!obj || !obj.name) return false;
        return obj.name.toUpperCase() === objectName.toUpperCase() || (obj.synonyms && obj.synonyms.includes(objectName.toUpperCase()));
    });

    if (objectId) {
        const object = gameData.objects[objectId];
        if (object.flags && object.flags.isTakeable) {
            const newInventory = [...gameState.player.inventory, objectId];
            const newRoomObjects = currentRoom.objects.filter(id => id !== objectId);
            const newGameState = {
                ...gameState,
                player: { ...gameState.player, inventory: newInventory },
                // This is a bit tricky, we need to update the room in the gameData clone
            };
            // This is a simplification. We should be modifying a copy of the game state,
            // not the original gameData. For now, this is ok.
            gameData.rooms[gameState.player.location].objects = newRoomObjects;

            return { output: "Taken.", newState: newGameState };
        } else {
            return { output: "You can't take that.", newState: gameState };
        }
    } else {
        return { output: "You don't see that here.", newState: gameState };
    }
}

/**
 * Simulates opening an object.
 * @param {any} gameState - The current state of the game.
 * @param {any} gameData - The loaded game data.
 * @param {string} objectName - The name of the object to open.
 * @returns {{output: string, newState: any}}
 */
function simulateOpen(gameState, gameData, objectName) {
    const currentRoom = gameData.rooms[gameState.player.location];
    const objectId = (currentRoom.objects || []).find(objId => {
        const obj = gameData.objects[objId];
        if (!obj || !obj.name) return false;
        return obj.name.toUpperCase() === objectName.toUpperCase() || (obj.synonyms && obj.synonyms.includes(objectName.toUpperCase()));
    });

    if (objectId) {
        const object = gameData.objects[objectId];
        if (object.flags && object.flags.isDoor) {
            // This is a simplification. We should check if the door can be opened.
            object.flags.isOpen = true;
            // A special case for the window in "EAST-OF-HOUSE"
            if (objectId === 'WINDOW' && gameState.player.location === 'EAST-OF-HOUSE') {
                gameData.rooms['EAST-OF-HOUSE'].exits['WEST'] = 'KITCHEN';
                 return { output: "With great effort, you open the window far enough to allow entry.", newState: gameState };
            }
            return { output: "Opened.", newState: gameState };
        } else {
            return { output: "You can't open that.", newState: gameState };
        }
    } else {
        return { output: "You don't see that here.", newState: gameState };
    }
}


/**
 * The main simulation function.
 * @param {string} command - The command to simulate.
 * @param {any} gameState - The current state of the game.
 * @param {any} gameData - The loaded game data.
 * @returns {{output: string, newState: any}}
 */
function simulate(command, gameState, gameData) {
    const [verb, ...args] = command.toUpperCase().split(' ');
    const objectName = args.join(' ');

    switch (verb) {
        case 'LOOK':
            return { output: simulateLook(gameState, gameData), newState: gameState };
        case 'NORTH':
        case 'SOUTH':
        case 'EAST':
        case 'WEST':
        case 'UP':
        case 'DOWN':
            return simulateGo(gameState, gameData, verb);
        case 'TAKE':
            return simulateTake(gameState, gameData, objectName);
        case 'OPEN':
            return simulateOpen(gameState, gameData, objectName);
        default:
            return { output: `I don't know how to "${command}".`, newState: gameState };
    }
}

/**
 * The main function to run the verification.
 */
function main() {
    const gameData = loadGameData();
    const transcript1 = parseTranscript('transcript1.txt');

    let gameState = {
        player: {
            location: 'WEST-OF-HOUSE',
            inventory: []
        },
        objects: JSON.parse(JSON.stringify(gameData.objects)) // Deep copy for state changes
    };

    console.log('Starting verification of transcript1.txt...');

    for (const turn of transcript1) {
        const { output: actualOutput, newState } = simulate(turn.command, gameState, gameData);
        gameState = newState;

        const expectedOutput = turn.expectedOutput.replace(/\r\n/g, '\n');

        const normalizedActual = actualOutput.replace(/\s+/g, ' ').trim();
        const normalizedExpected = expectedOutput.replace(/\s+/g, ' ').trim();

        if (normalizedActual !== normalizedExpected) {
            console.log(`\nDiscrepancy found for command: ${turn.command}`);
            console.log('-------------------------------------------');
            console.log('Expected output:');
            console.log(turn.expectedOutput);
            console.log('-------------------------------------------');
            console.log('Actual output:');
            console.log(actualOutput);
            console.log('-------------------------------------------');
        } else {
            console.log(`Command "${turn.command}" OK`);
        }
    }

    console.log('Verification finished.');
}

main();
