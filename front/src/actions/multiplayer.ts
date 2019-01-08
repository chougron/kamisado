import { GameType } from '../reducers/multiplayer';

export type GAME_TYPE_CHANGED = 'GAME_TYPE_CHANGED';
export const GAME_TYPE_CHANGED: GAME_TYPE_CHANGED = 'GAME_TYPE_CHANGED';

export type CONNECT_WEBSOCKET = 'CONNECT_WEBSOCKET';
export const CONNECT_WEBSOCKET: CONNECT_WEBSOCKET = 'CONNECT_WEBSOCKET';

export type WEBSOCKET_MESSAGE_RECEIVED = 'WEBSOCKET_MESSAGE_RECEIVED';
export const WEBSOCKET_MESSAGE_RECEIVED: WEBSOCKET_MESSAGE_RECEIVED = 'WEBSOCKET_MESSAGE_RECEIVED';

export type FIND_OPPONENT = 'FIND_OPPONENT';
export const FIND_OPPONENT: FIND_OPPONENT = 'FIND_OPPONENT';

export type MULTIPLAYER_BOARD_CLICKED = 'MULTIPLAYER_BOARD_CLICKED';
export const MULTIPLAYER_BOARD_CLICKED: MULTIPLAYER_BOARD_CLICKED = 'MULTIPLAYER_BOARD_CLICKED';

export type WEBSOCKET_DISCONNECTED = 'WEBSOCKET_DISCONNECTED';
export const WEBSOCKET_DISCONNECTED: WEBSOCKET_DISCONNECTED = 'WEBSOCKET_DISCONNECTED';

export interface IGameTypeChangedAction {
  type: GAME_TYPE_CHANGED;
  gameType: GameType;
}
export const GameTypeChangedAction = (gameType: GameType): IGameTypeChangedAction => {
  return { type: GAME_TYPE_CHANGED, gameType };
};

export interface IConnectWebsocket {
  type: CONNECT_WEBSOCKET;
}
export const ConnectWebsocket = (): IConnectWebsocket => {
  return { type: CONNECT_WEBSOCKET };
};

export interface IWebsocketMessageReceived {
  type: WEBSOCKET_MESSAGE_RECEIVED;
  message: string;
}
export const WebsocketMessageReceived = (message: string): IWebsocketMessageReceived => {
  return { type: WEBSOCKET_MESSAGE_RECEIVED, message };
};

export interface IFindOpponent {
  type: FIND_OPPONENT;
}
export const FindOpponent = (): IFindOpponent => {
  return { type: FIND_OPPONENT };
};

export interface IMultiplayerBoardClickedAction {
  type: MULTIPLAYER_BOARD_CLICKED;
  x: number;
  y: number;
}
export const MultiplayerBoardClickedAction = (x: number, y: number): IMultiplayerBoardClickedAction => {
  return { type: MULTIPLAYER_BOARD_CLICKED, x, y };
};

export interface IWebsocketDisconnectedAction {
  type: WEBSOCKET_DISCONNECTED;
}

export const WebsocketDisconnectedAction = (): IWebsocketDisconnectedAction => {
  return { type: WEBSOCKET_DISCONNECTED };
};
