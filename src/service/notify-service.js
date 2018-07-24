import React from 'react';
import {NotificationManager} from 'react-notifications';
import {
  FINISH_GAME_INFO,
  START_GAME_INFO,
  RESTART_GAME_INFO,
  SAVE_GAME_SUCCESS,
  SAVE_GAME_FAILURE,
  ITEM_ALREADY_PLACED,
  FETCH_GAMES_FAILURE,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE
} from '../constants/notification-types';

export class NotificationService extends React.Component {
  static createNotification = (type) => {
    return () => {
      switch (type) {
        case FINISH_GAME_INFO:
          NotificationManager.info('Thank you for playing',null,3000);
          break;
        case START_GAME_INFO:
          NotificationManager.info('Game has been started',null,3000);
          break;
        case RESTART_GAME_INFO:
          NotificationManager.info('Game has been restarted',null,3000);
          break;
        case SAVE_GAME_SUCCESS:
          NotificationManager.success('Save success', 'Your replay was saved',3000);
          break;
        case SAVE_GAME_FAILURE:
          NotificationManager.error('Save failed', 'Your replay was not saved',3000);
          break;
        case ITEM_ALREADY_PLACED:
          NotificationManager.warning('Wrong move!','There is a symbol already!', 3000);
          break;
        case FETCH_GAMES_FAILURE:
          NotificationManager.error('Error!','Couldn\'t get data!', 3000);
          break;
        case DELETE_GAME_FAILURE:
          NotificationManager.error('Error!','Couldn\'t delete game!', 3000);
          break;
        case DELETE_GAME_SUCCESS:
          NotificationManager.success('Delete success','Selected game was deleted', 3000);
          break;
        default:
          NotificationManager.info(type);
      }
    };
  };
}
