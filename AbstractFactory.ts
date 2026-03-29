abstract class UIFactory {
    abstract createButton(): Button
    abstract createInput(): Input
}

class LightFactory extends UIFactory {
    createButton(): Button {
        return new LightButton()
    }
    createInput(): Input {
        return new LightInput()

    }
}

class DarkFactory extends UIFactory {
    createButton(): Button {
        return new DarkButton()
    }
    createInput(): Input {
        return new DarkInput()
    }
}

interface Button {
    render(): string
}

interface Input {
    render(): string
}


class LightButton implements Button {
    render(): string {
        return '[LightButton] Кнопка'
    }
}
class LightInput implements Input {
    render(): string {
        return '[LightInput] Поле ввода'
    }
}

class DarkButton implements Button {
    render(): string {
        return '[DarkButton] Кнопка'
    }
}
class DarkInput implements Input {
    render(): string {
        return '[DarkInput] Поле ввода'
    }
}

const renderUI = (factory: UIFactory) => {
    const button = factory.createButton()
    const input = factory.createInput()
    console.log(button.render())
    console.log(input.render())
}

const light = new LightFactory();
const dark = new DarkFactory();
renderUI(light);
renderUI(dark);