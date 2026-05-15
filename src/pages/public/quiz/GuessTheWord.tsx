import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import clock from "@/assets/icons/clock.png";
import CharInputBox from "@/components/guessQuiz/CharInputBox";

// Types
type Level = "easy" | "medium" | "hard";
type GameStatus = "idle" | "playing" | "won" | "lost";

interface GuessRecord {
  guess: string[];
  correct: boolean[];
}

// Word Banks
const WORDS: Record<Level, string[]> = {
  easy: [
    "APPLE", "MANGO", "CHAIR", "PHONE", "PLANT",
    "MONEY", "GRAPE", "OCEAN", "TIGER", "BRAIN",
    "FLAME", "GLOBE", "HORSE", "IVORY", "JEWEL",
  ],
  medium: [
    "ELEMENT", "CABINET", "JOURNEY", "BLANKET", "CAPTAIN",
    "DOLPHIN", "FACTORY", "HARMONY", "LANTERN", "MESSAGE",
    "PATTERN", "QUARTER", "RACCOON", "STATION", "TRUMPET",
  ],
  hard: [
    "ADVENTURE", "BEAUTIFUL", "CHALLENGE", "CHOCOLATE", "DANGEROUS",
    "ELABORATE", "FANTASTIC", "HIBERNATE", "INFLUENCE", "JUSTIFIED",
    "KNOWLEDGE", "LANDSCAPE", "MECHANISM", "NOURISHED", "ORGANISED",
  ],
};

const INITIAL_REVEALED: Record<Level, number> = {
  easy: 2,
  medium: 3,
  hard: 3,
};

const LEVEL_META: Record<Level, { label: string; letters: number; color: string; bg: string }> = {
  easy: { label: "Easy", letters: 5, color: "text-green-700", bg: "bg-green-100 border-green-400" },
  medium: { label: "Medium", letters: 7, color: "text-yellow-700", bg: "bg-yellow-100 border-yellow-400" },
  hard: { label: "Hard", letters: 9, color: "text-red-700", bg: "bg-red-100 border-red-400" },
};

const TIME_LIMIT = 60;
const MAX_ATTEMPTS = 5;

// Helpers
const getRandomWord = (level: Level): string => {
  const list = WORDS[level];
  return list[Math.floor(Math.random() * list.length)];
};

const getInitialRevealedPositions = (wordLength: number, count: number): number[] => {
  const set = new Set<number>();
  while (set.size < count) set.add(Math.floor(Math.random() * wordLength));
  return [...set];
};

// Component
const GuessTheWord = () => {
  const [level, setLevel] = useState<Level>("easy");
  const [targetWord, setTargetWord] = useState<string>("");
  const [revealedPositions, setRevealedPositions] = useState<number[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [guessHistory, setGuessHistory] = useState<GuessRecord[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);

  useEffect(() => { document.title = "Guess The Word"; }, []);

  // Timer 
  useEffect(() => {
    if (gameStatus !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); setGameStatus("lost"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStatus]);

  // Actions
  const handleStart = () => {
    const word = getRandomWord(level);
    const revealed = getInitialRevealedPositions(word.length, INITIAL_REVEALED[level]);
    setTargetWord(word);
    setRevealedPositions(revealed);
    setCurrentGuess(Array(word.length).fill(""));
    setGuessHistory([]);
    setAttemptsLeft(MAX_ATTEMPTS);
    setTimeLeft(TIME_LIMIT);
    setGameStatus("playing");
  };

  const handleStop = () => setGameStatus("lost");

  const handleInputChange = (value: string, index: number) => {
    if (!/^[A-Za-z]?$/.test(value)) return;
    const updated = [...currentGuess];
    updated[index] = value.toUpperCase();
    setCurrentGuess(updated);

    for (let i = index + 1; i < targetWord.length; i++) {
      if (!revealedPositions.includes(i)) {
        document.getElementById(`input-${i}`)?.focus();
        break;
      }
    }
  };

  const handleSubmit = () => {
    const allFilled = currentGuess.every(
      (val, i) => revealedPositions.includes(i) || val !== ""
    );
    if (!allFilled) { alert("Please fill all the blank letters!"); return; }

    const fullGuess = currentGuess.map((char, i) =>
      revealedPositions.includes(i) ? targetWord[i] : char
    );
    const newRevealed = [...revealedPositions];
    for (let i = 0; i < targetWord.length; i++) {
      if (!revealedPositions.includes(i) && fullGuess[i] === targetWord[i]) {
        newRevealed.push(i);
      }
    }

    // Record this attempt for history display
    const correctArr = fullGuess.map((char, i) => char === targetWord[i]);
    setGuessHistory((prev) => [...prev, { guess: fullGuess, correct: correctArr }]);

    // Win: all positions are now revealed
    if (newRevealed.length === targetWord.length) {
      setGameStatus("won");
      return;
    }

    // Update state for next attempt
    setRevealedPositions(newRevealed);
    const remaining = attemptsLeft - 1;
    setAttemptsLeft(remaining);

    if (remaining === 0) {
      setGameStatus("lost");
    } else {
      setCurrentGuess(Array(targetWord.length).fill(""));
    }
  };

  // Derived values
  const firstEditableIndex = currentGuess.findIndex((_, i) => !revealedPositions.includes(i));
  const isGameOver = gameStatus === "won" || gameStatus === "lost";

  return (
    <div className="w-full min-h-screen pb-10 flex flex-col text-black dark:bg-[#040c24]">
      <NavBar pageName="Guess The Word" />

      {/* Result Popup */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-[90%] max-w-[560px] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fadeIn">

            <h2 className="text-3xl md:text-4xl baloo-bhai text-center mb-4 border-b border-white/20 pb-3 w-full">
              Game Over
            </h2>

            {/* Win / Lose message */}
            {gameStatus === "won" ? (
              <p className="baloo-bhai2 text-xl md:text-2xl text-green-400 text-center">
                Congratulations! You guessed the word!
              </p>
            ) : (
              <p className="baloo-bhai2 text-xl md:text-2xl text-red-400 text-center">
                You lose! The correct word was{" "}
                <span className="font-bold text-white tracking-widest">{targetWord}</span>
              </p>
            )}

            {/* Guess history grid */}
            {guessHistory.length > 0 && (
              <div className="mt-5 w-full">
                <p className="text-sm text-gray-400 text-center mb-2">Your attempts:</p>
                <div className="flex flex-col items-center gap-2 overflow-y-auto max-h-52">
                  {guessHistory.map((record, idx) => (
                    <div key={idx} className="flex gap-1">
                      {record.guess.map((char, i) => (
                        <div
                          key={i}
                          className={`w-9 h-9 flex items-center justify-center rounded font-bold text-sm border ${record.correct[i]
                              ? "bg-green-600 border-green-400 text-white"
                              : "bg-red-700 border-red-500 text-white"
                            }`}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setGameStatus("idle")}
              className="mt-6 px-8 py-3 bg-[#088395] hover:bg-[#066574] transition-all duration-300 rounded-lg text-xl baloo-bhai shadow-md hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full grow flex flex-col items-center justify-center mt-12 md:mt-0 px-4">

        {/* Level Selection Screen */}
        {gameStatus === "idle" && (
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-3xl md:text-4xl 2xl:text-6xl font-bold baloo-bhai text-white dark:text-white text-center">
              Guess The Word
            </h1>
            <p className="text-gray-200 dark:text-gray-300 text-center max-w-4xl">
              Some letters are hidden. Fill in the blanks — correct letters get revealed each round!
            </p>

            <h2 className="text-xl font-semibold text-gray-400 dark:text-white baloo-bhai">
              Select Difficulty
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              {(["easy", "medium", "hard"] as Level[]).map((lvl) => {
                const meta = LEVEL_META[lvl];
                return (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`
                      w-40 md:w-80 py-4 lg:py-10 rounded-2xl border-2 font-semibold transition-all duration-200
                      ${meta.bg} ${meta.color}
                      ${level === lvl ? "scale-105 shadow-lg border-current" : "opacity-60 hover:opacity-90"}
                    `}
                  >
                    <span className="block text-xl capitalize">{meta.label}</span>
                    <span className="block text-sm mt-1">{meta.letters} letters</span>
                    {level === lvl && (
                      <span className="block text-xs mt-1 font-normal">✓ Selected</span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleStart}
              className="px-10 py-3 border border-white dark:border-transparent bg-[#088395] hover:bg-[#066574] text-white rounded-xl text-xl baloo-bhai transition-all duration-200 hover:scale-105 shadow-md"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Active Game */}
        {gameStatus === "playing" && (
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 h-full w-full justify-center items-center">

            {/* Left — board */}
            <div className="h-fit min-w-[300px] md:min-w-[520px] max-w-fit p-6 bg-white border border-gray-400 dark:border-gray-600 rounded-2xl">

              {/* Timer */}
              <div className="flex justify-center items-center gap-3 text-[#088395] text-5xl md:text-6xl baloo-bhai">
                <img src={clock} alt="clock" className="h-9 w-9 md:h-12 md:w-12" />
                <span className="pt-2">
                  00:{timeLeft.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Level badge */}
              <div className="flex justify-center mt-3">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold border ${LEVEL_META[level].bg} ${LEVEL_META[level].color}`}>
                  {LEVEL_META[level].label} — {targetWord.length} letters
                </span>
              </div>

              {/* Guess rows */}
              <div className="mt-6 flex flex-col items-center gap-3">

                {/* Previous (locked) attempts */}
                {guessHistory.map((record, attemptIdx) => (
                  <div key={attemptIdx} className="flex gap-2">
                    {record.guess.map((char, i) => (
                      <CharInputBox
                        key={i}
                        value={char}
                        index={i}
                        isDisabled={true}
                        onChange={() => { }}
                        autoFocus={false}
                      />
                    ))}
                  </div>
                ))}

                {/* Current editable row */}
                {attemptsLeft > 0 && (
                  <div className="flex gap-2">
                    {currentGuess.map((char, i) => (
                      <CharInputBox
                        key={i}
                        value={revealedPositions.includes(i) ? targetWord[i] : char}
                        index={i}
                        onChange={handleInputChange}
                        isDisabled={revealedPositions.includes(i)}
                        autoFocus={i === firstEditableIndex}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right — controls */}
            <div className="text-white dark:text-white flex flex-col items-center gap-2 ">

              <p className="text-xl">Attempts Left</p>
              <p className="text-5xl font-bold text-white dark:text-[#088395]">{attemptsLeft}</p>

              <p className="text-base opacity-60 capitalize mt-1">Level: {level}</p>

              {/* Hint: show how many hidden letters remain */}
              <p className="text-sm opacity-50 mt-1">
                {targetWord.length - revealedPositions.length} letter
                {targetWord.length - revealedPositions.length !== 1 ? "s" : ""} still hidden
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xl transition-all"
                >
                  Submit
                </button>
                <button
                  onClick={handleStop}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xl transition-all"
                >
                  Stop
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default GuessTheWord;