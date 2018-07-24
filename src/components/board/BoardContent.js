import React from 'react';
import { Button } from 'react-bootstrap';

import { Status, Operation } from './BoardEnums';

import { generateModal } from '../../service/modal-service';

import Square from './square/Square';

export const finishedContent = (status, operate, openModal, isGameSaved) =>
  status !== Status.PLAYING ?
      <div className="button-group">
        <Button
          className="button btn btn-primary"
          onClick={() => operate(Operation.RESTART)}
        >
          Restart
        </Button>
        <Button
          className={"button btn btn-success" + (isGameSaved ? " disabled" : "")}
          onClick={() => !isGameSaved ? openModal() : null}
        >
          Save
        </Button>
        <Button
          className="button btn btn-danger"
          onClick={() => operate(Operation.FINISH)}
        >
          Finish
        </Button>
      </div> : '';

export const board = (squares, status, handleClick) =>
  Array(3).fill(null).map(
            (el, i) =>
              <div key={i} className="square-row">
                {Array(3).fill(null).map(
                  (el, j) => {
                  const id = j += 3 * i;
                  return <Square value={squares[id]}
                          key={id}
                          id={id}
                          onClick={(i) => handleClick(i)}
                          className={() => ('square ' + (status !== Status.PLAYING ? 'game-finished' : 'game-playing'))}/>
                  }
                )}
              </div>
          );

export const modal = (save, close, isModalOpened, isSaving) =>
      generateModal({
        action: save,
        dismiss: close,
        isModalOpened,
        title: 'Save game confirmation.',
        content: 'Are you sure that you want to save this game?',
        type: 'success',
        actionButtonName: 'Save',
        buttonLock: isSaving
      });

export const createLiveHistory = (history, status) =>
  (history.length ? history.map((el, i) => {
    const [symbol, place] = el,
          wasLastMove = i === history.length - 1,
          wasWin = status === Status.OWON | status === Status.XWON,
          wasDraw = status === Status.DRAW;
    return (
      <p key={i}>
        {i + 1}. Player '{symbol}' placed his symbol on place no. {parseInt(place, 10) + 1}
        {wasLastMove ? (wasWin  ? ' and won the game!' : (wasDraw ? ' and ended in a draw!' : '.')) : ''}
      </p>
    );
  }) : 'History is empty.');
