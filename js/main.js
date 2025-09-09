document.addEventListener('DOMContentLoaded', () => {
    const terminalElement = document.getElementById('terminal');
    const inputElement = document.getElementById('input');
    const inputDisplayElement = document.getElementById('input-display');
    const ui = new UI(terminalElement, inputElement);
    const game = new Game(ui);

    ui.onInput((command) => {
        game.processTurn(command);
    });

    game.start();
});
