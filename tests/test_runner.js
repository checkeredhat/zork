import fs from 'fs';
import path from 'path';
import { Game } from '../js/game.js';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to load game data from JSON files
async function loadGameData() {
    const dataPath = path.join(__dirname, '..', 'data');
    const objects = JSON.parse(fs.readFileSync(path.join(dataPath, 'objects.json'), 'utf8'));
    const rooms = JSON.parse(fs.readFileSync(path.join(dataPath, 'rooms.json'), 'utf8'));
    const vocabulary = JSON.parse(fs.readFileSync(path.join(dataPath, 'vocabulary.json'), 'utf8'));
    const deathMessages = JSON.parse(fs.readFileSync(path.join(dataPath, 'death_messages.json'), 'utf8'));
    return { objects, rooms, vocabulary, deathMessages };
}

// Function to run a single test case from a parsed transcript
function runTest(testCase, game) {
    console.log(`\n> ${testCase.command}`);
    const actual_output = game.tick(testCase.command).trim();
    const expected_output = testCase.expected_output.trim();

    // Normalize whitespace and line endings for comparison
    const normalize = (str) => str.replace(/\s+/g, ' ').trim();

    if (normalize(actual_output) === normalize(expected_output)) {
        console.log(`  [PASS]`);
        return true;
    } else {
        console.log(`  [FAIL]`);
        console.log(`  Expected: "${expected_output}"`);
        console.log(`  Got:      "${actual_output}"`);
        return false;
    }
}

// Main function to run all tests
async function main() {
    console.log('Running all transcript tests...');

    // First, run the transcript parser
    try {
        const { execSync } = await import('child_process');
        execSync('python3 tests/parse_transcripts.py', { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to parse transcripts:', error);
        process.exit(1);
    }


    const gameData = await loadGameData();
    const parsedTranscriptsDir = path.join(__dirname, 'parsed_transcripts');
    const transcriptFiles = fs.readdirSync(parsedTranscriptsDir).filter(f => f.endsWith('.json'));

    let allTestsPassed = true;

    for (const file of transcriptFiles) {
        console.log(`\n--- Running tests from ${file} ---`);
        const game = new Game(JSON.parse(JSON.stringify(gameData))); // Fresh game state for each transcript
        const transcript = JSON.parse(fs.readFileSync(path.join(parsedTranscriptsDir, file), 'utf8'));

        for (const testCase of transcript) {
            if (!runTest(testCase, game)) {
                allTestsPassed = false;
                // Stop on first failure for this transcript
                console.error(`\nHalting tests for ${file} due to failure.`);
                break;
            }
        }
        if (!allTestsPassed) {
             break; // Stop all tests if one transcript fails
        }
    }

    if (allTestsPassed) {
        console.log('\n\nAll transcript tests passed!');
        process.exit(0);
    } else {
        console.error('\n\nSome transcript tests failed.');
        process.exit(1);
    }
}

main();
