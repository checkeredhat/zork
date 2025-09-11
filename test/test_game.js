import { expect } from 'chai';
import { Game } from '../js/game.js';
import * as fs from 'fs';

// Helper function to load game data
const loadGameData = () => {
    const objects = JSON.parse(fs.readFileSync('data/objects.json', 'utf8'));
    const rooms = JSON.parse(fs.readFileSync('data/rooms.json', 'utf8'));
    const vocabulary = JSON.parse(fs.readFileSync('data/vocabulary.json', 'utf8'));
    const deathMessages = JSON.parse(fs.readFileSync('data/death_messages.json', 'utf8'));
    return { objects, rooms, vocabulary, deathMessages };
};

describe('Game Initialization', () => {
    it('should create a new game instance and place the player at the starting location', () => {
        const gameData = loadGameData();
        const game = new Game(gameData);
        expect(game).to.exist;
        expect(game.player.location).to.equal('WHOUS'); // West of House
    });
});

describe('Basic Movement', () => {
    it('should allow the player to move from one room to another', () => {
        const gameData = loadGameData();
        const game = new Game(gameData);

        // Player starts at WHOUS. Let's go North to NHOUS.
        const result = game.tick('NORTH');

        expect(game.player.location).to.equal('NHOUS');
        // Movement itself doesn't return a description, but it flags the room for one.
        // The game loop would then call look(). We can check the flag.
        const northOfHouse = game.rooms.get('NHOUS');
        expect(northOfHouse.rbits & 1 << 18).to.not.equal(0); // RDESCBIT should be set
    });

    it('should prevent the player from moving in an invalid direction', () => {
        const gameData = loadGameData();
        const game = new Game(gameData);

        // Player starts at WHOUS. There's no UP exit.
        const result = game.tick('UP');

        expect(game.player.location).to.equal('WHOUS'); // Player should not have moved
        expect(result).to.equal("You can't go that way.");
    });
});
