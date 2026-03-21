import Countdown, { type CountdownRendererFn } from "react-countdown";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export default function DailyCountdown() {
  const { allCourses } = useSelector((state: RootState) => state.courses);
  const currency = import.meta.env.VITE_CURRENCY;

  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0); // Set the time to next midnight

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds }) => (
    <span className="tabular-nums">
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </span>
  );

  const latestCourse = allCourses?.[allCourses.length - 1];

  const discountedPrice = latestCourse
    ? (latestCourse.coursePrice * (1 - latestCourse.discount / 100)).toFixed(0)
    : null;

  return (
    <>
      <div className="flex justify-center items-center gap-4 text-xs md:text-base font-bold">
        <Countdown date={tomorrow} renderer={renderer} />
        <p className="flex items-center gap-2">
          <span className="hidden md:block">
            Limited-Time Launch Offer - Enroll Today & Save{" "}
            {latestCourse?.discount}%
          </span>
          <span className="md:hidden">Limited-Time Launch Offer</span>
        </p>

        <div className="flex items-center gap-2 md:gap-3">
          <p className="text-base md:text-xl font-bold text-yellow-300">
            {currency}
            {discountedPrice}
          </p>
          <p className="text-base line-through opacity-70">
            {currency}
            {latestCourse?.coursePrice}
          </p>
        </div>
      </div>
    </>
  );
}
