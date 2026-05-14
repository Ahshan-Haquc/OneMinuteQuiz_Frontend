import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import darkmode from "../assets/icons/darkmode.png";
import { useDarkMode } from "../context/DarkModeContext";
import home from "../assets/icons/home.png";
import info from "../assets/icons/info.png";
import logout from "../assets/icons/logout.png";
import feedback from "../assets/icons/rate.png";

const NavBar = ({ pageName }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  // Get previously saved preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  // Apply dark mode class to <html> and save preference
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const performLogout = () => {
    localStorage.removeItem("token");
    try {
      fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <div className="h-16 w-full pt-3 pb-3 px-3 md:pt-6 md:px-6 flex justify-between items-center dark:bg-[#071952] z-101">
      {/* navBar right side part  */}
      <div
        className={`${
          pageName === "showHomePage" ? "flex" : "hidden"
        } text-3xl md:text-5xl baloo-bhai text-[#088395] px-4 py-1 rounded`}
      >
        1MinuteQuiz
      </div>
      <NavLink
        to="/"
        className={`${
          pageName !== "showHomePage" ? "flex" : "hidden"
        } group h-9 w-9 md:h-12 md:w-12 p-3 rounded-full bg-[#088395] text-white duration-300 hover:bg-white hover:text-[#088395] flex items-center justify-center`}
      >
        <img
          className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
          src={home}
          alt="home"
        />
      </NavLink>

      {/* navBar left side part - icons */}
      <div className="flex gap-2 md:gap-4">
        <NavLink
          to={"/feedback"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#071952]" : "bg-[#088395]"
            } group h-9 w-9 md:h-12 md:w-12 p-2 rounded-full text-white duration-300 hover:bg-white hover:text-[#088395] flex items-center justify-center`
          }
        >
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={feedback}
            alt="feedback"
          />
        </NavLink>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="group h-9 w-9 md:h-12 md:w-12 p-2 rounded-full bg-[#088395] text-white duration-300 hover:bg-white hover:text-[#088395] flex items-center justify-center"
        >
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={darkmode}
            alt="darkmode-toggle"
          />
        </button>

        <NavLink
          to="/quizInfo"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#071952]" : "bg-[#088395]"
            } group h-9 w-9 md:h-12 md:w-12 p-2 rounded-full text-white duration-300 hover:bg-white hover:text-[#088395] flex items-center justify-center`
          }
        >
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={info}
            alt="info"
          />
        </NavLink>

        <div
          className="group h-9 w-9 md:h-12 md:w-12 p-2 md:p-3 rounded-full bg-[#088395] duration-300 hover:bg-white flex items-center justify-center"
          onClick={performLogout}
        >
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={logout}
            alt="logout"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
