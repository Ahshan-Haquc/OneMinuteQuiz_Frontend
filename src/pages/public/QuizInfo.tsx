import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";

type QuizType =
  | "quickCalculate"
  | "guessTheWord"
  | "memoryFlashQuiz"
  | "targetClickSpeed";

interface QuizInfoProps {
  defaultQuiz?: QuizType;
}

const QuizInfo = ({
  defaultQuiz = "guessTheWord",
}: QuizInfoProps) => {
  const [selectedQuiz, setSelectedQuiz] =
    useState<QuizType>(defaultQuiz);

  // Updated purely to align styling constants with your brand identity colors
  const quizData = {
    guessTheWord: {
      title: "Guess The Word Quiz",
      color: "#088395",
      bgClass: "bg-[#088395]",
      intro:
        "Boost your vocabulary and thinking speed! Guess hidden words using partially revealed letters.",
      howToPlay:
        "Some letters are shown automatically while the remaining letters must be typed correctly into input boxes.",
      rules: [
        "You get maximum 5 attempts for each word.",
        "Input focus automatically moves to the next box.",
        "Correct guesses increase your score.",
        "The game lasts 1 minute.",
      ],
      goal:
        "Guess as many words as possible before time ends.",
    },
        quickCalculate: {
      title: "Quick Calculate Quiz",
      color: "#09637E",
      bgClass: "bg-[#09637E]",
      intro:
        "Test your math speed! Quick Calculate challenges you with fast-paced arithmetic questions where every second counts.",
      howToPlay:
        "You’ll be shown arithmetic problems like addition, subtraction, or multiplication. Use the number buttons to answer quickly before time runs out.",
      rules: [
        "You must answer before the timer ends.",
        "Each correct answer increases your score.",
        "Wrong answers are counted separately.",
        "The game lasts 1 minute.",
      ],
      goal:
        "Score as many correct answers as possible within 60 seconds.",
    },
    memoryFlashQuiz: {
      title: "Memory Flash Quiz",
      color: "#09637E",
      bgClass: "bg-[#7AB2B2]",
      intro:
        "Challenge your memory power! Memorize sequences shown on screen and type them correctly before they disappear.",
      howToPlay:
        "A sequence of numbers, letters, or symbols appears briefly. Memorize it and type the exact sequence correctly.",
      rules: [
        "The sequence disappears after a few seconds.",
        "Each round becomes harder.",
        "Wrong answers reduce your accuracy.",
        "You only have 60 seconds.",
      ],
      goal:
        "Remember and type as many correct sequences as possible.",
    },

    targetClickSpeed: {
      title: "Target Click Speed Game",
      color: "#09637E",
      bgClass: "bg-[#09637E]",
      intro:
        "Test your reaction speed and mouse accuracy by clicking moving targets as fast as possible.",
      howToPlay:
        "A target appears at random positions on the screen. Click it quickly to increase your score before it moves again.",
      rules: [
        "Each successful click increases your score.",
        "Targets continuously change positions.",
        "You must react quickly within 1 minute.",
        "Higher speed means higher score.",
      ],
      goal:
        "Click as many targets as possible before time runs out.",
    },
  };

  const currentQuiz = quizData[selectedQuiz];

  return (
    <div className="min-h-screen flex flex-col items-center dark:bg-[#040c24] text-white  w-full overflow-x-hidden">
      <NavBar pageName="quizInformation" />

      {/* Brand-consistent Ambient Background Glow */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10px] left-[-50px] h-[300px] w-[300px] rounded-full bg-[#088395]/15 blur-3xl"></div>
        <div className="absolute bottom-[50px] right-[-50px] h-[350px] w-[350px] rounded-full bg-[#7AB2B2]/20 blur-3xl"></div>
      </div>

      <div className="w-full flex-grow py-8 px-4 md:py-12 flex flex-col items-center gap-8 max-w-7xl overflow-hidden">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl baloo-bhai text-gray-100 dark:text-[#09637E] drop-shadow-xs">
            Quiz Information
          </h1>
          <p className="mt-2 text-[#088395] text-base md:text-xl font-medium max-w-md mx-auto">
            Learn the rules and gameplay mechanics before diving into the action.
          </p>
        </div>

        {/* Dynamic Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full px-2">
          {Object.entries(quizData).map(([key, value]) => {
            const isSelected = selectedQuiz === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedQuiz(key as QuizType)}
                className={`px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 flex-grow sm:flex-grow-0 text-center
                ${
                  isSelected
                    ? `${value.bgClass} text-white shadow-[#088395]/20 ring-2 ring-white`
                    : " text-white border border-[#7AB2B2]/40 hover:bg-[#EBF4F6] hover:text-[#088395]"
                }`}
              >
                {value.title}
              </button>
            );
          })}
        </div>

        {/* Main Content Display Card */}
        <div className="w-full relative px-1 md:px-0">
          {/* Subtle Outer Card Glow */}
          <div className="absolute -inset-0.5 rounded-3xl blur-md opacity-25 bg-[#088395]"></div>

          {/* Core Content Container */}
          <div className="relative  rounded-3xl shadow-xl border border-[#7AB2B2]/30 p-5 md:p-10 overflow-hidden">
            
            {/* Visual Decorative Accent */}
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#EBF4F6] -z-0 opacity-60"></div>

            {/* Selected Quiz Headline */}
            <div className="flex items-center justify-center mb-8 relative z-10">
              <h2
                className="text-2xl md:text-4xl font-extrabold tracking-wide text-center uppercase border-b-4 pb-2 px-4 rounded-b-sm"
                style={{
                  borderColor: currentQuiz.color,
                }}
              >
                {currentQuiz.title}
              </h2>
            </div>

            {/* Structured Info Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3 text-sm md:text-base text-gray-700">
              
              {/* Introduction Card */}
              <div className="bg-[#EBF4F6]/60 border border-[#7AB2B2]/20 p-5 rounded-2xl flex flex-col transition-all hover:bg-white hover:shadow-sm">
                <h3
                  className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2"
                  style={{ color: currentQuiz.color }}
                >
                  <span className="w-1.5 h-4 rounded-sm bg-current inline-block"></span>
                  Introduction
                </h3>
                <p className="font-medium leading-relaxed text-gray-600">{currentQuiz.intro}</p>
              </div>

              {/* How to Play Card */}
              <div className="bg-[#EBF4F6]/60 border border-[#7AB2B2]/20 p-5 rounded-2xl flex flex-col transition-all hover:bg-white hover:shadow-sm">
                <h3
                  className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2"
                  style={{ color: currentQuiz.color }}
                >
                  <span className="w-1.5 h-4 rounded-sm bg-current inline-block"></span>
                  How To Play
                </h3>
                <p className="font-medium leading-relaxed text-gray-600">{currentQuiz.howToPlay}</p>
              </div>

              {/* Rules Card */}
              <div className="bg-[#EBF4F6]/60 border border-[#7AB2B2]/20 p-5 rounded-2xl md:col-span-2 flex flex-col transition-all hover:bg-white hover:shadow-sm">
                <h3
                  className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2"
                  style={{ color: currentQuiz.color }}
                >
                  <span className="w-1.5 h-4 rounded-sm bg-current inline-block"></span>
                  Rules
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuiz.rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 font-medium text-gray-600"
                    >
                      <span
                        className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: currentQuiz.color }}
                      ></span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Goal Card */}
              <div className="bg-[#EBF4F6]/60 border border-[#7AB2B2]/20 p-5 rounded-2xl md:col-span-2 flex flex-col transition-all hover:bg-white hover:shadow-sm">
                <h3
                  className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2"
                  style={{ color: currentQuiz.color }}
                >
                  <span className="w-1.5 h-4 rounded-sm bg-current inline-block"></span>
                  Goal
                </h3>
                <p className="font-medium leading-relaxed text-gray-600">{currentQuiz.goal}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInfo;