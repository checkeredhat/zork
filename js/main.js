// Main entry point for the browser-based game.
async function main() {
    // Get references to the DOM elements
    const terminalElement = document.getElementById('terminal');
    const inputElement = document.getElementById('input');

    // Instantiate the UI and Game
    const ui = new UI(terminalElement, inputElement);
    const game = new Game({
        objects: objectsData,
        rooms: roomsData,
        vocabulary: vocabularyData,
        deathMessages: deathMessagesData
    });

    // Set up the input handler. The callback passed to onInput
    // will be executed when the user enters a command. It passes
    // the command to the game's tick function and returns the result.
    ui.onInput((command) => {
        return game.tick(command);
    });

    // Display the initial room description to start the game.
    const initialOutput = game.look();
    ui.start(initialOutput);
}

// Start the game when the DOM is ready
document.addEventListener('DOMContentLoaded', main);
