import { IPaw } from '../utils/Generator';

export type BOARD_CLICKED = 'BOARD_CLICKED';
export const BOARD_CLICKED: BOARD_CLICKED = 'BOARD_CLICKED';

export type PAWS_GENERATED = 'PAWS_GENERATED';
export const PAWS_GENERATED: PAWS_GENERATED = 'PAWS_GENERATED';

export type CURRENT_PAW_SETTED = 'CURRENT_PAW_SETTED';
export const CURRENT_PAW_SETTED: CURRENT_PAW_SETTED = 'CURRENT_PAW_SETTED';

export interface IBoardClickedAction {
  type: BOARD_CLICKED;
  x: number;
  y: number;
}
export const BoardClickedAction = (x: number, y: number): IBoardClickedAction => {
  return { type: BOARD_CLICKED, x, y };
};

export interface IPawsGeneratedAction {
  type: PAWS_GENERATED;
  paws: IPaw[];
}
export const PawsGeneratedAction = (paws: IPaw[]): IPawsGeneratedAction => {
  return { type: PAWS_GENERATED, paws };
};

export interface ICurrentPawSettedAction {
  type: CURRENT_PAW_SETTED;
  paw: IPaw;
}
export const CurrentPawSettedAction = (paw: IPaw): ICurrentPawSettedAction => {
  return { type: CURRENT_PAW_SETTED, paw };
};
