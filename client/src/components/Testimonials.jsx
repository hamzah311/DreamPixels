import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 px-4 sm:px-10 md:px-14 lg:px-28"
    >
      <h1
        className="text-3xl sm:text-4xl font-extrabold text-teal-900 mb-2"
        style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.7)" }}
      >
        User Reviews
      </h1>

      <p className="text-neutral-800 mb-12 italic">What our customers say</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg flex flex-col p-6 h-full cursor-default"
          >
            <div className="flex flex-col items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="rounded-full w-16 h-16 object-cover border-2 border-teal-400 mb-2"
              />
              <h2 className="text-lg font-semibold text-teal-900 text-center">
                {testimonial.name}
              </h2>
              <p className="text-neutral-100 text-sm text-center mb-2 italic">
                {testimonial.role}
              </p>
              <div className="flex justify-center mb-2">
                {Array(testimonial.stars)
                  .fill()
                  .map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src={assets.rating_star}
                      alt="star"
                      className="w-5 h-5"
                    />
                  ))}
              </div>
            </div>

            <div className="mt-auto text-center text-gray-100 text-sm">
              {testimonial.text}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
