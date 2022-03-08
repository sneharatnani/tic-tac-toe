const GameBoard = (function () {
    const optionBtn = document.querySelectorAll('.options button');
    const openModal = () => document.querySelector('.modal').classList.remove('hide');
    optionBtn.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    function getWinner(boxes) {
        if (boxes[0].textContent !== '' && boxes[1].textContent !== '' && boxes[2].textContent !== '' && boxes[3].textContent !== '' && boxes[4].textContent !== '' && boxes[5].textContent !== '' && boxes[6].textContent !== '' && boxes[7].textContent !== '' && boxes[8].textContent !== '') {
            return `draw`;
        }
        // player one will win
        else if (boxes[0].textContent === 'o' && boxes[1].textContent === 'o' && boxes[2].textContent === 'o') {
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
    };
    return {
        getWinner
    };
})();


const DisplayControl = (function (winner) {
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');
    // close model and open game body
    function closeModal() {
        if (player1.value !== '' && player2.value !== '') {
            document.querySelector('.modal').classList.add('hide');
            document.querySelector('.options').classList.add('hide');
            document.querySelector('.game').classList.remove('hide');
        };
    };
    document.querySelector('.start-game').addEventListener('click', closeModal);

    // update player's name after every turn and declare winner
    const boxes = document.querySelectorAll('.game p');
    const display = document.querySelector('.display');
    let gameArr = ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (box.textContent === '') {
                box.textContent = gameArr.shift();
                updateDisplay(box, boxes);
            };
        });
    });
    function updateDisplay(box) {
        if (winner === 'draw') {
            display.textContent = `It's a draw`;
        }
        else if (winner === 'player1') {
            display.textContent = `winner is ${player1.value}`;
        }
        else if (winner === 'player2') {
            display.textContent = `winner is ${player2.value}`;
        }
        else if (box.textContent === 'o') {
            display.textContent = `${player2.value}'s turn`;
        }
        else {
            display.textContent = `${player1.value}'s turn`;
        }
    };
})(GameBoard.getWinner(boxes));







