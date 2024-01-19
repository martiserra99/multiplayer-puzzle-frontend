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

export default class Area {
  public area: Layout;

  private users: Layout;
  private puzzle: Puzzle;
  private pieces: Pieces;

  constructor() {
    this.area = canvasUI.layout.new("element", "frame");
    this.area.set("background", styles.background);

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
      if (user.selectedPiece) {
        const piece = this.createPiece(user.selectedPiece.piece);
        this.insertPiece(piece, user, user.selectedPiece.offset);
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
    const y = this.yFromCorner(user.coords.y);
    const x = this.xFromCorner(user.coords.x);
    piece.layoutParams.get("margin").top = y - offset.y;
    piece.layoutParams.get("margin").left = x - offset.x;
  }

  private createPointer(user: JsonUser) {
    const pointer = canvasUI.view.new(`user-${user.id}`, "pointer");
    pointer.set("color", colors[user.style][0]);
    return pointer;
  }

  private insertPointer(pointer: View, user: JsonUser) {
    this.users.insert(pointer);
    const y = this.yFromCorner(user.coords.y);
    const x = this.xFromCorner(user.coords.x);
    pointer.layoutParams.get("margin").top = y;
    pointer.layoutParams.get("margin").left = x;
  }

  handlerMove(callback: (coords: Coords) => void) {
    this.area.listeners.add("mousemove", (_: Layout, coords: Coords) => {
      callback({
        x: this.xFromCenter(coords.x),
        y: this.yFromCenter(coords.y),
      });
    });
  }

  handlerMouseup(callback: (coords: Coords) => void) {
    this.area.listeners.add("mouseup", (_: Layout, coords: Coords) => {
      callback({
        x: this.xFromCenter(coords.x),
        y: this.yFromCenter(coords.y),
      });
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

  private xFromCenter(x: number) {
    return x - this.area.size.width / 2;
  }

  private yFromCenter(y: number) {
    return y - this.area.size.height / 2;
  }

  private xFromCorner(x: number) {
    return x + this.area.size.width / 2;
  }

  private yFromCorner(y: number) {
    return y + this.area.size.height / 2;
  }
}
