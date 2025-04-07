import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      if (res.status === 200) {
        navigate("/login");
      } else {
        console.error("Logout failed:", res.data);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink 
              to="/" 
              className="flex items-center text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              <span className="text-indigo-600 mr-1">{"</"}</span>
              <span>DevTinder</span>
              <span className="text-indigo-600 ml-1">{">"}</span>
            </NavLink>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* Visible on medium screens and up */}
              <div className="hidden md:flex items-center space-x-1">
                <NavLink
                  to="/profile"
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/connections"
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  Connections
                </NavLink>
                <NavLink
                  to="/requests"
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  Requests
                </NavLink>
              </div>

              {/* Profile dropdown - shows only mobile menu items on small screens */}
              <div className="relative ml-3" ref={dropdownRef}>
                <div className="flex items-center space-x-2">
                  <span className="hidden md:inline text-sm font-medium text-gray-700">
                    Hi, {user.firstName}
                  </span>
                  <div className="relative">
                    <button 
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                    >
                      <img
                        className="h-8 w-8 cursor-pointer rounded-full object-cover border-2 border-indigo-200 hover:border-indigo-400 transition-colors"
                        src={user.photoUrl}
                        alt="User profile"
                      />
                    </button>
                    {isDropdownOpen && (
                      <div 
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                        onMouseLeave={() => setIsDropdownOpen(false)}
                      >
                        {/* Show these links only on mobile (md:hidden) */}
                        <div className="md:hidden">
                          <NavLink
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Your Profile
                          </NavLink>
                          <NavLink
                            to="/connections"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Connections
                          </NavLink>
                          <NavLink
                            to="/requests"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Requests
                          </NavLink>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;