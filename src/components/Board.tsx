import { useEffect, useState } from 'react';
import './board.css';
import Cell from './Cell';
import type { Coordinates, Entry, Player, Winner } from '../types';
import { WIN_LENGTH, X_MAX, Y_MAX } from '../utils/constants';
import { initMatrix } from '../utils/helpers';

function Board() {
  const [winner, setWinner] = useState<Winner>({
    player: null,
    selections: [],
  });
  const [turn, setTurn] = useState<Player>('red');
  const [curSelection, setCurSelection] = useState<Coordinates>();
  const [board, setBoard] = useState<Entry[][]>(() => initMatrix());

  const findConsecutiveInList = (
    arr: Entry[],
    player: Player = turn,
    winCount: number = WIN_LENGTH
  ) => {
    let count = 0;
    let selections = [];
    for (let i = 0; i < arr.length; i++) {
      const { selectedBy, ...coordinates } = arr[i];
      if (selectedBy === player) {
        count++;
        selections.push(coordinates);
        if (count === winCount) {
          setWinner({ player, selections });
          return;
        }
      } else {
        count = 0;
        selections = [];
      }
    }
  };

  const findWinForCurSelection = () => {
    // find horizontal win
    if (curSelection?.y !== undefined) {
      const { y } = curSelection;
      const horizontal = board.map((col) => col[y]);
      findConsecutiveInList(horizontal);
    }

    // find vertical win
    if (curSelection?.x !== undefined) {
      const { x } = curSelection;
      const vertical = board[x];
      findConsecutiveInList(vertical);
    }

    // find diagonal win
    if (curSelection?.x !== undefined && curSelection?.y !== undefined) {
      const { x, y } = curSelection;

      // left to right diagonal
      const xLR = x - y < 0 ? 0 : x - y;
      const yLR = y - x < 0 ? 0 : y - x;
      const diagForward = [];
      let j = yLR;
      for (let i = xLR; i < X_MAX && j < Y_MAX; i++) {
        diagForward.push(board[i][j]);
        j++;
      }
      findConsecutiveInList(diagForward);

      // right to left diagonal
      const maxRight = X_MAX - 1;
      const xRL = x + y > maxRight ? maxRight : x + y;
      const yRL = y + x - maxRight < 0 ? 0 : y + x - maxRight;
      const diagBackward = [];
      j = yRL;
      for (let i = xRL; i >= 0 && j < Y_MAX; i--) {
        diagBackward.push(board[i][j]);
        j++;
      }
      findConsecutiveInList(diagBackward);
    }
  };

  useEffect(() => {
    if (curSelection) {
      const { x, y } = curSelection;
      let newBoard = Array.from(board);
      newBoard[x][y] = { ...newBoard[x][y], selectedBy: turn };
      setBoard(newBoard);
      findWinForCurSelection();
      if (winner.player === null) {
        setTurn(turn === 'red' ? 'yellow' : 'red');
      }
    }
  }, [curSelection]);

  const onHandleClick = (x: number) => {
    const y = board[x].map((c) => c.selectedBy).indexOf(null);
    setCurSelection({ x, y });
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
