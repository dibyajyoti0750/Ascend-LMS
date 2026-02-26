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
    <div className="py-16 px-8 md:px-56">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-medium text-gray-700">
          Learn the Systems{" "}
          <span className="text-[#6F00FF] font-bold">Behind Success</span>
        </h2>
        <p className="text-sm text-gray-500 mt-3 max-w-2xl px-6">
          Structured video courses that teach practical skills for business,
          content creation, and self-improvement, helping you grow with clarity,
          consistency, and measurable progress.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 px-4 md:px-0 my-10 md:my-16">
        {allCourses.slice(0, 4).map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="inline-flex items-center justify-center rounded-lg bg-purple-950 hover:bg-purple-900 px-8 py-3 text-sm font-medium text-white transition"
      >
        Show all courses
      </Link>
    </div>
  );
}
