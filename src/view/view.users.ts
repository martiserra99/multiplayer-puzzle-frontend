import canvasUI, { Layout } from "canvas-user-interface";

import { JsonUsers } from "../types";

import { colors } from "../styles";

export default class Users {
  public element: Layout;

  constructor() {
    const users = canvasUI.layout.new("users", "frame");
    this.element = users;
  }

  update(users: JsonUsers) {
    this.element.removeAll();
    for (const user of users) {
      // if (user.selected) {
      //   const piece = canvasUI.view.new(`user-piece-${user.id}`, "piece");
      //   piece.set("positions", user.selected.piece.positions);
      //   piece.set("square", {
      //     size: 48,
      //     background: colors[user.style][0],
      //     border: {
      //       size: 2,
      //       color: colors[user.style][1],
      //     },
      //     corner: {
      //       type: "round",
      //       size: 8,
      //     },
      //   });
      // }
      const pointer = canvasUI.view.new(`user--pointer-${user.id}`, "pointer");
      pointer.set("color", colors[user.style][0]);
      this.element.insert(pointer);
      pointer.layoutParams.set("margin", {
        top: user.coords.y,
        left: user.coords.x,
        right: 0,
        bottom: 0,
      });
    }
  }
}
