import * as React from 'react';
import { connect } from 'react-redux';
import { PlayerColor } from '../utils/Color';
import { generatePaws } from '../utils/Generator';
import { isNull } from 'util';
import Board from '../game/Board';
import { IState as GlobalState } from '../store';

interface IStateProps {
  winner: PlayerColor | null;
}

class Game extends React.Component<IStateProps> {
  constructor(props: IStateProps) {
    super(props);

    generatePaws();
  }

  public render() {
    const { winner } = this.props;
    const winnerText = isNull(winner) ? '' : winner === PlayerColor.Black ? 'Black wins' : 'White wins';
    return (
      <div>
        <h1>Game</h1>
        <h2>{winnerText}</h2>
        <Board />
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState, props: IStateProps): IStateProps => {
  return {
    winner: state.game.winner,
  };
};

export default connect<IStateProps, {}>(
  mapStateToProps,
  {},
)(Game);
