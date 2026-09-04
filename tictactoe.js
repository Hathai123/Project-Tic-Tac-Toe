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
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let whoTurn = "X";

    const newGame = () => {
        x_player = [];
        o_player = [];
        board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        whoTurn = "X";
    };
    const showBoard = () => {
        let gameBoard = board.reduce((result, item, index) => {
            const display = `[${item}]`;
            const separator = (index + 1) % 3 === 0 ? '\n' : ' ';
            return result + display + separator;
        }, "");
        console.log(gameBoard);
    };

    



    return { newGame, showBoard, };
})();

game.showBoard();