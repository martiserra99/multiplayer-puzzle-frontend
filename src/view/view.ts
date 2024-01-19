import canvasUI, { Coords, Layout } from "canvas-user-interface";

import Content from "./view.content";

import { JsonRoom } from "../types";

export default class View {
  private ui = canvasUI.ui.new("#ui");
  private content: Content;

  constructor() {
    this.content = new Content();
    this.ui.start(this.content.element);
  }

  update(room: JsonRoom) {
    this.content.update(room);
  }

  end() {
    this.ui.end();
  }

  handlerMove(callback: (coords: Coords) => void) {
    this.content.handlerMove(callback);
  }

  handlerMouseup(callback: () => void) {
    this.content.element.listeners.add("mouseup", () => {
      callback();
    });
  }

  handlerRotate(callback: (position: number) => void) {
    this.content.handlerRotate(callback);
  }

  handlerRotateMousedown(callback: (position: number) => void) {
    this.content.handlerRotateMousedown(callback);
  }

  handlerSelectFromPieces(
    callback: (id: number, coords: Coords, offset: Coords) => void
  ) {
    this.content.handlerSelectFromPieces(callback);
  }
}
