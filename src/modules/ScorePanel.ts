export default class ScorePanel {
    private score: number = 0;
    private level: number = 1;
    private maxLevel: number;
    private upScore: number;
    private scoreEle: HTMLElement;
    private levelEle: HTMLElement;

    constructor(maxLevel: number = 10, upScore: number = 3) {
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.scoreEle.innerHTML = `${++this.score}`;
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = `${++this.level}`;
        }
    }

    resetScoreAndLevel() {
        this.score = 0;
        this.level = 1;
        this.scoreEle.innerHTML = `${this.score}`;
        this.levelEle.innerHTML = `${this.level}`;
    }

    get currentLevel() {
        return this.level;
    }
}