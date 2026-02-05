import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../app/store";
import { ChevronDown, CircleCheck, CirclePlay } from "lucide-react";
import { calculateChapterTime } from "../../utils/calculate";
import humanizeDuration from "humanize-duration";
import Rating from "../../components/student/Rating";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import type { Course, Lecture } from "../../features/courses/course.types";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

interface PlayerData extends Lecture {
  chapter: number;
  lecture: number;
}

interface CourseProgress {
  courseId: string;
  completed: boolean;
  lectureCompleted: string[];
}

export default function Player() {
  const { courseId } = useParams();
  const { enrolledCourses } = useSelector((state: RootState) => state.user);
  const { userData } = useSelector((state: RootState) => state.user);

  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [progressData, setProgressData] = useState<CourseProgress | null>(null);
  const [initialRating, setInitialRating] = useState<number>(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  useEffect(() => {
    if (!enrolledCourses.length) return;

    const getCourseData = async () => {
      enrolledCourses.map((course) => {
        if (course._id === courseId) {
          setCourseData(course);

          course.courseRatings.map((item) => {
            if (item.userId === userData?._id) {
              setInitialRating(item.rating);
            }
          });
        }
      });
    };

    getCourseData();
  }, [courseId, enrolledCourses, userData]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get(
        `${backendUrl}/api/course-progress/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!data.success) {
        toast.error(data.message);
      }

      setProgressData(data.progressData);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    }
  };

  const markLectureAsComplete = async (lectureId: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-course-progress`,
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    }
  };

  const handleRate = async (rating: number) => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.post(
        `${backendUrl}/api/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        setInitialRating(rating); // keep UI in sync
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    }
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    getCourseProgress();
  }, [courseId]);

  return courseData ? (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-5 md:gap-10 md:px-36">
        {/* Left column */}
        <div className="text-gray-800">
          <h2 className="text-2xl font-semibold">{courseData.courseTitle}</h2>

          <div className="pt-5">
            {courseData.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white mb-2 rounded"
              >
                <div
                  onClick={() => toggleSection(index)}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                    />
                    <p className="font-semibold md:text-base text-sm">
                      {chapter.chapterTitle}
                    </p>
                  </div>

                  <p className="text-sm md:text-base">
                    {chapter.chapterContent.length} lectures •{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-center gap-2 py-1.5">
                        {progressData?.lectureCompleted.includes(
                          lecture.lectureId,
                        ) ? (
                          <CircleCheck className="text-blue-600" />
                        ) : (
                          <CirclePlay
                            onClick={() =>
                              setPlayerData({
                                ...lecture,
                                chapter: index + 1,
                                lecture: i + 1,
                              })
                            }
                            className="text-gray-600 cursor-pointer"
                          />
                        )}

                        <div className="flex items-center justify-between w-full text-sm md:text-base">
                          <p>{lecture.lectureTitle}</p>

                          <div className="flex gap-2">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: i + 1,
                                  })
                                }
                                className="text-blue-500 underline cursor-pointer"
                              >
                                Watch
                              </p>
                            )}
                            <p>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] },
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this course:</h1>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>

        {/* Right column */}
        <div className="md:mt-13">
          {playerData ? (
            <div>
              <YouTube
                opts={{ playerVars: { autoplay: 1 } }}
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">
                    Chapter {playerData.chapter} · Lecture {playerData.lecture}
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {playerData.lectureTitle}
                  </p>
                </div>

                <>
                  {(() => {
                    const isCompleted =
                      progressData?.lectureCompleted?.includes(
                        playerData.lectureId,
                      );

                    const checkboxId = `lecture-${playerData.lectureId}`;

                    return (
                      <label
                        htmlFor={checkboxId}
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer select-none"
                      >
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={isCompleted}
                          readOnly={isCompleted}
                          onChange={
                            !isCompleted
                              ? () =>
                                  markLectureAsComplete(playerData.lectureId)
                              : undefined
                          }
                          className="h-4 w-4 accent-blue-600"
                        />
                        {isCompleted ? "Completed" : "Mark as complete"}
                      </label>
                    );
                  })()}
                </>
              </div>
            </div>
          ) : (
            <img
              src={courseData ? courseData.courseThumbnail : ""}
              alt="thumbnail"
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
}
