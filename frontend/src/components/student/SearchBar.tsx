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
      className="flex items-center w-full max-w-xl mx-auto bg-white rounded-full shadow-sm px-1.5 h-10 md:h-12"
    >
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search..."
        className="flex-1 h-full px-3 md:px-4 text-sm md:text-base text-gray-700 outline-none bg-transparent"
      />

      <button
        type="submit"
        className="flex items-center justify-center bg-[#6F00FF] hover:bg-purple-800 transition-colors duration-200 rounded-full text-white h-8 w-8 md:h-10 md:w-10"
      >
        <Search className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </form>
  );
}
