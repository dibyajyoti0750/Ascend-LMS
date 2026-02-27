import Countdown, { type CountdownRendererFn } from "react-countdown";

export default function DailyCountdown() {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0); // Set the time to next midnight

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds }) => (
    <span className="tabular-nums">
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </span>
  );

  return (
    <>
      <div className="flex justify-center items-center gap-4 text-xs md:text-base font-bold">
        <Countdown date={tomorrow} renderer={renderer} />
        <p className="flex items-center gap-2">
          <span className="hidden md:block">
            Limited-Time Launch Offer - Enroll Today & Save
          </span>
          <span className="md:hidden">Limited-Time Launch Offer</span>
          <span className="hidden md:block text-lg text-green-400">40%</span>
        </p>

        <div className="flex items-center gap-2 md:gap-3">
          <p className="text-base md:text-xl font-bold text-yellow-300">$36</p>
          <p className="text-base line-through opacity-70">$60</p>
        </div>
      </div>
    </>
  );
}
