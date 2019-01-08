import { IOtherAction } from '../actions';
import {
  BOARD_CLICKED,
  CURRENT_PAW_SETTED,
  IBoardClickedAction,
  ICurrentPawSettedAction,
  IPawsGeneratedAction,
  PAWS_GENERATED,
} from '../actions/game';
import { IWebsocketMessageReceived, WEBSOCKET_MESSAGE_RECEIVED } from '../actions/multiplayer';
import GameMove from '../game/GameMove';
import { isFirstSelection } from '../utils/Click';
import { PlayerColor } from '../utils/Color';
import { IPaw } from '../utils/Generator';
import { getPawByColors, movePaw } from '../utils/Paw';
import { getTileFromClick, isTilePlayable } from '../utils/Tile';
import { createMove, isCurrentPlayerBlocked, isWinningMove } from '../utils/Move';
import { switchPlayer } from '../utils/Player';
import { AnswerEvent, IAnswer, IClickedAnswer, IPairedAnswer } from './websocketAnswer';

export interface IState {
  currentPlayer: PlayerColor;
  paws: IPaw[];
  moveHistory: GameMove[];
  currentPaw: IPaw | null;
  winner: PlayerColor | null;
}

export const initialState: IState = {
  currentPaw: null,
  currentPlayer: PlayerColor.Black,
  moveHistory: [],
  paws: [],
  winner: null,
};

const handleBoardClicked = (state: IState, x: number, y: number): IState => {
  const tile = getTileFromClick(x, y);
  const newState = {
    ...state,
    moveHistory: [...state.moveHistory],
    paws: [...state.paws],
  };
  // If the click is for the first selection, then set the current paw
  if (isFirstSelection(tile, state)) {
    const paw = getPawByColors(tile.color, state.currentPlayer, state);
    newState.currentPaw = paw;
  }

  if (isTilePlayable(tile, state)) {
    // Add new move to history
    const move = createMove(state, tile);
    newState.moveHistory.push(move);
    // Move the paw
    newState.paws = movePaw(state.paws, move);

    if (isWinningMove(move)) {
      newState.winner = state.currentPlayer;
      newState.currentPaw = null;
    } else {
      // Change the current player
      const newPlayer = switchPlayer(state);
      newState.currentPlayer = newPlayer;
      // Set the new current paw
      const newCurrentPaw = getPawByColors(tile.color, newPlayer, newState);
      newState.currentPaw = newCurrentPaw;

      // If the player is now blocked, we have to change turn again
      if (isCurrentPlayerBlocked(newState)) {
        // Create move
        const blockedDestination = getTileFromClick(newState.currentPaw.x, newState.currentPaw.y);
        const blockedMove = createMove(newState, blockedDestination);
        // Add move to history
        newState.moveHistory.push(blockedMove);
        // Change player
        newState.currentPlayer = switchPlayer(newState);
        // Change current paw
        newState.currentPaw = getPawByColors(blockedDestination.color, newState.currentPlayer, newState);

        // If the player is again blocked, game is finished
        if (isCurrentPlayerBlocked(newState)) {
          newState.winner = newPlayer;
          newState.currentPaw = null;
        }
      }
    }
  }
  return newState;
};

const handlePawsGenerated = (state: IState, paws: IPaw[]): IState => {
  const newState = {
    ...state,
    paws,
  };
  return newState;
};

const handleCurrentPawSetted = (state: IState, paw: IPaw): IState => {
  const newState = {
    ...state,
    currentPaw: paw,
  };
  return newState;
};

/**
 *
 * @param state The state of the multiplayer game
 * @param message The message received from server
 */
const handleWebsocketMessageReceived = (state: IState, message: string): IState => {
  let newState = { ...state };

  const answer = JSON.parse(message) as IAnswer;
  switch (answer.event) {
    case AnswerEvent.PAIRED:
      const pairedAnswer = answer as IPairedAnswer;
      newState = pairedAnswer.game.state;
      break;
    case AnswerEvent.CLICKED:
      const clickedAnswer = answer as IClickedAnswer;
      newState = clickedAnswer.state;
      break;
  }

  return newState;
};

type Action =
  | IOtherAction
  | IPawsGeneratedAction
  | IBoardClickedAction
  | ICurrentPawSettedAction
  | IWebsocketMessageReceived;

const gameReducer = (state: IState = initialState, action: Action) => {
  switch (action.type) {
    case PAWS_GENERATED:
      return handlePawsGenerated(state, action.paws);
    case BOARD_CLICKED:
      return handleBoardClicked(state, action.x, action.y);
    case CURRENT_PAW_SETTED:
      return handleCurrentPawSetted(state, action.paw);
    case WEBSOCKET_MESSAGE_RECEIVED:
      return handleWebsocketMessageReceived(state, action.message);
    default:
      return state;
  }
};

export default gameReducer;
