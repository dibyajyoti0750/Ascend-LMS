import { assets } from "../../assets/assets";

const companies = [
  { name: "microsoft", logo: assets.microsoft },
  { name: "youtube", logo: assets.youtube },
  { name: "openai", logo: assets.openai },
  { name: "samsung", logo: assets.samsung },
  { name: "sony", logo: assets.sony },
];

export default function Companies() {
  return (
    <div className="pt-16">
      <p className="text-xl text-gray-700">
        Thousands of students achieved their{" "}
        <span className="text-purple-700 font-semibold">dream job at</span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-8 mt-5">
        {companies.map((com, i) => (
          <img key={i} src={com.logo} alt={com.name} className="w-20 md:w-28" />
        ))}
      </div>
      <p className="text-lg text-gray-500 my-6">+ many more</p>
    </div>
  );
}
