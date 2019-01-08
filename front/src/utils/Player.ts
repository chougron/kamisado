import { IState as GameState } from '../reducers/game';
import { PlayerColor } from './Color';

/**
 * Switch the current player
 * @param state The current state of the game
 */
export const switchPlayer = (state: GameState): PlayerColor => {
  return state.currentPlayer === PlayerColor.Black ? PlayerColor.White : PlayerColor.Black;
};
