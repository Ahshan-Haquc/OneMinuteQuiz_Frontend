import { useEffect, useState } from "react";
import clock from "@/assets/icons/clock.png";
import NavBar from "@/components/NavBar";
import Number from "@/components/quickQuiz/Number";
import ShowingResult from "@/components/quickQuiz/ShowingResult";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setQuickNum } from "@/redux/features/quiz/quizSlice";
import HighestScore from "@/components/quickQuiz/HighestScore";
import { useUpdateTopThreeHighestScoresMutation, useUpdateTotalPlayCountMutation } from "@/redux/api/endpoints/quizApi";
import { Loader } from "lucide-react";
import RatingModal from "@/components/RatingModal";

const operators = ["+", "-", "*"];

const QuickCalculate = () => {
  const quickNum = useAppSelector((state) => state.quiz.quickNum);
  const dispatch = useAppDispatch();
  const [updateTotalPlayCount,{isLoading:isUpdateTotalPlayCountLoading}] = useUpdateTotalPlayCountMutation();
  const [updateTopThreeHighestScores] = useUpdateTopThreeHighestScoresMutation();

  const [showingResult, setShowingResult] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [timeCount, setTimeCount] = useState(60);
  const [scoreBoard, setScoreBoard] = useState({
    totalAttempt: 0,
    wrongAnswer: 0,
    correctAnswer: 0,
  });

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState<any>(null);

  useEffect(() => {
    document.title = "Quick Calculate";
  }, []);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setOperator(operators[Math.floor(Math.random() * operators.length)]);
  };

  const calculateAnswer = () => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return Math.abs(num1 - num2);
      case "*":
        return num1 * num2;
      default:
        return 0;
    }
  };

  const startCountDown = () => {
    if (isRunning) return;

    updateTotalPlayCount({gameName:"quickCalculate"});

    generateNewQuestion();
    setIsRunning(true);
    setTimeCount(60);

    const interval = setInterval(() => {
      setTimeCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleShowResultPopup();
          setIsRunning(false);
          setTimeCount(60);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(interval);
  };
  const resetStates = () => {
    if (timerId) clearInterval(timerId);
    setIsRunning(false);
    setTimeCount(60);
    dispatch(setQuickNum(0));
    setScoreBoard({ totalAttempt: 0, wrongAnswer: 0, correctAnswer: 0 });
    setNum1(0);
    setNum2(0);
    setOperator("+");
  };

  const endCountDown = () => {
    if (timerId) clearInterval(timerId);

    updateTopThreeHighestScores({gameName:"quickCalculate", score: scoreBoard.correctAnswer})

    handleShowResultPopup();
    setIsRunning(false);
    setTimeCount(60);
  };

  const handleSubmit = () => {
    if (!isRunning) return;

    const correctAnswer = calculateAnswer();
    const newAttempt = scoreBoard.totalAttempt + 1;

    if (quickNum === correctAnswer) {
      setScoreBoard((prev) => ({
        ...prev,
        totalAttempt: newAttempt,
        correctAnswer: prev.correctAnswer + 1,
      }));
    } else {
      setScoreBoard((prev) => ({
        ...prev,
        totalAttempt: newAttempt,
        wrongAnswer: prev.wrongAnswer + 1,
      }));
    }

    dispatch(setQuickNum(0));
    generateNewQuestion();
  };

  const handleClear = () => {
    dispatch(setQuickNum(0));
  };

  const handleShowResultPopup = () => {
    setShowingResult(true);
  };
  const handleCloseResultPopup = () => {
    setShowingResult(false);
    setIsRatingOpen(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col ">
      {!isRunning ? (
        <NavBar pageName="showQuickCalculate" />
      ) : (
        <div className="h-16 w-full flex items-center justify-center text-xl md:text-3xl text-white bg-[#09637E] baloo-bhai shadow-md">
          Quick Calculate - Keep Going!
        </div>
      )}

      <div className="dark:bg-[#040c24] flex flex-col md:flex-row grow gap-6 md:gap-12 items-center justify-center p-4">
        {/* Main Game Card */}
        <div className="w-full max-w-[380px] md:max-w-[750px] bg-white p-4 md:p-6 border-2 border-[#7AB2B2] dark:bg-[#040c24] rounded-3xl shadow-xl">
          {/* Timer Header */}
          <div className="flex items-center mb-4 bg-[#EBF4F6] w-fit px-4 py-1 rounded-full border border-[#7AB2B2]">
            <img src={clock} alt="clock" className="h-5 w-5 md:h-8 md:w-8" />
            <div className="ml-2 text-xl md:text-4xl text-[#09637E] font-bold baloo-bhai">
              00:{isRunning ? timeCount.toString().padStart(2, "0") : "00"}
            </div>
          </div>

          {/* Question Display */}
          <div className="h-32 md:h-48 w-full bg-[#09637E] rounded-2xl flex items-center justify-center baloo-bhai text-4xl md:text-7xl text-white shadow-inner mb-6">
            <div className="flex items-center gap-4">
              <span>{num1} {operator} {num2} =</span>
              <div className="min-w-[70px] md:min-w-[140px] px-2 py-1 bg-white text-[#088395] border-4 border-[#7AB2B2] rounded-xl flex items-center justify-center">
                {quickNum}
              </div>
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-5 gap-2 md:gap-4 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
              <Number key={n} number={n} />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 md:gap-6 h-14 md:h-20">
            <button
              className="flex-1 bg-orange-400 hover:bg-orange-500 text-white rounded-xl flex items-center justify-center text-xl md:text-4xl baloo-bhai transition-colors shadow-md active:scale-95"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              className="flex-1 bg-green-700 hover:bg-green-800 text-white rounded-xl flex items-center justify-center text-xl md:text-4xl baloo-bhai transition-colors shadow-md active:scale-95"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="w-full max-w-[350px] flex flex-col gap-6 items-center bg-white md:bg-transparent p-6 md:p-0 rounded-3xl">
          <div className="text-3xl md:text-4xl baloo-bhai text-white dark:text-white hidden md:block">
            Live Stats
          </div>

          <div className="grid grid-cols-3 md:grid-cols-1 gap-4 w-full">
            <HighestScore gameName="quickCalculate"/>
            <StatCard label="Total" value={scoreBoard.totalAttempt} color="text-[#09637E]" />
            <StatCard label="Wrong" value={scoreBoard.wrongAnswer} color="text-red-500" />
            <StatCard label="Correct" value={scoreBoard.correctAnswer} color="text-green-600" />
          </div>

          {!isRunning ? (
            <button
              className="w-full md:w-48 py-3 bg-[#088395] hover:bg-[#09637E] text-white rounded-2xl text-2xl baloo-bhai shadow-lg transition-transform hover:scale-105"
              onClick={startCountDown}
            >
              {isUpdateTotalPlayCountLoading ? <Loader className="animate-spin" size={18}/> : "Start Game"}
            </button>
          ) : (
            <button
              className="w-full md:w-48 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-2xl baloo-bhai shadow-lg transition-transform hover:scale-105"
              onClick={endCountDown}
            >
              Quit Game
            </button>
          )}
        </div>
      </div>

      {showingResult && (
        <ShowingResult
          scoreBoard={scoreBoard}
          onClose={handleCloseResultPopup}
          resetStates={resetStates}
        />
      )}

      <RatingModal
        isOpen={isRatingOpen} 
        setIsOpen={setIsRatingOpen} 
        gameName={"QuickCalculate"} 
      />
    </div>
  );
};

export default QuickCalculate;

// Helper component for layout cleanliness
const StatCard = ({ label, value, color }: any) => (
  <div className="flex flex-col items-center bg-white p-2 md:p-4 rounded-2xl shadow-sm border border-[#7AB2B2]/30 w-full">
    <div className="baloo-bhai2 text-xs md:text-lg text-gray-500 uppercase">{label}</div>
    <div className={`baloo-bhai text-xl md:text-4xl ${color}`}>{value}</div>
  </div>
);
