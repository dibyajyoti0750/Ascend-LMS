import { useEffect, useState } from "react";
import type { Course } from "../../features/courses/course.types";
import Loading from "../../components/student/Loading";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";
import { assets } from "../../assets/assets";
import DeleteCourseModal from "../../components/educator/DeleteCourseModal";
import type { EditCourse } from "../../features/educator/data.types";
import EditCourseModal from "../../components/educator/EditCourseModal";

export default function MyCourses() {
  const { isEducator } = useSelector((state: RootState) => state.educator);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<null | {
    id: string;
    title: string;
  }>(null);
  const [editingCourse, setEditingCourse] = useState<null | EditCourse>(null);

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

  // Sync with updated course data
  const handleCourseUpdate = (updatedCourse: Course) => {
    setCourses(
      (prev) =>
        prev?.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course,
        ) || null,
    );
  };

  // Delete course
  const handleDelete = async (courseId: string) => {
    setDeletingCourse(null);

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
    <div className="min-h-screen flex flex-col items-center p-4 pt-8 md:p-8 bg-gray-50">
      {/* Page Header */}
      <div className="mb-6 w-full max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-800">My Courses</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track revenue, monitor enrollments, and manage your course listings.
        </p>
      </div>

      <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          {/* Table Header */}
          <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
            <tr className="text-gray-500 uppercase text-[11px] tracking-wider">
              <th className="p-4 text-left">All Courses</th>
              <th className="p-4 text-left">Revenue</th>
              <th className="p-4 text-left">Students</th>
              <th className="p-4 text-left">Published On</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {!courses.length ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img
                      src={assets.education}
                      alt="education"
                      className="w-40 opacity-20"
                    />

                    <p className="text-gray-500 text-sm">
                      You haven't published any courses yet.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-4 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail.url}
                      alt="thumbnail"
                      className="w-28"
                    />
                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>

                  <td className="p-4">
                    {currency}{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100),
                    )}
                  </td>

                  <td className="p-4">{course.enrolledStudents.length}</td>

                  <td className="p-4">
                    {new Date(course.createdAt).toLocaleDateString("en-IN")}
                  </td>

                  <td className="p-4">
                    <div className="flex items-start gap-6">
                      <Edit
                        onClick={() =>
                          setEditingCourse({
                            _id: course._id,
                            courseTitle: course.courseTitle,
                            courseDescription: course.courseDescription,
                            coursePrice: course.coursePrice,
                            courseThumbnail: course.courseThumbnail,
                            discount: course.discount,
                            isPublished: course.isPublished,
                          })
                        }
                        size={20}
                        className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors duration-200"
                      />

                      <Trash2
                        onClick={() =>
                          setDeletingCourse({
                            id: course._id,
                            title: course.courseTitle,
                          })
                        }
                        size={20}
                        className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deletingCourse && (
        <DeleteCourseModal
          courseTitle={deletingCourse.title}
          onCancel={() => setDeletingCourse(null)}
          onConfirm={() => handleDelete(deletingCourse.id)}
        />
      )}

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onCourseUpdated={handleCourseUpdate}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}
