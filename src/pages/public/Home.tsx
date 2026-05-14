import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useAppSelector } from "@/redux/hooks";
const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    document.title = "1MinuteQuiz";
  }, []);
  return (
    <div className="h-full w-full flex flex-col">
      <NavBar pageName="showHomePage" />
      <div className="pb-10 flex flex-col flex-grow gap-10 items-center justify-center dark:bg-[#071952]">
        {/* text part  */}
        <div className="center flex-col text-[#37B7C3]">
          <div className="text-3xl md:text-6xl center baloo-bhai">
            Welcome, {user?.name}
          </div>
          <div className="text-md md:text-2xl center baloo-bhai2">
            Are You Ready to Take an Attempt in the quize !
          </div>
        </div>
        {/* button part  */}
        <div className="center flex-col gap-3">
          {/* button 1 */}
          <div className="h-[150px] w-[300px] md:w-[600px] bg-[#088395] text-[#EBF4F6] rounded-md center flex-col gap-4 baloo-bhai">
            <div className="text-3xl md:text-5xl">Quick Calculate</div>
            <NavLink
              to="/quickCalculate"
              className="h-9 md:h-12 w-[160px] bg-[#37B7C3] rounded-md center text-2xl md:text-4xl hover:bg-[#35aab4]"
            >
              Start
            </NavLink>
          </div>
          {/* button 2 */}
          <div className="h-[150px] w-[300px] md:w-[600px] bg-[#088395] text-[#EBF4F6] rounded-md center flex-col gap-4 baloo-bhai">
            <div className="text-3xl md:text-5xl">Quess The Word</div>
            <NavLink
              to="/guessTheWord"
              className="h-9 md:h-12 w-[160px] bg-[#37B7C3] rounded-md center text-2xl md:text-4xl hover:bg-[#35aab4]"
            >
              Start
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
