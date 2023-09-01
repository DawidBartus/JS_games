window.onload = () => {
    game.init();
};

class Game {
    posX = 30;
    posY = 240;
    gravity = 1.1;
    score = 0;
    pipes = [];
    pipeGap = 120;

    init = () => {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.bird = new Image();
        this.bird.src = 'images/bird.png';

        this.bg = new Image();
        this.bg.src = 'images/1.png';

        this.pipeTop = new Image();
        this.pipeTop.src = 'images/pipeBottom.png';

        this.pipeBottom = new Image();
        this.pipeBottom.src = 'images/pipeBottom.png';

        document.addEventListener('click', () => this.moveUp());
        document.addEventListener(
            'keydown',
            (e) => e.key === ' ' && this.moveUp()
        );

        this.startGame();
    };

    startGame = () => {
        const fps = 60;
        setInterval(this.updateGame, 1000 / 60);

        this.addPipe();
    };

    addPipe = () => {
        let x = this.canvas.width;
        let y =
            Math.floor(Math.random() * this.pipeTop.height) -
            this.pipeTop.height;

        this.pipes.push({
            top: {
                img: this.pipeTop,
                x: x,
                y: y,
                width: this.pipeTop.width,
                height: this.pipeTop.height,
            },
            bottom: {
                img: this.pipeBottom,
                x: x,
                y: y + this.pipeTop.height + this.pipeGap,
                width: this.pipeBottom.width,
                height: this.pipeBottom.height,
            },
        });
    };

    updateGame = () => {
        this.render();
        this.addGravity();
    };

    addGravity = () => {
        this.posY += this.gravity;
    };

    render = () => {
        this.context.drawImage(this.bg, 0, 0);

        this.drawPipes();

        this.context.drawImage(this.bird, this.posX, this.posY);

        this.context.fillStyle = '#fff';
        this.context.font = '20px verdana';
        this.context.fillText(`Score: ${this.score}`, 20, 25);
    };

    drawPipes = () => {
        const pipesToDraw = [...this.pipes];

        pipesToDraw.forEach((pipe) => {
            this.context.drawImage(pipe.top.img, pipe.top.x, pipe.top.y);
            pipe.top.x--;

            this.context.drawImage(
                pipe.bottom.img,
                pipe.bottom.x,
                pipe.bottom.y
            );
            pipe.bottom.x--;

            if (pipe.top.x === 150) {
                this.addPipe();
            }

            if (pipe.top.x + pipe.top.width < -100) {
                this.pipes.shift();
            }
        });
    };

    moveUp = () => {
        this.posY -= 30;
    };
}

const game = new Game();
