import AdminNavBar from "@/components/AdminNavBar";
import { useGetDashboardInfoQuery, useDeleteUserMutation } from "@/redux/api/endpoints/adminApi";

const AdminManageUsers = () => {
  const { data, isLoading, error } = useGetDashboardInfoQuery();
  const [deleteUser] = useDeleteUserMutation();
  const totalUsers = data?.users || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

  const deleteUserAccount = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      alert("Account deleted succesfully.");
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
            {totalUsers.map((user: any, index: number) => (
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
