import canvasUI, { View, Size } from "canvas-user-interface";

const pointer = canvasUI.view.newType("pointer");

// -------------------------------------------------
// Properties
// -------------------------------------------------
pointer.set("background", "#000");
pointer.set("border", "#000");

pointer.lifecycle.set("getSize", function (_: View, maxSize: Size) {
  let radius = 12;
  if (radius > maxSize.width / 2) radius = maxSize.width / 2;
  if (radius > maxSize.height / 2) radius = maxSize.height / 2;
  return { width: radius * 2, height: radius * 2 };
});

pointer.lifecycle.set(
  "drawItself",
  function (pointer: View, ctx: CanvasRenderingContext2D) {
    const background = pointer.get("background");
    drawRoundedPolygon({
      ctx,
      x: pointer.coords.x + 3,
      y: pointer.coords.y + 6,
      radius: 12,
      rotation: 90,
      cornerPercent: 80,
      numberOfCorners: 3,
      fillStyle: background,
    });
  },
);

function drawRoundedPolygon({
  ctx,
  x,
  y,
  radius,
  rotation,
  cornerPercent,
  numberOfCorners,
  fillStyle,
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  rotation: number;
  cornerPercent: number;
  numberOfCorners: number;
  fillStyle: string;
}) {
  function getPolygonCorner(index: number, numberOfCorners: number): number[] {
    const angle = ((index + 0.5) * 2 * Math.PI) / numberOfCorners;
    return [Math.sin(angle), Math.cos(angle)];
  }

  function lerp(p1: number[], p2: number[], t: number): number[] {
    return [p1[0] * (1 - t) + p2[0] * t, p1[1] * (1 - t) + p2[1] * t];
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(radius, radius);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.beginPath();

  const corners = [];

  for (let i = 0; i < numberOfCorners; i++)
    corners.push(getPolygonCorner(i, numberOfCorners));

  for (let i = 0; i < numberOfCorners; i++) {
    const prevCorner = corners[(i + 0) % numberOfCorners];
    const thisCorner = corners[(i + 1) % numberOfCorners];
    const nextCorner = corners[(i + 2) % numberOfCorners];

    const q1 = lerp(thisCorner, prevCorner, cornerPercent / 200);
    const q2 = lerp(thisCorner, nextCorner, cornerPercent / 200);

    ctx.lineTo(q1[0], q1[1]);
    ctx.quadraticCurveTo(thisCorner[0], thisCorner[1], q2[0], q2[1]);
  }

  ctx.closePath();

  ctx.fillStyle = fillStyle;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "black";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fill();
  ctx.restore();
}
