import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/api/endpoints/authApi";

import home from "../assets/icons/home.png";
import logoutIcon from "../assets/icons/logout.png";

const AdminNavBar = (props: any) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

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
    <div className="h-16 w-full pt-3 px-3 md:pt-6 md:px-6 flex justify-between items-center">
      {/* navBar right side part  */}
      <div
        className={`${
          props.pageName === "showHomePage" ? "flex" : "hidden"
        } text-3xl md:text-5xl baloo-bhai text-[#088395] px-4 py-1 rounded`}
      >
        1MinuteQuiz
      </div>
      <NavLink
        to="/admin"
        className={`${
          props.pageName !== "showHomePage" ? "flex" : "hidden"
        } group h-9 w-9 md:h-12 md:w-12 p-3 rounded-full bg-[#088395] text-white duration-300 hover:bg-white hover:text-[#088395] flex items-center justify-center`}
      >
        <img
          className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
          src={home}
          alt=""
        />
      </NavLink>
      {/* navBar left side part - icons */}
      <div className="flex gap-2 md:gap-4">
        <div
          className="group h-9 w-9 md:h-12 md:w-12 p-2 md:p-3 rounded-full bg-[#088395] duration-300 hover:bg-white flex items-center justify-center"
          onClick={performLogout}
        >
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={logoutIcon}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
