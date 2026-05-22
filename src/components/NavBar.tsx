import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import darkmode from "../assets/icons/darkmode.png";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleDarkMode } from "@/redux/features/ui/uiSlice";
import { useLogoutMutation } from "@/redux/api/endpoints/authApi";
import info from "../assets/icons/info.png";
import logoutIcon from "../assets/icons/logout.png";
import feedback from "../assets/icons/rate.png";
import { ChevronLeft } from "lucide-react";

const NavBar = ({ pageName }: { pageName?: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const performLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <div className="h-16 w-full pt-3 pb-3 px-3 md:pt-6 md:px-6 flex justify-between items-center dark:bg-[#040c24] z-101">
      {/* navBar right side part  */}
      <div
        className={`${pageName === "showHomePage" ? "flex" : "hidden"
          } text-3xl md:text-5xl baloo-bhai text-[#02adc7] px-4 py-1 rounded cursor-default`}
      >
        1MinuteQuiz
      </div>
      <button
        onClick={() => navigate(-1)}
        className={`${pageName !== "showHomePage" ? "flex" : "hidden"
          } group h-9 w-9 md:h-12 md:w-12 p-3 rounded-full hover:bg-[#088395] text-white duration-300  flex items-center justify-center`}
      >
        {/* <img
          className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
          src={home}
          alt="home"
        /> */}
        <ChevronLeft className="text-white group-hover:scale-110 duration-300" />
      </button>

      {/* navBar left side part - icons */}
      <div className="flex gap-2 md:gap-4">
        <NavLink
          to={"/feedback"}
          className={({ isActive }) =>
            `${isActive ? "bg-[#071952]" : ""
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
          onClick={() => dispatch(toggleDarkMode())}
          className={`group h-9 w-9 md:h-12 md:w-12 p-2 rounded-full  text-white duration-300 hover:bg-white hover:text-[#088395] flex items-center justify-center`}
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
            `${isActive ? "bg-[#071952]" : "bg-[#088395]"
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
            src={logoutIcon}
            alt="logout"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
