interface Coffee {
    getCost(): number;
    getDescription(): string;
}

abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) { }

    abstract getCost(): number

    abstract getDescription(): string
}

class SimpleCoffee implements Coffee {

    getCost(): number {
        return 50
    }

    getDescription(): string {
        return 'Кофе'
    }
}

class Milk extends CoffeeDecorator {
    getCost(): number {
        return this.coffee.getCost() + 20
    }

    getDescription(): string {
        return this.coffee.getDescription() + ' + молоко'
    }
}

class Sugar extends CoffeeDecorator {
    getCost(): number {
        return this.coffee.getCost() + 10
    }

    getDescription(): string {
        return this.coffee.getDescription() +  ' + сахар'
    }
}

class Caramel extends CoffeeDecorator {
    getCost(): number {
        return this.coffee.getCost() + 30
    }

    getDescription(): string {
        return this.coffee.getDescription() +  ' + карамель'
    }
}


let coffee: Coffee = new SimpleCoffee()
console.log(coffee.getCost())        // 50
console.log(coffee.getDescription()) // Кофе

coffee = new Milk(coffee)
coffee = new Sugar(coffee)
coffee = new Caramel(coffee)

console.log(coffee.getCost())        // 110
console.log(coffee.getDescription()) // Кофе + молоко + сахар + карамель