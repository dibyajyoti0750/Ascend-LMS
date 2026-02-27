import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

export default function JoinSection() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <section className="relative border-y-4 border-[#6F00FF]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.about})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 py-28 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-white font-semibold mb-6">
          Start Your Growth Journey Today
        </h2>

        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Join Ascend and get access to structured courses that help you level
          up your skills and take control of your future.
        </p>

        <button
          onClick={() => {
            if (user) {
              navigate("/course-list");
              window.scrollTo(0, 0);
            } else {
              openSignIn();
            }
          }}
          className="bg-[#6F00FF] hover:bg-[#5a00d6] text-white transition px-8 py-3 rounded-lg font-semibold shadow-lg cursor-pointer"
        >
          {user ? "Get Started" : "Sign Up Now"}
        </button>
      </div>
    </section>
  );
}
