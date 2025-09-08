class UI {
    constructor(outputElement, inputElement) {
        this.outputElement = outputElement;
        this.inputElement = inputElement;
    }

    display(text) {
        const p = document.createElement('p');
        p.textContent = text;
        this.outputElement.appendChild(p);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    onInput(callback) {
        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = this.inputElement.value;
                this.inputElement.value = '';
                callback(command);
            }
        });
    }
}
