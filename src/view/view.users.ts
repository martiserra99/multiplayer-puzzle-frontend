import canvasUI, {
  Composite,
  Coords,
  Layout,
  View,
} from "canvas-user-interface";

import { JsonPiece, JsonUser, JsonUsers } from "../types";

import styles, { colors } from "../styles";

export default class Users {
  public element: Layout;

  constructor() {
    const users = canvasUI.layout.new("users", "frame");
    this.element = users;
  }

  update(users: JsonUsers) {
    this.element.removeAll();
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
    this.element.insert(piece);
    piece.layoutParams.set("margin", {
      top: user.coords.y + offset.y,
      left: user.coords.x + offset.x,
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
    this.element.insert(pointer);
    pointer.layoutParams.set("margin", {
      top: user.coords.y,
      left: user.coords.x,
      right: 0,
      bottom: 0,
    });
  }
}
