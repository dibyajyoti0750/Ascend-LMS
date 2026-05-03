import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { assets, carouselAssets } from "../../assets/assets";

export default function Hero() {
  return (
    <div className="w-full flex flex-col items-center bg-linear-to-b from-purple-100/80 py-10">
      {/* HERO IMAGE CONTAINER */}
      <div className="md:relative w-full max-w-7xl overflow-hidden">
        {/* Small screens */}
        <img
          src={assets.hero2}
          alt="hero"
          className="w-full h-auto md:hidden"
        />

        {/* Medium and above */}
        <img
          src={assets.hero1}
          alt="hero"
          className="hidden md:block w-full h-auto rounded-xl"
        />

        {/* OVERLAY CARD */}
        <div className="md:absolute md:top-[19%] md:left-[5%] max-w-lg bg-white text-left rounded p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Master Valuable Skills &{" "}
          </h1>

          <span className="text-2xl md:text-3xl font-bold text-[#6F00FF]">
            <Typewriter
              words={["Build Real Results"]}
              loop={true}
              typeSpeed={60}
              deleteSpeed={60}
              delaySpeed={20000}
            />
          </span>

          <p className="mt-2 text-xs md:text-sm text-gray-700 leading-relaxed">
            Structured online video courses designed to help you build
            real-world skills and achieve practical results.
          </p>

          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <Link
              to={"/course-list"}
              className="bg-[#6F00FF] text-center text-white font-semibold py-3 px-5 rounded-md"
            >
              Get started
            </Link>
            <button className="border border-[#6F00FF] text-center text-[#6F00FF] font-semibold py-3 px-5 rounded-md">
              Learn AI
            </button>
          </div>
        </div>
      </div>

      {/* CAROUSEL SECTION */}
      <div className="w-full max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10">
        {/* LEFT TEXT */}
        <div className="w-full md:w-1/3 text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 leading-snug">
            Learn <i>essential</i> career and <b>life</b> skills
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Ascend helps you build in-demand skills fast and advance your career
            in a changing job market
          </p>
        </div>

        {/* RIGHT CAROUSEL */}
        <div className="w-full md:w-2/3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 sm:gap-6 min-w-max pb-2">
            {carouselAssets.map((item, i) => (
              <div key={i} className="relative shrink-0 w-56 sm:w-64 md:w-72">
                <img
                  src={item.image}
                  className="h-64 sm:h-72 md:h-80 w-full object-cover rounded-xl"
                  alt={item.title}
                />

                <div className="absolute bottom-4 left-4 w-[75%] bg-white/30 text-white text-sm sm:text-base text-left font-medium backdrop-blur-sm rounded-md p-3 sm:p-4 z-10">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
