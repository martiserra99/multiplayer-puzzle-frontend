import canvasUI, { Layout, Composite, Coords } from "canvas-user-interface";

import { JsonPiece, JsonPieces, JsonUsers } from "../types";

import config from "../config";
import styles, { effect, colors } from "../styles";

export default class Pieces {
  public element: Layout;

  private onSelect: ((id: number, offset: Coords) => void) | null = null;

  constructor() {
    const pieces = canvasUI.layout.new("pieces", "grid");
    pieces.set("size", { width: "auto", height: "auto" });
    pieces.set("dimensions", {
      columns: [
        {
          count: 4,
          unit: "px",
          value:
            config.dimensions.x * styles.square.size +
            styles.surface.border.size * 2 +
            styles.square.margin * (config.dimensions.x - 1),
        },
      ],
      rows: [
        {
          count: 2,
          unit: "px",
          value:
            config.dimensions.y * styles.square.size +
            styles.surface.border.size * 2 +
            styles.square.margin * (config.dimensions.y - 1) +
            styles.rotate.height +
            styles.rotate.margin,
        },
      ],
    });
    pieces.set("gap", {
      size: {
        horizontal: styles.pieces.gap,
        vertical: styles.pieces.gap,
      },
      color: "transparent",
    });

    for (let i = 0; i < config.pieces; i++) {
      const container = this.createPieceContainer(i);
      const column = i % 4;
      const row = Math.floor(i / 4);
      this.insertPieceContainer(pieces, container, { column, row });
    }

    this.element = pieces;
  }

  private createPieceContainer(position: number) {
    const layout = canvasUI.layout.new(`piece-container-${position}`, "linear");
    layout.set("size", { width: "auto", height: "auto" });
    layout.set("direction", "vertical");
    layout.set("gap", styles.rotate.margin);
    const area = this.createPieceArea(position);
    this.insertPieceArea(layout, area);
    const button = this.createRotateButton(position);
    this.insertRotateButton(layout, button);
    return layout;
  }

  private createPieceArea(position: number): Layout {
    const view = canvasUI.layout.new(`piece-area-${position}`, "frame");
    view.set("size", {
      width: { unit: "%", value: 100 },
      height: {
        unit: "px",
        value:
          config.dimensions.y * styles.square.size +
          styles.surface.border.size * 2 +
          styles.square.margin * (config.dimensions.y - 1),
      },
    });
    view.set("background", styles.surface.background);
    view.set("border", styles.surface.border);
    view.set("corner", styles.surface.corner);
    return view;
  }

  private insertPieceArea(layout: Layout, area: Layout) {
    layout.insert(area);
    area.layoutParams.set("position", { column: 0, row: 0 });
  }

  private insertPieceContainer(
    pieces: Layout,
    container: Layout,
    position: { column: number; row: number }
  ) {
    pieces.insert(container);
    container.layoutParams.set("position", position);
  }

  private createRotateButton(position: number) {
    const composite = canvasUI.composite.new(
      `rotate-button-${position}`,
      "imageArea"
    );

    composite.set("size", {
      width: { unit: "%", value: 100 },
      height: { unit: "px", value: styles.rotate.height },
    });
    composite.set("imageSrc", "rotate.svg");
    composite.set("imageSize", { width: 16, height: 16 });
    composite.set("background", styles.surface.background);
    composite.set("border", styles.surface.border);
    composite.set("corner", styles.surface.corner);

    return composite;
  }

  private insertRotateButton(layout: Layout, button: Composite) {
    layout.insert(button);
  }

  update(pieces: JsonPieces, users: JsonUsers) {
    this.updateRotate(users);
    this.removePieces();
    this.insertPieces(pieces);
  }

  private updateRotate(users: JsonUsers) {
    for (let i = 0; i < config.pieces; i++) {
      const button = this.element.find(`rotate-button-${i}`) as Composite;
      const exists = users.some((user) => user.rotate === i);
      if (exists) {
        button.set("background", effect.surface.focus.background);
      } else {
        button.set("background", styles.surface.background);
      }
    }
  }

  private removePieces() {
    for (let i = 0; i < config.pieces; i++) {
      const area = this.element.find(`piece-area-${i}`) as Layout;
      area.removeAll();
    }
  }

  private insertPieces(pieces: JsonPieces) {
    for (const piece of pieces) {
      const area = this.element.find(`piece-area-${piece.id}`) as Layout;
      const elem = this.createPiece(piece);
      this.insertPiece(area, elem);
      this.createPieceListeners(elem, piece.id);
    }
  }

  private createPiece(piece: JsonPiece) {
    const elem = canvasUI.composite.new(`piece-${piece.id}`, "piece");
    elem.set("positions", piece.positions);
    elem.set("square", {
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
    elem.set("gap", styles.square.margin);
    return elem;
  }

  private insertPiece(area: Layout, piece: Composite) {
    area.insert(piece);
    piece.layoutParams.set("align", {
      horizontal: "middle",
      vertical: "middle",
    });
  }

  private createPieceListeners(piece: Composite, id: number) {
    piece.listeners.add(
      "square-mousedown",
      (piece: Composite, coords: Coords) => {
        const offset = {
          x: coords.x - piece.coords.x,
          y: coords.y - piece.coords.y,
        };
        this.onSelect!(id, offset);
      }
    );
  }

  handlerRotate(callback: (position: number) => void) {
    for (let i = 0; i < config.pieces; i++) {
      const button = this.element.find(`rotate-button-${i}`) as Composite;
      button.listeners.add("mouseup", () => {
        callback(i);
      });
    }
  }

  handlerRotateFocus(callback: (position: number) => void) {
    for (let i = 0; i < config.pieces; i++) {
      const button = this.element.find(`rotate-button-${i}`) as Composite;
      button.listeners.add("mousedown", () => {
        callback(i);
      });
    }
  }

  handlerSelect(callback: (id: number, offset: Coords) => void) {
    this.onSelect = callback;
  }
}
