import { Link } from "react-router-dom";
import type { Course } from "../../features/course.types";
import { Star } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const currency = import.meta.env.VITE_CURRENCY;

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      <img src={course.courseThumbnail} alt="thumbnail" className="w-full" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">John Doe</p>
        <div className="flex items-center space-x-2">
          <p>4.5</p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={15}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <p className="text-gray-500">(22)</p>
        </div>
        <p className="text-balance font-semibold text-gray-800">
          {currency}
          {/* 1 represents the full price, and subtracting removes the discounted part */}
          {(course.coursePrice * (1 - course.discount / 100)).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
