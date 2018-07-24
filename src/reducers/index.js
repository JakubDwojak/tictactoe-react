import {gamesReducer, gamesInitialState} from './gamesReducer';
import {activeGameReducer, activeGameInitialState} from './activeGameReducer';
import {boardReducer, boardInitialState} from './boardReducer';
import {saveGameReducer, saveGameInitialState} from './saveGameReducer';
import {deleteGameReducer, deleteGameInitialState} from './deleteGameReducer';

const initialState = {
  games: gamesInitialState,
  activeGame: activeGameInitialState,
  board: boardInitialState,
  saveGame: saveGameInitialState,
  deleteGame: deleteGameInitialState
};

const rootReducer = (state = initialState, action)  => {
  return {
    games: gamesReducer(state.games, action),
    activeGame: activeGameReducer(state.activeGame, action),
    board: boardReducer(state.board, action),
    saveGame: saveGameReducer(state.saveGame, action),
    deleteGame: deleteGameReducer(state.deleteGame, action)
  };
};

export default rootReducer;
