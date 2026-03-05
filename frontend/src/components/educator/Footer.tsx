import { Facebook, Instagram, Twitter } from "lucide-react";
import { assets } from "../../assets/assets";

const socials = [
  { link: "#1", Icon: Facebook },
  { link: "#2", Icon: Instagram },
  { link: "#3", Icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 px-6 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <img src={assets.logo} alt="Logo" className="w-7 md:w-9" />

          <div className="hidden md:block h-6 w-px bg-gray-400"></div>

          <p className="text-xs md:text-sm text-gray-500">
            © 2025 Ascend. All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {socials.map(({ link, Icon }) => (
            <a
              key={link}
              href={link}
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
