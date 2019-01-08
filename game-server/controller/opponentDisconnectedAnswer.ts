import { Player } from "../src/Player";
import { Answer, sendAnswer } from "./answer";

export const opponentDisconnectedAnswer = (player: Player): void => {
  const answer: Answer = {
    event: "OPPONENT_DISCONNECTED"
  };
  sendAnswer(player, answer);
};
