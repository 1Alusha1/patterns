interface OrderState {
    next(order: Order): void;
    cancel(order: Order): void
}

class Order {
    private state: OrderState = new NewState()

    setState(state: OrderState) {
        this.state = state
    }

    next() { this.state.next(this) }
    cancel() { this.state.cancel(this) }
}

class NewState implements OrderState {
    next(order: Order): void {
        console.log('[New] Заказ принят в обработку')
        order.setState(new ProcessingState());
    }

    cancel(order: Order) {
        console.log('[New] Заказ отменён')
    }

}

class ProcessingState implements OrderState {

    next(order: Order): void {
        console.log('[Processing] Заказ отправлен')
        order.setState(new ShippedState())
    }

    cancel(order: Order): void {
        console.log('[Processing] Заказ отменён')
    }

}
class ShippedState implements OrderState {
    next(order: Order): void {
        console.log('[Shipped] Заказ доставлен')
        order.setState(new DeliveredState());
    }

    cancel(order: Order): void {
        console.log('[Shipped] Заказ возвращен')
    }

}
class DeliveredState implements OrderState {
    next(order: Order): void {
        console.log('[Delivered] Заказ уже доставлен, дальше некуда')
        order.setState(this);
    }
    cancel(order: Order): void {
        console.log('[Delivered] Отменить доставленный заказ нельзя')
    }
}


const order = new Order()

order.next()    // [New] Заказ принят в обработку
order.next()    // [Processing] Заказ отправлен
order.next()    // [Shipped] Заказ доставлен
order.next()    // [Delivered] Заказ уже доставлен, дальше некуда

order.cancel()  // [Delivered] Отменить доставленный заказ нельзя
