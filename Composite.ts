interface FileSystemItem {
    getSize(): number;
    print(indent: string): void;
}

class File implements FileSystemItem {
    private name: string;
    private size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size
    }

    getSize(): number {
        return this.size
    }

    print(indent: string): void {
        console.log(`${indent}${this.name} (${this.size}b)`)
    }
}

class Folder implements FileSystemItem {
    private name: string;
    private files: FileSystemItem[] = []

    constructor(name: string) {
        this.name = name
    }

    add(item: FileSystemItem) {
        this.files.push(item)
    }


    getSize(): number {
        return this.files.reduce((acc, item) => acc + Number(item.getSize()), 0)
    }

    print(indent: string): void {


        console.log(`${indent}${this.name}/`)
        for (let file of this.files) {
            file.print(`${indent}   `)
        }
    }

}


const root = new Folder('root')
const src = new Folder('src')
const dist = new Folder('dist')

src.add(new File('index.ts', 1200))
src.add(new File('app.ts', 800))
dist.add(new File('index.js', 2000))

root.add(src)
root.add(dist)
root.add(new File('package.json', 300))

root.print('')
console.log(root.getSize()) // 4300

// Вывод print:
// root/
//   src/
//     index.ts (1200b)
//     app.ts (800b)
//   dist/
//     index.js (2000b)
//   package.json (300b)