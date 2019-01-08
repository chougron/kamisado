import { Player } from "../src/Player";
import { Answer, sendAnswer } from "./answer";
import { Game, getGame } from "../src/Game";

export interface PairedAnswer extends Answer {
  game: Game;
}

export const pairedAnswer = (player: Player): void => {
  if (!player.gameId) {
    throw new Error("This player was not paired");
  }

  const game = getGame(player.gameId);
  if (!game) {
    throw new Error("This game does not exist");
  }

  const answer: PairedAnswer = {
    event: "PAIRED",
    game
  };
  sendAnswer(player, answer);
};
