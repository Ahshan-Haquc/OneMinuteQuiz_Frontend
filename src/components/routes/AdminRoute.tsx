import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

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
