import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export default function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();
  const { isEducator } = useSelector((state: RootState) => state.educator);

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 bg-purple-50 shadow">
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" className="w-8 md:w-10" />
        <p className="text-sky-500 text-lg md:text-xl font-bold">Ascend</p>
      </Link>

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-2">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator")}
                className="rounded p-2 hover:bg-purple-100 cursor-pointer"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>

              <Link
                to="/my-enrollments"
                className="rounded p-2 hover:bg-purple-100"
              >
                My Enrollments
              </Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-purple-800 text-white font-semibold px-5 py-2 rounded cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Screens */}
      <div className="md:hidden flex items-center gap-3 sm:gap-5 text-gray-500 text-sm">
        <div className="flex items-center">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator")}
                className="rounded p-2 active:bg-purple-100"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>

              <Link
                to="/my-enrollments"
                className="rounded p-2 active:bg-purple-100"
              >
                My Enrollments
              </Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.userIcon} alt="User" className="w-7" />
          </button>
        )}
      </div>
    </div>
  );
}
