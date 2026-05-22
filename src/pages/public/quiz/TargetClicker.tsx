import NavBar from "@/components/NavBar";

import clock from "@/assets/icons/clock.png";
import { useEffect, useState } from "react";
import HighestScore from "@/components/quickQuiz/HighestScore";

const TargetClicker = () => {
  const [randomNumberTop, setRandomNumberTop] = useState<number>(50);
  const [randomNumberLeft, setRandomNumberLeft] = useState<number>(50);

  const [score, setScore] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);

  const [timeCount, setTimeCount] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [timerId, setTimerId] = useState<any>(null);

  // Load highest score
  useEffect(() => {
    const savedHighestScore = localStorage.getItem("targetHighestScore");

    if (savedHighestScore) {
      setHighestScore(Number(savedHighestScore));
    }
  }, []);

  // Generate random target position
  const generateRandomPosition = () => {
    const top = Math.floor(Math.random() * (85 - 10 + 1)) + 10;
    const left = Math.floor(Math.random() * (85 - 10 + 1)) + 10;

    setRandomNumberTop(top);
    setRandomNumberLeft(left);
  };

  // Start Game
  const startCountDown = () => {
    if (isRunning) return;

    setIsRunning(true);
    setScore(0);
    setTimeCount(60);

    generateRandomPosition();

    const interval = setInterval(() => {
      setTimeCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          endGame();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    setTimerId(interval);
  };

  // End Game
  const endGame = () => {
    if (timerId) {
      clearInterval(timerId);
    }

    setIsRunning(false);

    // Save highest score
    if (score > highestScore) {
      setHighestScore(score);
      localStorage.setItem("targetHighestScore", score.toString());
    }
  };

  // Quit manually
  const endCountDown = () => {
    endGame();
    setTimeCount(60);
  };

  // Handle target click
  const handleTargetClick = () => {
    if (!isRunning) return;

    setScore((prev) => prev + 1);

    generateRandomPosition();
  };

  return (
    <div className="w-full min-h-screen pb-3 md:pb-10 flex flex-col text-black dark:bg-[#040c24] overflow-hidden">
      <NavBar pageName="Target Clicker" />

      {/* Top Info Section */}
      <div className="w-full px-4 md:px-8 mt-2 md:mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
          
          {/* Timer */}
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center bg-[#EBF4F6] px-5 py-2 rounded-2xl border border-[#7AB2B2] shadow-md">
              <img
                src={clock}
                alt="clock"
                className="h-6 w-6 md:h-8 md:w-8"
              />

              <div className="ml-3 text-2xl md:text-4xl text-[#09637E] font-bold baloo-bhai">
                00:
                {isRunning
                  ? timeCount.toString().padStart(2, "0")
                  : "00"}
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="flex justify-center items-center gap-3 ">
            <div className="bg-[#EBF4F6] px-5 py-2 rounded-2xl border border-[#7AB2B2] shadow-md center">
              <div className="text-xl md:text-3xl text-[#09637E] font-bold baloo-bhai text-center">
                Score: {score}
              </div>
            </div>

            <div className="bg-[#EBF4F6] px-5 py-2 rounded-2xl border border-[#7AB2B2] shadow-md center">
              <div className="text-lg text-[#09637E] text-center baloo-bhai">
                Your Highest: {highestScore}
              </div>
            </div>
            <HighestScore/>
          </div>

          {/* Button */}
          <div className="flex justify-center md:justify-end">
            {!isRunning ? (
              <button
                className="w-full md:w-52 py-3 bg-black dark:bg-[#09637E] hover:bg-[#09637E] text-white rounded-2xl text-2xl baloo-bhai shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={startCountDown}
              >
                Start Game
              </button>
            ) : (
              <button
                className="w-full md:w-52 py-1 md:py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-base md:text-2xl baloo-bhai shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={endCountDown}
              >
                Quit Game
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative flex-grow mt-3 md:mt-10 border-2 border-dashed border-[#7AB2B2] mx-2 md:mx-8 rounded-3xl overflow-hidden bg-[#ebf4f61f] backdrop-blur-sm">
        
        {/* Instruction */}
        {!isRunning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h1 className="text-3xl md:text-6xl text-[#088395] baloo-bhai text-center">
              Click The Moving Target
            </h1>

            <p className="mt-4 text-lg md:text-2xl text-[#088395] text-center px-4">
              You have only 60 seconds. <br />
              Click as many targets as possible!
            </p>
          </div>
        )}

        {/* Target */}
        {isRunning && (
          <div
            className="absolute h-10 w-10 md:h-16 md:w-16 xl:h-20 xl:w-20 rounded-full cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90"
            onClick={handleTargetClick}
            style={{
              top: `${randomNumberTop}%`,
              left: `${randomNumberLeft}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60"></div>

            {/* Main Circle */}
            <div className="relative h-full w-full rounded-full bg-gradient-to-br from-red-400 to-red-700 border-4 border-white shadow-[0_0_30px_rgba(255,0,0,0.8)] flex items-center justify-center">
              
              {/* Inner Circle */}
              <div className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-white"></div>
            </div>
          </div>
        )}
      </div>

      {/* Result Popup */}
      {timeCount === 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl text-center">
            <h1 className="text-4xl text-[#088395] baloo-bhai mb-6">
              Time Over!
            </h1>

            <div className="space-y-4">
              <div>
                <p className="text-lg text-gray-500">
                  Your Final Score
                </p>

                <h2 className="text-6xl text-[#09637E] baloo-bhai">
                  {score}
                </h2>
              </div>

              <div>
                <p className="text-lg text-gray-500">
                  Highest Score
                </p>

                <h2 className="text-4xl text-[#088395] baloo-bhai">
                  {highestScore}
                </h2>
              </div>
            </div>

            <button
              className="mt-8 w-full py-3 bg-[#088395] hover:bg-[#09637E] text-white rounded-2xl text-2xl baloo-bhai transition-all duration-300 hover:scale-105"
              onClick={() => {
                setScore(0);
                setTimeCount(60);
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetClicker;