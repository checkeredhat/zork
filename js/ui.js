class UI {
    constructor(outputElement, inputElement, inputDisplayElement) {
        this.outputElement = outputElement;
        this.inputElement = inputElement;
        this.inputDisplayElement = inputDisplayElement;
        this.promptElement = document.querySelector('.prompt');

        // Keep the fake terminal focused
        window.addEventListener('click', () => this.inputElement.focus());
    }

    display(text, isCommand = false) {
        const p = document.createElement('p');
        if (isCommand) {
            p.textContent = `> ${text}`;
        } else {
            p.textContent = text;
        }
        this.outputElement.appendChild(p);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
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
