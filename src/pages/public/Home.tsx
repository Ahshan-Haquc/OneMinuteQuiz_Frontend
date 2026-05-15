import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useAppSelector } from "@/redux/hooks";
const QuizButton = ({
  to,
  text,
  bg,
  
}: {
  to: string;
  text: string;
  bg: string;
}) => {
  return (
    <div className={`h-[150px]  md:h-[250px] ${bg} text-[#EBF4F6]  rounded-md center flex-col gap-4 baloo-bhai hover:scale-95 transition-all duration-300`}>
      <div className="text-3xl md:text-5xl">{text}</div>
      <NavLink
        to={to}
        className="h-9 md:h-12 w-[160px] bg-[#37B7C3] rounded-md center text-2xl md:text-4xl hover:bg-[#35aab4]"
      >
        Start
      </NavLink>
    </div>
  );
};
const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    document.title = "1MinuteQuiz";
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar pageName="showHomePage" />
      <div className="pb-10  grow flex flex-col  gap-10 items-center justify-center dark:bg-[#040c24]">
        {/* text part  */}
        <div className="center flex-col text-white dark:text-[#37B7C3]">
          <div className="text-3xl md:text-6xl center baloo-bhai">
            Welcome, {user?.name}
          </div>
          <div className="text-md md:text-2xl center baloo-bhai2">
            Are You Ready to Take an Attempt in the quize !
          </div>
        </div>
        {/* button part  */}
        <div className="w-full max-w-7xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* button 1 */}
          <QuizButton to="/quickCalculate" text="Quick Calculate" bg="bg-red-900"/>
          {/* button 2 */}
          <QuizButton to="/guessTheWord" text="Quess The Word" bg="bg-blue-900"/>
          {/* button 3 */}
          <QuizButton to="/moneyFlash" text="Money Flash" bg="bg-purple-900"/>
          {/* button 4 */}
          <QuizButton to="/targetClicker" text="Target Clicker" bg="bg-amber-900"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
