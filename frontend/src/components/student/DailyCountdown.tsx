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
      <div className="flex justify-center items-center gap-5 text-sm sm:text-base md:text-lg font-bold">
        <Countdown date={tomorrow} renderer={renderer} />
        <p>HURRY UP!! Join now before it's too late.</p>
        <div className="flex items-center gap-2">
          <p className="line-through opacity-70">$27</p>
          <p className="font-bold text-yellow-300">$16/once</p>
        </div>
      </div>
    </>
  );
}
