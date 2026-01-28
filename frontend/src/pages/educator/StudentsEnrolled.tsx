import { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import type { StudentEnrolled } from "../../features/educator/data.types";

export default function StudentsEnrolled() {
  const [enrolledStudents, setEnrolledStudents] = useState<
    StudentEnrolled[] | null
  >(null);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      setEnrolledStudents(dummyStudentEnrolled);
    };

    fetchEnrolledStudents();
  }, []);

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
