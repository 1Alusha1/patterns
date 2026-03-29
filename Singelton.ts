export class Logger {
    static #instance: Logger;
    private history: string[] = [];

    private constructor() { }

    public static get instance(): Logger {
        if (!Logger.#instance) {
            Logger.#instance = new Logger();
        }

        return Logger.#instance;
    }

    public info(message: string): void {
        const log = `Time: ${Date.now()}; [INFO] ${message}`;
        this.history.push(log)
        console.log(log)
    }

    public warn(message: string): void {
        const log = `Time: ${Date.now()}; [WARNING] ${message}`;
        this.history.push(log)
        console.warn(log)
    }

    public error(message: string): void {
        const log = `Time: ${Date.now()}; [ERROR] ${message}`;
        this.history.push(log)
        console.error(log)
    }

    public getHistory() {
        return [...this.history]
    }

}

const a = Logger.instance;
const b = Logger.instance;
console.log(a === b);
a.info('Сервер запущен');
b.warn('Память заканчивается');
a.error("База данных упала");

console.log(a.getHistory()); // все 3 записи