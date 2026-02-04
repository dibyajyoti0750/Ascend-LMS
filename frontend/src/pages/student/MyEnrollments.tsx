import { Line } from "rc-progress";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import {
  calculateCourseDuration,
  calculateNoOfLectures,
} from "../../utils/calculate";
import Footer from "../../components/student/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

interface CourseProgress {
  totalLectures: number;
  lectureCompleted: number;
}

export default function MyEnrollments() {
  const { enrolledCourses } = useSelector((state: RootState) => state.user);
  const [progressArray, setProgressArray] = useState<CourseProgress[]>([]);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!enrolledCourses.length) return;

    const getCourseProgress = async () => {
      try {
        const token = await getToken();

        const { data } = await axios.get(
          `${backendUrl}/api/user/course-progress`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const progressMap = data.progressMap;

        const progressArray = enrolledCourses.map((course) => {
          const progress = progressMap[course._id]; // If course exists → you get the object, If not → undefined

          return {
            totalLectures: calculateNoOfLectures(course),
            lectureCompleted: progress ? progress.lectureCompleted.length : 0,
          };
        });

        setProgressArray(progressArray);
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(msg);
      }
    };

    getCourseProgress();
  }, [enrolledCourses, backendUrl, getToken]);

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
