import { Player } from "../src/Player";
import { Answer, sendAnswer } from "./answer";
import { getGame } from "../src/Game";
import { GameState } from "../src/GameState";

export interface ClickedAnswer extends Answer {
  state: GameState;
}

export const clickedAnswer = (player: Player): void => {
  if (!player.gameId) {
    throw new Error("This player was not paired");
  }

  const game = getGame(player.gameId);
  if (!game) {
    throw new Error("This game does not exist");
  }

  const answer: ClickedAnswer = {
    event: "CLICKED",
    state: game.state
  };
  sendAnswer(player, answer);
};
