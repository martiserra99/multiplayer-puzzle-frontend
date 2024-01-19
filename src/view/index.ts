import canvasUI, { UI, Coords } from "canvas-user-interface";

import Area from "./area";

import { JsonPiece, JsonRoom } from "../types";

export default class View {
  private ui: UI = canvasUI.ui.new("#ui");
  private area: Area = new Area();

  constructor() {
    this.ui.start(this.area.area);
  }

  update(room: JsonRoom) {
    this.area.update(room);
  }

  end() {
    this.ui.end();
  }

  handlerMove(callback: (coords: Coords) => void) {
    this.area.handlerMove(callback);
  }

  handlerMouseup(callback: (coords: Coords) => void) {
    this.area.handlerMouseup(callback);
  }

  handlerRotate(callback: (position: number) => void) {
    this.area.handlerRotate(callback);
  }

  handlerRotateFocus(callback: (position: number) => void) {
    this.area.handlerRotateFocus(callback);
  }

  handlerSelectFromPieces(callback: (id: number, offset: Coords) => void) {
    this.area.handlerSelectFromPieces(callback);
  }

  handlerSelectFromPuzzle(callback: (id: number, offset: Coords) => void) {
    this.area.handlerSelectFromPuzzle(callback);
  }
}
