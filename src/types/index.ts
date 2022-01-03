export type Player = 'red' | 'yellow';

export type Coordinates = { x: number; y: number };

export type Entry = { selectedBy: Player | null } & Coordinates;

export type Winner = {
  player: Player | null;
  selections: Coordinates[];
};

export type GameStatus = 'playing' | 'won' | 'draw';

export type State = {
  board: Entry[][];
  turn: Player;
  curSelection: Coordinates | null;
  winner: Winner;
  gameStatus: 'playing' | 'won' | 'draw';
};

export type ActionKind =
  | 'SET_BOARD'
  | 'SET_SELECTION'
  | 'SET_TURN'
  | 'SET_WINNER'
  | 'RESET_GAME';

export type Action = {
  type: ActionKind;
  payload?: any;
};
