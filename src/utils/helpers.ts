import { Entry, State } from '../types';
import { X_MAX, Y_MAX } from './constants';

// board/matrix initialization
export function initMatrix(): Entry[][] {
  const matrix: Entry[][] = [];
  for (let x = 0; x < X_MAX; x++) {
    const column: Entry[] = [];
    for (let y = 0; y < Y_MAX; y++) {
      column.push({ selectedBy: null, x, y });
    }
    matrix.push(column);
  }
  return matrix;
}

export const initialState: State = {
  board: initMatrix(),
  turn: 'red',
  curSelection: null,
  winner: {
    player: null,
    selections: [],
  },
  gameStatus: 'playing',
};
