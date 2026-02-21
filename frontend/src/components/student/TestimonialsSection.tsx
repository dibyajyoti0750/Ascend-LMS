import { Star } from "lucide-react";
import { dummyTestimonial } from "../../assets/assets";
import { useState } from "react";

export default function TestimonialsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>();

  return (
    <section className="pb-20 px-6 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-900">Testimonials</h2>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Words from learners who trusted a focused learning process and stayed
          with it. What they share is simple, measured, and real.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-start">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className={`rounded-xl border border-gray-100 bg-white shadow-sm 
            hover:shadow-md transition-all duration-300 overflow-hidden
            ${expandedIndex === index ? "h-auto" : "h-65"}`}
          >
            {/* User */}
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div className="flex flex-col items-start">
                <h3 className="text-base font-medium text-gray-900 truncate">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5 text-start">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(testimonial.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                {expandedIndex === index
                  ? testimonial.feedback
                  : testimonial.feedback.slice(0, 80)}

                {expandedIndex === index ? "" : "..."}

                <div>
                  {expandedIndex !== index ? (
                    <span
                      onClick={() => setExpandedIndex(index)}
                      className="text-blue-600 cursor-pointer"
                    >
                      show more...
                    </span>
                  ) : (
                    <span
                      onClick={() => setExpandedIndex(null)}
                      className="text-blue-600 cursor-pointer"
                    >
                      show less
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
