interface Builder {
    from: (table: string) => this;
    select: (...args: string[]) => this;
    where: (where: string) => this;
    limit: (limit: number) => this;
    build: () => string;
}

class QueryBuilder implements Builder {
    private query: Record<string, string> = {};

    constructor() {
        this.query = {}
    }

    from(table: string) {
        this.query['from'] = table
        return this;
    }
    select(...args: string[]) {
        const result = [...args].join(', ')
        this.query['select'] = result
        return this;
    }
    where(where: string) {
        this.query['where'] = where
        return this;
    }
    limit(limit: number) {
        this.query['limit'] = limit.toString()
        return this;
    }
    build() {
        const select = this.query['select'] ? `SELECT ${this.query['select']}` : "SELECT *";
        const from = this.query['from'] && `FROM ${this.query['from']}`
        const where = this.query['where'] && ` WHERE ${this.query['where']}`
        const limit = this.query['limit'] ? ` LIMIT ${this.query['limit']}` : ""

        return `${select} ${from} ${where} ${limit}`
    }
}


const query = new QueryBuilder()
    .from('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .limit(10)
    .build()

console.log(query)
// SELECT id, name, email FROM users WHERE age > 18 LIMIT 10

// Без select — берёт все поля
const query2 = new QueryBuilder()
    .from('orders')
    .where('status = "active"')
    .build()

console.log(query2)
// SELECT * FROM orders WHERE status = "active"