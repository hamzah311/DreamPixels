
import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
  const navigate = useNavigate()

  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='pb-16 text-center'
    >
      {/* Heading with stronger shadow for depth */}
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-extrabold text-teal-100 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] py-6 md:py-16'>
        See the Magic. Try Now
      </h1>

      <motion.button 
        onClick={() => navigate('/buy')} 
        whileHover={{
          scale: 1.08,
          boxShadow: "0px 12px 25px rgba(0,0,0,0.4)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative inline-flex items-center gap-3 px-12 py-4 rounded-full 
                  bg-gradient-to-r from-pink-500 to-teal-600 text-white font-semibold 
                  shadow-xl shadow-neutral-800 transition-all duration-500 
                  overflow-hidden group"
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] 
                        transition-transform duration-1000 ease-in-out">
        </span>

        {/* Button text */}
        <span className="relative z-10">Subscription</span>

        {/* Animated icon */}
        <motion.img
          src={assets.star_group}
          alt="stars"
          className="h-6 relative z-10"
          whileHover={{ rotate: -20 }}
          transition={{ type: "spring", stiffness: 250 }}
        />
      </motion.button>


    </motion.div>
  )
}

export default GenerateBtn

