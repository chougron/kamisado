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
import Login from './page/Login';

enum Page {
  Login,
  Menu,
  Game,
  MultiplayerGame,
}

interface IState {
  currentNonLoggedPage: Page;
  currentLoggedPage: Page;
}

interface IDispatchProps {
  changeGameType: (gameType: GameType) => void;
}

interface IStateProps {
  username: string;
}

type Props = IDispatchProps & IStateProps;

class App extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      currentNonLoggedPage: Page.Login,
      currentLoggedPage: Page.Menu,
    };
  }

  public render() {
    const { currentNonLoggedPage, currentLoggedPage } = this.state;
    const { username } = this.props;
    return (
      <div className="App">
        {username === '' && (
          <div>{currentNonLoggedPage === Page.Login && <Login goToRegister={this.goToRegister} />}</div>
        )}

        {username !== '' && (
          <>
            {currentLoggedPage === Page.Menu && (
              <Menu goToGame={this.goToGame} goToMultiplayerGame={this.goToMultiplayerGame} />
            )}
            {currentLoggedPage === Page.Game && <Game />}
            {currentLoggedPage === Page.MultiplayerGame && <MultiplayerGame />}
          </>
        )}
      </div>
    );
  }

  public goToGame = () => {
    this.props.changeGameType(GameType.LOCAL);
    this.setState({
      currentLoggedPage: Page.Game,
    });
  };

  public goToMultiplayerGame = () => {
    this.props.changeGameType(GameType.MULTIPLAYER);
    this.setState({
      currentLoggedPage: Page.MultiplayerGame,
    });
  };

  public goToRegister = () => {
    //Going to register page
  };
}
const mapStateToProps = (state: GlobalState, props: IDispatchProps): IStateProps => {
  return {
    username: state.account.username,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: IDispatchProps): IDispatchProps => {
  return {
    changeGameType: (gameType: GameType) => dispatch(GameTypeChangedAction(gameType)),
  };
};

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
