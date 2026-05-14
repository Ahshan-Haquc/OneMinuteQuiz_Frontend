import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useState } from "react";

const QuizInfo = () => {
  const [toggleDiv, setToggleDiv] = useState(false);

  return (
    <div className="h-full w-full flex flex-col bg-[#f0f8fa] text-[#1e293b] dark:bg-[#071952] dark:text-white">
      <NavBar pageName="quizInformation" />

      <div className="flex-grow  px-4 md:px-16 flex flex-col items-center justify-center gap-4">
        {/* Toggle Buttons */}
        <div className="flex gap-4 ">
          <button
            onClick={() => setToggleDiv(false)}
            className={`px-6 py-2 rounded-lg font-semibold shadow-md text-white transition duration-200 
              ${
                !toggleDiv ? "bg-[#0369a1]" : "bg-gray-400 hover:bg-[#0369a1]"
              }`}
          >
            Quick Calculate
          </button>
          <button
            onClick={() => setToggleDiv(true)}
            className={`px-6 py-2 rounded-lg font-semibold shadow-md text-white transition duration-200 
              ${toggleDiv ? "bg-[#7c3aed]" : "bg-gray-400 hover:bg-[#7c3aed]"}`}
          >
            Guess the Word
          </button>
        </div>

        {/* Quiz Info Section */}
        {!toggleDiv && (
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-10  border border-[#dbeafe]">
            <h2 className="text-2xl md:text-4xl font-bold text-center baloo-bhai text-[#0f172a] dark:text-black mb-6">
              Quick Calculate Quiz
            </h2>
            <div className="flex flex-col gap-4 text-lg md:text-xl dark:text-black">
              <p>
                <span className="font-semibold text-[#0369a1]">
                  Introduction:
                </span>{" "}
                Test your math speed! Quick Calculate challenges you with
                fast-paced arithmetic questions where every second counts.
              </p>
              <p>
                <span className="font-semibold text-[#0369a1]">
                  How to Play:
                </span>{" "}
                You’ll be shown a simple arithmetic problem (like 5 + 3 or 9 ×
                2). Click the correct number answer from the on-screen number
                buttons.
              </p>
              <p>
                <span className="font-semibold text-[#0369a1]">Rules:</span>
                <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
                  <li>You must answer each question before time runs out.</li>
                  <li>Each correct answer increases your score.</li>
                  <li>Wrong answers are recorded for feedback.</li>
                </ul>
              </p>
              <p>
                <span className="font-semibold text-[#0369a1]">Goal:</span> Get
                as many correct answers as possible within 1 minute.
              </p>
            </div>
          </div>
        )}

        {toggleDiv && (
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-10 border border-[#dbeafe]">
            <h2 className="text-2xl md:text-4xl font-bold text-center baloo-bhai text-[#0f172a] mb-6">
              Guess the Word Quiz
            </h2>
            <div className="flex flex-col gap-4 text-lg md:text-xl dark:text-black">
              <p>
                <span className="font-semibold text-[#7c3aed]">
                  Introduction:
                </span>{" "}
                Boost your vocabulary! Guess the Word presents you with
                scrambled letters or clues. Your task? Figure out the hidden
                word!
              </p>
              <p>
                <span className="font-semibold text-[#7c3aed]">
                  How to Play:
                </span>{" "}
                You'll be given a word with its letters shuffled. Type the
                correct word using the input box provided.
              </p>
              <p>
                <span className="font-semibold text-[#7c3aed]">Rules:</span>
                <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
                  <li>Each word must be guessed before the timer ends.</li>
                  <li>You can use hints (limited).</li>
                  <li>Wrong attempts are shown at the end.</li>
                </ul>
              </p>
              <p>
                <span className="font-semibold text-[#7c3aed]">Goal:</span>{" "}
                Guess as many correct words as possible to earn a high score.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default QuizInfo;
