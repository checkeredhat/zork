// A script to verify the navigation logic of the Zork JS game.
import { Game } from '../js/game.js';
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

let testsPassed = 0;
let testsFailed = 0;

/**
 * A simple test runner.
 * @param {string} description - The description of the test.
 * @param {function} testFn - The function that runs the test.
 */
function test(description, testFn) {
    try {
        testFn();
        console.log(`✔ ${description}`);
        testsPassed++;
    } catch (error) {
        console.error(`✖ ${description}`);
        console.error(error);
        testsFailed++;
    }
}

/**
 * The main function to run the verification.
 */
function main() {
    console.log("Starting navigation verification...");
    const gameData = loadGameData();
    const game = new Game(gameData);

    /**
     * Helper to move the player to a specific room.
     * @param {string} roomId - The ID of the room to move the player to.
     */
    function movePlayerTo(roomId) {
        game.player.location = roomId;
        // Ensure the room is "visited" to avoid LOOK behavior overriding test output
        const room = game.rooms.get(roomId);
        if (room) {
            room.rbits |= 1; // Set RSEENBIT
        }
    }

    /**
     * Helper to assert the player's current location.
     * @param {string} expectedRoomId - The expected room ID.
     */
    function assertPlayerLocation(expectedRoomId) {
        if (game.player.location !== expectedRoomId) {
            throw new Error(`Player is in ${game.player.location}, but expected to be in ${expectedRoomId}`);
        }
    }

    /**
     * Helper to give the player an item.
     * @param {string} itemId - The ID of the item to give.
     */
    function givePlayerItem(itemId) {
        const item = game.objects.get(itemId);
        if (item) {
            item.location = 'IN_INVENTORY';
        }
    }

    /**
     * Helper to remove all items from the player's inventory.
     */
    function clearInventory() {
        for (const object of game.objects.values()) {
            if (object.location === 'IN_INVENTORY') {
                object.location = null; // Or move it to a limbo room
            }
        }
    }

    // --- KITCH Room Tests ---
    test('KITCH: DOWN exit should be blocked', () => {
        movePlayerTo('KITCH');
        const output = game.tick('DOWN');
        assertPlayerLocation('KITCH');
        if (!output.includes('Only Santa Claus climbs down chimneys.')) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    // --- CELLA Room Tests ---
    test('CELLA: should have correct exits', () => {
        movePlayerTo('CELLA');
        game.tick('EAST');
        assertPlayerLocation('MTROL');

        movePlayerTo('CELLA');
        game.tick('SOUTH');
        assertPlayerLocation('CHAS2');

        movePlayerTo('CELLA');
        const output = game.tick('WEST');
        assertPlayerLocation('CELLA');
        if (!output.includes('You try to ascend the ramp, but it is impossible, and you slide back down.')) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    // --- LROOM Room Tests ---
    test('LROOM: should not have an UP exit', () => {
        movePlayerTo('LROOM');
        const output = game.tick('UP');
        assertPlayerLocation('LROOM');
        if (!output.includes("You can't go that way.")) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    // --- MTROL Room Tests ---
    test('MTROL: conditional exits should work', () => {
        movePlayerTo('MTROL');
        game.globalFlags.set('TROLL-FLAG', false);
        const output = game.tick('EAST');
        assertPlayerLocation('MTROL');
        if (!output.includes('The troll spits in your face, saying "Better luck next time."')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('TROLL-FLAG', true);
        game.tick('EAST');
        assertPlayerLocation('CRAW4');
    });

    // --- CLEAR Room Tests ---
    test('CLEAR: DOWN exit should be conditional', () => {
        movePlayerTo('CLEAR');
        game.globalFlags.set('KEY-FLAG', false);
        const output = game.tick('DOWN');
        assertPlayerLocation('CLEAR');
        if (!output.includes('The grating is locked')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('KEY-FLAG', true);
        game.tick('DOWN');
        assertPlayerLocation('MGRAT');
    });

    // --- TWELL Room Tests ---
    test('TWELL: DOWN exit should be blocked', () => {
        movePlayerTo('TWELL');
        const output = game.tick('DOWN');
        assertPlayerLocation('TWELL');
        if (!output.includes("It's a long way down!")) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    // --- TEMP1 Room Tests ---
    test('TEMP1: WEST exit should lead to MGRAI', () => {
        movePlayerTo('TEMP1');
        game.tick('WEST');
        assertPlayerLocation('MGRAI');
    });

    // --- BWELL Room Tests ---
    test('BWELL: should have correct exits', () => {
        movePlayerTo('BWELL');
        game.tick('WEST');
        assertPlayerLocation('MPEAR');

        movePlayerTo('BWELL');
        const output = game.tick('UP');
        assertPlayerLocation('BWELL');
        if (!output.includes('The walls cannot be climbed.')) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    // --- LEDG2 Room Tests ---
    test('LEDG2: WEST exit should be conditional', () => {
        movePlayerTo('LEDG2');
        game.globalFlags.set('GNOME-PLEASED', false);
        const output = game.tick('WEST');
        assertPlayerLocation('LEDG2');
        if (!output.includes('A gnome bars your way')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('GNOME-PLEASED', true);
        game.tick('WEST');
        assertPlayerLocation('LIBRA');
    });

    // --- TIMBE Room Tests ---
    test('TIMBE: SW exit should be blocked when carrying items', () => {
        movePlayerTo('TIMBE');
        givePlayerItem('SWORD'); // Give a dummy item
        const output = game.tick('SW');
        assertPlayerLocation('TIMBE'); // Should not have moved
        if (!output.includes('You cannot fit through this passage with that load.')) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    test('TIMBE: SW exit should be open when empty-handed', () => {
        movePlayerTo('TIMBE');
        clearInventory();
        game.tick('SW');
        assertPlayerLocation('BSHAF');
    });


    // --- BSHAF Room Tests ---
    test('BSHAF: OUT exit should be blocked when carrying items', () => {
        movePlayerTo('BSHAF');
        givePlayerItem('SWORD');
        const output = game.tick('OUT');
        assertPlayerLocation('BSHAF');
        if (!output.includes('You cannot fit through this passage with that load.')) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    test('BSHAF: OUT exit should be open when empty-handed', () => {
        movePlayerTo('BSHAF');
        clearInventory();
        game.tick('OUT');
        assertPlayerLocation('TIMBE');
    });

    // --- ALICE Room Tests ---
    test('ALICE: DOWN exit should be conditional', () => {
        movePlayerTo('ALICE');
        game.globalFlags.set('PLAYER-SMALL', false);
        const output = game.tick('DOWN');
        assertPlayerLocation('ALICE');
        if (!output.includes('You are too large to fit through the hole.')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('PLAYER-SMALL', true);
        game.tick('DOWN');
        assertPlayerLocation('ALISM');
    });

    // --- MAGNE Room Tests ---
    const magneExits = {
        'NORTH': 'CMACH', 'SOUTH': 'CMACH', 'WEST': 'CMACH', 'NE': 'CMACH', 'EAST': 'CMACH',
        'NW': 'ALICE', 'SW': 'ALICE', 'SE': 'ALICE'
    };

    for (const [dir, dest] of Object.entries(magneExits)) {
        test(`MAGNE: ${dir} exit should work`, () => {
            movePlayerTo('MAGNE');
            game.tick(dir);
            assertPlayerLocation(dest);
        });
    }

    // --- ALISM Room Tests ---
    test('ALISM: UP exit should lead to ALICE', () => {
        movePlayerTo('ALISM');
        game.tick('UP');
        assertPlayerLocation('ALICE');
    });

    // --- ALITR Room Tests ---
    test('ALITR: should have correct exits', () => {
        movePlayerTo('ALITR');
        game.tick('WEST');
        assertPlayerLocation('ALISM');
    });

    // --- RAVI1 Room Tests ---
    test('RAVI1: should have correct exits', () => {
        movePlayerTo('RAVI1');
        game.tick('SOUTH');
        assertPlayerLocation('PASS1');

        movePlayerTo('RAVI1');
        game.tick('DOWN');
        assertPlayerLocation('RESES');

        movePlayerTo('RAVI1');
        game.tick('EAST');
        assertPlayerLocation('CHAS1');

        movePlayerTo('RAVI1');
        game.tick('WEST');
        assertPlayerLocation('CRAW1');
    });

    // --- RUBYR Room Tests ---
    test('RUBYR: should have correct exits', () => {
        movePlayerTo('RUBYR');
        game.tick('WEST');
        assertPlayerLocation('LAVA');

        movePlayerTo('RUBYR');
        game.tick('SOUTH');
        assertPlayerLocation('ICY');
    });

    // --- ATLAN Room Tests ---
    test('ATLAN: should have correct exits', () => {
        movePlayerTo('ATLAN');
        game.tick('SE');
        assertPlayerLocation('RESEN');

        movePlayerTo('ATLAN');
        game.tick('UP');
        assertPlayerLocation('CAVE1');
    });

    // --- CANY1 Room Tests ---
    test('CANY1: should have correct exits', () => {
        movePlayerTo('CANY1');
        game.tick('NW');
        assertPlayerLocation('RESES');

        movePlayerTo('CANY1');
        game.tick('EAST');
        assertPlayerLocation('DAM');

        movePlayerTo('CANY1');
        game.tick('SOUTH');
        assertPlayerLocation('CAROU');
    });

    // --- MIRR1 Room Tests ---
    test('MIRR1: should have correct exits', () => {
        movePlayerTo('MIRR1');
        game.tick('WEST');
        assertPlayerLocation('PASS3');

        movePlayerTo('MIRR1');
        game.tick('NORTH');
        assertPlayerLocation('CRAW2');

        movePlayerTo('MIRR1');
        game.tick('EAST');
        assertPlayerLocation('CAVE1');
    });

    // --- MIRR2 Room Tests ---
    test('MIRR2: should have correct exits', () => {
        movePlayerTo('MIRR2');
        game.tick('WEST');
        assertPlayerLocation('PASS4');

        movePlayerTo('MIRR2');
        game.tick('NORTH');
        assertPlayerLocation('CRAW3');

        movePlayerTo('MIRR2');
        game.tick('EAST');
        assertPlayerLocation('CAVE2');
    });

    // --- CAVE1 Room Tests ---
    test('CAVE1: should have correct exits', () => {
        movePlayerTo('CAVE1');
        game.tick('NORTH');
        assertPlayerLocation('MIRR1');

        movePlayerTo('CAVE1');
        game.tick('DOWN');
        assertPlayerLocation('ATLAN');
    });

    // --- CAVE2 Room Tests ---
    test('CAVE2: should have correct exits', () => {
        movePlayerTo('CAVE2');
        game.tick('NORTH');
        assertPlayerLocation('CRAW3');

        movePlayerTo('CAVE2');
        game.tick('WEST');
        assertPlayerLocation('MIRR2');

        movePlayerTo('CAVE2');
        game.tick('DOWN');
        assertPlayerLocation('LLD1');
    });

    // --- PASS3 Room Tests ---
    test('PASS3: should have correct exits', () => {
        movePlayerTo('PASS3');
        game.tick('EAST');
        assertPlayerLocation('MIRR1');

        movePlayerTo('PASS3');
        game.tick('WEST');
        assertPlayerLocation('SLIDE');

        movePlayerTo('PASS3');
        game.tick('NORTH');
        assertPlayerLocation('CRAW2');
    });

    // --- PASS4 Room Tests ---
    test('PASS4: should have correct exits', () => {
        movePlayerTo('PASS4');
        game.tick('EAST');
        assertPlayerLocation('MIRR2');

        movePlayerTo('PASS4');
        const output = game.tick('NORTH');
        assertPlayerLocation('PASS4');
        if (!output.includes('You hear the whir of the carousel room but can find no entrance.')) {
            throw new Error(`Unexpected output: ${output}`);
        }
    });

    // --- DOME Room Tests ---
    test('DOME: conditional exits should work', () => {
        movePlayerTo('DOME');
        game.globalFlags.set('DOME-FLAG', false);
        const output = game.tick('DOWN');
        assertPlayerLocation('DOME');
        if (!output.includes('You cannot go down without fracturing many bones.')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('DOME-FLAG', true);
        game.tick('DOWN');
        assertPlayerLocation('MTORC');
    });

    // --- MTORC Room Tests ---
    test('MTORC: should have correct exits', () => {
        movePlayerTo('MTORC');
        const output = game.tick('UP');
        assertPlayerLocation('MTORC');
        if (!output.includes('You cannot reach the rope.')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        movePlayerTo('MTORC');
        game.tick('WEST');
        assertPlayerLocation('MTORC');

        movePlayerTo('MTORC');
        game.tick('DOWN');
        assertPlayerLocation('CRAW4');
    });

    // --- CAROU Room Tests ---
    test('CAROU: conditional exits should work', () => {
        movePlayerTo('CAROU');
        game.globalFlags.set('CAROUSEL-FLIP', true);
        game.tick('NORTH');
        assertPlayerLocation('CAVE4');
    });

    // --- RIDDL Room Tests ---
    test('RIDDL: EAST exit should be conditional', () => {
        movePlayerTo('RIDDL');
        game.globalFlags.set('RIDDLE-FLAG', false);
        const output = game.tick('EAST');
        assertPlayerLocation('RIDDL');
        if (!output.includes('Your way is blocked by an invisible force.')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('RIDDLE-FLAG', true);
        game.tick('EAST');
        assertPlayerLocation('MPEAR');
    });

    // --- MPEAR Room Tests ---
    test('MPEAR: should have correct exits', () => {
        movePlayerTo('MPEAR');
        game.tick('EAST');
        assertPlayerLocation('BWELL');

        movePlayerTo('MPEAR');
        game.tick('WEST');
        assertPlayerLocation('RIDDL');
    });

    // --- LLD1 Room Tests ---
    test('LLD1: EAST exit should be conditional', () => {
        movePlayerTo('LLD1');
        game.globalFlags.set('LLD-FLAG', false);
        const output = game.tick('EAST');
        assertPlayerLocation('LLD1');
        if (!output.includes('Some invisible force prevents you from passing through the gate.')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('LLD-FLAG', true);
        game.tick('EAST');
        assertPlayerLocation('LLD2');
    });

    // --- BLROO Room Tests ---
    test('BLROO: should have correct exits', () => {
        movePlayerTo('BLROO');
        game.tick('SOUTH');
        assertPlayerLocation('CYCLO');

        movePlayerTo('BLROO');
        game.tick('EAST');
        assertPlayerLocation('LROOM');
    });

    // --- STUDI Room Tests ---
    test('STUDI: UP exit should be conditional', () => {
        movePlayerTo('STUDI');
        game.globalFlags.set('LIGHT-LOAD', false);
        const output = game.tick('UP');
        assertPlayerLocation('STUDI');
        if (!output.includes('The chimney is too narrow for you and all of your baggage.')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('LIGHT-LOAD', true);
        game.tick('UP');
        assertPlayerLocation('KITCH');
    });

    // --- GALLE Room Tests ---
    test('GALLE: should have correct exits', () => {
        movePlayerTo('GALLE');
        game.tick('NORTH');
        assertPlayerLocation('CHAS2');

        movePlayerTo('GALLE');
        game.tick('SOUTH');
        assertPlayerLocation('STUDI');
    });

    // --- TCAVE Room Tests ---
    test('TCAVE: should have correct exits', () => {
        movePlayerTo('TCAVE');
        game.tick('SOUTH');
        assertPlayerLocation('RCAVE');

        movePlayerTo('TCAVE');
        game.tick('NW');
        assertPlayerLocation('CHAS3');
    });

    // --- BARRE Room Tests ---
    test('BARRE: should have correct exits', () => {
        movePlayerTo('BARRE');
        game.tick('EXIT');
        assertPlayerLocation('FALLS');
    });

    // --- FALLS Room Tests ---
    test('FALLS: EAST exit should be conditional', () => {
        movePlayerTo('FALLS');
        game.globalFlags.set('RAINBOW', false);
        const output = game.tick('EAST');
        assertPlayerLocation('FALLS');
        if (!output.includes("You can't go that way.")) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('RAINBOW', true);
        game.tick('EAST');
        assertPlayerLocation('RAINB');
    });

    // --- RAINB Room Tests ---
    test('RAINB: should have correct exits', () => {
        movePlayerTo('RAINB');
        game.tick('EAST');
        assertPlayerLocation('POG');

        movePlayerTo('RAINB');
        game.tick('WEST');
        assertPlayerLocation('FALLS');
    });

    // --- LEDG3 Room Tests ---
    test('LEDG3: should have correct exits', () => {
        movePlayerTo('LEDG3');
        const output = game.tick('DOWN');
        assertPlayerLocation('LEDG3');
        if (!output.includes("I wouldn't try that.")) {
            throw new Error(`Unexpected output: ${output}`);
        }

        movePlayerTo('LEDG3');
        const output2 = game.tick('CROSS');
        assertPlayerLocation('LEDG3');
        if (!output2.includes('It is impossible to cross this distance.')) {
            throw new Error(`Unexpected output: ${output2}`);
        }

        movePlayerTo('LEDG3');
        game.tick('EAST');
        assertPlayerLocation('EGYPT');
    });

    // --- LEDG4 Room Tests ---
    test('LEDG4: WEST exit should be conditional', () => {
        movePlayerTo('LEDG4');
        game.globalFlags.set('GNOME-PLEASED', false);
        const output = game.tick('WEST');
        assertPlayerLocation('LEDG4');
        if (!output.includes('A gnome bars your way')) {
            throw new Error(`Unexpected output: ${output}`);
        }

        game.globalFlags.set('GNOME-PLEASED', true);
        game.tick('WEST');
        assertPlayerLocation('SAFE');
    });

    // --- LAVA Room Tests ---
    test('LAVA: should have correct exits', () => {
        movePlayerTo('LAVA');
        game.tick('SOUTH');
        assertPlayerLocation('VLBOT');

        movePlayerTo('LAVA');
        game.tick('WEST');
        assertPlayerLocation('RUBYR');
    });

    console.log('\n--- Verification Summary ---');
    console.log(`Total tests: ${testsPassed + testsFailed}`);
    console.log(`Passed: ${testsPassed}`);
    console.log(`Failed: ${testsFailed}`);
    console.log('--------------------------');

    if (testsFailed > 0) {
        process.exit(1); // Exit with error code if any test failed
    }
}

main();
