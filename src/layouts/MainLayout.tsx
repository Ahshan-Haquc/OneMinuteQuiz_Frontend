import { Outlet } from "react-router-dom";
 import { ToastContainer} from 'react-toastify';

export default function MainLayout() {
  return (
    <div
      className="
        min-h-screen w-full
        bg-gradient-to-br
        from-[#071952]
        via-[#088395]
        to-[#37B7C3]
        relative
        overflow-hidden
      "
    >
      {/* Decorative glowing circles */}
      <div className="absolute top-[-120px] left-[-120px] h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-200/10 blur-3xl"></div>

      <div className="absolute top-[40%] left-[45%] h-[200px] w-[200px] rounded-full bg-blue-100/10 blur-3xl"></div>


      <ToastContainer />
      {/* Main page content */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
