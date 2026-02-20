import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function CoursesSection() {
  const { allCourses } = useSelector((state: RootState) => state.courses);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show)
    return <LoaderCircle size={50} className="animate-spin text-purple-600" />;

  return (
    <div className="py-16 px-8 md:px-40">
      <h2 className="text-3xl font-medium text-gray-700">
        Unlock Your{" "}
        <span className="text-purple-700 font-bold">Next Level</span>
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3 max-w-xl">
        Structured programs designed to improve your mindset and daily habits.
        Learn practical skills you can apply immediately for real growth.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,500px))] justify-center px-4 md:px-0 my-10 md:my-16 gap-4">
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
