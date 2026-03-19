import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import "quill/dist/quill.snow.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Loading from "./components/student/Loading";
import Navbar from "./components/student/Navbar";

import type { AppDispatch, RootState } from "./app/store";
import { fetchAllCourses } from "./features/courses/courseSlice";
import {
  fetchUserData,
  fetchUserEnrolledCourses,
} from "./features/user/userSlice";
import { setIsEducator } from "./features/educator/educatorSlice";
import Maintenance from "./pages/student/Maintenance";

const Home = lazy(() => import("./pages/student/Home"));
const CourseList = lazy(() => import("./pages/student/CourseList"));
const CourseDetails = lazy(() => import("./pages/student/CourseDetails"));
const MyEnrollments = lazy(() => import("./pages/student/MyEnrollments"));
const Player = lazy(() => import("./pages/student/Player"));
const AboutUs = lazy(() => import("./pages/student/AboutUs"));
const Contact = lazy(() => import("./pages/student/Contact"));
const Footer = lazy(() => import("./components/student/Footer"));
const PrivacyPolicy = lazy(() => import("./pages/student/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/student/RefundPolicy"));
const TermsConditions = lazy(() => import("./pages/student/TermsConditions"));

const Educator = lazy(() => import("./pages/educator/Educator"));
const Dashboard = lazy(() => import("./pages/educator/Dashboard"));
const AddCourse = lazy(() => import("./pages/educator/AddCourse"));
const MyCourses = lazy(() => import("./pages/educator/MyCourses"));
const StudentsEnrolled = lazy(
  () => import("./pages/educator/StudentsEnrolled"),
);
const PaymentSuccessful = lazy(
  () => import("./pages/student/PaymentSuccessful"),
);

export default function App() {
  const isEducatorRoute = useMatch("/educator/*");
  const dispatch = useDispatch<AppDispatch>();
  const { getToken } = useAuth();
  const { user } = useUser();

  const { allCoursesStatus } = useSelector((state: RootState) => state.courses);

  // Load public data
  useEffect(() => {
    if (allCoursesStatus === "idle") {
      dispatch(fetchAllCourses())
        .unwrap()
        .catch(() => {
          toast.error("Failed to fetch all courses");
        });
    }
  }, [dispatch, allCoursesStatus]);

  // Load protected data
  useEffect(() => {
    const loadUserData = async () => {
      const token = await getToken();
      if (!token) return;

      dispatch(fetchUserData(token))
        .unwrap()
        .catch(() => toast.error("Failed to fetch user data"));

      dispatch(fetchUserEnrolledCourses(token))
        .unwrap()
        .catch(() => toast.error("Failed to fetch user enrolled courses"));
    };

    loadUserData();
  }, [dispatch, getToken]);

  // Set educator role
  useEffect(() => {
    dispatch(setIsEducator(user?.publicMetadata.role === "educator"));
  }, [dispatch, user]);

  return (
    <Suspense fallback={<Loading />}>
      <div
        onContextMenu={(e) => e.preventDefault()}
        className="min-h-screen bg-white overflow-x-hidden"
      >
        <Analytics />
        <SpeedInsights />
        <Toaster />
        {!isEducatorRoute && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/course-list/:input" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/standard-terms" element={<TermsConditions />} />
          <Route
            path="/payment-success/:purchaseId"
            element={<PaymentSuccessful />}
          />

          <Route path="/maintenance" element={<Maintenance />} />

          <Route path="/educator" element={<Educator />}>
            <Route index element={<Dashboard />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="student-enrolled" element={<StudentsEnrolled />} />
          </Route>
        </Routes>
      </div>

      {!isEducatorRoute && <Footer />}
    </Suspense>
  );
}
