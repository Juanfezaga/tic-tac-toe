const gameBoard = (() => {
    const gameArray = ["","","","","","","","",""];
    return {
        gameArray,
    }
})();

const Player = (name, letter) => {
    return {name, letter}
}

const renderGrid = (() => {
    const _createSquares = () => {
        let container = document.querySelector("#game-container")
        for (let i=1;i<=9;i++){
            let square=document.createElement("div");
            //square.setAttribute("id", `${i}`)
            square.setAttribute("class", "null-container")
            container.appendChild(square)
        }
    }


    return {
        Output: ()=>{
            _createSquares();
        }
    }
})();


renderGrid.Output()

const GamePlay = (()=> {
    const itemGrid = document.querySelectorAll(".null-container")
    const backgroundModal = document.querySelector(".bg-modal")
    const resultMessage = document.querySelector("#result")
    const changeName = document.querySelector("#change-Name")
    const restartBtn = document.querySelector("#restart")
    const playerOne = document.querySelector("#player1")
    const playerTwo = document.querySelector("#player2")

    const Player1 = Player("Player 1", "X");
    const Player2 = Player("Player 2", "O");

    let turn = 0
    let symbol = "X";
    let winner = false;

    const _clickOnBoard = () => {
        for(let i=0;i<itemGrid.length;i++){
            itemGrid[i].addEventListener("click", (e)=> {
                if(itemGrid[i].textContent === "" && winner === false){
                    if(symbol === "X"){
                        console.log(gameBoard.gameArray[i] )
                        gameBoard.gameArray[i] = symbol;
                        itemGrid[i].textContent = symbol;
                        itemGrid[i].classList.add("ex-symbol")
                        findWinningSequence();
                        symbol = "O";
                        console.log(gameBoard.gameArray)
                        turn++
                    }else if(symbol === "O"){
                        console.log("True")
                        gameBoard.gameArray[i] = symbol;
                        itemGrid[i].textContent = symbol;
                        itemGrid[i].classList.add("circle-symbol")
                        findWinningSequence();
                        symbol = "X";
                        console.log(gameBoard.gameArray)
                        turn++
                    }
                }
            })
        }
    }
    const findWinningSequence = () => {
        if (symbol === gameBoard.gameArray[0]) {
            if (symbol === gameBoard.gameArray[1] && symbol === gameBoard.gameArray[2] ||
                symbol === gameBoard.gameArray[3] && symbol === gameBoard.gameArray[6] ||
                symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[8]) {
                getWinner();
            }
        }
        if (symbol === gameBoard.gameArray[2]) {
            if (symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[6] || 
                symbol === gameBoard.gameArray[5] && symbol === gameBoard.gameArray[8]) {
                getWinner();
            }
        }
        if (symbol === gameBoard.gameArray[1] && symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[7]) {
            getWinner();
        }
        if (symbol === gameBoard.gameArray[3] && symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[5]) {
            getWinner();
        }
        if (symbol === gameBoard.gameArray[6] && symbol === gameBoard.gameArray[7] && symbol === gameBoard.gameArray[8]) {
            getWinner();
        }
        // Tie game
        if (turn === 8 && winner === false) {
            resultMessage.textContent = `Tie!`;
            backgroundModal.style.display = 'flex';
            backgroundModal.addEventListener('click', (e) => {
                backgroundModal.style.display = "none";
            });
        }
    };
    const _changePlayerName = () => {
        changeName.addEventListener('click', (e) => {
            // `Do While Loop` repeats prompt if user does not enter PlayerX.length < 12
            do {
                Player1.name = prompt("No greater than 12 characters:", "PLAYER 1");
                if (Player1.name === null) {
                    Player1.name = "PLAYER 1"; // Set default name if user cancels
                }
            } while (Player1.name.length >= 12);
            playerOne.innerText = Player1.name;

            do {
                Player2.name = prompt("No greater than 12 characters:", "PLAYER 2");
                if (Player2.name === null) {
                    Player2.name = "PLAYER 2";
                }
            } while (Player2.name.length >= 12);
            playerTwo.innerText = Player2.name;
        });
    };
    const getWinner = () => {
        winner = true;
        backgroundModal.style.display = 'flex';
        if (symbol === Player1.letter) {
            resultMessage.textContent = `Winner: ${Player1.name}`;
        } else {
            resultMessage.textContent = `Winner: ${Player2.name}`;
        }
        // Click anywhere to remove Winner Screen
        backgroundModal.addEventListener('click', (e) => {
            backgroundModal.style.display = "none";
        });
    };

    const _clearBoard = () => {
        restartBtn.addEventListener("click", (e) => {
            itemGrid.forEach((element) => {
                element.textContent = "";
                element.classList.remove("circle-symbol", "ex-symbol")
            });
            gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
            symbol = "X";
            turn = 0;
            winner = false;
        });
    };
    return {
        gameplayOutput: () => {
            _changePlayerName();
            _clickOnBoard();
            _clearBoard();
        }
    }
})();
GamePlay.gameplayOutput();
