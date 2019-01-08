import { Player } from "./Player";
import { GameState, initialGameState } from "./GameState";
import * as uuidv4 from "uuid/v4";

const games: any = {};

export interface Game {
  id: string;
  black: Player;
  white: Player;
  state: GameState;
}

/**
 * Create a game with 2 players
 * @param player1 One of the opponents
 * @param player2 The other opponent
 */
export const createGame = (player1: Player, player2: Player): void => {
  const toss = Math.floor(Math.random());
  let game;
  const id = uuidv4();
  if (toss === 0) {
    game = {
      id,
      black: player1,
      white: player2,
      state: initialGameState
    };
  } else {
    game = {
      id,
      black: player2,
      white: player1,
      state: initialGameState
    };
  }

  player1.gameId = id;
  player2.gameId = id;

  games[id] = game;
};

/**
 * Get a game by its id
 * @param id The id of the game to get
 */
export const getGame = (id: string): Game | undefined => {
  return games[id];
};

/**
 * Delete a game by its id
 * @param id The id of the game to delete
 */
export const deleteGame = (id: string): void => {
  games[id] = undefined;
};
