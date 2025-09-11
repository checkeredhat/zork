const assert = require('assert');
const fs = require('fs');
const { Game, OFLAGS, RBITS, hasFlag } = require('./dist/game.test.js');

function loadGameData() {
    const roomsData = JSON.parse(fs.readFileSync('data/rooms.json', 'utf8'));
    const objectsData = JSON.parse(fs.readFileSync('data/objects.json', 'utf8'));
    const vocabulary = JSON.parse(fs.readFileSync('data/vocabulary.json', 'utf8'));
    const deathMessages = JSON.parse(fs.readFileSync('data/death_messages.json', 'utf8'));
    return { rooms: roomsData, objects: objectsData, vocabulary, deathMessages };
}

function runTest(testName, testFunction) {
    try {
        testFunction();
        console.log(`✔ ${testName}`);
    } catch (error) {
        console.error(`✖ ${testName}`);
        console.error(error);
        process.exit(1);
    }
}

runTest('Grating Room Puzzle (Locked)', () => {
    const gameData = loadGameData();
    const game = new Game(gameData);
    game.player.location = 'MGRAT';

    const output = game.tick('up');
    assert.strictEqual(output.trim(), 'The grating is locked');
    assert.strictEqual(game.player.location, 'MGRAT'); // Player should not have moved
});

runTest('Grating Room Puzzle (Unlocked)', () => {
    const gameData = loadGameData();
    const game = new Game(gameData);
    game.player.location = 'MGRAT';
    game.setGameFlag('KEY-FLAG', 'CLEAR');

    const output = game.tick('up');
    const clearRoom = game.rooms.get('CLEAR');
    const expectedOutput = `${clearRoom.name}\n${clearRoom.description}\nA pile of leaves is here.`;

    assert.strictEqual(game.player.location, 'CLEAR');
    assert.strictEqual(output.trim(), expectedOutput.trim());
});

runTest('Rug/Trap Door Puzzle', () => {
    const gameData = loadGameData();
    const game = new Game(gameData);
    game.player.location = 'LROOM';

    const rug = game.objects.get('RUG');
    const trapDoor = game.objects.get('DOOR');

    // Initially, rug is visible and trap door is not
    assert.ok(!hasFlag(rug.oflags, OFLAGS.INVISIBLE), 'Rug should be visible initially');
    assert.ok(hasFlag(trapDoor.oflags, OFLAGS.INVISIBLE), 'Trap door should be invisible initially');

    const output = game.tick('move rug');
    assert.strictEqual(output.trim(), 'With a great effort, the rug is moved to one side of the room. With the rug moved, the dusty cover of a closed trap door appears.');

    // After moving, rug is invisible and trap door is visible
    assert.ok(hasFlag(rug.oflags, OFLAGS.INVISIBLE), 'Rug should be invisible after being moved');
    assert.ok(!hasFlag(trapDoor.oflags, OFLAGS.INVISIBLE), 'Trap door should be visible after rug is moved');
});

runTest('Troll Combat (No Weapon)', () => {
    const gameData = loadGameData();
    const game = new Game(gameData);
    game.player.location = 'MTROL';

    const output = game.tick('attack troll');
    assert.strictEqual(output.trim(), 'Attacking the troll with your bare hands is suicidal.');
});

runTest('Troll Combat (With Weapon)', () => {
    const gameData = loadGameData();
    const game = new Game(gameData);
    game.player.location = 'MTROL';

    // Give player a sword
    const sword = game.objects.get('SWORD');
    sword.location = 'IN_INVENTORY';

    // First hit
    let output = game.tick('attack troll');
    assert.strictEqual(output.trim(), 'A furious but glancing blow is struck.\nThe troll\'s axe barely misses your ear.');
    const troll = game.objects.get('TROLL');
    assert.strictEqual(game.trollState.unconscious, false);

    // Second hit
    output = game.tick('attack troll');
    assert.strictEqual(output.trim(), 'The troll is knocked out!');

    assert.strictEqual(game.trollState.unconscious, true);
    assert.strictEqual(troll.description, 'The troll is lying on the ground, unconscious.');
});


console.log('All puzzle tests passed!');
