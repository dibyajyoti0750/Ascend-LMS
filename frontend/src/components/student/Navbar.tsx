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
      <div className="w-full bg-purple-800 text-white text-center py-2 px-4">
        <div className="flex justify-center items-center gap-3">
          <img src={assets.warning} alt="warning" className="w-8 h-8" />
          <DailyCountdown />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-5 bg-purple-50 shadow">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="w-8 md:w-10" />
          <p className="text-purple-600 text-lg md:text-2xl font-bold">
            Ascend
          </p>
        </Link>

        <div className="hidden md:flex items-center gap-5 text-gray-500">
          <div className="flex items-center gap-2">
            {isEducator && (
              <button
                onClick={() => navigate("/educator")}
                className="rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-gray-200/60 hover:text-purple-500 active:scale-95 cursor-pointer"
              >
                Educator Dashboard
              </button>
            )}

            {user && (
              <Link
                to="/my-enrollments"
                className="rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-gray-200/60 hover:text-purple-500 active:scale-95"
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
        <div className="md:hidden flex items-center gap-3 sm:gap-5 text-gray-500 text-sm">
          <div className="flex items-center">
            {isEducator && (
              <button
                onClick={() => navigate("/educator")}
                className="rounded p-2 active:bg-purple-100"
              >
                Educator Dashboard
              </button>
            )}

            {user && (
              <Link
                to="/my-enrollments"
                className="rounded p-2 active:bg-purple-100"
              >
                My Enrollments
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
