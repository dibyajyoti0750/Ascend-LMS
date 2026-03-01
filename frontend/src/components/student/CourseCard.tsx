import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Course } from "../../features/courses/course.types";
import { calculateRating } from "../../utils/calculate";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const currency = import.meta.env.VITE_CURRENCY;
  const rating = calculateRating(course);
  const discountedPrice = (
    course.coursePrice *
    (1 - course.discount / 100)
  ).toFixed(0);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="overflow-hidden">
        <img
          src={course.courseThumbnail.url}
          alt={course.courseTitle}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 text-left">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 leading-snug">
          {course.courseTitle}
        </h3>

        <p className="text-xs text-gray-500">{course.educator.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-medium text-gray-800">{rating}</span>

          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-gray-400">({course.courseRatings.length})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-xl font-bold text-gray-900">
              {currency}
              {discountedPrice}
            </p>

            {course.discount > 0 && (
              <p className="text-xs text-gray-400 line-through">
                {currency}
                {course.coursePrice.toFixed(0)}
              </p>
            )}
          </div>

          {course.discount > 0 && (
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">
              {course.discount}% OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
