// This is a placeholder for the main entry point of the browser-based game.
// It's not used by the test runner, but would be necessary for an interactive
// version in a web page.

async function main() {
    const data = {
        objects: objectsData,
        rooms: roomsData,
        vocabulary: vocabularyData,
        deathMessages: deathMessagesData
    };

    const game = new Game(data);

    // Example of how you might handle input from a web page
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('terminal');

    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = inputElement.value;
            inputElement.value = '';
            const output = game.tick(command);
            outputElement.innerHTML += `<p>> ${command}</p>`;
            outputElement.innerHTML += `<p>${output.replace(/\n/g, '<br>')}</p>`;
            outputElement.scrollTop = outputElement.scrollHeight; // Scroll to bottom
        }
    });

     // Initial room description
    const initialOutput = game.look();
    outputElement.innerHTML += `<p>${initialOutput.replace(/\n/g, '<br>')}</p>`;

}

// Start the game when the DOM is ready
document.addEventListener('DOMContentLoaded', main);
