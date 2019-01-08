import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ConnectWebsocket, FindOpponent } from '../actions/multiplayer';
import { MultiplayerStatus } from '../reducers/multiplayer';
import { PlayerColor } from '../utils/Color';
import { generatePaws } from '../utils/Generator';
import { isPlayerTurn } from '../utils/Multiplayer';
import { isNull } from 'util';
import Board from '../game/Board';
import { IState as GlobalState } from '../store';

interface IStateProps {
  winner: PlayerColor | null;
  multiplayerStatus: MultiplayerStatus;
  isCurrentPlayerTurn: boolean;
  playerColor: PlayerColor | undefined;
}

interface IDispatchProps {
  connectWebsocket: () => void;
  findOpponent: () => void;
}

type IProps = IStateProps & IDispatchProps;

class MultiplayerGame extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    generatePaws();
  }

  public componentWillMount(): void {
    this.props.connectWebsocket();
  }

  public render() {
    const { winner, multiplayerStatus, findOpponent, isCurrentPlayerTurn, playerColor, connectWebsocket } = this.props;
    const winnerText = isNull(winner) ? '' : winner === PlayerColor.Black ? 'Black wins' : 'White wins';
    return (
      <div>
        <h1>Multiplayer Game</h1>
        {playerColor === PlayerColor.Black && <h2>You play as Black.</h2>}
        {playerColor === PlayerColor.White && <h2>You play as White.</h2>}
        {isCurrentPlayerTurn && <h2>It is your turn.</h2>}
        <h2>{winnerText}</h2>
        {multiplayerStatus === MultiplayerStatus.PAIRED && <Board />}
        {multiplayerStatus === MultiplayerStatus.PAIRING && <h2>Waiting for an opponent...</h2>}
        {multiplayerStatus === MultiplayerStatus.NONE && <h2>Connecting to server...</h2>}
        {multiplayerStatus === MultiplayerStatus.OPPONENT_DISCONNECTED && <h2>Your opponent was disconnected.</h2>}
        {multiplayerStatus === MultiplayerStatus.DISCONNECTED && (
          <h2 onClick={connectWebsocket}>You were disconnected. Click to reconnect to server and start a new game.</h2>
        )}
        {multiplayerStatus === MultiplayerStatus.CONNECTED && (
          <h2 onClick={findOpponent}>Connected to server ! Click to find opponent.</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState, props: IStateProps): IStateProps => {
  return {
    isCurrentPlayerTurn: isPlayerTurn(state),
    multiplayerStatus: state.multiplayer.status,
    playerColor: state.multiplayer.playerColor,
    winner: state.game.winner,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: IDispatchProps): IDispatchProps => {
  return {
    connectWebsocket: () => dispatch(ConnectWebsocket()),
    findOpponent: () => dispatch(FindOpponent()),
  };
};

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(MultiplayerGame);
