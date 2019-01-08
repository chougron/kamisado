import GameMove from "./GameMove";
import { PlayerColor, TileColor } from "./Color";
import { IPaw, ITile } from "./Generator";
import { GameState } from "../src/GameState";

/**
 * Get the paw from a tile
 * @param tile The tile to get the paw from
 * @param state The current state of the game
 */
export const getPawFromTile = (
  tile: ITile,
  state: GameState
): IPaw | undefined => {
  return state.paws.find((paw: IPaw) => paw.x === tile.x && paw.y === tile.y);
};

/**
 *
 * @param x The x coordinate of the paw
 * @param y The y coordinate of the paw
 * @param state The current state of the game
 */
export const getPawFromCoordinates = (
  x: number,
  y: number,
  state: GameState
): IPaw | undefined => {
  return state.paws.find((paw: IPaw) => paw.x === x && paw.y === y);
};

/**
 * Find a paw by its color
 * @param color The color of the paw
 * @param playerColor The color of the player
 * @param state The current state of the game
 */
export const getPawByColors = (
  color: TileColor,
  playerColor: PlayerColor,
  state: GameState
): IPaw => {
  const foundPaw = state.paws.find(
    (paw: IPaw) => paw.playerColor === playerColor && paw.color === color
  );

  if (!foundPaw) {
    throw Error("The paw " + color + "/" + playerColor + " was not found");
  }

  return foundPaw;
};

/**
 * Check if this is the current paw
 * @param currentPaw The current selected paw of the game
 * @param state The current state of the game
 */
export const isCurrentPaw = (paw: IPaw, state: GameState): boolean => {
  return (
    !!state.currentPaw &&
    paw.color === state.currentPaw.color &&
    paw.playerColor === state.currentPlayer
  );
};

/**
 * Move a paw within the paws of the game
 * @param paws The paws of the game
 * @param move The move to process
 */
export const movePaw = (paws: IPaw[], move: GameMove): IPaw[] => {
  const currentPaw = move.paw;
  const destination = move.to;
  return paws.map((paw: IPaw) => {
    if (
      !!currentPaw &&
      paw.color === currentPaw.color &&
      paw.playerColor === currentPaw.playerColor
    ) {
      paw.x = destination.x;
      paw.y = destination.y;
    }
    return paw;
  });
};
