import Footer from "../../components/student/Footer";
import { assets } from "../../assets/assets";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen mx-auto max-w-7xl flex flex-col justify-center items-center">
        {/* About Us */}
        <section className="px-6 py-32">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-gray-600">
            <span className="text-[#6F00FF] font-semibold">Ascend</span> is an
            online learning platform focused on business, content creation, and
            self-improvement. We create structured video courses designed to
            help you build practical, real-world skills.
          </p>
        </section>

        {/* Our Mission */}
        <section className="py-16 px-6">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Our mission is to provide practical education that leads to real
              results. We believe learning should be clear, actionable, and
              focused on helping individuals grow financially and personally.
            </p>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 px-6">
          <div>
            <h2 className="text-center text-3xl font-semibold mb-6">
              The Founder of Ascend
            </h2>
            <img
              src={assets.founder}
              alt="Founder of Ascend"
              className="object-cover"
            />

            <p className="text-lg text-gray-600 py-4">
              Ascend was founded with the belief that practical knowledge
              creates independence. The goal is simple — build a platform that
              teaches real skills that actually matter in today's world.
            </p>
          </div>
        </section>
      </div>

      {/* Join Section */}
      <section className="relative mt-20 text-white text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.founder})` }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 py-20 px-6">
          <h2 className="text-3xl font-semibold mb-4">
            Start Your Growth Journey Today
          </h2>

          <p className="mb-6 text-gray-300">
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
            className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            {user ? "Get started" : "Sign Up Now"}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
