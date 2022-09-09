

const player = (choice) => {
    this.choice = choice;

    const getChoice = () => {
        return choice;
    }

    return {getChoice};
};

/*IITF*/
const gameBoard = (() => {
    const currentGame = ['', '', '', '', '', '', '', '', ''];

    const setBoard = (index, choice) => {
        if (index < currentGame.length) {
            currentGame[index] = choice;
        }
        else {
            return
        }
    };

    const getBoard = (index) => {
        if (index < currentGame.length) {
            return currentGame[index];
        }
        else {
            return
        }
    };

    const reset = () => {
        for (let i=0; i < currentGame.length; i++) {
            currentGame[i] = '';
        }
    };

    return {setBoard, getBoard, reset};
})();

const displayController = (() => {
    const boardCells = document.querySelectorAll('.cells');
    const displayMessage = document.querySelector('.display-message');
    const restartBtn = document.querySelector('.restartBtn');

    boardCells.forEach((field) => field.addEventListener('click', (e) => {
        if (!gameController.getIsOver() || e.target.textContent == '') {
            return
        }
        else {
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
        }
    })
    )

    restartBtn.addEventListener('click', (e) => {
        gameBoard.reset();
        gameController.reset();
        updateGameBoard();
        setDisplayMessage('Player X"s turn');
    })

    const updateGameBoard = () => {
        for (let i=0; i <boardCells.length; i++) {
            boardCells[i].textContent = gameBoard.getBoard(i);
        }
    }

    const setGameResultMessage = (winner) => {
        if (winner === 'Draw') {
            setDisplayMessage('Its a Draw!')
        }
        else {
            setDisplayMessage(`Player ${winner} won!`)
        }
    }

    const setDisplayMessage = (message) => {
        displayMessage.textContent = message;
    }
    //add AI results when he wins

    return {setDisplayMessage, setGameResultMessage};
})();

const gameController = (() => {
    const playerX = player('X');
    const playerO = player('O');
    let round = 1;
    let isOver = false;

    const playRound = (boardIndex) => {
        gameBoard.setBoard(boardIndex, getCurrentPlayerSign());
        if (checkWinner(boardIndex)) {
            displayController.setGameResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }

        if (round === 9) {
            displayController.setGameResultMessage('Draw');
            isOver = true;
            return;
        }
        round++;
        displayController.setDisplayMessage(`Player ${getCurrentPlayerSign()} turn!`);
    }

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getChoice() : playerO.getChoice();
    }

    const checkWinner = (boardIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        return winConditions.filter((combination) => combination.includes(boardIndex))
        .some((possibleCombination) => possibleCombination
            .every((index) => 
        gameBoard.getBoard(index) === getCurrentPlayerSign())
        );
    };

    const getIsOver = () => {
        return isOver;
    }

    const reset = () => {
        round = 1;
        isOver = false;
    }

    return {playRound, getIsOver, reset};
})();