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
      className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt="thumbnail"
          className="w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-2 p-4 text-left">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {course.courseTitle}
        </h3>

        <p className="text-xs text-gray-500">John Doe</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs">
          <span className="font-medium text-gray-800">4.5</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-gray-500">(22)</span>
        </div>

        <div className="flex items-end justify-between pt-2">
          {/* Price */}
          <div>
            <p className="text-lg font-bold text-gray-900">
              {currency}
              {(course.coursePrice * (1 - course.discount / 100)).toFixed(2)}
            </p>

            <p className="text-xs text-gray-500 line-through">
              {currency}
              {course.coursePrice.toFixed(2)}
            </p>
          </div>

          {/* Discount badge */}
          <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
            {course.discount}% OFF
          </span>
        </div>
      </div>
    </Link>
  );
}
