import YouTube from "react-youtube";
import { Typewriter } from "react-simple-typewriter";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-16 px-8 md:px-0 space-y-10 text-center bg-linear-to-b from-purple-100/80">
      <h1 className="text-4xl md:text-5xl font-black text-gray-800 max-w-3xl mx-auto text-center">
        Built for the Top 1% Who Actually{" "}
        <span className="text-[#6F00FF]">
          <Typewriter
            words={["Take Action"]}
            loop={true}
            typeSpeed={60}
            deleteSpeed={60}
            delaySpeed={20000}
          />
        </span>
      </h1>

      <h2 className="text-base md:text-xl font-medium text-gray-800 max-w-2xl mx-auto px-4 text-center leading-relaxed">
        Ascend is designed to help you break limits, build wealth, and step into
        the Top 1%. Your journey starts now.
      </h2>

      <SearchBar />

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-purple-300 my-4"
      >
        <YouTube
          videoId="H_AGA8ONNEA"
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
