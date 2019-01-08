import * as WebSocket from "ws";
import { Player } from "../src/Player";

export interface Answer {
  event: string;
}

export const sendAnswer = (player: Player, answer: Answer): void => {
  return sendWSAnswer(player.ws, answer);
};

export const sendWSAnswer = (ws: WebSocket, answer: Answer): void => {
  const message = JSON.stringify(answer);
  if (ws.readyState === ws.OPEN) {
    ws.send(message);
  }
};
