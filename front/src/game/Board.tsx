import * as React from 'react';
import { connect } from 'react-redux';
import { getTiles } from '../utils/Tile';
import { IState as GlobalState } from '../store';
import { IPaw } from '../utils/Generator';
import './Board.css';
import Paw from './Paw';
import Tile from './Tile';

interface IStateProps {
  paws: IPaw[];
}

interface IState {
  width: number;
}

class Board extends React.Component<IStateProps, IState> {
  private board: HTMLDivElement | null;

  constructor(props: IStateProps) {
    super(props);
    this.state = { width: 0 };
  }

  public componentDidMount() {
    if (this.board) {
      this.setState({ width: this.board.offsetWidth });
    }
  }

  public render() {
    const { width } = this.state;
    const tileWidth = this.getTileWidth(width);
    const { paws } = this.props;
    const tiles = getTiles();
    return (
      <div className="board" style={{ height: width }} ref={el => (this.board = el)}>
        {tiles.map(tile => (
          <Tile width={tileWidth} color={tile.color} x={tile.x} y={tile.y} key={'tile-' + tile.x + '-' + tile.y} />
        ))}
        {paws.map(paw => (
          <Paw
            playerColor={paw.playerColor}
            tileWidth={tileWidth}
            color={paw.color}
            x={paw.x}
            y={paw.y}
            key={'paw-' + paw.playerColor + '-' + paw.color}
          />
        ))}
      </div>
    );
  }

  public getTileWidth(boardWidth: number): number {
    return boardWidth / 8;
  }
}

const mapStateToProps = (state: GlobalState, props: any): IStateProps => {
  return {
    paws: state.game.paws,
  };
};

export default connect<IStateProps, {}>(
  mapStateToProps,
  {},
)(Board);
