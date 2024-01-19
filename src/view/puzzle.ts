import canvasUI, { Composite, Coords } from "canvas-user-interface";

import { JsonPiece, JsonPuzzle } from "../types";

import config from "../config";
import styles from "../styles";

type Data = { piece: JsonPiece; pieceCoords: Coords; mouseCoords: Coords };

export default class Puzzle {
  public element: Composite;

  private onSelect: ((id: number, offset: Coords) => void) | null = null;

  constructor() {
    const puzzle = canvasUI.composite.new("puzzle", "puzzle");
    puzzle.set("dimensions", {
      x: config.dimensions.x,
      y: config.dimensions.y,
    });
    puzzle.set("square", {
      size: styles.square.size,
      border: {
        size: styles.square.border.size,
      },
      corner: {
        type: styles.square.corner.type,
        size: styles.square.corner.size,
      },
    });
    puzzle.set("gap", styles.square.margin);
    puzzle.set("background", styles.surface.background);
    puzzle.set("border", styles.surface.border);
    puzzle.set("corner", styles.surface.corner);

    this.element = puzzle;
  }

  update(puzzle: JsonPuzzle) {
    this.element.set("pieces", puzzle);
  }

  handlerSelect(callback: (id: number, offset: Coords) => void) {
    this.element.listeners.add(
      "piece-mousedown",
      (_: Composite, { piece, pieceCoords, mouseCoords }: Data) => {
        const offset = {
          x: mouseCoords.x - pieceCoords.x,
          y: mouseCoords.y - pieceCoords.y,
        };
        callback(piece.id, offset);
      }
    );
  }
}
