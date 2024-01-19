export type JsonRoom = {
  id: string;
  users: JsonUsers;
  puzzle: JsonPuzzle;
  pieces: JsonPieces;
};

export type JsonUsers = JsonUser[];

export type JsonUser = {
  id: string;
  style: number;
  coords: Position;
  rotate: number;
  selected: { piece: JsonPiece; offset: Position } | null;
};

export type JsonPuzzle = {
  position: Position;
  piece: JsonPiece;
}[];

export type JsonPieces = JsonPiece[];

export type JsonPiece = {
  id: number;
  style: number;
  positions: Position[];
};

export type Position = {
  x: number;
  y: number;
};
