import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import "quill/dist/quill.snow.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";

import Loading from "./components/student/Loading";
import Navbar from "./components/student/Navbar";

import type { AppDispatch } from "./app/store";
import { fetchAllCourses } from "./features/courses/courseSlice";
import {
  fetchUserData,
  fetchUserEnrolledCourses,
} from "./features/user/userSlice";
import { setIsEducator } from "./features/educator/educatorSlice";

const Home = lazy(() => import("./pages/student/Home"));
const CourseList = lazy(() => import("./pages/student/CourseList"));
const CourseDetails = lazy(() => import("./pages/student/CourseDetails"));
const MyEnrollments = lazy(() => import("./pages/student/MyEnrollments"));
const Player = lazy(() => import("./pages/student/Player"));

const Educator = lazy(() => import("./pages/educator/Educator"));
const Dashboard = lazy(() => import("./pages/educator/Dashboard"));
const AddCourse = lazy(() => import("./pages/educator/AddCourse"));
const MyCourses = lazy(() => import("./pages/educator/MyCourses"));
const StudentsEnrolled = lazy(
  () => import("./pages/educator/StudentsEnrolled"),
);

export default function App() {
  const isEducatorRoute = useMatch("/educator/*");
  const dispatch = useDispatch<AppDispatch>();
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const loadInitialData = async () => {
      const token = await getToken();
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      dispatch(fetchAllCourses(token));
      dispatch(fetchUserData(token));
      dispatch(fetchUserEnrolledCourses(token));
    };

    loadInitialData();
  }, [dispatch, getToken]);

  useEffect(() => {
    dispatch(setIsEducator(user?.publicMetadata.role === "educator"));
  }, [dispatch, user]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-white">
        <Toaster />
        {!isEducatorRoute && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/course-list/:input" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="/loading/:path" element={<Loading />} />

          <Route path="/educator" element={<Educator />}>
            <Route index element={<Dashboard />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="student-enrolled" element={<StudentsEnrolled />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}
