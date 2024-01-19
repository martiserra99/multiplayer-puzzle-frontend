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
      const pointer = canvasUI.view.new(`user-${user.id}`, "pointer");
      pointer.set("radius", 12);
      pointer.set("background", colors[user.style][0]);
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
