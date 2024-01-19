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
  selectedPiece: JsonSelectedPiece | null;
};

export type JsonPuzzle = JsonPuzzlePiece[];

export type JsonPuzzlePiece = {
  position: Position;
  piece: JsonPiece;
};

export type JsonPieces = JsonPiece[];

export type JsonPiece = {
  id: number;
  style: number;
  positions: Position[];
};

export type JsonSelectedPiece = {
  piece: JsonPiece;
  offset: Position;
};

export type Position = {
  x: number;
  y: number;
};
