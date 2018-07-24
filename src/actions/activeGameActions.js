import { SELECT_KEY } from '../constants/action-types';

export const selectKey = activeIdIndex => ({
  type: SELECT_KEY,
  payload: { activeIdIndex }
});

export function selectKeyUsingId(games, activeId) {
  const activeIdIndex = games.findIndex(el => el._id === activeId);
  return dispatch => dispatch(selectKey(activeIdIndex));
}
