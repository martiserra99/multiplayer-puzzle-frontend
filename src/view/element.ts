import canvasUI, {
  View,
  Layout,
  Composite,
  Coords,
} from "canvas-user-interface";

import Puzzle from "./puzzle";
import Pieces from "./pieces";

import { JsonRoom, JsonUsers, JsonUser, JsonPiece } from "../types";

import styles, { colors } from "../styles";

export default class Element {
  public element: Layout;

  private area: Layout;
  private users: Layout;
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

    this.puzzle = new Puzzle();
    linear.insert(this.puzzle.element);

    this.pieces = new Pieces();
    linear.insert(this.pieces.element);

    this.users = canvasUI.layout.new("users", "frame");
    this.area.insert(this.users);
  }

  update(room: JsonRoom) {
    this.updateUsers(room.users);
    this.puzzle.update(room.puzzle);
    this.pieces.update(room.pieces, room.users);
  }

  updateUsers(users: JsonUsers) {
    this.users.removeAll();
    for (const user of users) {
      if (user.selected) {
        const piece = this.createPiece(user.selected.piece);
        this.insertPiece(piece, user, user.selected.offset);
      }
      const pointer = this.createPointer(user);
      this.insertPointer(pointer, user);
    }
  }

  private createPiece(piece: JsonPiece) {
    const element = canvasUI.composite.new(`piece-${piece.id}`, "piece");
    element.set("positions", piece.positions);
    element.set("square", {
      size: styles.square.size,
      background: colors[piece.style][0],
      border: {
        size: styles.square.border.size,
        color: colors[piece.style][1],
      },
      corner: {
        type: styles.square.corner.type,
        size: styles.square.corner.size,
      },
    });
    element.set("gap", styles.square.margin);
    return element;
  }

  private insertPiece(piece: Composite, user: JsonUser, offset: Coords) {
    this.users.insert(piece);
    piece.layoutParams.set("margin", {
      top: user.coords.y - offset.y,
      left: user.coords.x - offset.x,
      right: 0,
      bottom: 0,
    });
  }

  private createPointer(user: JsonUser) {
    const pointer = canvasUI.view.new(`user-${user.id}`, "pointer");
    pointer.set("color", colors[user.style][0]);
    return pointer;
  }

  private insertPointer(pointer: View, user: JsonUser) {
    this.users.insert(pointer);
    pointer.layoutParams.set("margin", {
      top: user.coords.y,
      left: user.coords.x,
      right: 0,
      bottom: 0,
    });
  }

  handlerMove(callback: (coords: Coords) => void) {
    this.area.listeners.add("mousemove", (_: Layout, coords: Coords) => {
      callback(coords);
    });
  }

  handlerMouseup(callback: (coords: Coords) => void) {
    this.area.listeners.add("mouseup", (_: Layout, coords: Coords) => {
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
