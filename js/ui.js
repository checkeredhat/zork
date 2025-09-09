class UI {
    constructor(outputElement, inputElement, inputDisplayElement) {
        this.outputElement = outputElement;
        this.inputElement = inputElement;
        this.inputDisplayElement = inputDisplayElement;
        this.promptElement = document.querySelector('.prompt');
        this.buffer = [];
        this.MAX_LINES = 23; // 23 for output, 1 for the input line

        // Keep the fake terminal focused
        window.addEventListener('click', () => this.inputElement.focus());

        // Disable mousewheel scrolling on the terminal
        const terminalElement = document.getElementById('terminal');
        terminalElement.addEventListener('wheel', (event) => {
            event.preventDefault();
        });
    }

    display(text, isCommand = false) {
        let line = text;
        if (isCommand) {
            line = `> ${text}`;
        }

        this.buffer.push(line);

        if (this.buffer.length > this.MAX_LINES) {
            this.buffer.shift(); // Remove the top line
        }

        // Re-render the entire output
        this.outputElement.innerHTML = this.buffer.map(l => `<p>${l}</p>`).join('');
    }

    onInput(callback) {
        this.inputElement.addEventListener('input', () => {
            this.inputDisplayElement.textContent = this.inputElement.value;
        });

        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = this.inputElement.value;
                this.display(command, true); // Display the command in the output
                this.inputElement.value = '';
                this.inputDisplayElement.textContent = ''; // Clear the display span
                callback(command);
            }
        });
    }
}
