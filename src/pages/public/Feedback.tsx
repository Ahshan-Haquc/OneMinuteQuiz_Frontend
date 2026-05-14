import React, { useState } from "react";
import starIcon from "@/assets/icons/star.png";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useAuthUser } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [selectedRating, setSelectedRating] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const { user } = useAuthUser();
  const navigate = useNavigate();

  const ratings = [5, 4, 3, 2, 1];

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    setIsDropdownOpen(false);
  };

  const handleSubmitFeedback = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        userName: user.name,
        feedbackText: feedbackText,
        rating: selectedRating,
      }),
    });
    if (response.ok) {
      alert("Thanks for your feedback!!!");
      navigate("/");
    }
    try {
    } catch (error) {
      alert("Feedback not sent. Please try later!");
    }
  };

  return (
    <div className="h-full w-full flex flex-col dark:bg-[#071952]">
      <NavBar pageName="homePage" />

      <div className="p-10 flex flex-col flex-grow gap-10">
        {/* above part  */}
        <div className="flex flex-col ">
          <div className="h-fit text-lg md:text-2xl text-[#071952] dark:text-white baloo-bhai">
            Feedback
          </div>
          <div className="h-fit text-sm md:text-xl text-[#071952] dark:text-white baloo-bhai2">
            We would love to hear your thoughts on how you felt to exploring
            these quizzes and how we can improve our website.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row bg-whi h-auto sm:h-12 items-start sm:items-center gap-4 sm:gap-0">
          <div className="relative h-full w-full sm:w-auto">
            <div
              className="flex items-center justify-between h-12 p-2 border border-gray-500 rounded-lg cursor-pointer bg-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-sm md:text-xl text-[#071952] flex items-center">
                {[...Array(selectedRating)].map((_, i) => (
                  <img
                    key={i}
                    src={starIcon}
                    alt="star"
                    className="w-4 h-4 ml-1 inline-block"
                  />
                ))}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-500 rounded-lg mt-1 shadow-lg">
                {ratings.map((rating) => (
                  <div
                    key={rating}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRatingSelect(rating)}
                  >
                    {[...Array(rating)].map((_, i) => (
                      <img
                        key={i}
                        src={starIcon}
                        alt="star"
                        className="w-4 h-4 mr-0.5 inline-block"
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-full flex-grow border-b-2 border-gray-500 mx-0 sm:mx-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Enter your feedback here..."
              className="w-full h-full bg-transparent text-sm md:text-xl text-[#071952] focus:outline-none"
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>

          <div className="h-full flex justify-center w-full sm:w-auto">
            <button
              onClick={handleSubmitFeedback}
              className="bg-[#37B7C3] text-white px-4 py-2 rounded-md hover:bg-[#35aab4] transition-colors duration-200 w-full sm:w-auto"
            >
              Submit Feedback
            </button>
          </div>
        </div>

        {/* below part */}
        <div className="flex flex-col gap-5 mt-12">
          <div className="flex flex-col">
            <div className="h-fit text-lg md:text-2xl text-[#071952] dark:text-white baloo-bhai">
              User Ratings
            </div>
            <div className="h-fit text-sm md:text-xl text-[#071952] dark:text-white baloo-bhai2">
              Nice to see that you are also here to participate in user feedback
            </div>
          </div>
          <div className="flex gap-5">
            <div className="min-h-[105px]  border border-gray-500 rounded-lg p-4">
              <div className="text-lg md:text-2xl text-[#071952] dark:text-white baloo-bhai">
                {`${selectedRating} `}
                <img
                  src={starIcon}
                  alt="star"
                  className="w-4 h-4 inline-block"
                />
              </div>
              <div className="text-xs md:text-sm text-gray-500 baloo-bhai2">
                Your rating <br />
              </div>
            </div>
            <div className="min-h-[105px]  border border-gray-500 rounded-lg p-4">
              <div className="text-lg md:text-2xl text-[#071952] dark:text-white baloo-bhai">
                4.5{" "}
                <img
                  src={starIcon}
                  alt="star"
                  className="w-4 h-4 inline-block"
                />
              </div>
              <div className="text-xs md:text-sm text-gray-500 baloo-bhai2">
                Average rating <br />
                Based on all user's rating
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Feedback;
