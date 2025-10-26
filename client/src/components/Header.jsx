import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [hovered, setHovered] = useState(null);
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >

      <motion.h1
        className="text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] mx-auto mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Craft <span className="text-teal-800 font-bold">Art</span> from{" "}
        <span className="text-teal-800 font-bold">Words</span> in seconds.
      </motion.h1>
      <motion.p
        className="text-center max-w-xl mx-auto mt-5 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        From imagination to illustration — watch AI transform your ideas into
        art within seconds.
      </motion.p>
      {/* Genrate button */}
      <motion.button
        onClick={onClickHandler}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -8, 0] }} // fade-in + floating loop
        transition={{
          default: { duration: 0.2 },
          opacity: { delay: 0.8, duration: 1 },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0px 12px 25px rgba(0,0,0,0.3)",
        }}
        className="relative group sm:text-lg text-white bg-teal-700 
             w-auto mt-8 px-8 py-2.5 flex items-center gap-2 
             rounded-full shadow-md overflow-hidden"
      >
        {/* Shimmer layer */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>

        {/* Content */}
        <motion.img
          src={assets.star_group}
          alt="stars"
          className="h-6 relative z-10"
          whileHover={{ rotate: 20 }}
          transition={{ type: "spring", stiffness: 250 }}
        />
        <span className="relative z-10">Render My Idea</span>
        <motion.img
          src={assets.star_group}
          alt="stars"
          className="h-6 relative z-10"
          whileHover={{ rotate: -20 }}
          transition={{ type: "spring", stiffness: 250 }}
        />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          gap: hovered !== null ? "2.5rem" : "0.75rem", // gap animates with spring
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex flex-wrap justify-center mt-16"
      >
        {[
          assets.sample_img_1,
          assets.sample_img_2,
          assets.sample_img_3,
          assets.sample_img_4,
          assets.sample_img_5,
          assets.sample_img_6,
        ].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt=""
            width={80}
            className="rounded cursor-default"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            animate={{
              scale:
                hovered === null
                  ? 1
                  : Math.abs(index - hovered) === 0
                  ? 1.6
                  : Math.abs(index - hovered) === 1
                  ? 1.3
                  : Math.abs(index - hovered) === 2
                  ? 1.1
                  : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-2 text-neutral-500"
      >
        Generated images from <b className="text-white">DreamPixels</b>
      </motion.p>
    </motion.div>
  );
};

export default Header;
