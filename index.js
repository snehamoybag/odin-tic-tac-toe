// get players
// show board on start
// get players
// player can select certain cells to place their marker
// check for  win or draw after player plays their turn
// show win/draw message if  win/draw found
// end game after win/draw
// if no win/draw swith turn to other player
const Player = (name, marker) => {
  return {
    name,
    marker,
  };
};

const Cell = (row, column) => {
  let _value = column;
  let _isTaken = false;

  const setValue = (val) => {
    _value = val;
  };
  const getValue = () => _value;
  const setTakenStatus = (bool) => {
    _isTaken = bool;
  };
  const getTakenStatus = () => _isTaken;
  const getPosition = () => ({ row, column });

  return {
    setValue,
    getValue,
    setTakenStatus,
    getTakenStatus,
    getPosition,
  };
};

const GameBoard = () => {
  let _board = [];

  const setDefaultState = () => {
    // start with a fresh board and fill it up with rows and columns
    const freshBoard = [];
    const _ROWS = 3;
    const _COLUMNS = 3;

    for (let i = 0; i < _COLUMNS; i++) {
      freshBoard.push([]);
      for (let j = 0; j < _ROWS; j++) {
        freshBoard[i].push(Cell(i, j));
      }
    }

    _board = freshBoard;
  };

  // initialize default board state
  setDefaultState();

  const get = () => _board;
  const placeMarker = (player, row, column) => {
    _board[row];
  };

  return {
    get,
    setDefaultState,
  };
};

const GameControl = () => {
  const gameBoard = GameBoard();

  const checkWinner = () => {
    const winCombos = ["012", "000", "111", "222"];
  };

  const playerX = Player("Player X", "X");
  const playerO = Player("Player O", "O");
  let currentPlayer = playerX;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };
};

gameBoard.render();
