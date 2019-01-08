import { IState as GameState } from "./game";

export interface IAnswer {
  event: string;
}

export interface IConnectedAnswer extends IAnswer {
  playerId: number;
}

interface IGame {
  id: string;
  black: { id: number };
  white: { id: number };
  state: GameState;
}

export interface IPairedAnswer extends IAnswer {
  game: IGame;
}

export interface IClickedAnswer extends IAnswer {
  state: GameState;
}

export enum AnswerEvent {
  CLICKED = "CLICKED",
  CONNECTED = "CONNECTED",
  PAIRING = "PAIRING",
  PAIRED = "PAIRED",
  OPPONENT_DISCONNECTED = "OPPONENT_DISCONNECTED"
}
