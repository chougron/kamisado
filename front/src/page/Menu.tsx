import * as React from 'react';

interface Props {
  goToGame: () => void;
  goToMultiplayerGame: () => void;
}

class Menu extends React.Component<Props> {
  public render() {
    const { goToGame, goToMultiplayerGame } = this.props;
    return (
      <div>
        <h1>Menu</h1>
        <a onClick={goToGame}>Game</a>
        <br />
        <a onClick={goToMultiplayerGame}>Multiplayer Game</a>
      </div>
    );
  }
}

export default Menu;
