import { Player } from "../src/Player";
import { Answer, sendAnswer } from "./answer";

export const pairingAnswer = (player: Player): void => {
  const answer: Answer = {
    event: "PAIRING"
  };
  sendAnswer(player, answer);
};
