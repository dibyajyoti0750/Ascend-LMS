import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24">
      <h1 className="text-xl md:text-4xl text-purple-900 font-bold">
        Learn. Apply. Grow.
      </h1>

      <p className="text-gray-500 sm:text-sm text-center max-w-xl">
        Practical education built to help you move from understanding concepts
        to using them with confidence.
      </p>

      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded-md text-white bg-purple-700 hover:bg-purple-800 transition cursor-pointer">
          Get started
        </button>

        <button className="px-6.5 py-3 rounded-md flex items-center gap-1 hover:bg-purple-50 transition cursor-pointer">
          Learn more <ArrowRight />
        </button>
      </div>
    </div>
  );
}
