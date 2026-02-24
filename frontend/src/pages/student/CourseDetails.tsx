import YouTube from "react-youtube";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import humanizeDuration from "humanize-duration";
import {
  BadgeCheck,
  BookOpenText,
  CalendarDays,
  ChevronDown,
  CircleCheckBig,
  CirclePlay,
  Clock,
  Globe,
  Star,
  Timer,
  TvMinimalPlay,
  Users,
} from "lucide-react";
import {
  calculateChapterTime,
  calculateCourseDuration,
  calculateNoOfLectures,
  calculateRating,
} from "../../utils/calculate";
import type { AppDispatch, RootState } from "../../app/store";
import Loading from "../../components/student/Loading";
import Footer from "../../components/student/Footer";
import { fetchCourseById } from "../../features/courses/courseSlice";
import PaymentModal from "./PaymentModal";

type PaymentMethod = "stripe" | "razorpay";

interface PlayerData {
  videoId?: string;
}

export default function CourseDetails() {
  const { id } = useParams();
  const { userData } = useSelector((state: RootState) => state.user);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });

  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { courseData } = useSelector((state: RootState) => state.courses);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Always fetch when id changes
  useEffect(() => {
    if (!id) return;

    dispatch(fetchCourseById(id))
      .unwrap()
      .catch((err) => toast.error(err));
  }, [dispatch, id]);

  const handlePayment = async (method: PaymentMethod) => {
    try {
      setPaymentProcessing(true);
      if (!userData) return toast.error("Sign in to enroll");
      const token = await getToken();
      if (!token) return toast.error("Unauthorized");

      if (method === "stripe") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/purchase-stripe`,
          { courseId: courseData?._id },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (data.success) {
          const { session_url } = data;
          window.location.href = session_url;
        }
      } else if (method === "razorpay") {
        const { data } = await axios.post(
          backendUrl + "/api/user/purchase-rzp",
          { courseId: courseData?._id },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          order_id: data.orderId,

          // This runs after a successful payment
          handler: async (response: RazorpayResponse) => {
            await axios.post(
              backendUrl + "/api/user/verify-rzp",
              {
                ...response,
                purchaseId: data.purchaseId,
              },
              { headers: { Authorization: `Bearer ${token}` } },
            );

            window.location.replace("/loading/my-enrollments");
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error: unknown) {
      let msg = "Something went wrong";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.message || error.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      toast.error(msg);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [courseData, userData]);

  return courseData ? (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-10 items-start justify-around p-4 md:px-40 md:py-14 text-left">
        {/* left column */}
        <div className="flex-1 max-w-4xl space-y-3 md:space-y-6">
          <h1 className="text-2xl md:text-5xl font-bold">
            {courseData.courseTitle}
          </h1>

          <p
            className="py-2 md:py-0 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: `${courseData?.courseDescription.slice(0, 350)}...`,
            }}
          ></p>

          <p className="w-fit flex items-center gap-1.5 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-sm">
            <span>BESTSELLER</span> <CircleCheckBig size={14} strokeWidth={3} />
          </p>

          <div className="flex text-sm font-light gap-5">
            <div className="flex gap-1.5">
              <CalendarDays size={18} />
              <p>
                Last updated at:{" "}
                {new Date(courseData.updatedAt).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div className="flex gap-1.5">
              <Globe size={18} />
              <p>English</p>
            </div>
          </div>

          {/* reviews and ratings */}
          <div className="flex flex-wrap md:flex-nowrap items-center bg-white text-sm md:text-base rounded-lg p-0.5 md:max-w-xl shadow-custom-card">
            <div className="flex flex-col items-center justify-center gap-2 bg-[#6F00FF] text-white self-stretch px-3 py-1 md:px-8 md:py-2 rounded-s-md">
              <BadgeCheck className="size-5 md:size-7" />
              <p className="text-sm font-semibold">Premium</p>
            </div>

            <div className="flex flex-1 justify-around items-center py-2 text-gray-800">
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="font-semibold">Course by</span>
                <span className="text-blue-500">
                  {courseData.educator.name}
                </span>
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

                <p className="text-sm pt-2">
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
                <p className="text-sm pt-2">
                  {courseData.enrolledStudents.length > 1
                    ? "students"
                    : "student"}
                </p>
              </div>
            </div>
          </div>

          <div className="text-gray-800 py-5">
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
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="flex items-center gap-1 cursor-pointer"
                                >
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
              className="rich-text pt-4"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* right column */}
        <div className="max-w-course-card z-10 shadow-2xl overflow-hidden bg-white rounded-lg">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail.url}
              alt="thumbnail"
              className="w-full object-cover"
            />
          )}

          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Timer className="text-red-500 size-5 md:size-7" />
              <p className="text-red-500 text-sm md:text-base font-semibold">
                5 days left at this price
              </p>
            </div>

            <div className="flex gap-4 items-center py-2">
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

            <button
              onClick={() =>
                isAlreadyEnrolled
                  ? navigate("/my-enrollments")
                  : setOpenPaymentModal(true)
              }
              className="w-full py-4 bg-[#6F00FF] hover:bg-purple-800 text-white font-bold text-lg rounded-sm transition-all mb-4"
            >
              {isAlreadyEnrolled ? "Go to Course" : "Enroll Now"}
            </button>

            <div>
              <p className="font-bold text-gray-900 mb-3">
                This course includes:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-center gap-3">
                  <Clock size={16} /> {calculateCourseDuration(courseData)}{" "}
                  on-demand video
                </li>
                <li className="flex items-center gap-3">
                  <BookOpenText size={16} /> {calculateNoOfLectures(courseData)}{" "}
                  lessons
                </li>
                <li className="flex items-center gap-3">
                  <span>✓</span> Lifetime access
                </li>
                <li className="flex items-center gap-3">
                  <span>✓</span> Certificate of completion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {openPaymentModal && (
        <PaymentModal
          onClose={() => setOpenPaymentModal(false)}
          onContinue={handlePayment}
          paymentProcessing={paymentProcessing}
        />
      )}
      <Footer />
    </>
  ) : (
    <Loading />
  );
}
