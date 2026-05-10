interface IBrowserConfig {
    clone(): this
}

class BrowserConfig implements IBrowserConfig {
    public userAgent: string;
    public proxy: string | null;
    public headles: boolean;
    public timeout: number;
    public cookies: string[];

    constructor(userAgent: string, proxy: string | null, headles: boolean, timeout: number, cookies: string[]) {
        this.userAgent = userAgent
        this.proxy = proxy
        this.headles = headles
        this.timeout = timeout
        this.cookies = cookies
    }

    public clone(): this {
        const clone = Object.create(Object.getPrototypeOf(this));
        Object.assign(clone, structuredClone(this));

        return clone
    }

    public setProxy(proxy: string): this {
        this.proxy = proxy;
        return this;
    }

    public addCookie(cookie: string) {
        this.cookies.push(cookie);
        return this;
    }
}


const base = new BrowserConfig('Mozilla/5.0', null, true, 30000, [])

const worker1 = base.clone()
    .setProxy('192.168.1.1:8080')
    .addCookie('session=abc')

const worker2 = base.clone()
    .setProxy('192.168.1.2:8080')
    .addCookie('session=xyz')

console.log(base.cookies)    // [] — оригинал не тронут
console.log(worker1.cookies) // ['session=abc']
console.log(worker2.cookies) // ['session=xyz']