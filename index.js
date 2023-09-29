const Cell = (row, column) => {
  const _position = { row, column };
  const _value = column;
  let _marker;

  const getPosition = () => _position;
  const getValue = () => _value;

  const setMarker = (marker) => {
    _marker = marker;
  };

  const getMarker = () => _marker;

  return {
    getPosition,
    getValue,
    setMarker,
    getMarker,
  };
};

const GameBoard = () => {
  const _gameBoard = [];

  const _addCells = () => {
    const ROWS = 3;
    const COLUMNS = 3;

    for (let i = 0; i < ROWS; i++) {
      _gameBoard.push([]);

      for (let j = 0; j < COLUMNS; j++) {
        _gameBoard[i].push(Cell(i, j));
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
  const gameboard = GameBoard();
  let _currentPlayer = player1;

  const getCurrentPlayer = () => _currentPlayer;

  const switchCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === player1 ? player2 : player1;
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
