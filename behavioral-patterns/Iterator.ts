interface Iterator<T> {
    next: () => T | null;
    hasNext: () => boolean;
}

interface Iterable {
    getIterator: () => Iterator<string>;
}



class UrlIterator implements Iterator<string> {
    private collections: UrlQueue;
    private position: number = 0;

    constructor(collections: UrlQueue) {
        this.collections = collections;
    }

    next(): string | null {
        const item = this.collections.getItems()[this.position++]
        if (!item) return null;

        return item
    }

    hasNext() {
        const nextItem = this.collections.getItems()[this.position];
        if (nextItem) return true
        return false
    }
}

class UrlQueue implements Iterable {
    private items: string[] = [];

    public getItems() {
        return this.items
    }

    public add(url: string) {
        this.items.push(url)
    }

    public getIterator() {
        return new UrlIterator(this)
    }
}


const queue = new UrlQueue()
queue.add('site-a.com')
queue.add('site-b.com')
queue.add('site-c.com')

const iterator = queue.getIterator()

while (iterator.hasNext()) {
    console.log(iterator.next())
}

// site-a.com
// site-b.com
// site-c.com