import axios from 'axios';
import {
  DELETE_GAME_BEGIN,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE,
  DELETE_GAME,
  OPEN_DELETION_MODAL,
  CLOSE_DELETION_MODAL
} from '../constants/action-types';

export const deleteGameBegin = () => ({
  type: DELETE_GAME_BEGIN
});

export const deleteGameSuccess = id => ({
  type: DELETE_GAME_SUCCESS,
  payload: { id }
});

export const deleteGameFailure = error => ({
  type: DELETE_GAME_FAILURE,
  payload: { error }
});

export const deleteGameFromGames = id => ({
  type: DELETE_GAME,
  payload: { id }
});

export const openDeletionModal = () => ({
  type: OPEN_DELETION_MODAL
});

export const closeDeletionModal = () => ({
  type: CLOSE_DELETION_MODAL
});

export function deleteGame(id) {
  return dispatch => {
    dispatch(deleteGameBegin());
    return axios.delete(`/api/games/${id}`)
    .then(response => {
      dispatch(deleteGameSuccess(id))
      dispatch(deleteGameFromGames(id))
    })
    .catch(err => dispatch(deleteGameFailure(err))
    );
  };
}
