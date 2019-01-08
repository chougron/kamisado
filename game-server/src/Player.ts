import * as WebSocket from "ws";
import { isNull } from "util";
import { Game, createGame, getGame } from "./Game";
import { pairedAnswer } from "../controller/pairedAnswer";
import { pairingAnswer } from "../controller/pairingAnswer";
import { opponentDisconnectedAnswer } from "../controller/opponentDisconnectedAnswer";

export interface Player {
  id: number;
  ws: WebSocket;
  gameId?: string;
}

const players: Player[] = [];

/**
 * Add a player to the list of players
 * @param ws The websocket connection of the player
 */
export const addPlayer = (ws: WebSocket): Player => {
  const player = { id: players.length + 1, ws };
  players.push(player);
  return player;
};

let waiting: Player | null = null;

/**
 * Pair a player with another one for a game
 * @param player The player to pair with someone
 */
export const pairPlayer = (player: Player): void => {
  if (player.gameId) {
    throw new Error("This player is already in a game.");
  }

  // Notify the player of the pending pairing
  pairingAnswer(player);

  if (isNull(waiting)) {
    waiting = player;
    return;
  }

  createGame(waiting, player);
  // Send the paired event to the players
  pairedAnswer(waiting);
  pairedAnswer(player);

  // Clear the waiting queue
  waiting = null;
};

export const disconnectPlayer = (player: Player): void => {
  // If disconnected player was waiting to be paired, remove it
  if (!!waiting && waiting.id === player.id) {
    waiting = null;
  }

  // If player was in a game, notify opponent
  if (!!player.gameId) {
    const game = getGame(player.gameId);
    if (!!game) {
      const opponent = game.black.id === player.id ? game.white : game.black;
      opponentDisconnectedAnswer(opponent);
    }
  }
};
