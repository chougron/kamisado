import { PawsGeneratedAction } from '../actions/game';
import store from '../store';
import { PlayerColor, TileColor } from './Color';

interface ITile {
  color: TileColor;
  x: number;
  y: number;
}

/**
 * Generate the tiles of the board
 */
const generateTiles = (): ITile[] => {
  const tiles: ITile[] = [];

  [0, 1, 2, 3, 4, 5, 6, 7].forEach((x, y) => {
    tiles.push({ color: TileColor.Orange, x, y });
  });

  [1, 4, 7, 2, 5, 0, 3, 6].forEach((x, y) => {
    tiles.push({ color: TileColor.Blue, x, y });
  });

  [2, 7, 4, 1, 6, 3, 0, 5].forEach((x, y) => {
    tiles.push({ color: TileColor.Purple, x, y });
  });

  [3, 2, 1, 0, 7, 6, 5, 4].forEach((x, y) => {
    tiles.push({ color: TileColor.Pink, x, y });
  });

  [4, 5, 6, 7, 0, 1, 2, 3].forEach((x, y) => {
    tiles.push({ color: TileColor.Yellow, x, y });
  });

  [5, 0, 3, 6, 1, 4, 7, 2].forEach((x, y) => {
    tiles.push({ color: TileColor.Red, x, y });
  });

  [6, 3, 0, 5, 2, 7, 4, 1].forEach((x, y) => {
    tiles.push({ color: TileColor.Green, x, y });
  });

  [7, 6, 5, 4, 3, 2, 1, 0].forEach((x, y) => {
    tiles.push({ color: TileColor.Brown, x, y });
  });

  return tiles;
};

interface IPaw {
  color: TileColor;
  playerColor: PlayerColor;
  x: number;
  y: number;
}

/**
 * Generate the initials paws
 */
const generatePaws = (): void => {
  const paws: IPaw[] = [];
  [
    TileColor.Orange,
    TileColor.Blue,
    TileColor.Purple,
    TileColor.Pink,
    TileColor.Yellow,
    TileColor.Red,
    TileColor.Green,
    TileColor.Brown,
  ].forEach((color, index) => {
    paws.push({
      color,
      playerColor: PlayerColor.White,
      x: index,
      y: 0,
    });
    paws.push({
      color,
      playerColor: PlayerColor.Black,
      x: 7 - index,
      y: 7,
    });
  });

  store.dispatch(PawsGeneratedAction(paws));
};

export { generateTiles, generatePaws, ITile, IPaw };
