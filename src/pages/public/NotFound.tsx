import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#EBF4F6] px-4 text-center">
      {/* Quiz-themed visual element */}
      <div className="mb-6 animate-bounce">
        <span className="text-8xl font-black text-[#7AB2B2] block">?</span>
      </div>

      {/* Main Error Code */}
      <h1 className="text-7xl font-extrabold text-[#09637E] mb-2 tracking-tight">
        404
      </h1>

      {/* Playful Quiz Hook */}
      <h2 className="text-2xl font-bold text-[#09637E] mb-4">
        Oops! Wrong Answer.
      </h2>

      {/* Explanatory Text */}
      <p className="text-[#7AB2B2] text-lg max-w-md mb-8 font-medium">
        The page you are looking for doesn't exist, or has been moved to a different category. 
      </p>

      {/* Interactive CTA Button */}
      <Link
        to="/"
        className="inline-block bg-[#088395] hover:bg-[#09637E] text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Back to the Main Game
      </Link>
    </div>
  );
}