
abstract class Notifier {
    protected abstract send(message: string): void;

    public notify(message: string): void {
        if (!message.trim().length) {
            console.error(`[Error] Пустое собщение`)
            throw new Error('Сообщение не может быть пустым')
        }
        this.send(message)
        console.log('[Log] Сообщение отправлено')
    }

    static createNotifier(type: 'email' | 'sms' | 'push'): Notifier {
        switch (type) {
            case 'email':
                return new Email()
            case 'sms':
                return new SMS()
            default:
                return new Push()
        }
    }

}
class SMS extends Notifier {
    public send(message: string): void {
        console.log(`[SMS] отправка: ${message}`)
    }
}
class Email extends Notifier {
    public send(message: string): void {
        console.log(`[Email] отправка: ${message}`)
    }
}
class Push extends Notifier {
    public send(message: string): void {
        console.log(`[Push] отправка: ${message}`)
    }
}

const notifier = Notifier.createNotifier('email')
const notifier1 = Notifier.createNotifier('sms')
const notifier2 = Notifier.createNotifier('push')


notifier1.notify('Ваш заказ отправлен')
notifier2.notify('Ваш заказ отправлен')
notifier.notify('')