import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import JoinSection from "../../components/student/JoinSection";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
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
    <div className="bg-[#131628]">
      <div className="min-h-screen flex items-center justify-center mb-24 px-4">
        <div className="w-full max-w-lg bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white text-center">
            Contact Us
          </h2>

          <p className="text-sm text-gray-400 text-center mt-3">
            You can contact us by sending an email to{" "}
            <a
              href="mailto:developerdj996@gmail.com"
              className="hover:underline hover:text-gray-300 text-sky-500"
            >
              developerdj996@gmail.com
            </a>{" "}
            or filling in the contact form below.
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

      <JoinSection />
    </div>
  );
}
