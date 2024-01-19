import canvasUI, { Composite, Layout, View } from "canvas-user-interface";

type Coords = { x: number; y: number };

const piece = canvasUI.composite.newType("piece");

// -------------------------------------------------
// Properties
// -------------------------------------------------
piece.set("positions", [{ x: 0, y: 0 }]);
piece.set("square", {
  size: 20,
  background: "#000",
  border: { color: "#000", size: 0 },
  corner: { type: "round", size: 0 },
});
piece.set("gap", 0);

// -------------------------------------------------
// Lifecycle
// -------------------------------------------------
piece.inner.fun("size", function (piece: Composite) {
  const square = piece.get("square");
  const gap = piece.get("gap");

  const numColumns = piece.call("numColumns");
  const numRows = piece.call("numRows");

  const width = square.size * numColumns + gap * (numColumns - 1);
  const height = square.size * numRows + gap * (numRows - 1);

  return { width, height };
});

piece.lifecycle.set("getElement", function () {
  return canvasUI.layout.new("grid", "grid");
});

piece.lifecycle.set("updateElement", function (piece: Composite, grid: Layout) {
  for (const child of [...grid.children]) grid.remove(child);

  const size = piece.inner.call("size");
  grid.set("size", {
    width: { unit: "px", value: size.width },
    height: { unit: "px", value: size.height },
  });

  const numColumns = piece.call("numColumns");
  const numRows = piece.call("numRows");
  grid.set("dimensions", {
    columns: [{ count: numColumns, unit: "fr", value: 1 }],
    rows: [{ count: numRows, unit: "fr", value: 1 }],
  });

  const gap = piece.get("gap");
  grid.get("gap").size = { horizontal: gap, vertical: gap };

  for (const { x, y } of piece.get("positions")) {
    const square = piece.inner.call("createSquare", { x, y });
    piece.inner.call("insertSquare", grid, square, { x, y });
  }
});

piece.inner.fun("createSquare", function (piece: Composite, { x, y }: Coords) {
  const square = canvasUI.view.new(`square-${x},${y}`, "area");

  square.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "%", value: 100 },
  });

  const { background, border, corner } = piece.get("square");

  square.set("background", background);
  square.set("border", border);
  square.set("corner", corner);

  square.listeners.add("mousedown", function (_: Composite, coords: Coords) {
    piece.signal({ type: "square-mousedown", data: coords });
  });

  return square;
});

piece.inner.fun(
  "insertSquare",
  function (_: Composite, grid: Layout, square: View, { x, y }: Coords) {
    grid.insert(square);
    square.layoutParams.set("position", { column: x, row: y });
  },
);

// -------------------------------------------------
// Functions
// -------------------------------------------------
piece.fun("numColumns", function (piece: Composite) {
  const positions = piece.get("positions");
  return (
    positions.reduce(
      (acc: number, pos: Coords) => (acc < pos.x ? pos.x : acc),
      0,
    ) + 1
  );
});

piece.fun("numRows", function (piece: Composite) {
  const positions = piece.get("positions");
  return (
    positions.reduce(
      (acc: number, pos: Coords) => (acc < pos.y ? pos.y : acc),
      0,
    ) + 1
  );
});

// -------------------------------------------------
// Events
// -------------------------------------------------
piece.events.set("square-mousedown", function (_, signal) {
  if (signal.type !== "square-mousedown") return { event: false };
  return { event: true, data: signal.data };
});
