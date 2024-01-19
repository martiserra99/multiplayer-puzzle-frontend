import { Socket } from "socket.io-client";

import View from "../view";

import { JsonRoom } from "../types";

export default function puzzle(socket: Socket, roomId: string): () => void {
  const view = new View();

  socket.emit("room:get", { roomId });

  view.handlerMove((coords) => {
    socket.emit("room:move", { roomId, coords });
  });

  view.handlerMouseup((coords) => {
    socket.emit("room:mouseup", { roomId, coords });
  });

  view.handlerRotate((position) => {
    socket.emit("room:rotate", { roomId, position });
  });

  view.handlerRotateFocus((position) => {
    socket.emit("room:rotate-focus", { roomId, position });
  });

  view.handlerSelectFromPieces((id, offset) => {
    socket.emit("room:select-from-pieces", { roomId, id, offset });
  });

  socket.on("room:get", (room: JsonRoom) => {
    view.update(room);
  });

  return () => view.end();
}
