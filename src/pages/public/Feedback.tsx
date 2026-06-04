import { useState } from "react";
import starIcon from "@/assets/icons/star.png";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import { useSubmitFeedbackMutation } from "@/redux/api/endpoints/feedbackApi";
import { toast } from "react-toastify";

const Feedback = () => {
  const [selectedRating, setSelectedRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const navigate = useNavigate();

  const [submitFeedback] = useSubmitFeedbackMutation();

  const ratings = [1, 2, 3, 4, 5];

  const handleSubmitFeedback = async () => {
    try {
      await submitFeedback({
        feedbackText: feedbackText,
        rating: selectedRating,
      }).unwrap();

      toast.success("Thanks for your feedback!!!");
      navigate("/");
    } catch (error) {
      toast.error("Feedback not sent. Please try later!");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col dark:bg-[#040c24] text-[#09637E]">
      <NavBar pageName="homePage" />

      <div className="max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col flex-grow gap-8">
        
        {/* Header Title Section */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl text-center font-bold baloo-bhai text-white dark:text-[#088395] mb-2">
            Share Your Thoughts
          </h1>
          <p className=" text-sm md:text-lg text-gray-200 dark:text-[#088395] text-center baloo-bhai2 w-full leading-relaxed">
            We would love to hear your thoughts on how you felt exploring
            our quizzes and how we can make our website even better for you.
          </p>
        </div>

        {/* Main Feedback Form Card */}
        <div className=" dark:bg-white/5 rounded-3xl p-6 md:p-8 shadow-xl border border-[#7AB2B2]/30 flex flex-col gap-6">
          
          {/* Tactile Interactive Star Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-base md:text-xl font-bold baloo-bhai text-white dark:text-[#088395]">
              Rate your experience:
            </label>
            <div className="flex items-center gap-2 bg-[#EBF4F6]/50 dark:bg-transparent p-3 rounded-2xl w-fit border border-[#7AB2B2]/20">
              {ratings.map((rating) => {
                const isActive = rating <= selectedRating;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setSelectedRating(rating)}
                    className={`p-1.5 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-90 ${
                      isActive ? "" : "opacity-40 grayscale"
                    }`}
                  >
                    <img
                      src={starIcon}
                      alt={`${rating} Star`}
                      className="w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-xs"
                    />
                  </button>
                );
              })}
              <span className="ml-2 font-bold baloo-bhai text-lg text-white dark:text-[#088395]">
                {selectedRating} / 5
              </span>
            </div>
          </div>

          {/* Upgraded Multi-line Input Field Container */}
          <div className="flex flex-col gap-2">
            <label className="text-base md:text-xl font-bold baloo-bhai text-white dark:text-[#088395]">
              Your Comments:
            </label>
            <div className="w-full bg-[#EBF4F6]/30 dark:bg-transparent border-2 border-[#7AB2B2]/40 focus-within:border-[#088395] rounded-2xl p-4 transition-all shadow-inner">
              <textarea
                placeholder="Tell us how was your experience? or how we can improve our platform?"
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full bg-transparent text-sm md:text-lg text-white dark:text-white focus:outline-none resize-none font-medium leading-relaxed placeholder-[#247070] dark:placeholder-white/30"
              />
            </div>
          </div>

          {/* Action Submit Area */}
          <div className="flex justify-end mt-2">
            <button
              disabled={!feedbackText}
              onClick={handleSubmitFeedback}
              className={`bg-[#088395] hover:bg-[#09637E] text-white font-bold baloo-bhai text-lg md:text-xl px-8 py-3.5 rounded-2xl transition-all duration-200  hover:shadow-lg active:scale-95 w-full sm:w-auto text-center ${!feedbackText ? "cursor-not-allowed bg-slate-400 hover:bg-slate-400" : ""}`}
            >
              Submit Feedback
            </button>
          </div>
        </div>

        {/* Stats and Analytics Section */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold baloo-bhai text-white dark:text-[#088395]">
              Community Ratings
            </h2>
            <p className="text-xs md:text-sm text-[#7AB2B2] font-semibold baloo-bhai2">
              Thank you for participating alongside our dynamic global community!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Live Selected Choice Stat Box */}
            <div className="bg-white border border-[#7AB2B2]/40 rounded-2xl p-4 md:p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
              <div>
                <div className="text-xs md:text-sm text-[#7AB2B2] font-bold uppercase tracking-wider baloo-bhai2 mb-1">
                  Your Current Choice
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#09637E] baloo-bhai">
                  {selectedRating}.0
                </div>
              </div>
              <div className="bg-[#EBF4F6] p-3 rounded-xl flex items-center gap-1">
                {[...Array(selectedRating)].map((_, i) => (
                  <img key={i} src={starIcon} alt="star" className="w-5 h-5 object-contain" />
                ))}
              </div>
            </div>

            {/* Total Community Summary Box */}
            <div className="bg-white border border-[#7AB2B2]/40 rounded-2xl p-4 md:p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
              <div>
                <div className="text-xs md:text-sm text-[#7AB2B2] font-bold uppercase tracking-wider baloo-bhai2 mb-1">
                  Global Platform Average
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#09637E] baloo-bhai">
                  4.5
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-1.5">
                <span className="text-xs font-bold text-amber-700 font-sans">Top Rated</span>
                <img src={starIcon} alt="star" className="w-6 h-6 object-contain" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Feedback;
