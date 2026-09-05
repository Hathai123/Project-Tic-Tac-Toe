const game = (() => {
    const x_pos = [];
    const o_pos = [];
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let whoTurn = "X";
    let haveWinner = false;

    const newGame = () => {
        x_pos.length = 0;
        o_pos.length = 0;
        board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        whoTurn = "X";
        haveWinner = false;
        showBoard();
    };

    const showBoard = () => {
        let gameBoard = board.reduce((result, item, index) => {
            const display = `[${item}]`;
            const separator = (index + 1) % 3 === 0 ? '\n' : ' ';
            return result + display + separator;
        }, "");
        console.log(gameBoard);
    };

    const select = (pos) => {
        if (haveWinner) {
            console.log(`Game alredy decided. ${whoTurn} Win!!!`);
        }
        else {
            const player_select = document.getElementById(pos);
            const pos_num = +pos;
            if (board.includes(pos_num)) {
                board[board.indexOf(pos_num)] = whoTurn;
                if (whoTurn === "X") {
                    player_select.className = "isX";

                    x_pos.push(pos_num);
                    checkWin(x_pos);

                }
                else {
                    player_select.className = "isO";

                    o_pos.push(pos_num);
                    checkWin(o_pos);

                }
            }
            else {
                console.log(`No "${pos_num}" position on board`);
                showBoard();
            }
        }

    };

    function checkWin(player_pos) {
        const winCondition = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
        for (let con of winCondition) {
            if (con.every((element) => player_pos.includes(element))) {
                haveWinner = true;
                break;
            }
        }
        showBoard();
        if (haveWinner) {
            console.log(`${whoTurn} WIN!!!`);
        } else {
            swapPlayer();
        }
    }

    function swapPlayer() {
        if (whoTurn === "X") {
            whoTurn = "O";
        }
        else {
            whoTurn = "X";
        }
    }

    return { newGame, showBoard, select };
})();
game.showBoard();


// interact with html

const gameBoard = document.getElementById("gameBoard");

// create button for click
for (let i = 1; i <= 9; i++) {
    const button = document.createElement("button");
    button.id = i;
    button.addEventListener('click', (e) => {
        game.select(e.target.id);
    });
    gameBoard.appendChild(button);
}

const newGame = document.getElementById("newGame");
newGame.addEventListener('click', () => {
    game.newGame();
    for (const child of gameBoard.children) {
        child.className = '';
    }
});