import { useState, useEffect } from "react";
import { Star, Loader2 } from "lucide-react";
import { useUpdateRatingOfSpecificGameMutation } from "@/redux/api/endpoints/quizApi";

interface RatingModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  gameName: string;
}

const RatingModal = ({ isOpen, setIsOpen, gameName }: RatingModalProps) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<string>("");

  const [updateRatingOfSpecificGame, { isLoading }] = useUpdateRatingOfSpecificGameMutation();

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setHoveredRating(0);
      setIsSubmitted(false);
      setApiMessage("");
    }
  }, [isOpen]);

  const handleRatingSubmit = async (selectedRating: number, isSkip = false) => {
    try {
      const response = await updateRatingOfSpecificGame({
        gameName,
        rating: selectedRating,
      }).unwrap();

      if (isSkip) {
        // Silent skip: Close immediately without showing messages
        setIsOpen(false);
        return;
      }

      if (response.status === "success") {
        setApiMessage(response.message || "Thanks for your rating.");
        setIsSubmitted(true);
      }
    } catch (error: any) {
      if (isSkip) {
        setIsOpen(false);
        return;
      }
      setIsSubmitted(true);
      setApiMessage(error?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleSkip = () => {
    handleRatingSubmit(5, true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] animate-fadeIn">
      {/* Modal Box */}
      <div className="w-[90%] max-w-[425px] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white rounded-2xl shadow-2xl p-6 relative">
        
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="text-2xl md:text-3xl baloo-bhai text-yellow-400 mb-2">
            {isSubmitted ? "Thank You!" : `Rate ${gameName}`}
          </h3>
          <p className="text-gray-300 text-sm md:text-base baloo-bhai2 opacity-90">
            {isSubmitted 
              ? "We appreciate your feedback." 
              : "Let us know your experience with this quiz!"}
          </p>
        </div>

        {isSubmitted ? (
          /* Success / Error Status Screen */
          <div className="flex flex-col items-center justify-center py-4 gap-6">
            <p className="text-center text-xl baloo-bhai2 font-medium px-2">
              {apiMessage}
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#088395] hover:bg-[#066574] transition-all duration-300 text-white px-8 py-2.5 rounded-lg text-lg font-semibold shadow-md active:scale-95"
            >
              Close
            </button>
          </div>
        ) : (
          /* User Input Star Screen */
          <div className="flex flex-col items-center gap-6 py-2">
            {/* Interactive Stars */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform duration-200 hover:scale-110 focus:outline-none disabled:opacity-50"
                >
                  <Star
                    size={40}
                    className={`transition-colors duration-200 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Custom Footer Actions */}
            <div className="flex items-center justify-between w-full mt-4 gap-4">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleSkip}
                className="text-gray-400 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/5 disabled:opacity-50"
              >
                Skip
              </button>

              <button
                type="button"
                disabled={rating === 0 || isLoading}
                onClick={() => handleRatingSubmit(rating)}
                className="bg-[#088395] hover:bg-[#066574] text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingModal;