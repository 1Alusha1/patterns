
abstract class Notification {
    constructor(protected implementation: Implementation, protected title: string, protected message: string) { }
     abstract send(): void
}

class OrderNotification extends Notification {
    send() {
        this.implementation.send(`[${this.title}] ` , this.message)
    }
}

class PromoNotification extends Notification {
    send() {
        this.implementation.send(`[${this.title}] Промокод: `, this.message)
    }

}


interface Implementation {
    send: (title: string, message: string) => void
}

class EmailSender implements Implementation {
    send(title: string, message: string) {
        console.log(`EMAIL: ${title} ${message}`)
    }
}
class SmsSender implements Implementation {
    send(title: string, message: string) {
        console.log(`SMS: ${title} ${message}`)
    }
}
class PushSender implements Implementation {
    send(title: string, message: string) {
        console.log(`PUSH: ${title} ${message}`)
    }
}

const emailSender = new EmailSender();
const smsSender = new SmsSender();

const orderNotif = new OrderNotification(emailSender, "Заказ #42", "Ваш заказ отправлен");
const promoNotif = new PromoNotification(smsSender, "Скидка 20%", "PROMO2024");

orderNotif.send(); // Email: [Заказ #42] Ваш заказ отправлен
promoNotif.send(); // SMS: [Скидка 20%] Промокод: PROMO2024