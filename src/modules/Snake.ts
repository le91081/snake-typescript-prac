export default class Snake {
    snake: HTMLElement;
    head: HTMLElement;
    bodies: HTMLCollection;

    constructor() {
        this.snake = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.bodies = this.snake.getElementsByTagName('div');
    }

    // 取得蛇頭的 X 座標
    get X() {
        return this.head.offsetLeft;
    }

    // 取得蛇頭的 Y 座標
    get Y() {
        return this.head.offsetTop;
    }

    set X(value: number) {
        if (this.X === value) {
            return;
        }
        this.checkHitTheWall(value);
        this.moveBody();
        this.head.style.left = `${value}px`;
        this.checkHitSelf();
    }

    set Y(value: number) {
        if (this.Y === value) {
            return;
        }
        this.checkHitTheWall(value);
        this.moveBody();
        this.head.style.top = `${value}px`;
        this.checkHitSelf();
    }

    // 取得蛇的整體長度
    get length() {
        return this.bodies.length;
    }

    appendBody() {
        this.snake.insertAdjacentHTML("beforeend", '<div></div>');
    }

    // 取得蛇的身體
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let previousX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let previousY = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = `${previousX}px`;
            (this.bodies[i] as HTMLElement).style.top = `${previousY}px`;
        }
    }

    // 判斷是否碰撞自己
    checkHitSelf() {
        for (let i = 1; i < this.bodies.length; i++) {
            const element = this.bodies[i] as HTMLElement;
            if (this.X === element.offsetLeft && this.Y === element.offsetTop) {
                throw new Error("撞自己了");
            }
        }
    }

    // 判斷是否撞牆
    checkHitTheWall(value: number) {
        if (value < 0 || value > 290) {
            throw new Error('撞牆了');
        }
    }

    // 移除所有蛇身
    clearBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.snake.removeChild(this.bodies[i]);
        }
    }

    resetHead() {
        this.head.style.left = `${0}px`;
        this.head.style.top = `${0}px`;
    }
}