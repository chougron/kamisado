import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BoardClickedAction } from '../actions/game';
import { MultiplayerBoardClickedAction } from '../actions/multiplayer';
import { isPlayerTurn } from '../utils/Multiplayer';
import { isTilePlayable } from '../utils/Tile';
import { IState as GlobalState } from '../store';
import { getHtmlCodeFromColor, TileColor } from '../utils/Color';
import './Tile.css';
import { GameType } from '../reducers/multiplayer';

interface IStateProps {
  playable: boolean;
  gameType: GameType;
  isCurrentPlayerTurn: boolean;
}
interface IDispatchProps {
  localBoardClick: () => void;
  multiplayerBoardClick: () => void;
}

interface IProps extends IStateProps, IDispatchProps {
  width: number;
  color: TileColor;
  x: number;
  y: number;
}

class Tile extends React.Component<IProps> {
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
    const { color, x, y, width, playable, isCurrentPlayerTurn } = this.props;
    const backgroundColor = getHtmlCodeFromColor(color);

    const top = y * width;
    const left = x * width;

    return (
      <div
        onClick={this.click}
        className="tile"
        style={{
          backgroundColor,
          height: width,
          left,
          top,
          width,
        }}
      >
        {playable && isCurrentPlayerTurn && <div className="playableTile" />}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState, props: IProps): IStateProps => {
  return {
    gameType: state.multiplayer.gameType,
    isCurrentPlayerTurn: isPlayerTurn(state),
    playable: isTilePlayable(props, state.game),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: IProps): IDispatchProps => {
  return {
    localBoardClick: () => dispatch(BoardClickedAction(props.x, props.y)),
    multiplayerBoardClick: () => {
      dispatch(MultiplayerBoardClickedAction(props.x, props.y));
    },
  };
};
export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Tile);
