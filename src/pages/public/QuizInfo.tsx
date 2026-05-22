import NavBar from "@/components/NavBar";
import { useState } from "react";

type QuizType =
  | "quickCalculate"
  | "guessTheWord"
  | "memoryFlashQuiz"
  | "targetClickSpeed";

interface QuizInfoProps {
  defaultQuiz?: QuizType;
}

const QuizInfo = ({
  defaultQuiz = "quickCalculate",
}: QuizInfoProps) => {
  const [selectedQuiz, setSelectedQuiz] =
    useState<QuizType>(defaultQuiz);

  const quizData = {
    quickCalculate: {
      title: "Quick Calculate Quiz",
      color: "#0369a1",
      gradient:
        "from-cyan-500 via-sky-500 to-blue-600",
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
      icon: "🧮",
    },

    guessTheWord: {
      title: "Guess The Word Quiz",
      color: "#7c3aed",
      gradient:
        "from-violet-500 via-purple-500 to-fuchsia-600",
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
      icon: "🔤",
    },

    memoryFlashQuiz: {
      title: "Memory Flash Quiz",
      color: "#e11d48",
      gradient:
        "from-rose-500 via-pink-500 to-red-500",
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
      icon: "🧠",
    },

    targetClickSpeed: {
      title: "Target Click Speed Game",
      color: "#ea580c",
      gradient:
        "from-orange-500 via-amber-500 to-yellow-500",
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
      icon: "🎯",
    },
  };

  const currentQuiz = quizData[selectedQuiz];

  return (
    <div className="min-h-screen w-full flex flex-col items-center dark:bg-[#040c24] text-[#1e293b] dark:text-white overflow-hidden">
      <NavBar pageName="quizInformation" />

      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-purple-500/20 blur-3xl"></div>
      </div>

      <div className="w-full flex-grow px-4 md:px-10 py-10 flex flex-col items-center gap-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl baloo-bhai bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Quiz Information
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-300 text-lg md:text-xl">
            Learn the rules and gameplay before starting.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(quizData).map(([key, value]) => (
            <button
              key={key}
              onClick={() =>
                setSelectedQuiz(key as QuizType)
              }
              className={`px-5 md:px-7 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95
              
              ${
                selectedQuiz === key
                  ? `bg-gradient-to-r ${value.gradient}`
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              <span className="mr-2">{value.icon}</span>
              {value.title}
            </button>
          ))}
        </div>

        {/* Main Card */}
        <div className="w-full max-w-5xl relative">
          {/* Glow */}
          <div
            className="absolute -inset-1 rounded-3xl blur opacity-30"
            style={{
              background: `linear-gradient(to right, ${currentQuiz.color}, #ffffff)`,
            }}
          ></div>

          {/* Card */}
          <div className="relative bg-white/90 dark:bg-[#0b1736]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10 overflow-hidden">
            
            {/* Decorative */}
            <div
              className="absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl opacity-20"
              style={{
                backgroundColor: currentQuiz.color,
              }}
            ></div>

            {/* Title */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-5xl md:text-6xl">
                {currentQuiz.icon}
              </div>

              <h2
                className="text-3xl md:text-5xl baloo-bhai text-center"
                style={{
                  color: currentQuiz.color,
                }}
              >
                {currentQuiz.title}
              </h2>
            </div>

            {/* Content */}
            <div className="space-y-6 text-lg md:text-xl leading-relaxed">
              {/* Introduction */}
              <div className="bg-gray-100/70 dark:bg-[#111c3d] p-5 rounded-2xl">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{
                    color: currentQuiz.color,
                  }}
                >
                  Introduction
                </h3>

                <p>{currentQuiz.intro}</p>
              </div>

              {/* How to Play */}
              <div className="bg-gray-100/70 dark:bg-[#111c3d] p-5 rounded-2xl">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{
                    color: currentQuiz.color,
                  }}
                >
                  How To Play
                </h3>

                <p>{currentQuiz.howToPlay}</p>
              </div>

              {/* Rules */}
              <div className="bg-gray-100/70 dark:bg-[#111c3d] p-5 rounded-2xl">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{
                    color: currentQuiz.color,
                  }}
                >
                  Rules
                </h3>

                <ul className="space-y-2">
                  {currentQuiz.rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-1 h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            currentQuiz.color,
                        }}
                      ></span>

                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Goal */}
              <div className="bg-gray-100/70 dark:bg-[#111c3d] p-5 rounded-2xl">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{
                    color: currentQuiz.color,
                  }}
                >
                  Goal
                </h3>

                <p>{currentQuiz.goal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInfo;