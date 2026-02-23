import YouTube from "react-youtube";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-16 px-8 md:px-0 space-y-10 text-center bg-linear-to-b from-purple-100/80">
      <h1 className="text-4xl md:text-6xl font-black text-gray-800 max-w-4xl mx-auto text-center relative">
        Built for the Top 1% Who Actually{" "}
        <span className="text-purple-800">Take Action</span>
        <img
          src={assets.stroke}
          alt="sketch"
          className="hidden md:block w-40 absolute -bottom-22 -right-6 rotate-6"
        />
      </h1>

      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-700 max-w-3xl mx-auto px-4 text-center leading-relaxed">
        <span className="font-bold">Ascend</span> by John Doe is designed to
        help you break limits, build wealth, and step into the Top 1%.{" "}
        <span className="text-purple-800 font-semibold">
          Your journey starts now.
        </span>
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
