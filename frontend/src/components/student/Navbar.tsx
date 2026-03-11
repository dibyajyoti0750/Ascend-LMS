import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import DailyCountdown from "./DailyCountdown";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { isEducator } = useSelector((state: RootState) => state.educator);
  const { allCourses } = useSelector((state: RootState) => state.courses);

  const [isOpen, setIsOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const latestCourse = allCourses.at(-1);

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

      <div className="relative bg-[#131628] text-white shadow">
        <div className="flex items-center justify-between px-4 md:px-14 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-6 md:w-10 rounded-lg"
            />
            <p className="text-xs md:text-xl font-bold">
              ASCEND<span className="font-light">.COM</span>
            </p>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 font-medium">
            <Link
              to={`/course/${latestCourse?._id}`}
              className="relative px-4 py-2 text-sm font-bold bg-[#6F00FF] rounded-md hover:bg-purple-800 transition-all active:scale-95"
            >
              Just Launched
              <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] px-2 py-0.5 rounded-full">
                NEW
              </span>
            </Link>

            {isEducator && (
              <button
                onClick={() => navigate("/educator")}
                className="rounded-md px-3 py-2 text-sm hover:bg-white/10 active:scale-95 cursor-pointer"
              >
                Educator Dashboard
              </button>
            )}

            {user && (
              <Link
                to="/my-enrollments"
                className="rounded-md px-3 py-2 text-sm hover:bg-white/10 active:scale-95"
              >
                My Enrollments
              </Link>
            )}

            {user ? (
              <UserButton />
            ) : (
              <button
                onClick={() => openSignIn()}
                className="px-4 py-2 text-sm font-bold bg-[#6F00FF] rounded-md hover:bg-purple-800 text-white transition-all active:scale-95 cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden py-2 outline-none"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 flex flex-col gap-3 text-xs bg-[#131628]">
            <Link
              to={`/course/${latestCourse?._id}`}
              onClick={() => setIsOpen(false)}
              className="relative rounded-md py-2 text-sm font-bold bg-[#6F00FF] text-center"
            >
              Just Launched
              <span className="absolute -top-2 right-3 bg-red-500 text-[10px] px-2 py-0.5 rounded-full">
                NEW
              </span>
            </Link>

            {isEducator && (
              <button
                onClick={() => {
                  navigate("/educator");
                  setIsOpen(false);
                }}
                className="text-left py-2 px-2 hover:bg-white/10 rounded transition"
              >
                Educator Dashboard
              </button>
            )}

            {user && (
              <Link
                to="/my-enrollments"
                onClick={() => setIsOpen(false)}
                className="py-2 px-2 hover:bg-white/10 rounded transition"
              >
                My Enrollments
              </Link>
            )}

            {user ? (
              <div className="pt-2">
                <UserButton />
              </div>
            ) : (
              <button
                onClick={() => {
                  openSignIn();
                  setIsOpen(false);
                }}
                className="rounded-md py-2 text-sm font-bold bg-[#6F00FF] text-white active:scale-95 cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
