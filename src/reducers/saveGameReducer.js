import {
  createReducer,
  updateObject
} from './reducerUtilities';

const saveGameInitialState = {
  error: false,
  isSaving: false,
  isModalOpened: false,
  isGameSaved: false
}

const saveGameReducer = createReducer(saveGameInitialState, {
  SAVE_GAME_BEGIN: prepareForSaving,
  SAVE_GAME_SUCCESS: updateGame,
  SAVE_GAME_FAILURE: handleFailure,
  OPEN_SAVING_MODAL: openModal,
  CLOSE_SAVING_MODAL: closeModal,
  REMOVE_LOCK: removeLock
});

function prepareForSaving(state, action) {
  return updateObject(state, {isSaving:true, error: false, isGameSaved: false});
}

function updateGame(state, action) {
  return updateObject(state, {isSaving: false, isModalOpened: false, isGameSaved: true});
}

function handleFailure(state, action) {
  return updateObject(state, {error: true, isSaving:false});
}

function openModal(state, action) {
  return updateObject(state, {isModalOpened: true})
}

function closeModal(state, action) {
  return updateObject(state, {isModalOpened: false})
}

function removeLock(state, action) {
  return updateObject(state, {isGameSaved: false})
}

export {saveGameInitialState, saveGameReducer};
