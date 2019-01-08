import { isNull } from "util";
import { PlayerColor } from "./Color";
import { generateTiles, ITile } from "./Generator";
import { getPawFromCoordinates } from "./Paw";
import { GameState } from "../src/GameState";

let tiles: ITile[] | null = null;
export const getTiles = (): ITile[] => {
  if (isNull(tiles)) {
    tiles = generateTiles();
  }

  return tiles;
};

/**
 * Get a tile from a click position
 * @param x The x coordinate of the click
 * @param y The y coordinate of the click
 * @param tiles The tiles of the board
 */
export const getTileFromClick = (x: number, y: number): ITile => {
  const foundTile = getTiles().find(
    (tile: ITile) => tile.x === x && tile.y === y
  );

  if (!foundTile) {
    throw new Error("Tile " + x + "/" + y + " not found !");
  }

  return foundTile;
};

/**
 * Get the list of playable tiles
 * @param state The current state of the game
 */
export const getPlayableTiles = (state: GameState): ITile[] => {
  return getTiles().filter((tile: ITile) => isTilePlayable(tile, state));
};

/**
 * Check if a tile is playable
 * @param tile The tile to verify
 * @param state The current state of the game
 */
export const isTilePlayable = (tile: ITile, state: GameState): boolean => {
  if (!state.currentPaw) {
    return false;
  }

  // Check straight
  if (tile.x === state.currentPaw.x) {
    return isPlayableStraight(tile, state);
  }

  // Check diagonale left
  if (tile.x < state.currentPaw.x) {
    return isPlayableLeft(tile, state);
  }

  // Check diagonale right
  if (tile.x > state.currentPaw.x) {
    return isPlayableRight(tile, state);
  }

  return false;
};

/**
 * Check if a tile that is straight aligned is playable
 * @param tile The tile to check
 * @param state The current state of the game
 */
const isPlayableStraight = (tile: ITile, state: GameState): boolean => {
  if (!state.currentPaw) {
    return false;
  }

  if (state.currentPlayer === PlayerColor.Black) {
    if (tile.y >= state.currentPaw.y) {
      return false;
    }

    // Check if there is a paw on the board between the tile and the current paw
    for (let y = state.currentPaw.y - 1; y >= tile.y; y--) {
      if (getPawFromCoordinates(tile.x, y, state) !== undefined) {
        return false;
      }
    }
  } else {
    // We do the same for white player
    if (tile.y <= state.currentPaw.y) {
      return false;
    }

    for (let y = state.currentPaw.y + 1; y <= tile.y; y++) {
      if (getPawFromCoordinates(tile.x, y, state) !== undefined) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Check if a tile that is aligned at the left is playable
 * @param tile The tile to check
 * @param state The current state of the game
 */
const isPlayableLeft = (tile: ITile, state: GameState): boolean => {
  if (!state.currentPaw) {
    return false;
  }

  if (state.currentPlayer === PlayerColor.Black) {
    if (state.currentPaw.x - tile.x !== state.currentPaw.y - tile.y) {
      return false;
    }

    for (let diff = 1; diff <= state.currentPaw.x - tile.x; diff++) {
      if (
        getPawFromCoordinates(
          state.currentPaw.x - diff,
          state.currentPaw.y - diff,
          state
        ) !== undefined
      ) {
        return false;
      }
    }
  } else {
    // We do the same for white player
    if (state.currentPaw.x - tile.x !== -(state.currentPaw.y - tile.y)) {
      return false;
    }

    for (let diff = 1; diff <= state.currentPaw.x - tile.x; diff++) {
      if (
        getPawFromCoordinates(
          state.currentPaw.x - diff,
          state.currentPaw.y + diff,
          state
        ) !== undefined
      ) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Check if a tile that is aligned at the right is playable
 * @param tile The tile to check
 * @param state The current state of the game
 */
const isPlayableRight = (tile: ITile, state: GameState): boolean => {
  if (!state.currentPaw) {
    return false;
  }

  if (state.currentPlayer === PlayerColor.Black) {
    if (state.currentPaw.x - tile.x !== -(state.currentPaw.y - tile.y)) {
      return false;
    }

    for (let diff = 1; diff <= tile.x - state.currentPaw.x; diff++) {
      if (
        getPawFromCoordinates(
          state.currentPaw.x + diff,
          state.currentPaw.y - diff,
          state
        ) !== undefined
      ) {
        return false;
      }
    }
  } else {
    // We do the same for white player
    if (state.currentPaw.x - tile.x !== state.currentPaw.y - tile.y) {
      return false;
    }

    for (let diff = 1; diff <= tile.x - state.currentPaw.x; diff++) {
      if (
        getPawFromCoordinates(
          state.currentPaw.x + diff,
          state.currentPaw.y + diff,
          state
        ) !== undefined
      ) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Check if the tile is a winning move
 * @param tile The tile to check
 * @param state The current state of the game
 */
export const isWinningTile = (tile: ITile, state: GameState): boolean => {
  return (
    (tile.y === 0 && state.currentPlayer === PlayerColor.Black) ||
    (tile.y === 7 && state.currentPlayer === PlayerColor.White)
  );
};
