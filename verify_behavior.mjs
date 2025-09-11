// A script to verify the behavior of the Zork JS game against transcripts.
import { Game } from './js/game.js';
import * as fs from 'fs';

/**
 * Loads the game data from the JSON files.
 * @returns {object}
 */
function loadGameData() {
    const objects = JSON.parse(fs.readFileSync('data/objects.json', 'utf8'));
    const rooms = JSON.parse(fs.readFileSync('data/rooms.json', 'utf8'));
    const vocabulary = JSON.parse(fs.readFileSync('data/vocabulary.json', 'utf8'));
    const deathMessages = JSON.parse(fs.readFileSync('data/death_messages.json', 'utf8'));
    return { objects, rooms, vocabulary, deathMessages };
}

/**
 * Parses a transcript file into a sequence of commands and expected outputs.
 * @param {string} transcriptPath - The path to the transcript file.
 * @returns {Array<{command: string, expectedOutput: string}>}
 */
function parseTranscript(transcriptPath) {
    const transcript = fs.readFileSync(transcriptPath, 'utf8');
    const turns = transcript.split(/(?=>)/); // Split on the '>' character

    return turns.map(turn => {
        const lines = turn.trim().split('\n');
        const command = lines.shift().replace('>', '').trim();
        // Zork's output often has leading/trailing newlines, let's clean that up
        const expectedOutput = lines.join('\n').trim();
        return { command, expectedOutput };
    }).filter(turn => turn.command); // Filter out any empty turns
}

/**
 * The main function to run the verification.
 */
function main() {
    console.log("Starting script...");
    const gameData = loadGameData();
    const transcriptPath = process.argv[2] || 'transcript1.txt';
    const transcript = parseTranscript(transcriptPath);

    const game = new Game(gameData);

    // Initial look command to match transcript start
    let initialLook = game.look();
    console.log('Starting verification of ' + transcriptPath + '...');

    // The first "turn" in many transcripts is just looking at the starting room.
    // Let's handle that special case.
    if (transcript[0] && (transcript[0].command.toUpperCase() === 'LOOK' || transcript[0].command === '')) {
         const firstTurn = transcript.shift();
         const normalizedActual = initialLook.replace(/\s+/g, ' ').trim();
         const normalizedExpected = firstTurn.expectedOutput.replace(/\s+/g, ' ').trim();

         if (normalizedActual !== normalizedExpected) {
             console.log(`\nDiscrepancy found for initial LOOK`);
             console.log('-------------------------------------------');
             console.log('Expected output:');
             console.log(firstTurn.expectedOutput);
             console.log('-------------------------------------------');
             console.log('Actual output:');
             console.log(initialLook);
             console.log('-------------------------------------------');
         } else {
             console.log(`Initial "LOOK" OK`);
         }
    }


    for (const turn of transcript) {
        const actualOutput = game.tick(turn.command);
        const expectedOutput = turn.expectedOutput.replace(/\r\n/g, '\n');

        // Normalize whitespace and newlines for comparison
        const normalizedActual = actualOutput.replace(/\s+/g, ' ').trim();
        const normalizedExpected = expectedOutput.replace(/\s+/g, ' ').trim();

        if (normalizedActual !== normalizedExpected) {
            console.log(`\nDiscrepancy found for command: > ${turn.command}`);
            console.log('-------------------------------------------');
            console.log('Expected output:');
            console.log(`[${turn.expectedOutput}]`);
            console.log('-------------------------------------------');
            console.log('Actual output:');
            console.log(`[${actualOutput}]`);
            console.log('-------------------------------------------');
        } else {
            console.log(`Command "${turn.command}" OK`);
        }
    }

    console.log('Verification finished.');
}

main();
