import { PlayerColor } from "./Color";
import { GameState } from "../src/GameState";

/**
 * Switch the current player
 * @param state The current state of the game
 */
export const switchPlayer = (state: GameState): PlayerColor => {
  return state.currentPlayer === PlayerColor.Black
    ? PlayerColor.White
    : PlayerColor.Black;
};
