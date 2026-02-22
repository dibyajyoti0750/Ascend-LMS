import { useEffect, useState } from "react";
import Loading from "../../components/student/Loading";
import type { StudentEnrolled } from "../../features/educator/data.types";
import axios from "axios";
import toast from "react-hot-toast";
import type { RootState } from "../../app/store";
import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assets";

export default function StudentsEnrolled() {
  const { isEducator } = useSelector((state: RootState) => state.educator);
  const [enrolledStudents, setEnrolledStudents] = useState<
    StudentEnrolled[] | null
  >(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(
          `${backendUrl}/api/educator/enrolled-students`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setEnrolledStudents(data.enrolledStudents.reverse());
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
      fetchEnrolledStudents();
    }
  }, [backendUrl, getToken, isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-center p-4 pt-8 md:p-8 bg-gray-50">
      {/* Page Header */}
      <div className="mb-6 w-full max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-800">
          Enrolled Students
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and contact students enrolled in your courses.
        </p>
      </div>

      <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          {/* Table Header */}
          <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
            <tr className="text-gray-500 uppercase text-[11px] tracking-wider">
              <th className="p-4 text-center hidden sm:table-cell">#</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 hidden sm:table-cell text-left">
                Purchase Date
              </th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-sm text-gray-700">
            {!enrolledStudents.length ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img
                      src={assets.education}
                      alt="education"
                      className="w-40 opacity-20"
                    />

                    <p className="text-gray-500 text-sm">
                      No students have enrolled in your courses yet.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              enrolledStudents.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-4 text-center hidden sm:table-cell">
                    {index + 1}
                  </td>

                  {/* Student */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-200"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium truncate">
                          {item.student.name}
                        </span>
                        <span className="text-gray-500 text-xs truncate">
                          {item.student.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="p-4 truncate">{item.courseTitle}</td>

                  {/* Date */}
                  <td className="p-4 hidden sm:table-cell">
                    {new Date(item.purchaseDate).toLocaleDateString("en-IN")}
                  </td>

                  {/* Action */}
                  <td className="p-4 text-center">
                    <a
                      href={`mailto:${item.student.email}`}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Contact
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
