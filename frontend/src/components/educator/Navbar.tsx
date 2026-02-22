import { UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-5 border border-gray-200">
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" className="w-8 md:w-9" />
        <p className="text-sky-500 text-lg md:text-xl font-bold">Ascend</p>
      </Link>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-gray-600">
          Hi, {user ? user.fullName : "Educator"}
        </span>

        {user ? (
          <UserButton />
        ) : (
          <button className="rounded-full p-1 hover:bg-slate-100 transition">
            <img src={assets.userIcon} alt="User profile" className="w-7 h-7" />
          </button>
        )}
      </div>
    </div>
  );
}
