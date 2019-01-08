import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GameTypeChangedAction } from './actions/multiplayer';
import Game from './page/Game';
import Menu from './page/Menu';
import MultiplayerGame from './page/MultiplayerGame';
import { GameType } from './reducers/multiplayer';
import { IState as GlobalState } from './store';

enum Page {
  Menu,
  Game,
  MultiplayerGame,
}

interface IState {
  currentPage: Page;
}

interface IDispatchProps {
  changeGameType: (gameType: GameType) => void;
}

class App extends React.Component<IDispatchProps, IState> {
  public constructor(props: IDispatchProps) {
    super(props);

    this.state = {
      currentPage: Page.Menu,
    };
  }

  public render() {
    const { currentPage } = this.state;
    return (
      <div className="App">
        {currentPage === Page.Menu && <Menu goToGame={this.goToGame} goToMultiplayerGame={this.goToMultiplayerGame} />}
        {currentPage === Page.Game && <Game />}
        {currentPage === Page.MultiplayerGame && <MultiplayerGame />}
      </div>
    );
  }

  public goToGame = () => {
    this.props.changeGameType(GameType.LOCAL);
    this.setState({
      currentPage: Page.Game,
    });
  };

  public goToMultiplayerGame = () => {
    this.props.changeGameType(GameType.MULTIPLAYER);
    this.setState({
      currentPage: Page.MultiplayerGame,
    });
  };
}
const mapStateToProps = (state: GlobalState, props: IDispatchProps): {} => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch, props: IDispatchProps): IDispatchProps => {
  return {
    changeGameType: (gameType: GameType) => dispatch(GameTypeChangedAction(gameType)),
  };
};

export default connect<{}, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
