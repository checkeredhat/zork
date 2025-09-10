import fs from 'fs';
import path from 'path';
import { Game } from '../js/game.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadGameData() {
    const dataPath = path.join(__dirname, '..', 'data');
    const objects = JSON.parse(fs.readFileSync(path.join(dataPath, 'objects.json'), 'utf8'));
    const rooms = JSON.parse(fs.readFileSync(path.join(dataPath, 'rooms.json'), 'utf8'));
    const vocabulary = JSON.parse(fs.readFileSync(path.join(dataPath, 'vocabulary.json'), 'utf8'));
    const deathMessages = JSON.parse(fs.readFileSync(path.join(dataPath, 'death_messages.json'), 'utf8'));
    return { objects, rooms, vocabulary, deathMessages };
}

async function main() {
    const gameData = await loadGameData();
    const game = new Game(gameData);

    game.tick("east");
    game.tick("open window");
    game.tick("enter window");

    const bottle = game.objects.get('BOTTLE');
    const sack = game.objects.get('SACK');

    console.log("BOTTLE:", bottle);
    console.log("SACK:", sack);

    console.log(game.tick("look"));
}

main();
