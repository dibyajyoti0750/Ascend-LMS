import Hero from "../../components/student/Hero";
import CoursesSection from "../../components/student/CoursesSection";
import TestimonialsSection from "../../components/student/TestimonialsSection";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      {/* <Companies /> */}
      <p>"have to fix this section"</p>
      <CoursesSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
