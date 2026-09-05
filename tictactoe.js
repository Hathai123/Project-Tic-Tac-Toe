const game = (() => {
    const x_pos = [];
    const o_pos = [];
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let whoTurn = "X";
    let haveWinner = false;

    const newGame = () => {
        document.querySelectorAll("#gameBoard svg line").forEach(element => {
            element.style.display = 'none';
        });
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
        winCondition.forEach(
            function (item, index) {
                if (item.every((element) => player_pos.includes(element))) {
                    haveWinner = true;
                    const winLine = (() => {
                        switch (index) {
                            case 0:
                                return document.getElementById("win1");
                            case 1:
                                return document.getElementById("win2");
                            case 2:
                                return document.getElementById("win3");
                            case 3:
                                return document.getElementById("win4");
                            case 4:
                                return document.getElementById("win5");
                            case 5:
                                return document.getElementById("win6");
                            case 6:
                                return document.getElementById("win7");
                            case 7:
                                return document.getElementById("win8");
                        }
                    })();
                    if (whoTurn === "X") {
                        winLine.style.stroke = "var(--X-color)";
                    }
                    else {
                        winLine.style.stroke = "var(--O-color)";
                    }
                    winLine.style.display = "block";
                }
            }
        );
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

game.newGame();


// interact with html
const page = (() => {
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

    const newGameBtn = document.getElementById("newGame");
    newGameBtn.addEventListener('click', () => {
        game.newGame();
        for (const child of gameBoard.children) {
            child.className = '';
        }
    });
    return gameBoard, newGameBtn;
})();