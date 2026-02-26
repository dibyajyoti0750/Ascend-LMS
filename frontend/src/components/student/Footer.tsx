import { useState, type ChangeEvent, type FormEvent } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const footerLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about-us" },
  { title: "Contact Us", link: "/contact" },
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Refund Policy", link: "/refund-policy" },
  { title: "Terms & Conditions", link: "/terms-and-condition" },
];

export default function Footer() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.message.trim();

  const inputStyles =
    "border border-gray-500/30 bg-gray-800 text-gray-300 placeholder-gray-500 outline-none rounded text-sm w-full h-9 px-2";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("All fields are required");
      return;
    }

    setIsSubmitting(true);

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/contact/send-email`,
        cleanedData,
      );

      toast.success(data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      let msg = "Something went wrong";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.message || error.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#131628] md:px-20 text-left w-full">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 py-20 justify-center gap-10 md:gap-20 border-b border-white/20">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo} alt="logo" className="w-10" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Ascend is an online learning platform offering structured video
            courses in business, content creation, and self-improvement. Our
            programs are designed to help learners build practical, real-world
            skills for personal and professional growth.
          </p>
        </div>

        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>

          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            {footerLinks.map((el, i) => (
              <li key={i} className="hover:text-white hover:underline w-fit">
                <a href={el.link}>{el.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Get in touch</h2>
          <p className="text-sm text-white/80">
            Email:{" "}
            <a
              href="mailto:developerdj996@gmail.com"
              className="hover:text-white hover:underline"
            >
              developerdj996@gmail.com
            </a>
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-3 pt-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={inputStyles}
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className={inputStyles}
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="How can we help?"
              className="border border-gray-500/30 bg-gray-800 text-gray-300 placeholder-gray-500 outline-none rounded text-sm w-full h-24 px-2 py-2 resize-none"
              value={formData.message}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex justify-center items-center bg-[#6F00FF] w-full h-10 text-white font-medium rounded cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2026 &copy; Ascend. All Right Reserved.
      </p>
    </footer>
  );
}
