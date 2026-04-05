import { Typewriter } from "react-simple-typewriter";
import { assets, carouselAssets } from "../../assets/assets";

export default function Hero() {
  return (
    <div className="w-full flex flex-col items-center bg-linear-to-b from-purple-100/80 py-10">
      {/* HERO IMAGE CONTAINER */}
      <div className="relative w-full max-w-7xl">
        <img
          src={assets.hero}
          alt="hero"
          className="w-full h-auto rounded-xl"
        />

        {/* OVERLAY CARD */}
        <div className="absolute top-10 left-10 max-w-lg bg-white text-left rounded-xl p-6">
          <h1 className="text-xl font-bold text-gray-800">
            Master Valuable Skills &{" "}
            <span className="text-[#6F00FF]">
              <Typewriter
                words={["Build Real Results"]}
                loop={true}
                typeSpeed={60}
                deleteSpeed={60}
                delaySpeed={20000}
              />
            </span>
          </h1>

          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            Structured online video courses designed to help you build
            real-world skills and achieve practical results.
          </p>

          <div className="flex gap-3 mt-4">
            <button className="bg-[#6F00FF] text-white font-semibold py-2.5 px-5 rounded-md">
              Get started
            </button>
            <button className="border border-[#6F00FF] text-[#6F00FF] font-semibold py-2.5 px-5 rounded-md">
              Learn AI
            </button>
          </div>
        </div>
      </div>

      {/* CAROUSEL SECTION */}
      <div className="w-full max-w-7xl px-6 pt-14 flex items-center gap-10">
        {/* LEFT TEXT */}
        <div className="md:w-1/3 text-left">
          <h1 className="text-2xl text-gray-800 leading-snug">
            Learn <i>essential</i> career and <b>life</b> skills
          </h1>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Ascend helps you build in-demand skills fast and advance your career
            in a changing job market
          </p>
        </div>

        {/* RIGHT CAROUSEL */}
        <div className="md:w-2/3 overflow-x-auto">
          <div className="flex gap-6 min-w-max pb-2">
            {carouselAssets.map((item, i) => (
              <img
                key={i}
                src={item}
                className="h-80 w-72 shrink-0 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
