import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CourseList from "./pages/student/CourseList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/student/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCourses } from "./features/courses/courseSlice";
import type { AppDispatch } from "./app/store";
import "quill/dist/quill.snow.css";
import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import {
  fetchUserData,
  fetchUserEnrolledCourses,
} from "./features/user/userSlice";

export default function App() {
  const isEducatorRoute = useMatch("/educator/*");
  const dispatch = useDispatch<AppDispatch>();
  const { getToken } = useAuth();

  useEffect(() => {
    const loadInitialData = async () => {
      const token = await getToken();
      if (!token) return;
      dispatch(fetchAllCourses(token));
      dispatch(fetchUserData(token));
      dispatch(fetchUserEnrolledCourses(token));
    };

    loadInitialData();
  }, [dispatch, getToken]);

  return (
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
  );
}
