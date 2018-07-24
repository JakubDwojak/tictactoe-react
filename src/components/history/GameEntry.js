import React from 'react';
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';

import { NotificationService } from '../../service/notify-service';
import {formatDateFull} from '../../service/date-service';
import { generateModal } from '../../service/modal-service';
import {
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE
} from '../../constants/notification-types';
import { createPastHistory } from './GameEntryUtils';

import { selectKey } from '../../actions/activeGameActions';
import { fetchGames } from '../../actions/fetchGameActions';
import { deleteGame, openDeletionModal, closeDeletionModal } from '../../actions/deleteGameActions';

const mapStateToProps = state => {
  const index = state.activeGame.activeIdIndex;
  return {
    games: state.games.games,
    isDeleting: state.deleteGame.isDeleting,
    error: state.deleteGame.error,
    isModalOpened: state.deleteGame.isModalOpened,
    game: index === -1 ? null : state.games.games[index]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getData: (activeId) =>
      dispatch(fetchGames())
        .then(
          res =>
            dispatch(selectKey(
              res.findIndex(
                el => el._id === activeId
              )
            ))
        ),
    selectKey: (activeId, games) =>
        dispatch(selectKey(
          games.findIndex(
            el => el._id === activeId
          )
        )),
    deleteGame: id => dispatch(deleteGame(id)),
    openDeletionModal: () => dispatch(openDeletionModal()),
    closeDeletionModal: () => dispatch(closeDeletionModal())
  }
};

class GameEntryConnected extends React.Component {
  componentWillMount() {
    if(!this.props.activeIdIndex) {
      const activeId = this.props.match.params.id;
      if(this.props.games.length) {
        this.props.selectKey(activeId, this.props.games);
      } else {
        this.props.getData(activeId);
      }
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteGame(this.props.game._id).then(
      res => NotificationService.createNotification(this.props.error ? DELETE_GAME_FAILURE : DELETE_GAME_SUCCESS)()
    );
  }

  getModal() {
    return generateModal({
      action: this.handleDelete,
      dismiss: this.props.closeDeletionModal,
      isModalOpened: this.props.isModalOpened,
      title: 'Deletion confirmation.',
      content: 'Are you sure that you want to delete this entry?',
      type: 'danger',
      actionButtonName: 'Delete',
      buttonLock: this.props.isDeleting
    });
  }

  render() {
    return (
      this.props.game ?
      <div>
        {this.getModal()}
        <div className="panel panel-primary">
          <div className="panel-heading">Game played at {formatDateFull(this.props.game.date)}</div>
          <div className="panel-body">
            {createPastHistory(this.props.isDeleting, this.props.game)}
            <Button
              className="btn btn-danger"
              onClick={() => this.props.openDeletionModal()}
            >
              Delete
            </Button>
          </div>
        </div>
      </div> : ''
    );
  }
}

const GameEntry = connect(mapStateToProps, mapDispatchToProps)(GameEntryConnected);

export default GameEntry;
