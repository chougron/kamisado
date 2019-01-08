enum TileColor {
  Brown = 'brown',
  Green = 'green',
  Red = 'red',
  Yellow = 'yellow',
  Pink = 'pink',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange'
}

enum PlayerColor {
  White = 'white',
  Black = 'black'
}

type Color = TileColor | PlayerColor;

const getHtmlCodeFromColor = (color: Color): string => {
  switch (color) {
    case TileColor.Blue:
      return "#0870af";
    case TileColor.Brown:
      return "#7e2e0a";
    case TileColor.Green:
      return "#07925b";
    case TileColor.Orange:
      return "#d87321";
    case TileColor.Pink:
      return "#d576a2";
    case TileColor.Purple:
      return "#743e88";
    case TileColor.Red:
      return "#d33943";
    case TileColor.Yellow:
      return "#e4c400";
    case PlayerColor.White:
      return "#ffffff";
    case PlayerColor.Black:
      return "#000000";
  }
  return "";
};

export { TileColor, PlayerColor, getHtmlCodeFromColor };
