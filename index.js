const Cell = (row, column) => {
  const _position = { row, column };
  let _marker;

  const getPosition = () => _position;

  const setMarker = (marker) => {
    _marker = marker;
  };

  const getMarker = () => _marker;

  return {
    getPosition,
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
};
