abstract class ReportParser {
    public parse(data: string): void {
        this.load();
        this.process(data);
        this.save();
    }

    protected load(): void {
        console.log('[Load] Загружаем данные...')
    }

    protected abstract process(data: string): void

    protected save(): void {
        console.log('[Save] Сохраняем результат...')
    }
}

class CsvParser extends ReportParser {
    process(data: string): void {
        console.log(`[CSV] Обрабатываем: ${data}`)
    }
}

class JsonParser extends ReportParser {
    process(data: string): void {
        console.log(`[JSON] Обрабатываем: ${data}`)
    }
}

const csv = new CsvParser()
csv.parse('name,age\nГриша,25')
// [Load] Загружаем данные...
// [CSV] Обрабатываем: name,age\nГриша,25
// [Save] Сохраняем результат...

const json = new JsonParser()
json.parse('{"name":"Гриша","age":25}')
// [Load] Загружаем данные...
// [JSON] Обрабатываем: {"name":"Гриша","age":25}
// [Save] Сохраняем результат...