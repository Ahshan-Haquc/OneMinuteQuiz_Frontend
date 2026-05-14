import AdminNavBar from "@/components/AdminNavBar";
import { useState, useEffect } from "react";

const AdminManageUsers = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/loadAdminDashboardValues",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setTotalUsers(data.users);
        } else {
          alert("Response not come.");
        }
      } catch (error) {
        console.log("Error is fetching this page data : ", error);
        alert("Error catched.");
      }
    };

    fetchDashboardData();
  }, [totalUsers]);

  const deleteUserAccount = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Account deleted succesfully.");
        setTotalUsers(data.newUsers);
      } else {
        alert("Not deleted. Please try again.....");
      }
    } catch (error) {
      alert("Something is wrong to delete the account! Please try again.");
    }
  };
  return (
    <div className="h-fit w-full bg-[#EBF4F6]">
      <AdminNavBar pageName="manageUsers" />

      <div className="text-lg md:text-5xl baloo-bhai text-center my-6">
        Users
      </div>

      <div className="h-fit p-5 m-5 overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-[#37B7C3] text-white text-lg">
            <tr>
              <th className="py-3 px-4 text-left">Serial</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">Registration Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#EBF4F6] text-md">
            {totalUsers.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.registrationDate}</td>
                <td className="py-3 px-4 center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => deleteUserAccount(user._id)}
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
