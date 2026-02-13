import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export default function Navbar() {
  const { isEducator } = useSelector((state: RootState) => state.educator);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  // const { getToken } = useAuth();
  // const dispatch = useDispatch();
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Use this function to make the website a multi-educator platform:-
  // const becomeEducator = async () => {
  //   try {
  //     if (isEducator) {
  //       navigate("/educator");
  //       return;
  //     }

  //     const token = await getToken();
  //     if (!token) {
  //       toast.error("Unauthorized");
  //       return;
  //     }

  //     const { data } = await axios.get(
  //       backendUrl + "/api/educator/update-role",
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );

  //     if (!data.success) {
  //       toast.error(data.message);
  //     }

  //     dispatch(setIsEducator(true));
  //     toast.success(data.message);
  //   } catch (error) {
  //     const msg =
  //       error instanceof Error ? error.message : "Something went wrong";
  //     toast.error(msg);
  //   }
  // };

  return (
    <>
      <div className="w-full bg-purple-800 text-white text-center py-2 px-4">
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm md:text-base font-medium">
          <img src={assets.warning} alt="warning" className="w-4 sm:w-8" />

          <p>
            Price increases in less than 24 hours. Join now before it's too
            late.
            <span className="line-through mx-2 opacity-70">$47</span>
            <span className="font-bold text-yellow-300">$12/once</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-5 bg-purple-50 shadow">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="w-8 md:w-9" />
          <p className="text-sky-500 text-lg md:text-xl font-bold">Ascend</p>
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
