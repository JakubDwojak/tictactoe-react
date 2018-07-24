import './board.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import {NotificationService} from '../../service/notify-service';
import {
  ITEM_ALREADY_PLACED,
  START_GAME_INFO,
  RESTART_GAME_INFO,
  FINISH_GAME_INFO,
  SAVE_GAME_FAILURE,
  SAVE_GAME_SUCCESS
} from '../../constants/notification-types';

import { saveGame, openSavingModal, closeSavingModal, removeLock } from '../../actions/saveGameActions';
import { clickSquare, startGame, restartGame, finishGame } from '../../actions/boardActions';
import { generateStatus } from './BoardUtils';
import { finishedContent, board, createLiveHistory, modal} from './BoardContent';
import { Status, Operation } from './BoardEnums';

const mapDispatchToProps = dispatch => {
  return {
    saveGame: history => dispatch(saveGame(history)),
    clickSquare: i => dispatch(clickSquare(i)),
    startGame: () => dispatch(startGame()),
    restartGame: () => dispatch(restartGame()),
    finishGame: () => dispatch(finishGame()),
    openSavingModal: () => dispatch(openSavingModal()),
    closeSavingModal: () => dispatch(closeSavingModal()),
    removeLock: () => dispatch(removeLock())
  };
};

const mapStateToProps = state => {
  const saveGame = state.saveGame;
  state = state.board;
  return {
    turn: state.turn,
    status: state.status,
    squares: state.squares,
    history: state.history,
    saveGameStatus: saveGame
  };
}

class ConnectedBoard extends React.Component {
  componentDidMount() {
      this.handleClick = this.handleClick.bind(this);
      this.operate = this.operate.bind(this);
      this.save = this.save.bind(this);
  }

  handleClick(i){
    const props = this.props;
      if(props.status === Status.PLAYING){
        if(!props.squares[i]){
          this.props.clickSquare(i);
        } else {
          NotificationService.createNotification(ITEM_ALREADY_PLACED)();
        }
      }
  }

  operate(operation) {
    this.props.removeLock();
    switch (operation) {
      case Operation.START:
        this.props.startGame();
        NotificationService.createNotification(START_GAME_INFO)();
        break;
      case Operation.RESTART:
        this.props.restartGame();
        NotificationService.createNotification(RESTART_GAME_INFO)();
        break;
      case Operation.FINISH:
        this.props.finishGame();
        NotificationService.createNotification(FINISH_GAME_INFO)();
        break;
      default:
    }
  }

  save() {
    this.props.saveGame(this.props.history).then(
      (res) => NotificationService.createNotification(this.props.saveGame.error ? SAVE_GAME_FAILURE : SAVE_GAME_SUCCESS)()
    );
  }

  render() {
    const squares = this.props.squares,
          status = this.props.status,
          turn = this.props.turn,
          history = this.props.history,
          isSaving = this.props.saveGameStatus.isSaving,
          isModalOpened = this.props.saveGameStatus.isModalOpened,
          isGameSaved = this.props.saveGameStatus.isGameSaved;
    return (
      <div className="game">
        {status === Status.OFF ?
                <Button
                  className="button btn btn-success"
                  onClick={() => this.operate(Operation.START)}
                >
                  Play
                </Button> :
                <div>
                  {modal(this.save, this.props.closeSavingModal, isModalOpened, isSaving)}
                  <div className="board">
                    {board(squares, status, this.handleClick)}
                  </div>
                  <div className="panel panel-primary">
                    <div className="panel-heading">Game status</div>
                    <div className="panel-body">
                      {isSaving ? 'Saving game...' : generateStatus(status, turn)}
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">Game history</div>
                    <div className="panel-body">
                      {createLiveHistory(history, status)}
                    </div>
                  </div>
                  <div>{finishedContent(status, this.operate, this.props.openSavingModal, isGameSaved)}</div>
                </div>}
      </div>
  )}
}

const Board = connect(mapStateToProps, mapDispatchToProps)(ConnectedBoard);

export default Board;
