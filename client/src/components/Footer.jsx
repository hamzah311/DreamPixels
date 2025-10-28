// import React from 'react'
// import { assets } from '../assets/assets'
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        
//         <Link to="/">
//           <img src={assets.logo} alt="logo" width={200} />
//         </Link>
//         <p className='flex-1 border-l border-white pl-4 text-sm text-white '>Copyright 2025 @ Hamzah Imtiaz - All Right Reserved.</p>

//         <div className="flex items-center gap-3">
//           {/* Small - Instagram */}
//           <a
//             href="https://www.instagram.com/hamzah.arts"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-12 h-12 flex items-center justify-center hover:scale-150 transition-transform duration-300"
//           >
//             <img
//               src={assets.instagram}
//               alt="Instagram"
//               className="w-8 h-8"
//             />
//           </a>

//           {/* Medium - GitHub */}
//           <a
//             href="https://github.com/hamzah311"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-12 h-12 flex items-center justify-center hover:scale-150 transition-transform duration-300"
//           >
//             <img
//               src={assets.github}
//               alt="GitHub"
//               className="w-9 h-9"
//             />
//           </a>

//           {/* Large - LinkedIn */}
//           <a
//             href="https://www.linkedin.com/in/hamzahimtiaz"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-12 h-12 flex items-center justify-center hover:scale-150 transition-transform duration-300"
//           >
//             <img
//               src={assets.linkedin}
//               alt="LinkedIn"
//               className="w-10 h-10"
//             />
//           </a>
//         </div>

      
//     </div>
//   )
// }

// export default Footer
import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 py-3 mt-10 px-4 sm:px-8 border-t border-white/20">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img
          src={assets.logo}
          alt="logo"
          className="w-36 sm:w-50 md:w-54 hover:opacity-90 transition-opacity duration-300"
        />
      </Link>

      {/* Copyright */}
      <p className="text-center sm:text-left text-xs sm:text-sm text-white/80 leading-relaxed border-t sm:border-t-0 sm:border-l border-white/30 pt-3 sm:pt-0 sm:pl-4 max-w-[90%] sm:max-w-[400px]">
        © 2025 <span className="font-semibold text-white">Hamzah Imtiaz</span> — All Rights Reserved.
      </p>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-4 sm:gap-5">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/hamzah.arts"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:scale-125 hover:bg-white/10 transition-all duration-300"
        >
          <img src={assets.instagram} alt="Instagram" className="w-8 h-8 sm:w-9 sm:h-9" />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/hamzah311"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:scale-125 hover:bg-white/10 transition-all duration-300"
        >
          <img src={assets.github} alt="GitHub" className="w-8 h-8 sm:w-9 sm:h-9" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/hamzahimtiaz"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:scale-125 hover:bg-white/10 transition-all duration-300"
        >
          <img src={assets.linkedin} alt="LinkedIn" className="w-8 h-8 sm:w-9 sm:h-9" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
