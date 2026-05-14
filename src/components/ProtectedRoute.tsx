import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuthUser();

  if (user === undefined) {
    return <div>Loading...</div>; // still don't know if logged in or not
  }

  if (user === null) {
    return <Navigate to="/login" />; // if not logged in, redirect to login page
  }

  return <Outlet />; // logged in - render the child components
};

export default ProtectedRoute;
