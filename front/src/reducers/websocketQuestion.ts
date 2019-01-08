export enum QuestionEvent {
  PAIR = "PAIR",
  CLICK = "CLICK"
}

export interface IQuestion {
  event: QuestionEvent;
}

interface IClickedQuestion extends IQuestion {
  move: { x: number; y: number };
}

/**
 * Send a message to server
 * @param websocket The websocket connection to server
 * @param question The message to send to server
 */
const sendQuestion = (websocket: WebSocket, question: IQuestion): void => {
  const message = JSON.stringify(question);
  websocket.send(message);
};

/**
 * Ask the server to pair the player for a game
 * @param websocket The websocket connection to server
 */
export const sendPairQuestion = (websocket: WebSocket): void => {
  return sendQuestion(websocket, { event: QuestionEvent.PAIR });
};

/**
 * Send a game move to the game server
 * @param websocket The websocket connection to server
 * @param move The chosen move
 */
export const sendClickedQuestion = (
  websocket: WebSocket,
  move: { x: number; y: number }
): void => {
  const question: IClickedQuestion = { event: QuestionEvent.CLICK, move };
  return sendQuestion(websocket, question);
};
