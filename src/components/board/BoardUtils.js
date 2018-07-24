import {
  Status,
  Turn
} from './BoardEnums';

export function getStatus(squares) {
  const finished = checkFinished(squares),
        winner = checkWinner(squares);
  return !winner ?
          (
            finished ? Status.DRAW : Status.PLAYING
          ) : winner === 'O' ? Status.OWON : Status.XWON;
}

export function generateStatus(status, turn) {
  switch (status) {
    case Status.OWON: return '\'O\' won!';
    case Status.XWON: return '\'X\' won!';
    case Status.DRAW: return 'It\'s a draw!';
    case Status.PLAYING: return 'It\'s \'' + (turn === Turn.OISPLAYING ? 'O' : 'X') + '\'s turn!';
    case Status.OFF: return '';
    default: return '';
  }
}

const checkFinished = squares => {
  for(const s of squares)
    if(!s)
      return false;
  return true;
};

const checkWinner = (squares) => {
    const lines = [
      [0, 1 ,2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3 ,6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(const [a, b, c] of lines)
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    return null;
  }
