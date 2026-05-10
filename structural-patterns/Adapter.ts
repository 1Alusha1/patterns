// a class from a third-party library
class LegacyLogger {
    writeLog(msg: string) { console.log(`[OLD LOG] ${msg}`) }
    writeWarning(msg: string) { console.warn(`[OLD WARN] ${msg}`) }
    writeError(msg: string) { console.error(`[OLD ERROR] ${msg}`) }
}

interface ILogger {
    info: (string: string) => void;
    warn: (string: string) => void;
    error: (string: string) => void;
}


class LoggerAdapter implements ILogger {
    private legacyLogger = new LegacyLogger();

    info(string: string) {
        this.legacyLogger.writeLog(string)
    }
    warn(string: string) {
        this.legacyLogger.writeWarning(string)

    }
    error(string: string) {
        this.legacyLogger.writeError(string)
    }
}

const logger: ILogger = new LoggerAdapter();
logger.info("Сервер запущен");   // [OLD LOG] Сервер запущен
logger.warn("Память кончается"); // [OLD WARN] Память кончается
logger.error("БД упала");        // [OLD ERROR] БД упала