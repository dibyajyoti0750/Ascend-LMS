import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import DailyCountdown from "./DailyCountdown";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

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
        <div className="flex items-center justify-between gap-6 px-4 md:px-8 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-6 md:w-10 rounded-lg"
            />
            <p className="text-sm md:text-xl font-bold">
              ASCEND<span className="font-light">.COM</span>
            </p>
          </Link>

          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

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
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
        />
        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-[#131628] z-50 transform transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex flex-col gap-4 text-sm">
            <SearchBar />

            <Link
              to={`/course/${latestCourse?._id}`}
              onClick={() => setIsOpen(false)}
              className="relative rounded-md py-2 mt-2 text-center font-bold bg-[#6F00FF]"
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
                className="text-center py-1.5 hover:bg-white/10 rounded"
              >
                Educator Dashboard
              </button>
            )}

            {user && (
              <Link
                to="/my-enrollments"
                onClick={() => setIsOpen(false)}
                className="text-center py-1.5 hover:bg-white/10 rounded"
              >
                My Enrollments
              </Link>
            )}

            {user ? (
              <div className="flex items-center justify-center gap-2 py-1.5">
                <UserButton />
                <p className="truncate">{user.firstName}</p>
              </div>
            ) : (
              <button
                onClick={() => {
                  openSignIn();
                  setIsOpen(false);
                }}
                className="rounded-md py-2 font-bold bg-[#6F00FF]"
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
