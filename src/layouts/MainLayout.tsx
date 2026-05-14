import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      {/* You can add public header/navbar here if needed */}
      <Outlet />
      {/* You can add public footer here if needed */}
    </>
  );
}
