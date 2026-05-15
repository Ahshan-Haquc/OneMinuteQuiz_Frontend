import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useAppSelector } from "@/redux/hooks";
import { Star, Users } from "lucide-react";

const QuizButton = ({
  to,
  text,
  bg,
  rating,
  played,
}: {
  to: string;
  text: string;
  bg: string;
  rating: number;
  played: number;
}) => {
  return (
    <div
      className={`h-[170px] md:h-[260px] w-full ${bg} text-[#EBF4F6] rounded-2xl flex flex-col justify-between p-4 md:p-6 baloo-bhai shadow-lg hover:scale-[0.98] transition-all duration-300 relative overflow-hidden group`}
    >
      {/* Decorative background element for game theme vibe */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

      {/* Title */}
      <div className="text-2xl md:text-5xl text-center font-bold tracking-wide drop-shadow-sm mt-2">
        {text}
      </div>

      {/* Start Button Container */}
      <div className="flex justify-center my-2">
        <NavLink
          to={to}
          className="h-9 md:h-12 w-[140px] md:w-[180px] bg-[#37B7C3] hover:bg-[#EBF4F6] text-white hover:text-[#09637E] rounded-xl flex items-center justify-center text-xl md:text-3xl font-semibold transition-all duration-200 shadow-md transform active:scale-95"
        >
          Start
        </NavLink>
      </div>

      {/* Stats Bar (Played & Dynamic Ratings) */}
      <div className="flex justify-between items-center  px-3 py-1.5 md:py-2 rounded-xl text-xs md:text-base mt-1">
        {/* Played Counter */}
        <div className="flex items-center gap-1.5 font-sans font-medium text-white/90">
          <Users size={16} className="text-[#EBF4F6] opacity-90" />
          <span>{played.toLocaleString()} played</span>
        </div>

        {/* Dynamic Star Ratings */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= Math.round(rating);
            return (
              <Star
                key={star}
                size={16}
                className={`${
                  isFilled 
                    ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]" 
                    : "text-white/30 fill-white/5"
                }`}
              />
            );
          })}
        </div>
      </div>
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
          <QuizButton to="/quickCalculate" text="Quick Calculate" bg="bg-red-900" rating={4.5} played={1000} />
          {/* button 2 */}
          <QuizButton to="/guessTheWord" text="Quess The Word" bg="bg-blue-900" rating={4.2} played={1200}/>
          {/* button 3 */}
          <QuizButton to="/moneyFlash" text="Money Flash" bg="bg-purple-900" rating={4.8} played={900}/>
          {/* button 4 */}
          <QuizButton to="/targetClicker" text="Target Clicker" bg="bg-amber-900" rating={4.1} played={1100}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
