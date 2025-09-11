class UI {
    constructor(terminalElement, inputElement) {
        this.terminalElement = terminalElement;
        this.inputElement = inputElement;
        this.buffer = [];
        this.MAX_LINES = 24;
        this.prompt = '> ';
        this.onInputCallback = null;

        window.addEventListener('click', () => {
            this.inputElement.focus();
        });
        this.terminalElement.addEventListener('wheel', (e) => e.preventDefault());
    }

    render() {
        const displayBuffer = this.buffer.slice(-this.MAX_LINES);

        // Add cursor to the last line for rendering
        if (displayBuffer.length > 0) {
            const lastLineIndex = displayBuffer.length - 1;
            // Create a temporary copy to modify for rendering
            const tempLine = displayBuffer[lastLineIndex];
            displayBuffer[lastLineIndex] = tempLine + '<span class="cursor"></span>';
        }

        this.terminalElement.innerHTML = displayBuffer.join('\n');
        this.terminalElement.scrollTop = this.terminalElement.scrollHeight;
    }

    // For initial game output
    start(initialText) {
        const lines = initialText.split('\n');
        this.buffer.push(...lines);
        this.buffer.push(this.prompt);
        this.render();
    }

    updateInput(text) {
        if (this.buffer.length > 0) {
            // The last line is always the input line
            this.buffer[this.buffer.length - 1] = this.prompt + text;
            this.render();
        }
    }

    onInput(callback) {
        this.onInputCallback = callback;

        this.inputElement.addEventListener('input', () => {
            this.updateInput(this.inputElement.value);
        });

        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = this.inputElement.value;
                this.inputElement.value = '';

                // 1. Lock the input line into history
                this.buffer[this.buffer.length - 1] = this.prompt + command;

                // 2. Send input to game engine and get output
                const gameOutput = this.onInputCallback(command);

                // 3. Append game response
                if (gameOutput) {
                    const lines = gameOutput.split('\n');
                    // If the last line of output is empty, remove it, as we add our own prompt
                    if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
                        lines.pop();
                    }
                    this.buffer.push(...lines);
                }

                // 4. Finally, append the new prompt for the next input
                this.buffer.push(this.prompt);

                // Trim buffer
                while (this.buffer.length > this.MAX_LINES) {
                    this.buffer.shift();
                }

                this.render();
            }
        });
    }

    // This method is not needed if the logic is handled in onInput
    display() {}
}
