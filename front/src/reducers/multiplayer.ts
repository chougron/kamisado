import { IOtherAction } from '../actions';
import {
  CONNECT_WEBSOCKET,
  FIND_OPPONENT,
  GAME_TYPE_CHANGED,
  IConnectWebsocket,
  IFindOpponent,
  IGameTypeChangedAction,
  IMultiplayerBoardClickedAction,
  IWebsocketDisconnectedAction,
  IWebsocketMessageReceived,
  MULTIPLAYER_BOARD_CLICKED,
  WEBSOCKET_DISCONNECTED,
  WEBSOCKET_MESSAGE_RECEIVED,
  WebsocketDisconnectedAction,
  WebsocketMessageReceived,
} from '../actions/multiplayer';
import store from '../store';
import { PlayerColor } from '../utils/Color';
import { AnswerEvent, IAnswer, IConnectedAnswer, IPairedAnswer } from './websocketAnswer';
import { sendClickedQuestion, sendPairQuestion } from './websocketQuestion';

export enum MultiplayerStatus {
  PAIRING = 'PAIRING',
  PAIRED = 'PAIRED',
  CONNECTED = 'CONNECTED',
  NONE = 'NONE',
  OPPONENT_DISCONNECTED = 'OPPONENT_DISCONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export enum GameType {
  LOCAL = 'LOCAL',
  MULTIPLAYER = 'MULTIPLAYER',
}

export interface IState {
  gameType: GameType;
  playerId?: number;
  status: MultiplayerStatus;
  playerColor?: PlayerColor;
  websocket?: WebSocket;
}

export const initialState = {
  gameType: GameType.LOCAL,
  status: MultiplayerStatus.NONE,
};

const handleGameTypeChanged = (state: IState, gameType: GameType): IState => {
  const newState = {
    ...state,
    gameType,
  };
  return newState;
};

/**
 * Connect to the multiplayer server
 * @param state The state of the multiplayer game
 */
const handleConnectWebsocket = (state: IState): IState => {
  const currentWebsocket = state.websocket;

  if (currentWebsocket) {
    currentWebsocket.close();
  }

  const websocket = new WebSocket('ws://192.168.1.3:8999');
  websocket.onmessage = (message: MessageEvent) => {
    store.dispatch(WebsocketMessageReceived(message.data));
  };

  websocket.onclose = () => {
    store.dispatch(WebsocketDisconnectedAction());
  };

  const newState = {
    ...state,
    websocket,
  };
  return newState;
};

/**
 *
 * @param state The state of the multiplayer game
 * @param message The message received from server
 */
const handleWebsocketMessageReceived = (state: IState, message: string): IState => {
  const newState = { ...state };

  const answer = JSON.parse(message) as IAnswer;
  switch (answer.event) {
    case AnswerEvent.CONNECTED:
      const connectedAnswer = answer as IConnectedAnswer;
      newState.playerId = connectedAnswer.playerId;
      newState.status = MultiplayerStatus.CONNECTED;
      break;
    case AnswerEvent.PAIRING:
      newState.status = MultiplayerStatus.PAIRING;
      break;
    case AnswerEvent.PAIRED:
      const pairedAnswer = answer as IPairedAnswer;
      newState.status = MultiplayerStatus.PAIRED;
      newState.playerColor = pairedAnswer.game.black.id === state.playerId ? PlayerColor.Black : PlayerColor.White;
      break;
    case AnswerEvent.OPPONENT_DISCONNECTED:
      newState.status = MultiplayerStatus.OPPONENT_DISCONNECTED;
      break;
  }

  return newState;
};

/**
 * Find an opponent for the game
 * @param state The state of the multiplayer game
 */
const handleFindOpponent = (state: IState): IState => {
  const newState = { ...state };
  if (newState.websocket) {
    sendPairQuestion(newState.websocket);
  }
  return newState;
};

/**
 * Send a click action to the server
 * @param state The state of the multiplayer game
 * @param x The x coordinate of the click
 * @param y The y coordinate of the click
 */
const handleMultiplayerBoardClickAction = (state: IState, x: number, y: number): IState => {
  const newState = { ...state };
  if (newState.websocket) {
    sendClickedQuestion(newState.websocket, { x, y });
  }
  return newState;
};

const handleWebsocketDisconnectedAction = (state: IState): IState => {
  return { ...state, status: MultiplayerStatus.DISCONNECTED };
};

type Action =
  | IOtherAction
  | IGameTypeChangedAction
  | IConnectWebsocket
  | IWebsocketMessageReceived
  | IFindOpponent
  | IMultiplayerBoardClickedAction
  | IWebsocketDisconnectedAction;
const multiplayerReducer = (state: IState = initialState, action: Action) => {
  switch (action.type) {
    case GAME_TYPE_CHANGED:
      return handleGameTypeChanged(state, action.gameType);
    case CONNECT_WEBSOCKET:
      return handleConnectWebsocket(state);
    case WEBSOCKET_MESSAGE_RECEIVED:
      return handleWebsocketMessageReceived(state, action.message);
    case FIND_OPPONENT:
      return handleFindOpponent(state);
    case MULTIPLAYER_BOARD_CLICKED:
      return handleMultiplayerBoardClickAction(state, action.x, action.y);
    case WEBSOCKET_DISCONNECTED:
      return handleWebsocketDisconnectedAction(state);
    default:
      return state;
  }
};

export default multiplayerReducer;
