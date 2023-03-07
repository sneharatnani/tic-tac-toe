function getPlayers() {
  const player1 = document.querySelector("#player1").value;
  const player2 = document.querySelector("#player2").value;
  return {
    player1,
    player2,
  };
}

const GameBoard = (function () {
  const gameFields = document.querySelectorAll(".game p");
  let gameArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // get index from arr
  function getIndex() {
    return gameArr.shift();
  }

  // set new arr after restart
  function setGameArr() {
    gameArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  // return sign according to index
  function getSign(index) {
    if (index === 2 || index === 4 || index === 6 || index === 8) {
      return "x";
    } else {
      return "o";
    }
  }

  const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [6, 7, 8],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5],
  ];

  // check for winner
  const _checkWinner = (combo, sign) => {
    for (let i = 0; i < combo.length; i++) {
      if (gameFields[combo[i]].textContent !== sign) {
        return false;
      }
    }
    return true;
  };

  function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
      if (_checkWinner(winningCombos[i], "o")) {
        return "o";
      } else if (_checkWinner(winningCombos[i], "x")) {
        return "x";
      }
    }
  }

  // check for draw
  function checkDraw(fields) {
    for (let i = 0; i < 9; i++) {
      if (fields[i].textContent === "") {
        return false;
      }
    }
    return true;
  }

  return {
    setGameArr,
    getSign,
    getIndex,
    checkDraw,
    getWinner,
  };
})();

const displayControl = (function () {
  // DOM
  const restart = document.querySelector(".restart");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const gameBody = document.querySelector(".game");
  const play = document.querySelector(".play");
  const startBtn = document.querySelector(".start-game");
  const display = document.querySelector(".display");
  const gameFields = document.querySelectorAll(".game p");

  function _openModal() {
    /* open modal to add player names */
    gameControl.showEle(modal);
    gameControl.showEle(overlay);
  }

  function _closeModal() {
    if (getPlayers().player1 !== "" && getPlayers().player2 !== "") {
      gameControl.hideEle(modal);
      gameControl.hideEle(overlay);
    }
  }
  // hide play button
  function _hidePlay() {
    gameControl.hideEle(play);
  }

  // open game body
  function openGame() {
    gameControl.showEle(gameBody);
  }

  // close game body
  function closeGame() {
    gameControl.hideEle(gameBody);
  }

  // clear game fields
  function clearFields() {
    gameFields.forEach((field) => addText(field, ""));
  }

  // add text content to elements
  function addText(ele, text) {
    return (ele.textContent = text);
  }

  // show player one's turn by default
  function showDefault() {
    addText(display, `${getPlayers().player1}'s turn`);
  }

  // show player's turn
  function showTurn(sign) {
    if (sign === "o") {
      addText(display, `${getPlayers().player2}'s turn`);
    } else {
      showDefault();
    }
  }

  // display winner, stop clicks, display restart
  function displayWinner() {
    if (GameBoard.getWinner() === "o") {
      addText(display, `winner is ${getPlayers().player1}`);
      gameControl.stopClicks(); /* stop clicks */
      gameControl.showEle(restart); /* display restart btn */
    } else if (GameBoard.getWinner() === "x") {
      addText(display, `winner is ${getPlayers().player2}`);
      gameControl.stopClicks();
      gameControl.showEle(restart);
    } else if (GameBoard.checkDraw(gameFields)) {
      addText(display, `it's a draw`);
      gameControl.showEle(restart);
    }
  }

  // events
  play.addEventListener("click", _openModal);

  startBtn.addEventListener("click", () => {
    if (getPlayers().player1 !== "" && getPlayers().player2 !== "") {
      /* check for filled inputs */ _hidePlay();
      _closeModal();
      openGame();
      showDefault();
    }
  });

  return {
    closeGame,
    addText,
    showTurn,
    displayWinner,
    clearFields,
    openGame,
    showDefault,
  };
})();

const gameControl = (function () {
  // DOM
  const gameFields = document.querySelectorAll(".game p");
  const restart = document.querySelector(".restart");

  // to hide elements
  function hideEle(ele) {
    ele.classList.add("hide");
  }

  // to show elements
  function showEle(ele) {
    ele.classList.remove("hide");
  }

  // stop click events on fields
  function stopClicks() {
    gameFields.forEach((field) => (field.style.pointerEvents = "none"));
  }

  // start click events on fields
  function _startClicks() {
    gameFields.forEach((field) => (field.style.pointerEvents = "all"));
  }

  // restart function
  function _restartGame() {
    displayControl.closeGame(); /* close game */
    displayControl.clearFields(); /* clear fields */
    GameBoard.setGameArr(); /* set new gameArr */
    _startClicks();
    displayControl.showDefault();
    displayControl.openGame(); /* open game body to start again */
    hideEle(restart);
  }

  // events
  gameFields.forEach((field) => {
    field.addEventListener("click", () => {
      if (field.textContent === "") {
        /* check for empty field */ displayControl.addText(
          field,
          GameBoard.getSign(GameBoard.getIndex())
        );
        displayControl.showTurn(field.textContent);
        displayControl.displayWinner();
      }
    });
  });

  restart.addEventListener("click", _restartGame);
  return {
    hideEle,
    showEle,
    stopClicks,
  };
})();
