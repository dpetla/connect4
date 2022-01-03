import { createContext, useContext, useEffect, useReducer } from 'react';
import { Action, Coordinates, Entry, Player, State, Winner } from './types';
import { WIN_LENGTH, X_MAX, Y_MAX } from './utils/constants';
import { initMatrix, initialState } from './utils/helpers';
import { reducer } from './utils/reducer';

const Context = createContext<{ state: State }>({ state: initialState });

type Props = { value: any; children: any };

function GameContext(props: Props) {
  return (
    <Context.Provider value={props.value}>{props.children}</Context.Provider>
  );
}
GameContext.displayName = 'GameContext';

export default GameContext;

export function useGame() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useGameContext must be used within a GameContext');
  }
  const [state, dispatch] = useReducer(reducer, context.state);
  const { board, turn, curSelection, winner } = state;

  const setBoard = (board: Entry[][]) =>
    dispatch({ type: 'SET_BOARD', payload: { board } });
  const setSelection = (curSelection: Coordinates) =>
    dispatch({ type: 'SET_SELECTION', payload: { curSelection } });
  const setWinner = (winner: Winner) =>
    dispatch({ type: 'SET_WINNER', payload: { winner } });
  const toggleTurn = () => dispatch({ type: 'SET_TURN' });
  const actions = { setSelection, toggleTurn, setWinner };

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
        // setTurn(turn === 'red' ? 'yellow' : 'red');
        toggleTurn();
      }
    }
  }, [curSelection]);

  return { state, actions };
}
