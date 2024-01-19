import { Socket } from "socket.io-client";

import View from "../view/view";

import { JsonRoom } from "../types";

export default function puzzle(socket: Socket, roomId: string): () => void {
  const view = new View();

  socket.emit("room:get", { roomId });

  view.handlerMove((coords) => {
    socket.emit("room:move", { roomId, coords });
  });

  view.handlerMouseup(() => {
    socket.emit("room:mouseup", { roomId });
  });

  view.handlerRotate((position) => {
    socket.emit("room:rotate", { roomId, position });
  });

  view.handlerRotateMousedown((position) => {
    socket.emit("room:rotate-mousedown", { roomId, position });
  });

  view.handlerSelectFromPieces((id, coords, offset) => {
    socket.emit("room:select-from-pieces", { roomId, id, coords, offset });
  });

  socket.on("room:get", (room: JsonRoom) => {
    view.update(room);
  });

  return () => view.end();
}
