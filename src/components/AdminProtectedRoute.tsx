import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuthUser();

  if (user === undefined) {
    return <div>Loading...</div>; // Still verifying auth
  }

  if (user === null) {
    return <Navigate to="/login" />; // Not logged in
  }

  if (user.role !== "admin") {
    return (
      <div className="text-red-600 text-xl text-center mt-10">
        Access Denied: Admins Only
      </div>
    );
  }

  return <Outlet />; // Authorized as admin
};

export default AdminRoute;
