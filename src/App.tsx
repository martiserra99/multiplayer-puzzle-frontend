import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Room from "./routes/Room";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/multiplayer-puzzle" element={<Home />} />;
        <Route path="/multiplayer-puzzle/:roomId" element={<Room />} />;
      </Routes>
    </BrowserRouter>
  );
}
