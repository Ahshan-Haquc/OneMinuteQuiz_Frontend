import AdminNavBar from "@/components/AdminNavBar";
import { NavLink } from "react-router-dom";
import { useGetDashboardInfoQuery } from "@/redux/api/endpoints/adminApi";

const AdminDashboard = () => {
  const { data, isLoading, error } = useGetDashboardInfoQuery();
  const dashboardValues = {
    totalUserCount: data?.userCount || 0,
    totalFeedbackCount: data?.feedbackCount || 0,
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard.</div>;
  return (
    <div className="h-full w-full flex flex-col">
      <AdminNavBar pageName="showHomePage" />
      <div className="pb-10 flex flex-col md:flex-row flex-grow gap-10 items-center justify-center">
        {/* box  */}
        <div className="h-[250px] w-[300px] md:w-[600px] bg-[#088395] text-[#EBF4F6] rounded-md center flex-col gap-4 baloo-bhai">
          <div className="text-3xl md:text-4xl">Total Users</div>
          <div className="text-6xl md:text-8xl">
            {dashboardValues.totalUserCount}
          </div>
          <NavLink
            to="/admin/manage-users"
            className="h-9 md:h-12 w-[200px] md:w-[400px] bg-[#37B7C3] rounded-md center text-xl md:text-4xl hover:bg-[#35aab4]"
          >
            Manage Users
          </NavLink>
        </div>
        {/* box  */}
        <div className="h-[250px] w-[300px] md:w-[600px] bg-[#088395] text-[#EBF4F6] rounded-md center flex-col gap-4 baloo-bhai">
          <div className="text-3xl md:text-4xl">Total Feedbacks</div>
          <div className="text-6xl md:text-8xl">
            {dashboardValues.totalFeedbackCount}
          </div>
          <NavLink
            to="/admin/manage-feedback"
            className="h-9 md:h-12  w-[200px] md:w-[400px] bg-[#37B7C3] rounded-md center text-xl md:text-4xl hover:bg-[#35aab4]"
          >
            Manage Feedbacks
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
