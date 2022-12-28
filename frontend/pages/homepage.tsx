import { FiKey } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen border">
      <p className="font-bold">TODOAPP</p>
      <button className="mt-5 bg-red-500 text-white py-2 px-5 rounded text-sm flex items-center gap-2 hover:bg-red-600">
        <FiKey />
        <Link to="/auth">Login or Signup to continue</Link>
      </button>
    </div>
  );
}
