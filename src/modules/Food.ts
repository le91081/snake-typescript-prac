export default class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('food')!;
    }

    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    // 隨機設置食物出現的位置，未處理出現在蛇身的狀況
    changePosition() {
        let top = Math.floor(Math.random() * 30) * 10;
        let left = Math.floor(Math.random() * 30) * 10;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }
}