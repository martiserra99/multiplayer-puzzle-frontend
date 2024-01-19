import canvasUI, { Composite, Coords, Layout } from "canvas-user-interface";

import { JsonPiece, Position } from "../types";

import { colors } from "../styles";

const puzzle = canvasUI.composite.newType("puzzle");

// -------------------------------------------------
// Properties
// -------------------------------------------------
puzzle.set("dimensions", { x: 10, y: 10 });
puzzle.set("pieces", []);
puzzle.set("square", {
  size: 20,
  border: { size: 0 },
  corner: { type: "round", size: 0 },
});
puzzle.set("gap", 0);
puzzle.set("background", "#000");
puzzle.set("border", { color: "#000", size: 0 });
puzzle.set("corner", { type: "round", size: 0 });

// -------------------------------------------------
// Lifecycle
// -------------------------------------------------
puzzle.inner.fun("getSize", function (puzzle: Composite) {
  const dimensions = puzzle.get("dimensions");
  const square = puzzle.get("square");
  const gap = puzzle.get("gap");
  const border = puzzle.get("border");

  const width =
    dimensions.x * square.size + gap * (dimensions.x - 1) + border.size * 2;

  const height =
    dimensions.y * square.size + gap * (dimensions.y - 1) + border.size * 2;

  return { width, height };
});

puzzle.lifecycle.set("getElement", function () {
  return canvasUI.layout.new("grid", "grid");
});

puzzle.lifecycle.set(
  "updateElement",
  function (puzzle: Composite, grid: Layout) {
    grid.removeAll();

    const size = puzzle.inner.call("getSize");

    grid.set("size", {
      width: { unit: "px", value: size.width },
      height: { unit: "px", value: size.height },
    });

    const dimensions = puzzle.get("dimensions");

    grid.set("dimensions", {
      columns: [{ count: dimensions.x, unit: "fr", value: 1 }],
      rows: [{ count: dimensions.y, unit: "fr", value: 1 }],
    });

    const gap = puzzle.get("gap");

    grid.set("gap", {
      size: { horizontal: gap, vertical: gap },
      color: "transparent",
    });

    grid.set("background", puzzle.get("background"));
    grid.set("border", puzzle.get("border"));
    grid.set("corner", puzzle.get("corner"));

    for (const { piece, position } of puzzle.get("pieces")) {
      const element = puzzle.inner.call("createPiece", piece);
      puzzle.inner.call("insertPiece", grid, element, position);
    }
  },
);

puzzle.inner.fun("createPiece", function (puzzle: Composite, piece: JsonPiece) {
  const element = canvasUI.composite.new(`piece-${piece.id}`, "piece");
  const square = puzzle.get("square");
  const gap = puzzle.get("gap");
  element.set("positions", piece.positions);
  element.set("square", {
    size: square.size,
    background: colors[piece.style][0],
    border: { size: square.border.size, color: colors[piece.style][1] },
    corner: { type: square.corner.type, size: square.corner.size },
  });
  element.set("gap", gap);

  element.listeners.add(
    "square-mousedown",
    (element: Composite, coords: Coords) => {
      puzzle.signal({
        type: "piece-mousedown",
        data: { piece, coords: element.coords, mouse: coords },
      });
    },
  );

  return element;
});

puzzle.inner.fun(
  "insertPiece",
  function (_: Composite, grid: Layout, piece: Composite, position: Position) {
    const { x, y } = position;
    const columns = piece.call("numColumns");
    const rows = piece.call("numRows");
    grid.insert(piece);
    piece.layoutParams.set("position", { column: x, row: y });
    piece.layoutParams.set("span", { columns, rows });
  },
);

// -------------------------------------------------
// Events
// -------------------------------------------------
puzzle.events.set("piece-mousedown", function (_, signal) {
  if (signal.type !== "piece-mousedown") return { event: false };
  return { event: true, data: signal.data };
});
