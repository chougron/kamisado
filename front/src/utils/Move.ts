import { IState as GameState } from '../reducers/game';
import { isNull } from 'util';
import GameMove from '../game/GameMove';
import { PlayerColor } from './Color';
import { ITile } from './Generator';
import { getPlayableTiles, getTileFromClick } from './Tile';

/**
 * Check if the current player is blocked
 * @param state The current state of the game
 */
export const isCurrentPlayerBlocked = (state: GameState): boolean => {
  const playableTiles = getPlayableTiles(state);

  return playableTiles.length === 0;
};

/**
 * Check if a move is a winning move
 * @param move The move to check
 */
export const isWinningMove = (move: GameMove): boolean => {
  const destination = move.to;
  const player = move.paw.playerColor;
  return (destination.y === 0 && player === PlayerColor.Black) || (destination.y === 7 && player === PlayerColor.White);
};

/**
 * Create a move
 * @param state The current state of the game
 * @param destinationTile The destination tile
 */
export const createMove = (state: GameState, destinationTile: ITile): GameMove => {
  if (isNull(state.currentPaw)) {
    throw new Error('Tile should not be playable if no paw is currently selected');
  }
  return new GameMove(getTileFromClick(state.currentPaw.x, state.currentPaw.y), destinationTile, state.currentPaw);
};
