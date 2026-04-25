class Kitchen {
    prepareFood(item: string): void {
        console.log(`[Кухня] Готовим: ${item} `)
    }
}


class WareHouse {
    checkStock(item: string): boolean {
        const goods = ['Пицца', 'Паста', "Лазанья"]

        if (goods.includes(item)) {
            console.log(`[Склад] Проверяем наличие: ${item} - есть в наличии`)
            return true
        }
        else {
            console.log(`[Склад] Проверяем наличие: ${item} - нет в наличии`)
            return false
        }

    }
}

class Cashier {
    proccesPayment(amount: number): void {
        console.log(`[Касса] Принимаем опалату: ${amount}грн`)
    }
}


class RestaurantFacade {
    private kitchen = new Kitchen();
    private wareHouse = new WareHouse();
    private cashier = new Cashier();

    placeOrder(item: string, amount: number): void {
        if (this.wareHouse.checkStock(item)) {
            this.kitchen.prepareFood(item);
            this.cashier.proccesPayment(amount)
        }
    }
}


const restaurant = new RestaurantFacade()
restaurant.placeOrder('Пицца', 250)
restaurant.placeOrder('Груша', 20)

// [Склад] Проверяем наличие: Пицца — есть в наличии
// [Кухня] Готовим: Пицца
// [Касса] Принимаем оплату: 250грн