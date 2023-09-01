window.onload = () => app.init();

class App {
    winVariant = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    cells = document.querySelectorAll('.cell');
    restart = document.querySelector('#restart');
    winner = document.getElementById('winner');

    init = () => {
        this.initGame();
        this.restart.addEventListener('click', this.initGame);
    };

    initGame = () => {
        this.currentPlayer = 'X';

        this.cells.forEach((cell) => (cell.innerHTML = ''));
        this.winner.innerHTML = '';

        this.cells.forEach((cell) =>
            cell.addEventListener('click', this.clickCell)
        );
    };

    clickCell = (e) => {
        this.playerTurn(e.target);
    };

    playerTurn = (el) => {
        if (el.innerHTML) {
            return;
        }
        el.innerHTML = this.currentPlayer;

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.checkWinner();
    };

    checkWinner = () => {
        for (let i = 0; i < this.winVariant.length; i++) {
            const variant = this.winVariant[i];

            const a = this.getCellValue(variant[0]);
            const b = this.getCellValue(variant[1]);
            const c = this.getCellValue(variant[2]);

            if (a === '' || b === '' || c === '') continue;
            if (a === b && b === c) {
                this.setWinner(a);
            }
        }
    };

    getCellValue = (index) => {
        return document.querySelector(`.cell[data-index='${index}']`).innerHTML;
    };

    setWinner = (str) => {
        this.winner.innerHTML = `Player ${str} has won!`;
        this.cells.forEach((cell) =>
            cell.removeEventListener('click', this.clickCell)
        );
    };
}

const app = new App();
