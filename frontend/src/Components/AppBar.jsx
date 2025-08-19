import { useNavigate } from "react-router-dom";
import Logo from "./logo";

export default function AppBar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <div className="flex justify between items-center gap-10">
        <h1 className="text-black text-base text-center font-semibold">
          Hello user!
        </h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
          onClick={() => {
            navigate("/Logout");
          }}
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  );
}
