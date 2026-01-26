import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useMemo, useState } from "react";
import Loading from "../../components/student/Loading";
import {
  BadgeCheck,
  BookOpenText,
  CalendarDays,
  ChevronDown,
  CirclePlay,
  Clock,
  Globe,
  Star,
  Timer,
  TvMinimalPlay,
  Users,
} from "lucide-react";
import humanizeDuration from "humanize-duration";
import {
  calculateChapterTime,
  calculateCourseDuration,
  calculateNoOfLectures,
  calculateRating,
} from "../../utils/calculate";
import Footer from "../../components/student/Footer";

export default function CourseDetails() {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });
  const [isAlreadyEnrolled] = useState(false);

  const { id } = useParams();
  const { allCourses } = useSelector((state: RootState) => state.courses);
  const currency = import.meta.env.VITE_CURRENCY;

  const courseData = useMemo(() => {
    if (!id) return null;
    return allCourses.find((course) => course._id === id) ?? null;
  }, [allCourses, id]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height bg-black"></div>

        {/* left column */}
        <div className="max-w-xl md:max-w-2xl z-10 text-black md:text-gray-100 space-y-3 md:space-y-5">
          <h1 className="text-2xl leading-9 md:text-5xl md:leading-11 font-semibold">
            {courseData.courseTitle}
          </h1>

          <p
            className="pb-2 md:pb-0 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: courseData?.courseDescription.slice(0, 321),
            }}
          ></p>

          <p className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-sm font-semibold w-fit rounded">
            Bestseller
          </p>

          <div className="flex items-center text-sm font-light gap-2 py-2 md:py-1">
            <CalendarDays size={18} />
            <p>
              Last updated at{" "}
              {new Date(courseData.updatedAt).toLocaleDateString("en-IN")}
            </p>
            <Globe size={18} />
            <p>English</p>
          </div>

          {/* reviews and ratings */}
          <div className="flex flex-wrap md:flex-nowrap items-center bg-white text-black text-sm md:text-base rounded-lg p-0.5 md:max-w-xl shadow-custom-card">
            <div className="flex flex-col items-center justify-center gap-2 bg-purple-800 text-white self-stretch px-3 py-1 md:px-8 md:py-2 rounded-s-md">
              <BadgeCheck className="size-5 md:size-7" />
              <p className="text-sm font-semibold">Premium</p>
            </div>

            <div className="flex flex-1 justify-around items-center py-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <span>Course by</span>
                <span className="text-blue-500 underline">John Doe</span>
              </div>

              <div className="border-r border-gray-300 h-10"></div>

              <div className="flex flex-col justify-center items-center">
                <p className="text-base md:text-xl font-semibold">
                  {calculateRating(courseData)}
                </p>

                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3 md:size-4 ${
                        i < Math.floor(calculateRating(courseData))
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm font-light pt-2">
                  {courseData.courseRatings.length}{" "}
                  {courseData.courseRatings.length > 1 ? "ratings" : "rating"}
                </p>
              </div>

              <div className="border-r border-gray-300 h-10"></div>

              <div className="flex flex-col justify-center items-center">
                <Users className="size-4 md:size-6" />
                <p className="text-sm font-semibold">
                  {courseData.enrolledStudents.length}
                </p>
                <p className="text-sm font-light pt-2">
                  {courseData.enrolledStudents.length > 1
                    ? "students"
                    : "student"}
                </p>
              </div>
            </div>
          </div>

          <div className="py-5 text-gray-800">
            <h2 className="text-2xl font-semibold">Course content</h2>

            <div className="pt-4">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-200 bg-white mb-2"
                >
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown
                        className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                      />
                      <p className="font-bold">{chapter.chapterTitle}</p>
                    </div>

                    <p className="text-sm">
                      {chapter.chapterContent.length} lectures •{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-center gap-2 py-1">
                          <TvMinimalPlay size={20} />

                          <div className="flex items-center justify-between w-full text-gray-700 text-xs md:text-sm">
                            <p>{lecture.lectureTitle}</p>

                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p className="flex items-center gap-1 cursor-pointer">
                                  <CirclePlay />
                                  <span className="text-blue-500 underline">
                                    Preview
                                  </span>
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
          </div>

          <div className="text-sm md:text-base">
            <h3 className="text-2xl font-semibold text-gray-800">
              Description
            </h3>
            <p
              className="rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* right column */}
        <div className="max-w-course-card z-10 shadow-2xl overflow-hidden p-0.5 bg-white">
          <img
            src={courseData.courseThumbnail}
            alt="thumbnail"
            className="w-full object-cover"
          />

          <div className="p-5">
            <div className="flex items-center gap-2">
              <Timer className="text-red-500 size-5 md:size-7" />
              <p className="text-red-500 text-sm md:text-base">
                <span className="font-semibold">5 days</span> left at this price
              </p>
            </div>

            <div className="flex gap-3 items-center py-2 md:py-3">
              <p className="text-gray-800 md:text-4xl text-2xl font-bold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>

              <p className="md:text-lg font-medium text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg font-medium text-gray-500">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex items-center text-xs md:text-base gap-4 py-1 md:py-2 text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="fill-yellow-500 text-yellow-500 size-5 md:size-7" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40" />

              <div className="flex items-center gap-1">
                <Clock className="size-5 md:size-7" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40" />

              <div className="flex items-center gap-1">
                <BookOpenText className="size-5 md:size-7" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button className="md:mt-5 mt-3 w-full py-3 rounded-lg bg-purple-700 text-white font-semibold cursor-pointer active:bg-purple-800">
              {isAlreadyEnrolled ? "Already Enrolled" : "Buy Now"}
            </button>

            <div className="py-4 md:py-5">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What will you get?
              </p>

              <ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
}
