import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PuffLoader size={200} color="white" />
    </div>
  );
}
