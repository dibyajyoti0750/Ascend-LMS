import { Facebook, Instagram, Twitter } from "lucide-react";
import { assets } from "../../assets/assets";

const socials = [
  { link: "#1", Icon: Facebook },
  { link: "#2", Icon: Instagram },
  { link: "#3", Icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="Logo" className="w-5 md:w-9" />

        <div className="hidden md:block h-7 w-px bg-gray-500/50"></div>

        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 &copy; Ascend. All Rights Reserved.
        </p>
      </div>

      <div className="flex items-center gap-3 max-md:mt-4">
        {socials.map(({ link, Icon }) => (
          <a key={link} href={link}>
            <Icon className="text-gray-500 hover:text-purple-600" />
          </a>
        ))}
      </div>
    </footer>
  );
}
