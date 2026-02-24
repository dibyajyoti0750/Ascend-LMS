import YouTube from "react-youtube";
import Countdown from "react-countdown";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import humanizeDuration from "humanize-duration";
import {
  BookOpenText,
  CalendarDays,
  ChevronDown,
  CircleCheckBig,
  CirclePlay,
  Clock,
  Globe,
  InfinityIcon,
  Star,
  Timer,
  Trophy,
  TvMinimalPlay,
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

  // Countdown
  const fiveDaysLater = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

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
      <div className="flex flex-col-reverse md:flex-row gap-10 items-start justify-between p-4 md:px-52 md:py-16 text-left">
        {/* left column */}
        <div className="max-w-4xl space-y-8 text-slate-900">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl py-4 font-extrabold tracking-tight">
              {courseData.courseTitle}
            </h1>

            <div
              className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl"
              dangerouslySetInnerHTML={{
                __html: `${courseData?.courseDescription.slice(0, 220)}...`,
              }}
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {courseData.isBestSeller && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-md">
                  <CircleCheckBig size={14} strokeWidth={2.5} />
                  <span>BESTSELLER</span>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-slate-400" />
                  <span>
                    Last updated{" "}
                    {new Date(courseData.updatedAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={16} className="text-slate-400" />
                  <span>English</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Course content</h2>

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
                        className={`text-slate-400 transition-transform duration-300 ${
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
                      openSections[index] ? "max-h-250" : "max-h-0"
                    }`}
                  >
                    <ul className="bg-white px-5 py-2 divide-y divide-slate-100">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between py-3 group"
                        >
                          <div className="flex items-center gap-3">
                            <TvMinimalPlay
                              size={18}
                              className="text-slate-400 group-hover:text-indigo-500"
                            />
                            <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                              {lecture.lectureTitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            {lecture.isPreviewFree && (
                              <button
                                title="Play lecture"
                                onClick={() =>
                                  setPlayerData({
                                    videoId: lecture.lectureUrl
                                      .split("/")
                                      .pop(),
                                  })
                                }
                                className="flex items-center gap-1.5 text-xs font-semibold text-[#6F00FF] hover:text-purple-800 underline underline-offset-4 cursor-pointer"
                              >
                                <CirclePlay size={18} />
                                Preview
                              </button>
                            )}
                            <span className="text-xs text-slate-600">
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] },
                              )}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="pt-5 border-t border-slate-100">
            <h3 className="text-2xl font-bold mb-4">Description</h3>
            <div
              className="rich-text max-w-none text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            />
          </div>
        </div>

        {/* right column */}
        <div className="max-w-course-card z-10 sticky top-10 shadow-2xl border border-slate-200 overflow-hidden bg-white rounded-xl">
          {/* Media Section */}
          <div className="relative aspect-video bg-slate-100 overflow-hidden">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img
                src={courseData.courseThumbnail.url}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6">
            {/* Urgency Alert */}
            <div className="flex items-center gap-2.5">
              <Timer className="text-red-600 size-5" strokeWidth={2.5} />
              <p className="text-red-700 text-sm font-bold space-x-2">
                <Countdown
                  date={fiveDaysLater}
                  renderer={({ days, hours, minutes, seconds }) => {
                    return (
                      <span className="tabular-nums">
                        {days}d {hours}h {minutes}m {seconds}s
                      </span>
                    );
                  }}
                />
                <span>left at this price!</span>
              </p>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-slate-900 text-4xl font-extrabold">
                  {currency}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(0)}
                </span>
                <span className="text-lg font-medium text-slate-400 line-through">
                  {currency}
                  {courseData.coursePrice}
                </span>
              </div>
              <div className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">
                {courseData.discount}% OFF
              </div>
            </div>

            <div className="flex justify-around items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                {calculateRating(courseData)}
              </span>

              <div className="border-r border-gray-300 h-5"></div>

              <span className="flex items-center gap-1.5">
                <Clock size={18} className="text-slate-400" />
                {calculateCourseDuration(courseData)}
              </span>

              <div className="border-r border-gray-300 h-5"></div>

              <span className="flex items-center gap-1.5">
                <BookOpenText size={18} className="text-slate-400" />
                {calculateNoOfLectures(courseData)} lessons
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() =>
                isAlreadyEnrolled
                  ? navigate("/my-enrollments")
                  : setOpenPaymentModal(true)
              }
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all active:scale-[0.98] cursor-pointer shadow-md ${
                isAlreadyEnrolled
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
              }`}
            >
              {isAlreadyEnrolled ? "Go to Course" : "Enroll Now"}
            </button>

            <p className="text-center text-xs text-slate-400 font-medium">
              30-Day Money-Back Guarantee
            </p>

            {/* Features List */}
            <div className="pt-2">
              <p className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                This course includes:
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-400" />
                  <span>
                    <span className="font-bold text-slate-800">
                      {calculateCourseDuration(courseData)}
                    </span>{" "}
                    on-demand video
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <InfinityIcon size={18} className="text-slate-400" />
                  <span>Full lifetime access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Trophy size={18} className="text-slate-400" />
                  <span>Certificate of completion</span>
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
