import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useAuthUser();

  if (user === undefined) {
    return <div>Loading...</div>; // Still verifying auth
  }

  if (user === null) {
    return <Navigate to="/login" replace />; // Not logged in
  }

  if (user.role !== "admin") {
    return (
      <div className="text-red-600 text-xl text-center mt-10">
        Access Denied: Admins Only
      </div>
    );
  }

  return <>{children}</>; // Authorized as admin
};

export default AdminRoute;
