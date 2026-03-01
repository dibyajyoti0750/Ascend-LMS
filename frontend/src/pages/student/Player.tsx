import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../app/store";
import { ChevronDown } from "lucide-react";
import { calculateChapterTime } from "../../utils/calculate";
import humanizeDuration from "humanize-duration";
import Rating from "../../components/student/Rating";
import YouTube from "react-youtube";
import type { Course, Lecture } from "../../features/courses/course.types";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

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

  // useCallback memorizes a function so React does not recreate it on every render
  const getCourseProgress = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      const { data } = await axios.get(
        `${backendUrl}/api/user/course-progress/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setProgressData(data.progressData);
    } catch (error: unknown) {
      let msg = "Something went wrong";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.message || error.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      toast.error(msg);
    }
  }, [backendUrl, getToken, courseId]);

  const markLectureAsComplete = async (lectureId: string) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-course-progress`,
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);
      getCourseProgress();
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

  const handleRate = async (rating: number) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);
      setInitialRating(rating); // keep UI in sync
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

  useEffect(() => {
    const fetchProgress = async () => {
      if (!courseId) return;
      await getCourseProgress();
    };

    fetchProgress();
  }, [courseId, getCourseProgress]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="p-4 md:px-36 md:py-24 flex flex-col-reverse md:grid md:grid-cols-2 gap-5 md:gap-10 mb-10">
        {/* Left column */}
        <div className="text-gray-800 space-y-4">
          <h2 className="text-2xl font-bold">{courseData.courseTitle}</h2>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            {courseData.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="border-b border-slate-200 last:border-0"
              >
                <div
                  onClick={() => toggleSection(index)}
                  className="flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                        openSections[index] ? "rotate-180" : ""
                      }`}
                    />
                    <p className="font-bold text-slate-800">
                      {chapter.chapterTitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-800 font-medium">
                    {chapter.chapterContent.length} lectures •{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSections[index] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="bg-white md:pl-10 pl-4 pr-4 py-4 space-y-3 max-h-96 overflow-y-auto">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 py-2 group"
                      >
                        {progressData?.lectureCompleted.includes(
                          lecture.lectureId,
                        ) ? (
                          <img
                            src={assets.check}
                            alt="completed"
                            className="w-6 h-6"
                          />
                        ) : (
                          <img
                            onClick={() =>
                              setPlayerData({
                                ...lecture,
                                chapter: index + 1,
                                lecture: i + 1,
                              })
                            }
                            src={assets.play}
                            alt="play"
                            className="w-6 h-6 cursor-pointer"
                            title="Play lecture"
                          />
                        )}

                        <div className="flex items-center justify-between w-full text-sm md:text-base">
                          <p className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                            {lecture.lectureTitle}
                          </p>

                          <div className="flex items-center gap-4">
                            {lecture.lectureUrl && (
                              <button
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: i + 1,
                                  })
                                }
                                className="flex items-center gap-1.5 font-semibold text-[#6F00FF] hover:text-purple-800 underline underline-offset-4 cursor-pointer"
                              >
                                Watch
                              </button>
                            )}
                            <span className="text-xs text-slate-600">
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] },
                              )}
                            </span>
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
        <div className="md:mt-12 rounded-xl overflow-hidden">
          {playerData ? (
            <div>
              <YouTube
                opts={{ playerVars: { autoplay: 1 } }}
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full h-full aspect-video"
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
              src={courseData ? courseData.courseThumbnail.url : ""}
              alt="thumbnail"
              className="w-full aspect-video object-cover"
            />
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}
