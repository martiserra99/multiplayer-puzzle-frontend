import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import Puzzle from "../components/Puzzle";
import Loader from "../components/Loader";

export default function Room() {
  const [socket, setSocket] = useState<Socket | null>();
  const [loader, setLoader] = useState(true);

  const params = useParams();
  const roomId = params.roomId!;

  useEffect(() => {
    const id = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL!);
    socket.emit("room:join", { roomId }, () => {
      setSocket(socket);
    });
    return () => void socket.disconnect();
  }, [roomId]);

  if (!socket || loader) {
    return <Loader />;
  }

  return <Puzzle socket={socket} roomId={roomId} />;
}
