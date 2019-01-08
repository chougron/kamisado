import { Question } from "./question";
import { getTileFromClick, isTilePlayable } from "../utils/Tile";
import { Player } from "../src/Player";
import { PlayerColor } from "../utils/Color";
import { isFirstSelection } from "../utils/Click";
import { getPawByColors, movePaw } from "../utils/Paw";
import { GameState } from "../src/GameState";
import { Game, getGame } from "../src/Game";
import {
  createMove,
  isWinningMove,
  isCurrentPlayerBlocked
} from "../utils/Move";
import { switchPlayer } from "../utils/Player";
import { clickedAnswer } from "./clickedAnswer";

export interface ClickQuestion extends Question {
  move: { x: number; y: number };
}

export const handleClick = (
  player: Player,
  move: { x: number; y: number }
): void => {
  if (!player.gameId) {
    throw new Error("This player does not have a current game");
  }
  const game = getGame(player.gameId);
  if (!game) {
    throw new Error("This game does not exist");
  }
  const state: GameState = game.state;
  if (
    (state.currentPlayer === PlayerColor.Black &&
      game.black.id !== player.id) ||
    (state.currentPlayer === PlayerColor.White && game.white.id !== player.id)
  ) {
    throw new Error("It is not this player turn");
  }

  const newState: GameState = {
    ...state,
    moveHistory: [...state.moveHistory],
    paws: [...state.paws]
  };

  const tile = getTileFromClick(move.x, move.y);
  if (isFirstSelection(tile, state)) {
    const paw = getPawByColors(tile.color, state.currentPlayer, state);
    newState.currentPaw = paw;
  }

  if (isTilePlayable(tile, state)) {
    // Add new move to history
    const move = createMove(state, tile);
    newState.moveHistory.push(move);
    // Move the paw
    newState.paws = movePaw(state.paws, move);

    if (isWinningMove(move)) {
      newState.winner = state.currentPlayer;
      newState.currentPaw = null;
    } else {
      // Change the current player
      const newPlayer = switchPlayer(state);
      newState.currentPlayer = newPlayer;
      // Set the new current paw
      const newCurrentPaw = getPawByColors(tile.color, newPlayer, newState);
      newState.currentPaw = newCurrentPaw;

      // If the player is now blocked, we have to change turn again
      if (isCurrentPlayerBlocked(newState)) {
        // Create move
        const blockedDestination = getTileFromClick(
          newState.currentPaw.x,
          newState.currentPaw.y
        );
        const blockedMove = createMove(newState, blockedDestination);
        // Add move to history
        newState.moveHistory.push(blockedMove);
        // Change player
        newState.currentPlayer = switchPlayer(newState);
        // Change current paw
        newState.currentPaw = getPawByColors(
          blockedDestination.color,
          newState.currentPlayer,
          newState
        );

        // If the player is again blocked, game is finished
        if (isCurrentPlayerBlocked(newState)) {
          newState.winner = newPlayer;
          newState.currentPaw = null;
        }
      }
    }
  }

  game.state = newState;
  clickedAnswer(game.white);
  clickedAnswer(game.black);
};
