import { useLayoutEffect } from "react";
import { Socket } from "socket.io-client";

import CopyLink from "./CopyLink";

import puzzle from "../puzzle/puzzle";

interface PuzzleProps {
  socket: Socket;
  roomId: string;
}

export default function Puzzle({ socket, roomId }: PuzzleProps) {
  useLayoutEffect(() => puzzle(socket, roomId), [socket, roomId]);
  return (
    <div className="h-screen">
      <div className="grid h-[56px] grid-cols-3 items-center gap-2 border-b border-b-white/10 px-2 py-2">
        <div className="col-start-3 col-end-4 justify-self-end">
          <CopyLink />
        </div>
      </div>
      <canvas id="ui" className="h-[calc(100vh-56px)] w-full" />
    </div>
  );
}
