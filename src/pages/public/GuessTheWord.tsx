import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import clock from "@/assets/icons/clock.png";
import CharInputBox from "@/components/guessQuiz/CharInputBox";

const WORDS = ["APPLE", "MANGO", "CHAIR", "PHONE", "PLANT"];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const GuessTheWord = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(5).fill(""));
  const [placeholders, setPlaceholders] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [showingResult, setShowingResult] = useState(false);

  const setRandomPlaceholders = () => {
    const placeholderSet = new Set<number>();
    while (placeholderSet.size < 2) {
      placeholderSet.add(Math.floor(Math.random() * 5));
    }
    setPlaceholders([...placeholderSet]);
  };

  useEffect(() => {
    document.title = "Guess The Word";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomPlaceholders();
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  // removing from here

  const handleStart = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess(Array(5).fill(""));
    setRandomPlaceholders();
    setAttemptsLeft(5);
    setTimeLeft(60);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    // alert(`🛑 Game stopped. The word was: ${targetWord}`);
    setShowingResult(true);
  };

  const handleInputChange = (value: string, index: number) => {
    if (!/^[A-Za-z]?$/.test(value)) return;

    const updated = [...currentGuess];
    updated[index] = value;
    setCurrentGuess(updated);

    const nextIndex = findNextEditableIndex(index + 1);
    if (nextIndex !== -1) {
      const nextInput = document.getElementById(`input-${nextIndex}`);
      if (nextInput) nextInput.focus();
    }
  };

  const findNextEditableIndex = (startIdx: number) => {
    for (let i = startIdx; i < 5; i++) {
      if (!placeholders.includes(i)) return i;
    }
    return -1;
  };

  const handleSubmit = () => {
    const filled = currentGuess.every(
      (val, i) => placeholders.includes(i) || val !== ""
    );

    if (!filled) {
      alert("Please fill all letters (excluding placeholders)!");
      return;
    }

    const fullGuess = currentGuess.map((char, i) =>
      placeholders.includes(i) ? targetWord[i] : char
    );

    const guessWord = fullGuess.join("");

    if (guessWord === targetWord) {
      // alert("🎉 Correct! You guessed the word.");
      setIsRunning(false);
      setShowingResult(true);
      return;
    }

    const newGuesses = [...guesses, fullGuess];
    setGuesses(newGuesses);
    const remaining = attemptsLeft - 1;
    setAttemptsLeft(remaining);

    if (remaining === 0) {
      alert(`❌ Game Over! Correct word was: ${targetWord}`);
      setIsRunning(false);
    } else {
      setCurrentGuess(Array(5).fill(""));
    }
  };

  // Find first editable index
  const firstEditableIndex = currentGuess.findIndex(
    (_, i) => !placeholders.includes(i)
  );

  return (
    <div className="w-full min-h-screen max-h-fit pb-10 bg-white text-black dark:bg-[#071952]">
      <NavBar pageName="Guess The Word" />

      {/* showing result in popup after time is over  */}
      {showingResult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-[90%] max-w-[550px] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white rounded-2xl shadow-2xl p-8 relative animate-fadeIn center flex-col">
            <h2 className="text-3xl md:text-4xl baloo-bhai text-center mb-6 border-b pb-3">
              Guess the Word Result
            </h2>
            <div className="text-center">
              <div className="baloo-bhai2 text-xl md:text-2xl  text-green-400">
                Congratulations, Your Guess is Correct 🎉
              </div>
              {/* insted of this Congratulations , i want to show "you lose, the correct word was {targetWord}" */}
            </div>
            <button
              onClick={() => {
                setIsRunning(false);
                setShowingResult(false);
              }}
              className="mt-6 px-6 py-3 bg-[#088395] hover:bg-[#066574] transition-all duration-300 rounded-lg text-xl md:text-2xl baloo-bhai shadow-md hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="h-full w-full center flex-col md:flex-row gap-20 mt-12 md:mt-[80px] dark:bg-[#071952]">
        <div className="h-fit min-w-[300px] md:min-w-[600px] max-w-fit p-4 border border-gray-500 rounded-xl">
          {/* clock  */}
          <div className="mt-5 flex justify-center items-center gap-3 text-[#088395] text-5xl md:text-6xl baloo-bhai">
            <img src={clock} alt="clock" className="h-9 w-9 md:h-12 md:w-12" />
            <span className="pt-2">
              00:{timeLeft.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-3">
            {guesses.map((guessArr, attemptIdx) => (
              <div key={attemptIdx} className="flex gap-2">
                {guessArr.map((char, i) => (
                  <CharInputBox
                    key={i}
                    value={char}
                    index={i}
                    isDisabled={true}
                    onChange={() => {}}
                    autoFocus={false}
                  />
                ))}
              </div>
            ))}

            {isRunning && attemptsLeft > 0 && (
              <div className="flex gap-2">
                {currentGuess.map((char, i) => (
                  <CharInputBox
                    key={i}
                    value={placeholders.includes(i) ? targetWord[i] : char}
                    index={i}
                    onChange={handleInputChange}
                    isDisabled={placeholders.includes(i)}
                    autoFocus={i === firstEditableIndex}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* right side part */}
        <div className="text-2xl  text-gray-700 dark:text-white  center flex-col">
          <div>Attempts Left</div>
          <div className="text-4xl font-bold">{attemptsLeft}</div>
          <div className="flex flex-col items-center gap-4 mt-6">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="px-6 py-2 bg-[#088395] text-white rounded-lg text-xl"
              >
                Start Game
              </button>
            ) : (
              <>
                <div className="flex gap-4">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg text-xl"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleStop}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg text-xl"
                  >
                    Stop
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessTheWord;
