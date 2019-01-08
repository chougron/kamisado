import { GameType } from '../reducers/multiplayer';
import { IState } from '../store';

/**
 * Check if it is the player turn to play
 * @param state The state of the application
 */
export const isPlayerTurn = (state: IState): boolean => {
  if (state.multiplayer.gameType === GameType.LOCAL) {
    return true;
  }

  return !!state.multiplayer.playerColor && state.game.currentPlayer === state.multiplayer.playerColor;
};
