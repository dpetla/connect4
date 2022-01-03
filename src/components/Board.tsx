import './board.css';
import Cell from './Cell';
import { useGame } from '../Game.Context';

function Board() {
  const { state, actions } = useGame();
  const { board, winner } = state;
  const { setSelection } = actions;
  console.log(state);

  const onHandleClick = (x: number) => {
    const y = board[x].map((c) => c.selectedBy).indexOf(null);
    setSelection({ x, y });
  };

  return (
    <div className="wrapper">
      {board.map((column, index) => (
        <div
          key={index}
          className="column"
          onClick={() => onHandleClick(index)}
        >
          {column.map((entry, i) => (
            <div
              key={`${entry.x}-${entry.y}`}
              //   onClick={() => onHandleClick(entry.x, entry.y)}
            >
              <Cell key={i} entry={entry} />
            </div>
          ))}
        </div>
      ))}
      {winner.player !== undefined ? (
        <div>
          WINNER: {winner.player}
          <br />
          {winner.selections.map((s) => (
            <div>
              COL: {s.x}/ CEL:{s.y}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Board;
