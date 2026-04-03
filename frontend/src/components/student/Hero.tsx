import YouTube from "react-youtube";
import { Typewriter } from "react-simple-typewriter";
import { assets } from "../../assets/assets";

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

          <p className="mt-2 text-sm text-gray-800 leading-relaxed">
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

      {/* VIDEO SECTION */}
      <div className="w-full max-w-4xl mt-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-purple-300">
        <YouTube
          videoId="geVXbpZmD2Y"
          opts={{
            playerVars: {
              rel: 0,
              mute: 1,
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
            },
          }}
          iframeClassName="w-full aspect-video"
        />
      </div>
    </div>
  );
}
