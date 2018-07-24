import {
  createReducer,
  updateObject
} from './reducerUtilities';

const deleteGameInitialState = {
  error: false,
  isDeleting: false,
  isModalOpened: false
}

const deleteGameReducer = createReducer(deleteGameInitialState, {
  DELETE_GAME_BEGIN: prepareForDeleting,
  DELETE_GAME_SUCCESS: deleteGame,
  DELETE_GAME_FAILURE: handleFailure,
  OPEN_DELETION_MODAL: openModal,
  CLOSE_DELETION_MODAL: closeModal
});

function prepareForDeleting(state, action) {
  return updateObject(state, {isDeleting:true, error: false});
}

function deleteGame(state, action) {
  return updateObject(state, {isDeleting: false, isModalOpened: false});
}

function handleFailure(state, action) {
  return updateObject(state, {error: true, isDeleting:false});
}

function openModal(state, action) {
  return updateObject(state, {isModalOpened: true});
}

function closeModal(state, action) {
  return updateObject(state, {isModalOpened: false});
}


export {deleteGameInitialState, deleteGameReducer};
