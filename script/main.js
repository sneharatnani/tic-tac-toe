const GameBoard = (function () {
    const restart = document.querySelector('.restart');
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const openModal = () => {
        modal.classList.remove('hide');
        overlay.classList.remove('hide');
    };
    function closeModal() {
        if (Players().player1 !== '' && Players().player2 !== '') {
            modal.classList.add('hide');
            overlay.classList.add('hide');
            document.querySelector('.options').classList.add('hide');
            document.querySelector('.game').classList.remove('hide');
        };
    };
    function getWinner() {
        const boxes = document.querySelectorAll('.game p');
        // player one will win
        if (boxes[0].textContent === 'o' && boxes[1].textContent === 'o' && boxes[2].textContent === 'o') {
            return 'player1';
        }
        else if (boxes[0].textContent === 'o' && boxes[3].textContent === 'o' && boxes[6].textContent === 'o') {
            return 'player1';
        }
        else if (boxes[6].textContent === 'o' && boxes[7].textContent === 'o' && boxes[8].textContent === 'o') {
            return 'player1';
        }
        else if (boxes[2].textContent === 'o' && boxes[5].textContent === 'o' && boxes[8].textContent === 'o') {
            return 'player1';
        }
        else if (boxes[0].textContent === 'o' && boxes[4].textContent === 'o' && boxes[8].textContent === 'o') {
            return 'player1';
        }
        else if (boxes[2].textContent === 'o' && boxes[4].textContent === 'o' && boxes[6].textContent === 'o') {
            return 'player1';
        }
        else if (boxes[1].textContent === 'o' && boxes[4].textContent === 'o' && boxes[7].textContent === 'o') {
            return 'player1';
        }
        else if (boxes[3].textContent === 'o' && boxes[4].textContent === 'o' && boxes[5].textContent === 'o') {
            return 'player1';
        }
        // player two will win
        else if (boxes[0].textContent === 'x' && boxes[1].textContent === 'x' && boxes[2].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[0].textContent === 'x' && boxes[3].textContent === 'x' && boxes[6].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[6].textContent === 'x' && boxes[7].textContent === 'x' && boxes[8].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[2].textContent === 'x' && boxes[5].textContent === 'x' && boxes[8].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[0].textContent === 'x' && boxes[4].textContent === 'x' && boxes[8].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[2].textContent === 'x' && boxes[4].textContent === 'x' && boxes[6].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[1].textContent === 'x' && boxes[4].textContent === 'x' && boxes[7].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[3].textContent === 'x' && boxes[4].textContent === 'x' && boxes[5].textContent === 'x') {
            return 'player2';
        }
        else if (boxes[0].textContent !== '' && boxes[1].textContent !== '' && boxes[2].textContent !== '' && boxes[3].textContent !== '' && boxes[4].textContent !== '' && boxes[5].textContent !== '' && boxes[6].textContent !== '' && boxes[7].textContent !== '' && boxes[8].textContent !== '') {
            return `draw`;
        }
    };
    restart.addEventListener('click', () => DisplayControl.restartGame());
    return {
        getWinner,
        openModal,
        closeModal,
    };
})();


const DisplayControl = (function () {
    // open modal to add names
    const optionBtn = document.querySelectorAll('.options button');
    optionBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            GameBoard.openModal();
        });
    });
    // close model and open game body
    const startBtn = document.querySelector('.start-game');
    startBtn.addEventListener('click', () => {
        GameBoard.closeModal();
    });
    const boxes = document.querySelectorAll('.game p');
    const display = document.querySelector('.display');
    const restart = document.querySelector('.restart');
    let gameArr = ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (box.textContent === '') {
                box.textContent = gameArr.shift();
                updateDisplay(box, GameBoard.getWinner());
            };
        });
    });
    // update player's name after every turn and declare winner
    function updateDisplay(box, winner) {
        switch (true) {
            case winner === 'draw':
                showResult(`It's a draw`)
                break;

            case winner === 'player1':
                showResult(`winner is ${Players().player1}`)
                break;

            case winner === 'player2':
                showResult(`winner is ${Players().player2}`)
                break;

            case box.textContent === 'o':
                display.textContent = `${Players().player2}'s turn`;
                break;

            default:
                display.textContent = `${Players().player1}'s turn`;
        };
    };
    function showResult(str) {
        display.textContent = str;
        boxes.forEach((box) => {
            box.style.pointerEvents = 'none';
        });
        restart.classList.remove('hide'); /* display restart button */
    };

    const restartGame = () => {
        document.querySelector('.game').classList.add('hide');
        document.querySelector('.display').textContent = '';
        document.querySelector('.options').classList.remove('hide');
        document.querySelector('#player1').value = '';
        document.querySelector('#player2').value = '';
        document.querySelectorAll('.game p').forEach((box) => {
            box.textContent = '';
            box.style.pointerEvents = 'all';
        });
        gameArr = ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
        restart.classList.add('hide');
    };
    return {
        restartGame,
    };
})();

function Players() {
    const player1 = document.querySelector('#player1').value;
    const player2 = document.querySelector('#player2').value;
    return {
        player1,
        player2
    };
}










