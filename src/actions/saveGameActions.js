import axios from 'axios';

import {
  SAVE_GAME_BEGIN,
  SAVE_GAME_SUCCESS,
  SAVE_GAME_FAILURE,
  OPEN_SAVING_MODAL,
  CLOSE_SAVING_MODAL,
  REMOVE_LOCK
} from '../constants/action-types';

export const saveGameBegin = () => ({
  type: SAVE_GAME_BEGIN
});

export const saveGameSuccess = game => ({
  type: SAVE_GAME_SUCCESS,
  payload: { game }
});

export const saveGameFailure = error => ({
  type: SAVE_GAME_FAILURE,
  payload: { error }
});

export const openSavingModal = () => ({
  type: OPEN_SAVING_MODAL
});

export const closeSavingModal = () => ({
  type: CLOSE_SAVING_MODAL
});

export const removeLock = () => ({
  type: REMOVE_LOCK
});

export function saveGame(history) {
  const moves = history.map(el => el[1]),
        player = moves.length < 9 ? history[0][0] : '',
        date = new Date(),
        game = {moves, player, date};
  return dispatch => {
    dispatch(saveGameBegin());
    return axios.post('/api/games', game)
    .then(response => {
      dispatch(saveGameSuccess(game))
    })
    .catch(err => {
      dispatch(saveGameFailure(err))
    });
  };
}
