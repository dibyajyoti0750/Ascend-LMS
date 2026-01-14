import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchAllCourses } from "../../features/courses/courseSlice";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

export default function CoursesSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="py-16 px-8 md:px-40">
      <h2 className="text-3xl font-medium text-gray-700">
        Upgrade Your{" "}
        <span className="text-purple-700 font-bold">Knowledge</span>
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover top rated programs across diverse categories, designed to
        support continuous learning and long term skill development.
      </p>

      <div className="grid grid-cols-auto px-4 md:px-0 my-10 md:my-16 gap-4">
        {allCourses.slice(0, 4).map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="inline-flex items-center justify-center rounded-lg bg-purple-950 px-8 py-3 text-sm font-medium text-white transition hover:bg-purple-900"
      >
        Show all courses
      </Link>
    </div>
  );
}
