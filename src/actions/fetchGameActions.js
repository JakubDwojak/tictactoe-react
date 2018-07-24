import {
   FETCH_GAMES_BEGIN,
   FETCH_GAMES_SUCCESS,
   FETCH_GAMES_FAILURE,
} from '../constants/action-types';

export const fetchGamesBegin = () => ({
  type: FETCH_GAMES_BEGIN
});

export const fetchGamesSuccess = games => ({
  type: FETCH_GAMES_SUCCESS,
  payload: { games }
});

export const fetchGamesFailure = error => ({
  type: FETCH_GAMES_FAILURE,
  payload: { error }
});

export function fetchGames() {
  return dispatch => {
    dispatch(fetchGamesBegin());
    return fetch("/api/games")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchGamesSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchGamesFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
