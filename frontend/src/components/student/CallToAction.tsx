import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center gap-4 px-4 sm:px-6 lg:px-0 pb-20 sm:pb-28 md:pb-40">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-900 font-bold leading-tight">
        Take the First Step Today
      </h1>

      <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg md:max-w-xl">
        Small progress every day adds up. Let's get you started.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 w-full sm:w-auto">
        <button
          onClick={() => {
            navigate("/course-list");
            window.scrollTo(0, 0);
          }}
          className="w-full sm:w-auto px-8 sm:px-10 py-3 rounded-md text-white bg-[#6F00FF] hover:bg-purple-800 transition"
        >
          Get started
        </button>

        <a
          href="/about"
          className="w-full sm:w-auto px-6 py-3 rounded-md flex items-center justify-center gap-1 hover:bg-purple-50 transition"
        >
          Learn more <ArrowRight />
        </a>
      </div>
    </div>
  );
}
