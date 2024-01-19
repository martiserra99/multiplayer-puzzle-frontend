import canvasUI, { Layout, Coords } from "canvas-user-interface";

import Users from "./view.users";
import Puzzle from "./view.puzzle";
import Pieces from "./view.pieces";

import { JsonRoom } from "../types";

import styles from "../styles";

export default class Content {
  public element: Layout;

  private users: Users;
  private puzzle: Puzzle;
  private pieces: Pieces;

  constructor() {
    const content = canvasUI.layout.new("content", "frame");
    content.set("background", styles.background);

    const frame = canvasUI.layout.new("frame", "frame");

    content.insert(frame);
    frame.layoutParams.set("margin", {
      top: 4,
      left: 0,
      right: 0,
      bottom: 0,
    });

    const linear = canvasUI.layout.new("linear", "linear");
    linear.set("size", { width: "auto", height: "auto" });
    linear.set("direction", "vertical");
    linear.set("gap", styles.puzzle.margin);

    frame.insert(linear);
    linear.layoutParams.set("align", {
      horizontal: "middle",
      vertical: "middle",
    });
    linear.layoutParams.set("margin", {
      top: 0,
      left: 0,
      right: 0,
      bottom: 56,
    });

    const puzzle = new Puzzle();

    linear.insert(puzzle.element);
    puzzle.element.layoutParams.set("attachTo", {
      top: "parent",
      left: "parent",
      right: "parent",
      bottom: "parent",
    });

    const pieces = new Pieces();

    linear.insert(pieces.element);

    const users = new Users();

    frame.insert(users.element);

    this.element = content;
    this.users = users;
    this.puzzle = puzzle;
    this.pieces = pieces;
  }

  update(room: JsonRoom) {
    this.users.update(room.users);
    this.puzzle.update(room.puzzle);
    this.pieces.update(room.pieces, room.users);
  }

  handlerMove(callback: (coords: Coords) => void) {
    const frame = this.element.find("frame") as Layout;
    frame.listeners.add("mousemove", (_: Layout, coords: Coords) => {
      callback(coords);
    });
  }

  handlerMouseup(callback: (coords: Coords) => void) {
    const frame = this.element.find("frame") as Layout;
    frame.listeners.add("mouseup", (_: Layout, coords: Coords) => {
      callback(coords);
    });
  }

  handlerRotate(callback: (position: number) => void) {
    this.pieces.handlerRotate(callback);
  }

  handlerRotateFocus(callback: (position: number) => void) {
    this.pieces.handlerRotateFocus(callback);
  }

  handlerSelectFromPieces(callback: (id: number, offset: Coords) => void) {
    this.pieces.handlerSelect(callback);
  }
}
