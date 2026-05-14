import AdminNavBar from "../components/AdminNavBar";
import RatingBarChart from "../components/quickQuiz/RatingBarChart";
import { useState, useEffect } from "react";

const AdminManageUsers = () => {
  const [totalFeedbacks, setTotalFeedbacks] = useState([]);
  const [ratingCount, setRatingCount] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/loadAdminDashboardValues`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log("data come:", data);
        if (response.ok) {
          setTotalFeedbacks(data.userFeedbacks);
          setRatingCount(data.ratingCount);
          setAverageRating(data.averageRating);
          console.log(ratingCount);
          console.log(averageRating);
        } else {
          alert("Response not come.");
        }
      } catch (error) {
        console.log("Error is fetching this page data : ", error);
        alert("Error catched.");
      }
    };

    fetchDashboardData();
  }, [totalFeedbacks]);

  const deleteUserAccount = async (userFeedbackId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteFeedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userFeedbackId }),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Feedback deleted succesfully.");
        setTotalFeedbacks(data.newFeedback);
      } else {
        alert("Not deleted. Please try again.....");
      }
    } catch (error) {
      alert("Something is wrong to delete the account! Please try again.");
    }
  };
  return (
    <div className="h-fit w-full bg-[#EBF4F6] pb-8">
      <AdminNavBar pageName="manageUserFeedbacks" />

      <div className="text-lg md:text-5xl baloo-bhai text-center my-6">
        User Feedbacks
      </div>

      <RatingBarChart ratingData={ratingCount} averageRating={averageRating} />

      <div className="h-fit p-5 m-5 overflow-x-auto border shadow-md">
        <table className="w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-[#37B7C3] text-white text-lg">
            <tr>
              <th className="py-3 px-4 text-left">Serial</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Comment</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#EBF4F6] text-md ">
            {totalFeedbacks.map((feedback, index) => (
              <tr key={feedback._id} className="border-b border-gray-300">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{feedback.userName}</td>
                <td className="py-3 px-4">{feedback.rating}</td>
                <td className="py-3 px-4">{feedback.feedbackText}</td>
                <td className="py-3 px-4">{feedback.date}</td>
                <td className="py-3 px-4 center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => deleteUserAccount(feedback._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;
