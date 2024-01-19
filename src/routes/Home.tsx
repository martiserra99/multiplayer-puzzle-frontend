import { Navigate } from "react-router-dom";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export default function Home() {
  return <Navigate to={`/multiplayer-puzzle/${nanoid()}`} replace />;
}
