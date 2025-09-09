class UI {
    constructor(terminalElement, inputElement) {
        this.terminalElement = terminalElement;
        this.inputElement = inputElement;
        this.buffer = [];
        this.MAX_LINES = 24;
        this.prompt = '> ';

        // Initial setup
        this.buffer.push(this.prompt); // Start with an input line
        this.render();

        // Keep the fake terminal focused
        window.addEventListener('click', () => this.inputElement.focus());

        // Disable mousewheel scrolling
        this.terminalElement.addEventListener('wheel', (event) => {
            event.preventDefault();
        });
    }

    render() {
        // Last buffer element is treated as input line
        this.terminalElement.innerHTML = this.buffer
            .map((line, i) =>
                i === this.buffer.length - 1
                    ? `<span class="input-line">${line}</span>`
                    : `<span>${line}</span>`
            )
            .join('\n');

        // Ensure the view scrolls to the bottom
        this.terminalElement.scrollTop = this.terminalElement.scrollHeight;
    }

    writeLine(text) {
        // Insert new line before the current input line
        this.buffer.splice(this.buffer.length - 1, 0, text);
        if (this.buffer.length > this.MAX_LINES) {
            this.buffer.shift(); // remove top line
        }
        this.render();
    }

    updateInput(text) {
        if (this.buffer.length === 0) {
            this.buffer.push(this.prompt);
        }
        this.buffer[this.buffer.length - 1] = `${this.prompt}${text}`;
        this.render();
    }

    onInput(callback) {
        this.inputElement.addEventListener('input', () => {
            this.updateInput(this.inputElement.value);
        });

        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = this.inputElement.value;

                // Finalize the current line in the buffer
                this.buffer[this.buffer.length - 1] = `${this.prompt}${command}`;

                // Add a new empty prompt for the next input
                this.buffer.push(this.prompt);

                if (this.buffer.length > this.MAX_LINES) {
                    this.buffer.shift();
                }

                // Clear the hidden input and render
                this.inputElement.value = '';
                this.render();

                // Process the command
                callback(command);
            }
        });
    }

    // Adapt the old display method to the new writeLine method
    display(text, isCommand = false) {
        // The new logic handles the prompt separately, so we just write the text.
        // The game loop itself calls display(command, true), which we now handle in onInput.
        if (!isCommand) {
            this.writeLine(text);
        }
    }
}
