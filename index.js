const Player = (name, marker) => {
  let _selections = [];

  const setSelections = (cellId) => {
    _selections.push(cellId);
  };

  const getSelections = () => _selections;

  return {
    name,
    marker,
    setSelections,
    getSelections,
  };
};

const Cell = (id) => {
  const _ID = id;
  let _marker;

  const getId = () => _ID;

  const setMarker = (marker) => {
    _marker = marker;
  };

  const getMarker = () => _marker;

  return {
    getId,
    setMarker,
    getMarker,
  };
};

const GameBoard = () => {
  const _board = [];

  const _addCells = () => {
    const ROWS = 3;
    const COLUMNS = 3;
    let cellId = 0;

    for (let i = 0; i < ROWS; i++) {
      _board.push([]);

      for (let j = 0; j < COLUMNS; j++) {
        cellId++;
        _board[i].push(Cell(cellId));
      }
    }
  };

  const getBoard = () => _board;

  const getEmptyCells = () => {
    const emptyCells = [];

    for (let i = 0; i < _board.length; i++) {
      for (let j = 0; j < _board[i].length; j++) {
        const currentColumn = _board[i][j];

        if (!currentColumn.getMarker()) emptyCells.push(currentColumn);
      }
    }

    return emptyCells;
  };

  const placeMarker = (selectedCell, marker) => {
    selectedCell.setMarker(marker);
  };

  // fill gameboard with cells by default
  _addCells();

  return {
    getBoard,
    getEmptyCells,
    placeMarker,
  };
};

// has all the core funtionalities and logic for the game
const GameController = (player1, player2) => {
  const _gameBoard = GameBoard();
  let _currentPlayer = player1;

  const getCurrentPlayer = () => _currentPlayer;

  const _switchCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === player1 ? player2 : player1;
  };

  const _checkWin = () => {
    const WIN_COMBOS = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    const currentPlayerSelections = _currentPlayer.getSelections();

    const matchedCombo = WIN_COMBOS.filter((combo) => {
      // check if the current player selections has all the ids of current combo
      let areAllMatchFound = false;

      for (let i = 0; i < combo.length; i++) {
        if (!currentPlayerSelections.includes(combo[i])) {
          // immediately return and break loop if the combo number is not present in user selections
          areAllMatchFound = false;
          return areAllMatchFound;
        }
      }

      // only runs if the loop completes looping
      areAllMatchFound = true;
      return areAllMatchFound;
    })[0];

    return matchedCombo === true;
  };

  const _checkDraw = () => {
    _gameBoard.getEmptyCells();
  };

  const playRound = (cellObj) => {
    const chosenCell = cellObj;
    const isCellTaken = Boolean(chosenCell.getMarker());
    let roundResult;

    if (isCellTaken) {
      roundResult = "cell already taken";
      return roundResult;
    }

    _gameBoard.placeMarker(chosenCell, _currentPlayer.marker);
    _currentPlayer.setSelections(chosenCell.getId());

    const isWin = _checkWin();
    const isDraw = _checkDraw();

    if (isWin) {
      roundResult = "win";
      return roundResult;
    }

    if (!isWin && isDraw) {
      roundResult = "draw";
      return roundResult;
    }

    if (!isDraw && !isDraw) {
      roundResult = "round complete";
      _switchCurrentPlayer();
      return roundResult;
    }
  };

  return {
    getBoard: _gameBoard.getBoard,
    getCurrentPlayer,
    playRound,
  };
};

// handales dom related stuffs
const screenController = (() => {
  const _getPlayers = () => {
    const formEl = document.querySelector("#welcome-screen");
    let player1Name;
    let player2Name;
    let player1Marker;
    let player2Marker;

    player1Marker = formEl.querySelector(
      "input[name=player1-marker]:checked"
    ).value;

    if (player1Marker === "cross") {
      player1Name = "Player X";
      player2Name = "Player O";
      player2Marker = "circle";
    } else if (player1Marker === "circle") {
      player1Name = "Player O";
      player2Name = "Player X";
      player2Marker = "cross";
    }

    return {
      player1: {
        name: player1Name,
        marker: player1Marker,
      },
      player2: {
        name: player2Name,
        marker: player2Marker,
      },
    };
  };

  const players = _getPlayers();
  const player1 = Player(players.player1.name, players.player1.marker);
  const player2 = Player(players.player2.name, players.player2.marker);
  const _gameController = GameController(player1, player2);

  const _createCellEl = (id) => {
    const cellBtn = document.createElement("button");
    const markerDiv = document.createElement("div");
    const srOnlyEl = document.createElement("span");

    cellBtn.setAttribute("type", "button");
    cellBtn.setAttribute("id", `cell-${id}`);

    cellBtn.classList.add("game-board__cell");
    srOnlyEl.classList.add("sr-only");
    srOnlyEl.textContent = "Mark this cell";
    markerDiv.classList.add("marker");

    cellBtn.append(srOnlyEl, markerDiv);

    return cellBtn;
  };

  const _playRound = (cellObj) => {
    // play a round
    const roundResult = _gameController.playRound(cellObj);
    console.log(roundResult);
  };

  const renderGameBoardEl = () => {
    const gameBoarDiv = document.querySelector("#game-board");
    const gameBoardFragment = new DocumentFragment();
    const board = _gameController.getBoard();

    board.forEach((row) =>
      row.forEach((cell) => {
        const cellEl = _createCellEl(cell.getId());

        cellEl.addEventListener("click", () => _playRound(cell));

        gameBoardFragment.append(cellEl);
      })
    );

    gameBoarDiv.append(gameBoardFragment);
  };

  return {
    renderGameBoardEl,
  };
})();

// game implemnetation
const startGame = () => {
  screenController.renderGameBoardEl();
};

const welcomeScreen = document.querySelector("#welcome-screen");
const startGameBtn = welcomeScreen.querySelector("#start-game-btn");

// on pageload render welcome screen
welcomeScreen.showModal();

startGameBtn.addEventListener("click", () => {
  welcomeScreen.close(); //close modal
  startGame();
});
