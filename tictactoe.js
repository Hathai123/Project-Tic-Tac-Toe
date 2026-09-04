// tictactoe : OX game
// test first in console 
// Game board show in console
// [1][2][3]
// [4][5][6]
// [7][8][9]

// Select the position by type game.select(5) in console
// Console will show
// [1][2][3]
// [4][X][6]
// [7][8][9]

// Winning condition
// Who’s get one of these set of position first win
// 123, 456, 789, 147, 258, 369, 159, 357

// Game start with X and then O
const game = (() => {
    const x_pos = [];
    const o_pos = [];
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let whoTurn = "X";
    let isWin = false;

    const newGame = () => {
        x_pos.length = 0;
        o_pos.length = 0;
        board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        whoTurn = "X";
        isWin = false;
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
        board[board.indexOf(pos)] = whoTurn;
        if (whoTurn === "X") {
            x_pos.push(pos);
            checkWin(x_pos);
            whoTurn = "O";
        }
        else {
            o_pos.push(pos);
            checkWin(o_pos);
            whoTurn = "X";
        }
    };

    function checkWin(player_pos) {
        const winCondition = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
        for (let con of winCondition) {
            if (con.every((element) => player_pos.includes(element))) {
                isWin = true;
                break;
            }
        }
        showBoard();
        if (isWin) {
            console.log(`${whoTurn} WIN!!!`);
        }

    }



    return { newGame, showBoard, select };
})();

game.showBoard();