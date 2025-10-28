import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 px-4 sm:px-10 md:px-14 lg:px-20 text-center"
    >
      <motion.h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
        <motion.span
          style={{
            backgroundImage:
              "linear-gradient(90deg, #67e8f9, #99f6e4, #34d399)", // cyan → teal → emerald
            backgroundSize: "200% 100%", // make gradient wider than text
            backgroundPosition: "0% 50%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // moves left → right → left
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          Generate AI Images
        </motion.span>
      </motion.h1>

      <p className="text-lg text-white/90 mb-12 italic">
        Your Vision, Our Pixels
      </p>

      {/* Content section */}
      <div className="flex flex-col gap-8 md:gap-16 md:flex-row items-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <img
          src={assets.sample_img_0}
          alt=""
          className="w-72 xl:w-96 rounded-lg shadow-md"
        />
        <div className="text-left md:max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Introducing the AI Website – Your Ultimate Text to Image Generator
          </h2>
          <p className="text-white/80 mb-4">
            Effortlessly bring your ideas to life with our free AI image
            generator. Transform your text into stunning visuals in seconds.
            Imagine, describe, and see your vision come to life instantly.
          </p>
          <p className="text-white/80">
            Type a text prompt, and our advanced AI will generate high-quality
            images in seconds. From product visuals to character designs and
            portraits, even non-existent concepts come to life effortlessly.
            Unleash limitless creativity with our AI technology.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
