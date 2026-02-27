import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import DailyCountdown from "./DailyCountdown";

export default function Navbar() {
  const { isEducator } = useSelector((state: RootState) => state.educator);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  /* const { getToken } = useAuth();
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  Use this function to make the website a multi-educator platform:-
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

      dispatch(setIsEducator(true));
      toast.success(data.message);
    } catch (error: unknown) {
      let msg = "Something went wrong";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.message || error.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      toast.error(msg);
    }
  }; */

  return (
    <>
      <div className="w-full bg-[#6F00FF] text-white text-center px-2 py-2 md:p-3">
        <div className="flex justify-center items-center gap-0 md:gap-3">
          <img src={assets.warning} alt="warning" className="w-8 h-8" />
          <DailyCountdown />
        </div>
      </div>

      <div className="flex items-center justify-between px-2 md:px-14 py-3 md:py-4 bg-[#131628] text-white shadow">
        <Link to="/" className="flex items-center gap-3 outline-none">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-6 md:w-10 rounded-lg"
          />
          <p className="text-xs md:text-xl font-bold">
            ASCEND<span className="font-light">.COM</span>
          </p>
        </Link>

        <div className="hidden md:flex items-center gap-5 font-medium">
          <div className="flex items-center gap-2">
            {isEducator && (
              <button
                onClick={() => navigate("/educator")}
                className="rounded-md px-3 py-2 text-sm transition-all duration-200 ease-in-out hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
              >
                Educator Dashboard
              </button>
            )}

            {user && (
              <Link
                to="/my-enrollments"
                className="rounded-md px-3 py-2 text-sm transition-all duration-200 ease-in-out hover:bg-white/10 hover:text-white active:scale-95"
              >
                My Enrollments
              </Link>
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
        <div className="md:hidden flex items-center gap-3 text-white text-xs">
          <div className="flex items-center gap-1.5">
            {isEducator && (
              <button
                onClick={() => navigate("/educator")}
                className="rounded p-2 active:bg-white/10"
              >
                Dashboard
              </button>
            )}

            {user && (
              <Link
                to="/my-enrollments"
                className="rounded p-2 active:bg-white/10"
              >
                Enrollments
              </Link>
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
    </>
  );
}
