import { PlayerColor } from "../utils/Color";
import { IPaw, generatePaws } from "../utils/Generator";
import GameMove from "../utils/GameMove";

export interface GameState {
  currentPlayer: PlayerColor;
  paws: IPaw[];
  moveHistory: GameMove[];
  currentPaw: IPaw | null;
  winner: PlayerColor | null;
}

export const initialGameState: GameState = {
  currentPaw: null,
  currentPlayer: PlayerColor.Black,
  moveHistory: [],
  paws: generatePaws(),
  winner: null
};
