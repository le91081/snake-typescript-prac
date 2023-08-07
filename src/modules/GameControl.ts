import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

enum KEYBOARD_KEY {
    // Chrome
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    // IE
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

export default class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 蛇的移動方向
    direction: string = '';
    // 是否未結束
    isLive: boolean = false;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    init() {
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        this.food.changePosition();
    }

    startGame() {
        this.isLive = true;
        this.run();
    }

    stopGame() {
        this.isLive = false;
        this.direction = '';
        alert('Game Over')!
        this.scorePanel.resetScoreAndLevel();
        this.snake.clearBody();
        this.snake.resetHead();
        this.init();
    }

    // 判斷鍵盤事件以設置方向
    keydownHandler(event: KeyboardEvent) {
        // 蛇的長度大於 1 時不得有反方向移動的情況
        // 例：向右走後不得在向左走
        if (this.snake.length > 1) {
            switch (event.key) {
                case KEYBOARD_KEY.ArrowUp:
                case KEYBOARD_KEY.Up:
                    if (this.direction === KEYBOARD_KEY.ArrowDown || this.direction === KEYBOARD_KEY.Down) {
                        return;
                    }
                    break;
                case KEYBOARD_KEY.ArrowDown:
                case KEYBOARD_KEY.Down:
                    if (this.direction === KEYBOARD_KEY.ArrowUp || this.direction === KEYBOARD_KEY.Up) {
                        return;
                    }
                    break;
                case KEYBOARD_KEY.ArrowLeft:
                case KEYBOARD_KEY.Left:
                    if (this.direction === KEYBOARD_KEY.ArrowRight || this.direction === KEYBOARD_KEY.Right) {
                        return;
                    }
                    break;
                case KEYBOARD_KEY.ArrowRight:
                case KEYBOARD_KEY.Right:
                    if (this.direction === KEYBOARD_KEY.ArrowLeft || this.direction === KEYBOARD_KEY.Left) {
                        return;
                    }
                    break;
            }
        }
        this.direction = event.key;
        !this.isLive && this.startGame();
    }

    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case KEYBOARD_KEY.ArrowUp:
            case KEYBOARD_KEY.Up:
                Y -= 10;
                break;
            case KEYBOARD_KEY.ArrowDown:
            case KEYBOARD_KEY.Down:
                Y += 10;
                break;
            case KEYBOARD_KEY.ArrowLeft:
            case KEYBOARD_KEY.Left:
                X -= 10;
                break;
            case KEYBOARD_KEY.ArrowRight:
            case KEYBOARD_KEY.Right:
                X += 10;
                break;
        }

        // 檢查是否吃到食物
        this.checkAteFood(X, Y);

        // 如移動後有錯誤發生就結束遊戲並初始化
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            console.log(e);
            this.stopGame();
        }

        // 不斷地往設置的方向移動，時間間隔隨等級漸少(簡易的設定)
        if (this.isLive) {
            window.setTimeout(this.run.bind(this), 200 - (this.scorePanel.currentLevel - 1) * 30);
        }
    }

    // 判斷是否吃到食物
    checkAteFood(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.changePosition();
            this.scorePanel.addScore();
            this.snake.appendBody();
        }
    }
}