interface Observer {
    update: (orderId: number, status: string) => void
}

interface Observable {
    subscribe: (observer: Observer) => void;
    unsubscribe: (observer: Observer) => void;
    notify: () => void;
}

class Order implements Observable {
    private subscribers: Observer[] = [];
    private status: string | null = null

    constructor(private orderId: number) { }


    subscribe(observer: Observer) {
        const isExist = this.subscribers.includes(observer);

        if (isExist) {
            console.log('this object already exist');
        }
        this.subscribers.push(observer);
        console.log('Object: subscribed an observer')
    }

    unsubscribe(observer: Observer) {
        const observerIndex = this.subscribers.indexOf(observer);

        if (observerIndex === -1) {
            console.log('this object doesn`t exist');
            return
        }

        this.subscribers.splice(observerIndex, 1)
        console.log('Object: detached an observer')
    }
    notify() {
        for (const subscriber of this.subscribers) {
            if (this.status)
                subscriber.update(this.orderId, this.status)
        }
    }

    setStatus(status: string) {
        this.status = status
        this.notify()
    }

}

class EmailNotifier implements Observer {
    update(orderId: number, status: string) {
        console.log(`[Email] Заказ ${orderId}: ${status}`)
    }
}

class SmsNotifier implements Observer {
    update(orderId: number, status: string) {
        console.log(`[SMS] Заказ ${orderId}: ${status}`)
    }
}

class Logger implements Observer {
    update(orderId: number, status: string) {
        console.log(`[Log] Заказ ${orderId}: ${status}`)
    }
}

const order = new Order(1)

order.subscribe(new EmailNotifier())
order.subscribe(new SmsNotifier())
order.subscribe(new Logger())

order.setStatus('В обработке')
// [Email] Заказ 1: В обработке
// [SMS] Заказ 1: В обработке
// [Log] Заказ 1: В обработке

order.setStatus('Отправлен')
// [Email] Заказ 1: Отправлен
// [SMS] Заказ 1: Отправлен
// [Log] Заказ 1: Отправлен