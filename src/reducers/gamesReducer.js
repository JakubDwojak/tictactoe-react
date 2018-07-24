import {
  createReducer,
  updateObject
} from './reducerUtilities';

const gamesInitialState = {
    games: [],
    loading: false,
    error: false
  };


const gamesReducer = createReducer(gamesInitialState, {
    FETCH_GAMES_BEGIN: prepareForFetching,
    FETCH_GAMES_SUCCESS: applyGames,
    FETCH_GAMES_FAILURE: passErrorInformation,
    DELETE_GAME: deleteGame
});

function prepareForFetching(state, action) {
  return updateObject(state, {loading: true, error: false});
}

function applyGames(state, action){
  return updateObject(state, {loading: false, games: action.payload.games });
}

function passErrorInformation(state, action) {
  return updateObject(state, {loading: false, error: true});
}

function deleteGame(state, action) {
  const games = state.games.filter(game => game._id !== action.payload.id);
  return updateObject(state, { games });
}

export {gamesInitialState, gamesReducer};
