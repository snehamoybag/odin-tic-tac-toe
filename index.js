const Player = (name, marker) => {
  let _selections = [];

  const setSelections = (cellId) => {
    _selections.push(cellId);
  };

  const getSelections = () => _selections;

  return {
    name,
    marker,
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
  const _gameBoard = [];

  const _addCells = () => {
    const ROWS = 3;
    const COLUMNS = 3;
    let cellId = 0;

    for (let i = 0; i < ROWS; i++) {
      _gameBoard.push([]);

      for (let j = 0; j < COLUMNS; j++) {
        cellId++;
        _gameBoard[i].push(Cell(cellId));
      }
    }
  };

  const getBoard = () => _board;

  const getEmptyCells = () => {
    const emptyCells = _board
      .filter((row) => row.filter((column) => column.getMarker())) // returns rows that has empty columns/cells
      .map((row) => row[column]); // returns only the empty columns/cells

    return emptyCells;
  };

  const placeMarker = (row, column, marker) => {
    const selectedCell = _board[row][column];
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
  const _gameboard = GameBoard();
  let _currentPlayer = player1;

  const getCurrentPlayer = () => _currentPlayer;

  const switchCurrentPlayer = () => {
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

  const playRound = (row, column) => {
    const chosenCell = _board[row][column];
    const isCellAvailable = chosenCell.getMarker() === false;
    let roundResult;

    if (!isCellAvailable) {
      roundResult = "cell already taken";
      return roundResult;
    }

    _gameboard.placeMarker(row, column, _currentPlayer.marker);
    _currentPlayer.setSelections(chosenCell.getId());

    //check for win
    const isWin = checkWin(_currentPlayer);
    // if check for win fails, check for draw

    // if check for draw fails, switch the player
  };
};

// has all the displaying related funtionalities
const ScreenController = () => {};

// game implemnetation
const startGame = () => {};

const welcomeScreen = document.querySelector("#welcome-screen");
const startGameBtn = welcomeScreen.querySelector("#start-game-btn");

// on pageload render welcome screen
welcomeScreen.showModal();

startGameBtn.addEventListener("click", startGame);
