import { useEffect, useState } from "react";
import type { Course } from "../../features/courses/course.types";
import Loading from "../../components/student/Loading";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function MyCourses() {
  const { isEducator } = useSelector((state: RootState) => state.educator);
  const currency = import.meta.env.VITE_CURRENCY;
  const [courses, setCourses] = useState<Course[] | null>(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchEducatorCourses = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setCourses(data.courses);
        }
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(msg);
      }
    };

    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator, backendUrl, getToken]);

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-200">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-700 border-b border-gray-200 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">
                  All Courses
                </th>
                <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Published On
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-600">
              {courses.map((course, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="thumbnail"
                      className="w-24"
                    />
                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {currency}{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100),
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {course.enrolledStudents.length}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
