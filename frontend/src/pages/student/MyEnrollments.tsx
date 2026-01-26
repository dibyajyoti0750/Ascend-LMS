import { Line } from "rc-progress";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useState } from "react";
import { calculateCourseDuration } from "../../utils/calculate";
import Footer from "../../components/student/Footer";
import { useNavigate } from "react-router-dom";

export default function MyEnrollments() {
  const { enrolledCourses } = useSelector((state: RootState) => state.courses);
  const navigate = useNavigate();

  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
  ]);

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="table-fixed md:table-auto w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {enrolledCourses.map((course, i) => (
              <tr key={i} className="border border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt="thumbnail"
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <div className="flex mb-2 gap-2 text-xs md:text-base">
                      <p>{course.courseTitle}</p>
                      <p>
                        (
                        {progressArray[i]
                          ? (
                              (progressArray[i].lectureCompleted * 100) /
                              progressArray[i].totalLectures
                            ).toFixed()
                          : 0}
                        % complete)
                      </p>
                    </div>
                    <Line
                      strokeWidth={1}
                      strokeColor={"#ad46ff"}
                      percent={
                        progressArray[i]
                          ? (progressArray[i].lectureCompleted * 100) /
                            progressArray[i].totalLectures
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>

                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>

                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[i] &&
                    `${progressArray[i].lectureCompleted} / ${progressArray[i].totalLectures}`}{" "}
                  <span>Lectures</span>
                </td>

                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    onClick={() => navigate("/player/" + course._id)}
                    className="px-3 sm:px-6 py-1.5 sm:py-2.5 bg-purple-700 max-sm:text-xs text-white font-medium cursor-pointer"
                  >
                    {progressArray[i] &&
                    progressArray[i].lectureCompleted /
                      progressArray[i].totalLectures ===
                      1
                      ? "Completed"
                      : "Continue"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}
