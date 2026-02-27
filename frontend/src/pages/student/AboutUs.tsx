import { assets, missionText } from "../../assets/assets";
import JoinSection from "../../components/student/JoinSection";

export default function AboutUs() {
  return (
    <div className="bg-[#131628] text-white">
      {/* Main Content Wrapper */}
      <div className="flex flex-col justify-center items-center mx-auto mb-24 max-w-7xl px-6 lg:px-8">
        {/* About Us */}
        <section className="py-24 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            About Us
          </h1>

          <p className="text-lg text-gray-300 mx-auto leading-relaxed">
            <b>Ascend</b> is an online learning platform focused on business,
            content creation, and self-improvement. We create structured video
            courses designed to help you build practical, real-world skills.
          </p>
        </section>

        {/* Our Mission */}
        <section className="py-10 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
            Our Mission
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: missionText }}
            className="text-lg text-gray-300 mx-auto leading-relaxed"
          ></p>
        </section>

        {/* Founder Section */}
        <section className="py-24 max-w-5xl w-full mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 tracking-tight">
            The Founder of Ascend
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={assets.founder}
              alt="Founder of Ascend"
              className="w-full h-section-height object-cover rounded-2xl shadow-lg"
            />

            <div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Ascend was founded with the belief that practical knowledge
                creates independence. The goal is simple - build a platform that
                teaches real skills that actually matter in today's world.
              </p>

              <p className="mt-6 font-semibold text-gray-900">— John Doe</p>
            </div>
          </div>
        </section>
      </div>

      <JoinSection />
    </div>
  );
}
