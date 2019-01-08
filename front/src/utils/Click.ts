import { IState as GameState } from '../reducers/game';
import { ITile } from './Generator';
import { getPawFromTile } from './Paw';

/**
 * Check if a click on a tile could be a first selection
 * @param tile The tile that was clicked
 */
export const isFirstSelection = (tile: ITile, state: GameState): boolean => {
  if (state.moveHistory.length) {
    return false;
  }

  const paw = getPawFromTile(tile, state);
  return paw !== undefined && paw.playerColor === state.currentPlayer;
};
