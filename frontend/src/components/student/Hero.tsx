import type { ReactElement } from "react";
import { assets } from "../../assets/assets";

export default function Hero(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-8 text-center bg-linear-to-b from-purple-100/80">
      <h1 className="text-3xl md:text-5xl relative font-black text-gray-800 max-w-4xl mx-auto">
        Learn practical skills that translate directly into real world{" "}
        <span className="text-purple-800">opportunities</span>
        <img
          src={assets.stroke}
          alt="sketch"
          className="hidden md:block w-40 absolute -bottom-24 right-36 rotate-6"
        />
      </h1>

      <p className="hidden md:block text-gray-500 max-w-2xl mx-auto">
        Our expertise lies in making learning clear, structured, and useful. We
        focus on real application so knowledge gained can be used with
        confidence beyond the learning phase.
      </p>

      <p className="md:hidden text-gray-500 text-xs max-w-sm mx-auto">
        We focus on real application so knowledge gained can be used with
        confidence beyond the learning phase.
      </p>

      {/* Search bar */}
    </div>
  );
}
