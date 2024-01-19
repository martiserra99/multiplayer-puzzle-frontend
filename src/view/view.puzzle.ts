import canvasUI, { Composite } from "canvas-user-interface";

import { JsonPuzzle } from "../types";

import config from "../config";
import styles from "../styles";

export default class Puzzle {
  public element: Composite;

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
}
