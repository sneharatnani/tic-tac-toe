const PlayGame = (function () {
    const modal = document.querySelector('.modal');
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');
    const optionBtn = document.querySelectorAll('.options button');
    const startBtn = document.querySelector('.start-game');
    const display = document.querySelector('.display');
    const boxes = document.querySelectorAll('.game p');
    const boxContainer = document.querySelector('.game');
    let arr = ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            if (e.target.textContent === '') {
                e.target.textContent = arr.shift();
                display.textContent = `${player2.value}'s turn`;
            };
        });
    });

    function openModal() {
        modal.classList.remove('hide');
    };
    function closeModal() {
        if (player1.value !== '' && player2.value !== '') {
            display.textContent = `${player1.value}'s turn`;
            modal.classList.add('hide');
            boxContainer.classList.remove('hide');
        };
    };
    optionBtn.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });
    startBtn.addEventListener('click', closeModal);

})();