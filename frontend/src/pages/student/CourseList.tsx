import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/student/SearchBar";
import { useMemo } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import CourseCard from "../../components/student/CourseCard";
import Footer from "../../components/student/Footer";

export default function CourseList() {
  const { allCourses } = useSelector((state: RootState) => state.courses);
  const { input } = useParams();
  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    if (!allCourses || allCourses.length === 0) return [];

    if (!input) return allCourses;

    const tempCourses = allCourses.filter((course) =>
      course.courseTitle.toLowerCase().includes(input.toLowerCase()),
    );

    return tempCourses;
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 p-28 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-purple-900 mb-2">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                onClick={() => navigate("/")}
                className="text-blue-500 cursor-pointer"
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>

          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 mt-8 text-gray-600 rounded-md">
            <p>{input}</p>
            <X
              onClick={() => navigate("/course-list")}
              className="text-gray-600 w-5 cursor-pointer"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-14 gap-3 px-2 md:p-0">
          {!filteredCourses.length ? (
            <p className="col-span-full text-center text-gray-500">
              No courses found for "{input}"
            </p>
          ) : (
            filteredCourses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
