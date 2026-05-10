interface Command {
    execute: () => void;
    undo: () => void;
}

class TextEditor {
    private text: string[] = []

    getText() {
        return this.text.join(' ')
    }

    addText(text: string) {
        this.text.push(text)
    }

    removeText(count: number) {
        this.text.splice(this.text.length - count, count);
    }
}

class AddTextCommand implements Command {
    constructor(private editor: TextEditor, private text: string) {
    }

    execute() {
        this.editor.addText(this.text)
    };

    undo() {
        this.editor.removeText(1)
    };
}

class CommandHistory {
    private command: Command[] = []

    execute(command: Command) {
        this.command.push(command)
        return command.execute()
    }

    undo() {
        if (this.command.length > 0) {
            const command = this.command.pop()
            return command?.undo()
        }
    }
}

const editor = new TextEditor()
const history = new CommandHistory()

history.execute(new AddTextCommand(editor, 'Привет'))
history.execute(new AddTextCommand(editor, 'мир'))
console.log(editor.getText()) // Привет мир

history.undo()
console.log(editor.getText()) // Привет

history.undo()
console.log(editor.getText()) // (пусто)