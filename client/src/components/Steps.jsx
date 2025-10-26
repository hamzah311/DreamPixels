import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32 px-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative text-center font-extrabold text-3xl sm:text-5xl"
      >
        <span
          className="bg-gradient-to-r from-teal-100 via-teal-300 to-teal-600
                    bg-[length:200%_200%] bg-clip-text text-transparent
                    drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]
                    [animation:gradient-x_4s_ease_infinite]"
        >
          The Alchemy of AI ✨
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg text-neutral-100 mt-3 mb-10 text-center"
      >
        Turning{" "}
        <span className="text-teal-600 font-semibold font-serif">Words</span>{" "}
        into{" "}
        <span className="text-teal-600 font-semibold font-serif">
          Visual Wonders
        </span>
      </motion.p>

      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-default hover:scale-[1.1] transition-all duration-300 rounded-lg"
          >
            <img width={40} src={item.icon} alt="" />
            <div>
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="text-teal-50">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Steps;
