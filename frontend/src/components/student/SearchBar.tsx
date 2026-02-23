import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InputData {
  data?: string;
}

export default function SearchBar({ data }: InputData) {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>(data ?? "");

  const searchHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={searchHandler}
      className="max-w-xl w-full h-12 md:h-14 flex items-center bg-white border border-gray-300 rounded-full focus-within:border-sky-500 focus-within:shadow transition-all duration-300"
    >
      <Search className="w-10 mx-3 text-gray-500" />

      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search"
        className="h-full w-full outline-none text-lg text-gray-600"
      />

      <button
        type="submit"
        className="bg-[#6F00FF] hover:bg-purple-800 transition-colors duration-200 rounded-full text-white text-lg font-medium px-4 md:px-8.5 py-1.5 md:py-2.5 mx-1 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
