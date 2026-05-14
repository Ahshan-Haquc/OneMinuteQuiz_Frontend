import { use, useEffect, useState } from "react";
import clock from "@/assets/icons/clock.png";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Number from "@/components/quickQuiz/Number";
import ShowingResult from "@/components/quickQuiz/ShowingResult";
import { useStoreClickedNum } from "@/contexts/quickCalculate/StoreClickedNum";
import HighestScore from "@/components/quickQuiz/HighestScore";

const operators = ["+", "-", "*"];

const QuickCalculate = () => {
  const { quickNum, setQuickNum } = useStoreClickedNum();
  const [showingResult, setShowingResult] = useState(false);
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
  const [timerId, setTimerId] = useState(null);

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
    setQuickNum(0);
    setScoreBoard({ totalAttempt: 0, wrongAnswer: 0, correctAnswer: 0 });
    setNum1(0);
    setNum2(0);
    setOperator("+");
  };

  const endCountDown = () => {
    if (timerId) clearInterval(timerId);
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

    setQuickNum(0);
    generateNewQuestion();
  };

  const handleClear = () => {
    setQuickNum(0);
  };

  const handleShowResultPopup = () => {
    setShowingResult(true);
  };
  const handleCloseResultPopup = () => {
    setShowingResult(false);
  };

  return (
    <div className="h-full w-full flex flex-col pb-5">
      {!isRunning ? (
        <NavBar pageName="showQuickCalculate" />
      ) : (
        <div className="h-16 w-full center text-2xl md:text-4xl text-gray-200 dark:bg-[#071952] dark:text-gray-800 baloo-bhai">
          Quick Calculate - Keep Going!
        </div>
      )}
      <div className="pb-10 flex flex-col md:flex-row flex-grow gap-10 items-center justify-center dark:bg-[#071952]">
        {/* left part */}
        <div className="h-[310px] w-[380px] md:h-[480px] md:w-[750px] mt-10 md:mt-1 p-3 border border-[#088395] rounded-2xl">
          {/* time part */}
          <div className="h-[10%] w-full flex items-center md:items-start">
            <div className="h-6 w-6 md:h-10 md:w-10">
              <img src={clock} alt="clock" />
            </div>
            <div className="ml-2 text-2xl md:text-5xl text-[#088395] baloo-bhai">
              00:{isRunning ? timeCount.toString().padStart(2, "0") : "00"}
            </div>
          </div>
          {/* question part */}
          <div className="h-[30%] w-full bg-slate-200 rounded-t-2xl center baloo-bhai text-3xl md:text-6xl">
            <div className="h-full w-full center ">
              <div>
                {num1} {operator} {num2} =
              </div>
              <div className="h-[50px] w-[60px] md:h-[85px] md:w-[136px] ml-3 bg-white border border-[#088395] center rounded-lg overflow-hidden">
                {quickNum}
              </div>
            </div>
          </div>
          {/* number part */}
          <div className="h-[60%] w-full">
            <div className="h-1/3 flex justify-between">
              {[1, 2, 3, 4, 5].map((n) => (
                <Number key={n} number={n} />
              ))}
            </div>
            <div className="h-1/3 my-1 flex justify-between">
              {[6, 7, 8, 9, 0].map((n) => (
                <Number key={n} number={n} />
              ))}
            </div>
            <div className="h-1/3 flex">
              <div
                className="h-full w-1/2 mr-2 bg-[#088395] hover:bg-yellow-500   hover:cursor-pointer text-[#071952] rounded-lg center text-2xl md:text-6xl baloo-bhai"
                onClick={handleClear}
              >
                Clear
              </div>
              <div
                className="h-full w-1/2 ml-2 bg-[#088395] hover:bg-green-500  hover:cursor-pointer text-white rounded-lg center text-2xl md:text-6xl baloo-bhai"
                onClick={handleSubmit}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
        {/* right part */}
        <div className="h-12 md:h-[480px] w-[350px] flex flex-col justify-between items-center dark:text-white">
          <div className="text-2xl md:text-4xl baloo-bhai hidden md:flex">
            Quick Calculate
          </div>
          <div className="flex flex-col gap-5 ">
            <HighestScore />
            <div className="center flex-col">
              <div className="baloo-bhai2 text-sm md:text-2xl">
                Total Attempt
              </div>
              <div className="baloo-bhai text-2xl md:text-5xl">
                {scoreBoard.totalAttempt}
              </div>
            </div>
            <div className="center flex-col">
              <div className="baloo-bhai2 text-sm md:text-2xl">
                Wrong Answer
              </div>
              <div className="baloo-bhai text-2xl md:text-5xl">
                {scoreBoard.wrongAnswer}
              </div>
            </div>
            <div className="center flex-col">
              <div className="baloo-bhai2 text-sm md:text-2xl">
                Correct Answer
              </div>
              <div className="baloo-bhai text-2xl md:text-5xl">
                {scoreBoard.correctAnswer}
              </div>
            </div>
          </div>

          {!isRunning ? (
            <div
              className="h-10 w-40 bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-3xl baloo-bhai"
              onClick={startCountDown}
            >
              Start
            </div>
          ) : (
            <div
              className="h-10 w-40 bg-[#FF0000] hover:bg-[#b30000] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-3xl baloo-bhai"
              onClick={endCountDown}
            >
              End
            </div>
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
    </div>
  );
};

export default QuickCalculate;
