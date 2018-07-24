import {
   CLICK_SQUARE,
   START_GAME,
   RESTART_GAME,
   FINISH_GAME
} from '../constants/action-types';

export const clickSquare = i => ({
  type: CLICK_SQUARE,
  payload: { i }
});

export const startGame = () => ({
  type: START_GAME
});

export const restartGame = () => ({
  type: RESTART_GAME
});

export const finishGame = () => ({
  type: FINISH_GAME
});
