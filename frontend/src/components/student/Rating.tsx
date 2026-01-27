import { useState } from "react";

interface RatingProps {
  initialRating: number;
}

export default function Rating({ initialRating }: RatingProps) {
  const [rating, setRating] = useState<number>(() => initialRating ?? 0);

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            onClick={() => setRating(starValue)}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? "text-yellow-500" : "text-gray-400"}`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
