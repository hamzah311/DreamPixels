import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        
        <Link to="/">
          <img src={assets.logo} alt="logo" width={200} />
        </Link>
        <p className='flex-1 border-l border-white pl-4 text-sm text-white '>Copyright 2025 @ Hamzah Imtiaz - All Right Reserved.</p>

        <div className="flex items-center gap-3">
          {/* Small - Instagram */}
          <a
            href="https://www.instagram.com/hamzah.arts"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center hover:scale-150 transition-transform duration-300"
          >
            <img
              src={assets.instagram}
              alt="Instagram"
              className="w-8 h-8"
            />
          </a>

          {/* Medium - GitHub */}
          <a
            href="https://github.com/hamzah311"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center hover:scale-150 transition-transform duration-300"
          >
            <img
              src={assets.github}
              alt="GitHub"
              className="w-9 h-9"
            />
          </a>

          {/* Large - LinkedIn */}
          <a
            href="https://www.linkedin.com/in/hamzahimtiaz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center hover:scale-150 transition-transform duration-300"
          >
            <img
              src={assets.linkedin}
              alt="LinkedIn"
              className="w-10 h-10"
            />
          </a>
        </div>

      
    </div>
  )
}

export default Footer
