import { useEffect, useState } from "react";
import type { Course } from "../../features/courses/course.types";
import Loading from "../../components/student/Loading";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function MyCourses() {
  const { isEducator } = useSelector((state: RootState) => state.educator);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchEducatorCourses = async () => {
      try {
        const token = await getToken();
        if (!token) {
          toast.error("Unauthorized");
          return;
        }

        const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourses(data.courses);
      } catch (error: unknown) {
        let msg = "Something went wrong";

        if (axios.isAxiosError(error)) {
          msg = error.response?.data?.message || error.message || msg;
        } else if (error instanceof Error) {
          msg = error.message;
        }

        toast.error(msg);
      }
    };

    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator, backendUrl, getToken]);

  const handleDelete = async (courseId: string) => {
    setShowDeleteModal(false);

    const previousCourses = courses;

    setCourses((prev) => {
      if (!prev) return prev;
      return prev.filter((course) => course._id !== courseId);
    });

    try {
      const token = await getToken();
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      const { data } = await axios.delete(
        `${backendUrl}/api/educator/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);
    } catch (error: unknown) {
      setCourses(previousCourses); // rollback

      let msg = "Something went wrong";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.message || error.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      toast.error(msg);
    }
  };

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
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
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

                  <td className="px-4 py-3">
                    <Trash2
                      onClick={() => setShowDeleteModal(true)}
                      size={20}
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                    />

                    {showDeleteModal && (
                      <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 backdrop-blur-xs">
                        <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                          {/* Header */}
                          <div className="px-6 pt-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                              Delete "{course.courseTitle}" ?
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                              Are you sure you want to delete this course?
                            </p>
                          </div>

                          {/* Warning */}
                          <div className="px-6 mt-4">
                            <div className="flex items-start gap-1 rounded-lg bg-red-50 p-3">
                              <span className="text-red-500 text-sm">⚠️</span>
                              <p className="text-sm text-red-600">
                                This action is permanent and cannot be undone!
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end gap-3 px-6 py-5">
                            <button
                              onClick={() => setShowDeleteModal(false)}
                              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() => handleDelete(course._id)}
                              className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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
