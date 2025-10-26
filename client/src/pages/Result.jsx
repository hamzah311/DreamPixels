import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };
  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      {/* Image + Progress */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={image}
            alt=""
            className="max-w-sm rounded-2xl shadow-lg border border-white/20"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-teal-400 rounded-b-2xl ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>
        <p
          className={`mt-4 text-teal-900 font-medium ${
            !loading ? "hidden" : "animate-pulse"
          }`}
        >
          Generating...
        </p>
      </div>

      {/* Input Field */}
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm p-1 mt-10 rounded-full shadow-lg">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe your idea, and our AI will generate it!"
            className="flex-1 bg-transparent outline-none ml-6 placeholder-white/70 text-white"
          />

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 10 }}
            className="relative bg-gradient-to-r from-pink-500 to-teal-600 
             px-7 sm:px-14 py-3 rounded-full font-bold text-white 
             transition-all duration-300 overflow-hidden group"
          >
            {/* Shimmer hover effect */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
               translate-x-[-100%] group-hover:translate-x-[100%] 
               transition-transform duration-1000 ease-in-out"
            ></span>

            {/* Button text */}
            <span className="relative z-10">Generate</span>
          </motion.button>
        </div>
      )}

      {/* Buttons after image loads */}
      {isImageLoaded && (
        <div className="flex gap-4 flex-wrap justify-center mt-10">

          {/* Generate Another button */}
          <motion.button
            onClick={() => {
              setIsImageLoaded(false);
              setInput("");
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 10 }}
            className="relative bg-gradient-to-r from-pink-500 to-teal-600 text-white 
             px-8 py-3 rounded-full cursor-pointer shadow-md font-semibold 
             overflow-hidden group transition-all duration-500"
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
               translate-x-[-100%] group-hover:translate-x-[100%] 
               transition-transform duration-1000 ease-in-out"
            ></span>

            {/* Button text */}
            <span className="relative z-10">Generate Another</span>
          </motion.button>

          {/* Download button */}
          <motion.a
            href={image}
            download="DreamPixels-AI-Image.png"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 12 }}
            className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 
             text-white px-10 py-3 rounded-full cursor-pointer shadow-md font-semibold 
             overflow-hidden group transition-all duration-500"
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
               translate-x-[-100%] group-hover:translate-x-[100%] 
               transition-transform duration-1000 ease-in-out"
            ></span>

            {/* Button text */}
            <span className="relative z-10">⬇ Download</span>
          </motion.a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
