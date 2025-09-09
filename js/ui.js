class UI {
    constructor(outputElement, inputElement) {
        this.outputElement = outputElement;
        this.inputElement = inputElement;
        this.promptElement = document.querySelector('.prompt');
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
        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = this.inputElement.value;
                this.display(command, true); // Display the command in the output
                this.inputElement.value = '';
                callback(command);
            }
        });
    }
}
