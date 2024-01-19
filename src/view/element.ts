import canvasUI, { Layout, Coords } from "canvas-user-interface";

import Users from "./view.users";
import Puzzle from "./puzzle";
import Pieces from "./pieces";

import { JsonRoom } from "../types";

import styles from "../styles";

export default class Element {
  public element: Layout;

  private area: Layout;

  private users: Users;
  private puzzle: Puzzle;
  private pieces: Pieces;

  constructor() {
    this.element = canvasUI.layout.new("element", "frame");
    this.element.set("background", styles.background);

    this.area = canvasUI.layout.new("area", "frame");

    this.element.insert(this.area);
    this.area.layoutParams.get("margin").top = 4;

    const linear = canvasUI.layout.new("linear", "linear");
    linear.set("size", { width: "auto", height: "auto" });
    linear.set("direction", "vertical");
    linear.set("gap", styles.puzzle.margin);

    this.area.insert(linear);
    linear.layoutParams.set("align", {
      horizontal: "middle",
      vertical: "middle",
    });
    linear.layoutParams.get("margin").bottom = 56;

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

    this.area.insert(users.element);

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
