import { useEffect, useState } from "react";
import Loading from "../../components/student/Loading";
import type { StudentEnrolled } from "../../features/educator/data.types";
import axios from "axios";
import toast from "react-hot-toast";
import type { RootState } from "../../app/store";
import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

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

        if (!data.success) {
          toast.error(data.message);
        }

        setEnrolledStudents(data.enrolledStudents.reverse());
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(msg);
      }
    };

    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [backendUrl, getToken, isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between p-4 pt-8 md:p-8">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-200">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-gray-700 border-b border-gray-200 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                #
              </th>
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Course Title</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  {index + 1}
                </td>

                <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt="profile"
                    className="w-10 rounded-full"
                  />
                  <span className="truncate">{item.student.name}</span>
                </td>

                <td className="px-4 py-3 truncate">{item.courseTitle}</td>

                <td className="px-4 py-3 hidden sm:table-cell">
                  {new Date(item.purchaseDate).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
