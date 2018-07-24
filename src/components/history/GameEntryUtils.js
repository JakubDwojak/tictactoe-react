import React from 'react';

export function createPastHistory(isDeleting, game){
    if(!isDeleting){
      const moves = game.moves,
            player = game.player;
      let symbol = 'X';
      const lastMoveIndex = moves.length - 1,
            wasDraw = player === ' ';
      return moves.map(
        (move, i) => {
          symbol = symbol === 'O' ? 'X' : 'O';
          return (
            <p key={i}>
              {i + 1}. Player '{symbol}' placed his symbol on place no. {move + 1}
              {lastMoveIndex === i & !wasDraw  ? ' and won the game!' : (lastMoveIndex === i & wasDraw ? ' and ended in a draw!' : '.')}
              </p>
          );
        }
      );
    } else {
      return 'Deleting game please wait...';
    }
  }
