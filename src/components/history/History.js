import './history.css';

import React from 'react';
import {Route} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from "react-redux";

import {NotificationService} from '../../service/notify-service';
import {formatDateFull} from '../../service/date-service';
import {
  FETCH_GAMES_FAILURE
} from '../../constants/notification-types';

import { getLastSegment } from '../../service/url-service';
import { fetchGames } from '../../actions/fetchGameActions';
import {
  selectKey,
  selectKeyUsingId
} from '../../actions/activeGameActions';

 import GameEntry from './GameEntry';

const mapStateToProps = state => {
  const games = state.games,
        activeGame = state.activeGame;
  return {
    games: games.games,
    loading: games.loading,
    error: games.error,
    activeIdIndex: activeGame.activeIdIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: () => dispatch(fetchGames()),
    selectKeyUsingId: (games, activeId) => dispatch(selectKeyUsingId()),
    selectKey: key =>dispatch(selectKey(key))
  };
}

class ConnectedHistory extends React.Component {
  componentDidMount() {
    if(!this.props.games.length)
      this.props.fetchGames();
    if(this.props.error)
      NotificationService.createNotification(FETCH_GAMES_FAILURE)();
    if(this.props.activeId === -1) {
      const activeId = this.getActiveId(),
            games = this.props.games;
      this.props.selectKeyUsingId(games, activeId);
    }
  }

  handleClickItem(key) {
    this.props.selectKey(key);
  }

  generateHistory(activeId) {
    const games = this.props.games;
    return games && games.length > 0 ?
      games.map(
      (game, i) =>
        <div key={i}>
          <LinkContainer to={'/history/' + game._id}>
            <div onClick={() => this.handleClickItem(i)}>
              <div className={activeId === game._id ? 'active history-element' : 'history-element'}>{i+1}. {game.player ? '\'' + game.player + '\' won' : 'Draw'} - {formatDateFull(game.date)}</div>
              {games.length - 1 !== i ? <hr className="history-hr"/> : ''}
            </div>
          </LinkContainer>
        </div>
    ) : <div className="history-element">History is empty</div>;
  }

  getActiveId() {
    return getLastSegment(this.props.location.pathname, 'history');
  }

  render() {
    const { error, loading } = this.props;
    const activeId = this.getActiveId();
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Histories</div>
          <div className="panel-body history-panel">
          { error ? '' : (loading ? 'Loading...' : this.generateHistory(activeId)) }
          </div>
        </div>
        <Route path="/history/:id" component={GameEntry} />
      </div>
  )}
}

const History = connect(mapStateToProps, mapDispatchToProps)(ConnectedHistory)

export default History;
