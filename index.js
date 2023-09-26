// show board on start
// get players
// player can select certain cells to place their marker
// check for  win or draw after player plays their turn
// show win/draw message if  win/draw found
// end game after win/draw
// if no win/draw swith turn to other player
const Player = (name, marker) => {
  let _currentCombo = "";

  const setCurrentCombo = (val) => {
    if (_currentCombo.length === 3) {
      _currentCombo = "" + val;
    } else {
      _currentCombo += val;
    }
  };

  const getCurrentCombo = () => _currentCombo;

  return {
    name,
    marker,
    setCurrentCombo,
    getCurrentCombo,
  };
};

const Cell = (row, column) => {
  const _value = column;
  let _isTaken = false;
  let _marker;

  const take = () => {
    _isTaken = take;
  };

  const getValue = () => _value;
  const getTakenStatus = () => _isTaken;

  const setMarker = (marker) => {
    _marker = marker;
  };

  return {
    getValue,
    take,
    getTakenStatus,
    setMarker,
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

  const get = () => _board;
  const getCellValue = (row, column) => _board[row][column].getValue();

  const placeMarker = (row, column, marker) => {
    _board[row][column].take();
    _board[row][column].setMarker(marker);
  };

  const getFilledStatus = () => {
    let isBoardFilled = true;

    for (let i = 0; i < _board.length; i++) {
      for (let j = 0; j < _board[i].length; j++) {
        const currentCell = _board[i][j];
        if (!currentCell.getTakenStatus()) {
          isBoardFilled = false;
          return isBoardFilled; // return immediately if empty cell is found
        }
      }
    }

    return isBoardFilled;
  };

  // initialize default board state
  setDefaultState();

  return {
    setDefaultState,
    get,
    getCellValue,
    placeMarker,
    getFilledStatus,
  };
};

const GameController = (player1, player2) => {
  const _gameBoard = GameBoard();
  let _currentPlayer = player1;

  const getCurrentPlayer = () => _currentPlayer;

  const _switchPlayer = () => {
    _currentPlayer = _currentPlayer === player1 ? player2 : player1;
  };

  const _getWinner = () => {
    const winCombos = ["012", "000", "111", "222"];
    if (winCombos.includes(_currentPlayer.getCurrentCombo()))
      return _currentPlayer;
  };

  const _checkWin = () => {
    const winner = _getWinner();
    return winner === true;
  };

  const playRound = (row, column) => {
    let roundResult = "";
    const isBoardFilled = _gameBoard.getFilledStatus();
    const isCellAvailable = _gameBoard[row][column].getTakenStatus();

    if (isBoardFilled) {
      roundResult = "match tied";
      return roundResult;
    }

    if (!isCellAvailable) {
      roundResult = "cell already taken";
      return roundResult;
    }

    _gameBoard.placeMarker(row, column, _currentPlayer.marker);
    _currentPlayer.setCurrentCombo(column);
    const isWin = _checkWin();

    if (!isWin) {
      _switchPlayer();
      roundResult = "round complete";
      return roundResult;
    } else {
      roundResult = "win";
      return roundResult;
    }
  };

  return {
    getGameBoard: _gameBoard.get,
    getCurrentPlayer,
    playRound,
  };
};

const DisplayController = (player1, player2) => {
  const _player1 = Player("Snehamoy", "X");
  const _player2 = Player("Futuman", "O");
  const _gameController = GameController(_player1, _player2);

  const renderGameBoard = () => {
    const gameBoard = _gameController.getGameBoard();
    console.log(gameBoard);
  };

  const renderEndScreen = (containerEl, msgEl, restartBtnEl) => {
    console.log("The winner is " + _gameController.getCurrentPlayer());
  };

  return {
    gameBoard: renderGameBoard,
    endScreen: renderEndScreen,
  };
};
