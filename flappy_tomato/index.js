window.onload = () => {
    Gamepad.init();
};

class Game {
    posX = 30;
    posY = 240;
    gravity = 1.5;
    score = 0;
    pipes = [];
    pipeGap = 120;

    init = () => {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    };
}

const game = new Game();
