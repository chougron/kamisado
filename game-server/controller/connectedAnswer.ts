import { Player } from "../src/Player";
import { Answer, sendAnswer } from "./answer";

export interface ConnectedAnswer extends Answer {
  playerId: number;
}

export const connectedAnswer = (player: Player): void => {
  const answer: ConnectedAnswer = {
    event: "CONNECTED",
    playerId: player.id
  };
  sendAnswer(player, answer);
};
