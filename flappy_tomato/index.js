window.onload = () => {
    game.init();
};

class Game {
    posX = 30;
    posY = 240;
    gravity = 1.1;
    score = 0;

    pipes = [];
    pipesGap = 120;

    init = () => {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.tomato = new Image();
        this.tomato.src = 'images/tomato_small.png';

        this.bg = new Image();
        this.bg.src = 'images/1.png';

        this.pipeTop = new Image();
        this.pipeTop.src = 'images/pipeTop.png';

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
                y: y + this.pipeTop.height + this.pipesGap,
                width: this.pipeBottom.width,
                height: this.pipeBottom.height,
            },
        });
    };

    updateGame = () => {
        this.addGravity();
        this.checkCollision();

        this.render();
    };

    addGravity = () => {
        this.posY += this.gravity;
    };

    checkCollision = () => {
        if (this.posY > this.canvas.height - this.tomato.height) {
            this.moveUp();
        }

        if (this.posY < 0) {
            this.posY = 0;
        }

        const pipesToCheck = [...this.pipes];

        const bX = this.posX;
        const bY = this.posY;
        const tW = this.tomato.width;
        const tH = this.tomato.height;

        pipesToCheck.forEach((pipe) => {
            if (bX + tW > pipe.top.x && bX <= pipe.top.x + pipe.top.width) {
                if (
                    bY < pipe.top.y + pipe.top.height ||
                    bY + tH > pipe.bottom.y
                ) {
                    this.restart();
                }
            }

            if (pipe.top.x === -1) {
                this.score++;

                if (this.score % 2 === 0) {
                    this.pipesGap--;

                    if (this.pipesGap === 110) {
                        this.pipesGap = 110;
                    }
                }
            }
        });
    };

    render = () => {
        this.context.drawImage(this.bg, 0, 0);

        this.drawPipes();

        this.context.drawImage(this.tomato, this.posX, this.posY);

        this.context.fillStyle = '#fff';
        this.context.font = '20px Verdana';
        this.context.fillText(`Score: ${this.score}`, 20, 25);
    };

    restart = () => {
        this.posX = 30;
        this.posY = 240;
        this.score = 0;

        this.pipes = [];
        this.pipesGap = 120;

        this.addPipe();
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
