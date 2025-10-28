import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const Navbar = () => {
  const { user, setShowLogin, logout, credit, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 relative">
      {/* Logo */}
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <img
          src={assets.logo}
          alt="Logo"
          // className="w-32 sm:w-40 lg:w-60 drop-shadow-md"
          className="w-40 sm:w-50 lg:w-60 drop-shadow-md"

        />
      </Link>

      {/* Hamburger Icon (mobile only) */}
      <div
        className="sm:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X className="w-7 h-7 text-gray-800" />
        ) : (
          <Menu className="w-7 h-7 text-gray-800" />
        )}
      </div>

      {/* Right Side (desktop + mobile) */}
      <div
        className={`${
          menuOpen
            ? "absolute top-16 right-4 bg-white border rounded-xl shadow-md p-4 flex flex-col gap-4 items-center z-50 w-56 sm:hidden"
            : "hidden sm:flex items-center gap-3 sm:gap-5"
        }`}
      >
        {user ? (
          <>
            {/* Credits Button */}
            <button
              onClick={() => {
                navigate("/buy");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-teal-500 px-4 sm:px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-500"
            >
              <img className="w-5" src={assets.credit_star} alt="credits" />
              <p className="text-xs sm:text-sm font-medium text-white">
                Credits left: {loading ? "Loading..." : credit ?? 0}
              </p>
            </button>

            {/* Username & Profile */}
            <div
              className={`${
                menuOpen
                  ? "flex flex-col items-center gap-2" // mobile layout
                  : "flex items-center gap-2" // desktop layout
              }`}
            >
              <p className="text-gray-800 font-medium">Hi, {user.name}</p>
              <div className="relative group">
                <img
                  src={assets.profile_icon}
                  className="w-10 drop-shadow cursor-pointer"
                  alt="profile"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-xl border shadow-md text-sm text-gray-700">
                    <li
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Subscription */}
            <p
              onClick={() => {
                navigate("/buy");
                setMenuOpen(false);
              }}
              className="cursor-pointer bg-gradient-to-r from-pink-500 to-teal-600 px-4 py-2 text-sm font-medium text-white rounded-full shadow-md hover:scale-105 transition-all duration-500"
            >
              Subscription
            </p>

            {/* Login */}
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-7 sm:px-10 py-2 text-sm font-medium rounded-full shadow-md hover:scale-105 transition-all duration-500"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
