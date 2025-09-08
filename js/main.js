document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');

    const ui = new UI(outputElement, inputElement);
    const game = new Game(ui);

    ui.onInput((command) => {
        game.processTurn(command);
    });

    game.start();
});
