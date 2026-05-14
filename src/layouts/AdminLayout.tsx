import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      {/* Admin specific Sidebar or Header can go here */}
      <Outlet />
    </>
  );
}
