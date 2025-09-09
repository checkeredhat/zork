document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');
    const inputDisplayElement = document.getElementById('input-display');

    const ui = new UI(outputElement, inputElement, inputDisplayElement);
    const game = new Game(ui);

    ui.onInput((command) => {
        game.processTurn(command);
    });

    game.start();
});
