import { createReducer, updateObject } from './reducerUtilities';
import { Turn, Status} from '../components/board/BoardEnums';
import { getStatus } from '../components/board/BoardUtils';

const boardInitialState = {
  turn: Turn.OISPLAYING,
  status: Status.OFF,
  squares: Array(9).fill(null),
  history: []
}

const boardReducer = createReducer(boardInitialState, {
  START_GAME: startOrRestartGame,
  FINISH_GAME: finishGame,
  RESTART_GAME: startOrRestartGame,
  CLICK_SQUARE: clickSquare
});

function startOrRestartGame(state, action) {
  return updateObject(boardInitialState, {
    status: Status.PLAYING
  });
}

function finishGame(state, action) {
  return boardInitialState;
}

function clickSquare(state, action) {
  return updateObject(state, updateBoard(state, action.payload.i))
}

function updateBoard(state, i) {
    const squares = state.squares.slice(),
          history = state.history.slice(),
          symbol = state.turn === Turn.OISPLAYING ? 'O' : 'X';
      const turn = (state.turn + 1) % 2;
      squares[i] = symbol;
      history.push([symbol, i]);
      const status = getStatus(squares);
      return {squares, turn, status, history};
}

export {boardInitialState, boardReducer};
