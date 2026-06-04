import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import clock from "@/assets/icons/clock.png";
import { useUpdateTotalPlayCountMutation } from "@/redux/api/endpoints/quizApi";
import RatingModal from "@/components/RatingModal";
import { Loader } from "lucide-react";

// Types 
type GameStatus = "idle" | "showing" | "input" | "ended";
type SequenceMode = "numbers" | "letters" | "mixed" | "colors";

interface Stats {
    correct: number;
    wrong: number;
    streak: number;
    highStreak: number;
    total: number;
}

// Data
const NUMBERS = "23456789".split("");
const LETTERS = "BCDFGHJKLMNPQRSTVWXYZ".split("");
const COLORS = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Cyan"];

const COLOR_HEX: Record<string, string> = {
    Red: "#ef4444",
    Blue: "#3b82f6",
    Green: "#22c55e",
    Yellow: "#eab308",
    Purple: "#a855f7",
    Orange: "#f97316",
    Pink: "#ec4899",
    Cyan: "#06b6d4",
};

const TIME_LIMIT = 60;
const SHOW_DURATION = 3500; // ms the sequence is visible

// Sequence grows from 3 items (round 1) up to 8 max
const getSeqLength = (round: number) => Math.min(2 + round, 8);

const generateSeq = (mode: SequenceMode, len: number): string[] => {
    if (mode === "colors") {
        return [...COLORS].sort(() => Math.random() - 0.5).slice(0, Math.min(len, 5));
    }
    const pool =
        mode === "numbers" ? NUMBERS :
            mode === "letters" ? LETTERS :
                [...NUMBERS, ...LETTERS];
    return Array.from({ length: len }, () => pool[Math.floor(Math.random() * pool.length)]);
};

// Component
const MemoryFlashQuiz = () => {
    // Setup
    const [mode, setMode] = useState<SequenceMode>("mixed");
    const [reversed, setReversed] = useState(false);

    // Game state
    const [status, setStatus] = useState<GameStatus>("idle");
    const [sequence, setSequence] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string[]>([]);
    const [colorPicked, setColorPicked] = useState<string[]>([]);
    const [round, setRound] = useState(1);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [stats, setStats] = useState<Stats>({
        correct: 0, wrong: 0, streak: 0, highStreak: 0, total: 0,
    });
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

    // Refs to guard async timeouts after game ends
    const gameOverRef = useRef(false);
    const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [updateTotalPlayCount, { isLoading: isUpdateTotalPlayCountLoading }] = useUpdateTotalPlayCountMutation();

    useEffect(() => { document.title = "Memory Flash Quiz"; }, []);
    useEffect(() => () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); }, []);

    //  60-second countdown (runs while showing OR input) 
    useEffect(() => {
        if (status !== "showing" && status !== "input") return;
        const id = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    gameOverRef.current = true;
                    setStatus("ended");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [status]);

    //  Auto-hide sequence after SHOW_DURATION
    useEffect(() => {
        if (status !== "showing") return;
        const id = setTimeout(() => {
            if (gameOverRef.current) return;
            setUserInput(Array(sequence.length).fill(""));
            setColorPicked([]);
            setStatus("input");
            setTimeout(() => document.getElementById("mf-input-0")?.focus(), 60);
        }, SHOW_DURATION);
        return () => clearTimeout(id);
    }, [status, sequence.length]);

    // Game flow helpers
    const launchRound = (r: number) => {
        const seq = generateSeq(mode, getSeqLength(r));
        setSequence(seq);
        setFeedback(null);
        setRound(r);
        setStatus("showing");
    };

    const handleStart = () => {
        updateTotalPlayCount({ gameName: "memoryFlash" })
        gameOverRef.current = false;
        setStats({ correct: 0, wrong: 0, streak: 0, highStreak: 0, total: 0 });
        setTimeLeft(TIME_LIMIT);
        launchRound(1);
    };

    const processAnswer = (answer: string[]) => {
        // In reverse mode, the expected answer is the sequence flipped
        const expected = reversed ? [...sequence].reverse() : sequence;
        const isCorrect =
            answer.length === expected.length &&
            answer.every((v, i) => v.toUpperCase() === expected[i]);

        setStats((prev) => {
            const streak = isCorrect ? prev.streak + 1 : 0;
            return {
                correct: prev.correct + (isCorrect ? 1 : 0),
                wrong: prev.wrong + (isCorrect ? 0 : 1),
                streak,
                highStreak: Math.max(prev.highStreak, streak),
                total: prev.total + 1,
            };
        });
        setFeedback(isCorrect ? "correct" : "wrong");

        // Clear any previous pending round transition
        if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
        feedbackTimer.current = setTimeout(() => {
            if (!gameOverRef.current) launchRound(round + 1);
        }, 800);
    };

    const handleSubmit = () => {
        if (status !== "input" || feedback !== null) return;
        processAnswer(mode === "colors" ? colorPicked : userInput);
    };

    const handleEndGame = () => {
        setStatus("ended");
        setTimeLeft(0);

    };

    const handleInputChange = (value: string, index: number) => {
        if (!/^[A-Za-z0-9]?$/.test(value)) return;
        const updated = [...userInput];
        updated[index] = value.toUpperCase();
        setUserInput(updated);
        if (value && index < sequence.length - 1) {
            document.getElementById(`mf-input-${index + 1}`)?.focus();
        }
    };

    const handleColorPick = (color: string) => {
        if (colorPicked.length >= sequence.length) return;
        const seqCount = sequence.filter((s) => s === color).length;
        const pickedCount = colorPicked.filter((p) => p === color).length;
        if (pickedCount >= seqCount) return;
        setColorPicked([...colorPicked, color]);
    };

    // Derived 
    const submitDisabled =
        feedback !== null ||
        (mode === "colors"
            ? colorPicked.length < sequence.length
            : userInput.some((v) => !v));

    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    return (
        <div
            className="w-full min-h-screen pb-16  text-white dark:bg-[#040c24]"
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
            tabIndex={-1}
        >
            <NavBar pageName="Memory Flash Quiz" />

            {/*  End-Game Popup  */}
            {status === "ended" && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="w-full max-w-[500px] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
                        <div className="text-5xl mb-3">⏰</div>
                        <h2 className="text-3xl md:text-4xl baloo-bhai text-center mb-1">Time's Up!</h2>
                        <p className="text-gray-400 text-sm mb-6">Here's your final score</p>

                        {/* 4 stat boxes */}
                        <div className="grid grid-cols-2 gap-3 w-full mb-4">
                            {([
                                { label: "Total Rounds", value: stats.total, color: "text-white" },
                                { label: "Correct", value: stats.correct, color: "text-green-400" },
                                { label: "Wrong", value: stats.wrong, color: "text-red-400" },
                                { label: "Best Streak", value: stats.highStreak, color: "text-yellow-400" },
                            ] as const).map(({ label, value, color }) => (
                                <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                                    <div className={`text-4xl font-bold ${color}`}>{value}</div>
                                    <div className="text-xs text-gray-400 mt-1">{label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Accuracy */}
                        <div className="w-full bg-white/10 rounded-xl p-4 text-center mb-6">
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Accuracy</div>
                            <div className="text-5xl font-bold text-[#088395]">{accuracy}%</div>
                            <div className="w-full h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
                                <div
                                    className="h-full bg-[#088395] rounded-full transition-all duration-1000"
                                    style={{ width: `${accuracy}%` }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setStatus("idle")
                                setIsRatingOpen(true)
                            }}
                            className="w-full py-3 bg-[#088395] hover:bg-[#066574] transition-all duration-300 rounded-xl text-xl baloo-bhai hover:scale-105"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full flex flex-col items-center  mt-10 md:mt-16 px-4">

                {status === "idle" && (
                    <div className="flex flex-col items-center gap-7 w-full max-w-4xl">

                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-bold baloo-bhai text-gray-100 dark:text-white">
                                Memory Flash
                            </h1>
                            <p className="text-gray-200 dark:text-gray-400 mt-2 text-sm 2xl:text-base">
                                Watch the sequence · remember it · type it back before time runs out!
                            </p>
                        </div>

                        {/* Sequence type */}
                        <div className="w-full">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">
                                Sequence Type
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {([
                                    { id: "numbers", label: "Numbers", desc: "Digits 2–9" },
                                    { id: "letters", label: "Letters", desc: "A–Z consonants" },
                                    { id: "mixed", label: "Mixed", desc: "Numbers + Letters" },
                                    { id: "colors", label: "Colors", desc: "Click to recall" },
                                ] as const).map(({ id, label, desc }) => (
                                    <button
                                        key={id}
                                        onClick={() => setMode(id)}
                                        className={`py-4 px-4 rounded-2xl border-2 font-semibold text-left transition-all duration-200 ${mode === id
                                            ? "bg-[#088395] border-white text-white shadow-lg"
                                            : "border-gray-200 dark:border-gray-700 text-gray-100 dark:text-gray-200 hover:bg-[#088395] hover:text-white hover:border-[#088395]"
                                            }`}
                                    >
                                        <span className="block text-base leading-tight">{label}</span>
                                        <span className={`block text-xs mt-0.5 ${mode === id ? "text-white/70" : "text-gray-400"}`}>
                                            {desc}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reverse toggle */}
                        <div className="w-full flex items-center justify-between p-4 bg-white/5 dark:bg-white/5 rounded-2xl border border-gray-200/5 dark:border-gray-700">
                            <div>
                                <div className="font-semibold text-gray-300 dark:text-white">Reverse Mode</div>
                                <div className="text-xs text-gray-400 mt-0.5">Type the sequence in reverse order</div>
                            </div>
                            <button
                                onClick={() => setReversed((v) => !v)}
                                aria-label="Toggle reverse mode"
                                className={`w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1 flex-shrink-0 ml-4 ${reversed ? "bg-[#088395]" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${reversed ? "translate-x-7" : ""}`} />
                            </button>
                        </div>

                        {/* Difficulty note */}
                        <div className="w-full text-center text-xs text-gray-400 dark:text-gray-500 -mt-3">
                            Sequences grow longer every round: 3 → 4 → 5 → … up to 8
                        </div>

                        <button
                            onClick={handleStart}
                            disabled={isUpdateTotalPlayCountLoading}
                            className="w-full md:w-auto px-8 py-4 bg-gray-900  text-white rounded-2xl text-xl baloo-bhai transition-all hover:scale-105 shadow-lg"
                        >
                            {isUpdateTotalPlayCountLoading ? <>
                                <Loader className="animate-spin" size={20} />
                            </> : "Start Game"}
                        </button>
                    </div>
                )}

                {/* ACTIVE GAME — Showing & Input phases */}
                {(status === "showing" || status === "input") && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-5">

                        {/*  Top stats bar  */}
                        <div className="w-full flex items-center justify-between bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 gap-2">

                            {/* Timer */}
                            <div className="flex items-center gap-2 min-w-[90px]">
                                <img src={clock} alt="" className="h-5 w-5 opacity-70" />
                                <span className={`text-2xl font-bold baloo-bhai tabular-nums ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-[#088395]"
                                    }`}>
                                    00:{timeLeft.toString().padStart(2, "0")}
                                </span>
                            </div>

                            {/* Round + seq length */}
                            <div className="text-center">
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Round</div>
                                <div className="text-xl font-bold text-gray-800 dark:text-white">{round}</div>
                            </div>

                            {/* Live score */}
                            <div className="flex gap-4 items-center">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-green-500">{stats.correct}</div>
                                    <div className="text-[10px] text-gray-400">Correct</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-red-400">{stats.wrong}</div>
                                    <div className="text-[10px] text-gray-400">Wrong</div>
                                </div>
                                {stats.streak >= 2 && (
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-yellow-400">{stats.streak}</div>
                                        <div className="text-[10px] text-gray-400">Streak</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Feedback flash ───────────────────────────────────────────── */}
                        <div className={`h-9 flex items-center justify-center transition-all duration-200 ${feedback ? "opacity-100" : "opacity-0"}`}>
                            <div className={`px-5 py-1 rounded-full text-base font-semibold ${feedback === "correct"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                }`}>
                                {feedback === "correct" ? "Correct!" : "Wrong!"}
                            </div>
                        </div>

                        {/* ── Main card ────────────────────────────────────────────────── */}
                        <div className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 flex flex-col items-center gap-6 min-h-[280px]">

                            {/* SHOWING phase */}
                            {status === "showing" && (
                                <>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest animate-pulse">
                                        Memorize this sequence!
                                    </p>

                                    {/* Sequence display */}
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {sequence.map((item, i) =>
                                            mode === "colors" ? (
                                                <div
                                                    key={i}
                                                    className="w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-sm select-none"
                                                    style={{ backgroundColor: COLOR_HEX[item] }}
                                                >
                                                    {item}
                                                </div>
                                            ) : (
                                                <div
                                                    key={i}
                                                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#088395] text-white flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg select-none"
                                                >
                                                    {item}
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {reversed && (
                                        <p className="text-xs text-orange-400 font-semibold">
                                            You'll need to type this in REVERSE order
                                        </p>
                                    )}

                                    {/* Shrinking progress bar */}
                                    <div className="w-full max-w-sm h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-auto">
                                        <div
                                            key={`bar-${round}`}
                                            className="h-full bg-[#088395] rounded-full"
                                            style={{ animation: `mfShrink ${SHOW_DURATION}ms linear forwards` }}
                                        />
                                    </div>
                                </>
                            )}

                            {/* INPUT phase */}
                            {status === "input" && (
                                <>
                                    <p className={`text-xs font-semibold uppercase tracking-widest ${reversed
                                        ? "text-orange-400"
                                        : "text-gray-400 dark:text-gray-300"
                                        }`}>
                                        {reversed ? "Type in REVERSE order!" : "Type the sequence!"}
                                    </p>

                                    {/* Numbers / Letters / Mixed: single-char boxes  */}
                                    {mode !== "colors" && (
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {userInput.map((val, i) => (
                                                <input
                                                    key={i}
                                                    id={`mf-input-${i}`}
                                                    type="text"
                                                    maxLength={1}
                                                    value={val}
                                                    onChange={(e) => handleInputChange(e.target.value, i)}
                                                    disabled={feedback !== null}
                                                    className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold rounded-xl border-2 border-[#088395] bg-white dark:bg-white/10 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#088395] focus:border-transparent uppercase caret-transparent disabled:opacity-50"
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Colors: click to build answer */}
                                    {mode === "colors" && (
                                        <div className="flex flex-col items-center gap-4 w-full">
                                            {/* Answer slots (empty until filled) */}
                                            <div className="flex gap-3 flex-wrap justify-center items-center min-h-[72px]">
                                                {Array.from({ length: sequence.length }).map((_, i) =>
                                                    colorPicked[i] ? (
                                                        <div
                                                            key={i}
                                                            className="w-16 h-16 rounded-xl shadow flex items-center justify-center text-white text-xs font-bold"
                                                            style={{ backgroundColor: COLOR_HEX[colorPicked[i]] }}
                                                        >
                                                            {colorPicked[i]}
                                                        </div>
                                                    ) : (
                                                        <div
                                                            key={i}
                                                            className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"
                                                        />
                                                    )
                                                )}
                                            </div>

                                            {/* Clickable color buttons (only colors in the current sequence) */}
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {COLORS.filter((c) => sequence.includes(c)).map((c) => {
                                                    const pickedCount = colorPicked.filter((p) => p === c).length;
                                                    const seqCount = sequence.filter((s) => s === c).length;
                                                    const exhausted = pickedCount >= seqCount;
                                                    return (
                                                        <button
                                                            key={c}
                                                            onClick={() => handleColorPick(c)}
                                                            disabled={exhausted || feedback !== null}
                                                            className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all ${exhausted
                                                                ? "opacity-30 cursor-not-allowed scale-95"
                                                                : "hover:scale-105 shadow active:scale-95"
                                                                }`}
                                                            style={{ backgroundColor: COLOR_HEX[c] }}
                                                        >
                                                            {c}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {colorPicked.length > 0 && feedback === null && (
                                                <button
                                                    onClick={() => setColorPicked((p) => p.slice(0, -1))}
                                                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                                                >
                                                    ← Undo last
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitDisabled}
                                        className="mt-auto px-10 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 active:scale-95"
                                    >
                                        Submit
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Seq length indicator */}
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Sequence length this round:{" "}
                            <span className="font-semibold text-[#088395]">{sequence.length}</span>
                        </p>

                        <button
                            onClick={handleEndGame}
                            className="mt-auto px-10 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                            End Quiz
                        </button>

                    </div>
                )}
                <RatingModal
                    isOpen={isRatingOpen}
                    setIsOpen={setIsRatingOpen}
                    gameName={"MemoryFlash"}
                />
            </div>
            <style>{`
        @keyframes mfShrink {
          from { width: 100%; }
          to   { width:   0%; }
        }
      `}</style>
        </div>
    );
};

export default MemoryFlashQuiz;