import canvasUI, { UI, Coords } from "canvas-user-interface";

import Area from "./area";

import { JsonRoom } from "../types";

export default class View {
  private ui: UI = canvasUI.ui.new("#ui");
  private element: Area = new Area();

  constructor() {
    this.ui.start(this.element.area);
  }

  update(room: JsonRoom) {
    this.element.update(room);
  }

  end() {
    this.ui.end();
  }

  handlerMove(callback: (coords: Coords) => void) {
    this.element.handlerMove(callback);
  }

  handlerMouseup(callback: (coords: Coords) => void) {
    this.element.handlerMouseup(callback);
  }

  handlerRotate(callback: (position: number) => void) {
    this.element.handlerRotate(callback);
  }

  handlerRotateFocus(callback: (position: number) => void) {
    this.element.handlerRotateFocus(callback);
  }

  handlerSelectFromPieces(callback: (id: number, offset: Coords) => void) {
    this.element.handlerSelectFromPieces(callback);
  }
}
