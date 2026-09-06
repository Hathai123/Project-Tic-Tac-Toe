const game = (() => {
    const xPlayer = {name:"",pos:[]}
    const oPlayer = {name:"",pos:[]}
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let whoTurn = "X";
    let haveWinner = false;

    // interact html element
    const gameBoard = document.getElementById("gameBoard");

    // create button for add O/X in gameBoard
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement("button");
        button.id = i;
        button.addEventListener('click', (e) => {
            select(e.target.id);
        });
        gameBoard.appendChild(button);
    }

    // newgame button
    const newGameBtn = document.getElementById("newGame");
    newGameBtn.addEventListener('click', () => {
        newGame();
        for (const child of gameBoard.children) {
            child.className = '';
        }
    });

    // game script
    const newGame = () => {
        document.querySelectorAll("#gameBoard svg line").forEach(element => {
            element.style.display = 'none';
        });
        xPlayer.pos.length = 0;
        oPlayer.pos.length = 0;
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

                    xPlayer.pos.push(pos_num);
                    checkWin(xPlayer.pos);
                }
                else {
                    player_select.className = "isO";

                    oPlayer.pos.push(pos_num);
                    checkWin(oPlayer.pos);
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
