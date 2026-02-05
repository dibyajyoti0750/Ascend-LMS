import { useState } from "react";

interface RatingProps {
  initialRating: number;
  onRate: (rating: number) => void;
}

export default function Rating({ initialRating, onRate }: RatingProps) {
  const [rating, setRating] = useState<number>(() => initialRating ?? 0);

  const handleRate = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            title={`${starValue} star`}
            onClick={() => handleRate(starValue)}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? "text-yellow-500" : "text-gray-400"}`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
