import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, logout, credit, loading } =
    useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 lg:w-60 drop-shadow-md"
        />
      </Link>

      {/* Right Side */}
      <div>
        {user ? (
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Credits Button */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-teal-500 px-4 sm:px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-500"
            >
              <img className="w-5" src={assets.credit_star} alt="credits" />
              <p className="text-xs sm:text-sm font-medium text-white">
                Credits left: {loading ? "Loading..." : credit ?? 0}
              </p>
            </button>

            {/* Username */}
            <p className="text-gray-800 font-medium max-sm:hidden pl-2">
              Hi, {user.name}
            </p>

            {/* Profile Dropdown */}
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow cursor-pointer"
                alt="profile"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-xl border shadow-md text-sm text-gray-700">
                  <li
                    onClick={logout}
                    className="py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Subscription */}
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer bg-gradient-to-r from-pink-500 to-teal-600 px-4 py-2 text-sm font-medium text-white rounded-full shadow-md hover:scale-105 transition-all duration-500"
            >
              Subscription
            </p>

            {/* Login */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-7 sm:px-10 py-2 text-sm font-medium rounded-full shadow-md hover:scale-105 transition-all duration-500"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
