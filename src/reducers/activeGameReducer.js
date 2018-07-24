import {
  createReducer,
  updateObject
} from './reducerUtilities';

const activeGameInitialState = {
  activeIdIndex: -1
}

const activeGameReducer = createReducer(activeGameInitialState, {
    SELECT_KEY: updateIndexOfActiveGame
});

function updateIndexOfActiveGame(state, action) {
  return updateObject(state, {activeIdIndex: action.payload.activeIdIndex});
}

export {activeGameInitialState, activeGameReducer};
