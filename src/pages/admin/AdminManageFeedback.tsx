import AdminNavBar from "@/components/AdminNavBar";
import RatingBarChart from "@/components/quickQuiz/RatingBarChart";
import { useGetDashboardInfoQuery } from "@/redux/api/endpoints/adminApi";
import { useDeleteFeedbackMutation } from "@/redux/api/endpoints/feedbackApi";

const AdminManageUsers = () => {
  const { data, isLoading, error } = useGetDashboardInfoQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const totalFeedbacks = data?.userFeedbacks || [];
  const ratingCount = data?.ratingCount || {};
  const averageRating = data?.averageRating || 0;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading feedbacks.</div>;

  const deleteUserAccount = async (userFeedbackId: string) => {
    try {
      await deleteFeedback(userFeedbackId).unwrap();
      alert("Feedback deleted succesfully.");
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
            {totalFeedbacks.map((feedback: any, index: number) => (
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
