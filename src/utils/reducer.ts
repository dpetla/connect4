import { Action, State } from '../types';

// const initialState: State = {
//   board: initMatrix(),
//   turn: 'red',
//   curSelection: null,
//   winner: {
//     player: null,
//     selections: [],
//   },
// };
// function init() {
//   return {};
// }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, ...action.payload };
    case 'SET_SELECTION':
      return { ...state, ...action.payload };
    case 'SET_TURN':
      return { ...state, turn: state.turn === 'red' ? 'yellow' : 'red' };
    case 'SET_WINNER':
      return { ...state, ...action.payload, gameStatus: 'won' };
    case 'RESET_GAME':
      return { ...state, ...action.payload, gameStatus: 'won' };
    default:
      return state;
  }
}
