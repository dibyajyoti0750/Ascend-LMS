import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import axios from "axios";
import { setIsEducator } from "../../features/educator/educatorSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const { isEducator } = useSelector((state: RootState) => state.educator);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = await getToken();
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!data.success) {
        toast.error(data.message);
      }

      dispatch(setIsEducator(true));
      toast.success(data.message);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 bg-purple-50 shadow">
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" className="w-8 md:w-9" />
        <p className="text-sky-500 text-lg md:text-xl font-bold">Ascend</p>
      </Link>

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-2">
          {user && (
            <>
              <button
                onClick={becomeEducator}
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
                onClick={becomeEducator}
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
