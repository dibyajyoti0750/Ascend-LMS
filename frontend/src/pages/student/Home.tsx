import type { ReactElement } from "react";
import Hero from "../../components/student/Hero";

export default function Home(): ReactElement {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
    </div>
  );
}
