import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 pb-40">
      <h1 className="text-xl md:text-4xl text-purple-900 font-bold">
        Take the First Step Today
      </h1>

      <p className="text-gray-500 sm:text-sm text-center max-w-xl">
        Small progress every day adds up. Let's get you started.
      </p>

      <div className="flex items-center font-medium gap-6 mt-4">
        <button
          onClick={() => {
            navigate("/course-list");
            window.scrollTo(0, 0);
          }}
          className="px-10 py-3 rounded-md text-white bg-[#6F00FF] hover:bg-purple-800 transition cursor-pointer"
        >
          Get started
        </button>

        <a
          href="/about"
          className="px-6.5 py-3 rounded-md flex items-center gap-1 hover:bg-purple-50 transition cursor-pointer"
        >
          Learn more <ArrowRight />
        </a>
      </div>
    </div>
  );
}
