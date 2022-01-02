export type Player = 'red' | 'yellow';

export type Coordinates = { x: number; y: number };

export type Entry = { selectedBy: Player | null } & Coordinates;

export type Winner = {
  player: Player | null;
  selections: Coordinates[];
};

export type State = {
  board: Entry[][];
  turn: Player;
  curSelection: Coordinates | null;
  winner: Winner;
};

export type ActionKind =
  | 'SET_WINNER'
  | 'SET_SELECTION'
  | 'SET_TURN'
  | 'RESET_GAME';

export type Action = {
  type: ActionKind;
  payload: any;
};
