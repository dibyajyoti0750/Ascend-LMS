import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-8 text-center bg-linear-to-b from-purple-100/80">
      <h1 className="text-4xl md:text-6xl font-black text-gray-800 max-w-4xl mx-auto text-center relative">
        Built for the Top 1% Who Actually{" "}
        <span className="text-purple-800">Take Action</span>
        <img
          src={assets.stroke}
          alt="sketch"
          className="hidden md:block w-40 absolute -bottom-22 -right-6 rotate-6"
        />
      </h1>

      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-700 max-w-3xl mx-auto px-4 text-center leading-relaxed mt-6">
        <span className="font-bold">Ascend</span> by John Doe is designed to
        help you break limits, build wealth, and step into the Top 1%.{" "}
        <span className="text-purple-800 font-semibold">
          Your journey starts now.
        </span>
      </h2>

      <SearchBar />
    </div>
  );
}
