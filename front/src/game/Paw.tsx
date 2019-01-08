import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BoardClickedAction } from '../actions/game';
import { MultiplayerBoardClickedAction } from '../actions/multiplayer';
import { GameType } from '../reducers/multiplayer';
import { isPlayerTurn } from '../utils/Multiplayer';
import { isCurrentPaw } from '../utils/Paw';
import { IState as GlobalState } from '../store';
import { getHtmlCodeFromColor, PlayerColor, TileColor } from '../utils/Color';
import './Paw.css';

interface IStateProps {
  currentPaw: boolean;
  gameType: GameType;
  isCurrentPlayerTurn: boolean;
}

interface IDispatchProps {
  localBoardClick: () => void;
  multiplayerBoardClick: () => void;
}

interface IProps extends IStateProps, IDispatchProps {
  tileWidth: number;
  playerColor: PlayerColor;
  color: TileColor;
  x: number;
  y: number;
}

class Paw extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.click = this.click.bind(this);
  }
  public click() {
    if (this.props.gameType === GameType.LOCAL) {
      return this.props.localBoardClick();
    }
    if (this.props.isCurrentPlayerTurn) {
      return this.props.multiplayerBoardClick();
    }
  }
  public render() {
    const { color, playerColor, x, y, tileWidth, currentPaw } = this.props;
    const backgroundColor = getHtmlCodeFromColor(color);
    const borderColor = getHtmlCodeFromColor(playerColor);

    const top = y * tileWidth + tileWidth / 10;
    const left = x * tileWidth + tileWidth / 10;

    const className = currentPaw ? 'paw activePaw' : 'paw';

    return (
      <div
        onClick={this.click}
        className={className}
        style={{
          backgroundColor,
          borderColor,
          height: (tileWidth * 8) / 10,
          left,
          top,
          width: (tileWidth * 8) / 10,
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch, props: IProps): IDispatchProps => {
  return {
    localBoardClick: () => dispatch(BoardClickedAction(props.x, props.y)),
    multiplayerBoardClick: () => {
      dispatch(MultiplayerBoardClickedAction(props.x, props.y));
    },
  };
};

const mapStateToProps = (state: GlobalState, props: IProps): IStateProps => {
  return {
    currentPaw: isCurrentPaw(props, state.game),
    gameType: state.multiplayer.gameType,
    isCurrentPlayerTurn: isPlayerTurn(state),
  };
};

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Paw);
