import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { isEducator } = useSelector((state: RootState) => state.educator);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home },
    { name: "Add Course", path: "/educator/add-course", icon: assets.addIcon },
    { name: "My Courses", path: "/educator/my-courses", icon: assets.bookmark },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: assets.student,
    },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen border-gray-200 py-2 flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? "bg-purple-50 border-r-[6px] border-purple-600" : "hover:bg-purple-50"}`
            }
          >
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            <p className="md:block hidden">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
}
