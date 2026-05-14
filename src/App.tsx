import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/routes";

import "./App.css";

// A wrapper to handle initial auth check
import { useGetMeQuery } from "@/redux/api/endpoints/authApi";

function AuthLoader({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGetMeQuery();
  if (isLoading) return <div>Loading...</div>;
  return <>{children}</>;
}

function App() {
  return (
    <div className="bg-[#EBF4F6] min-h-screen w-screen">
      <Provider store={store}>
        <AuthLoader>
          <RouterProvider router={router} />
        </AuthLoader>
      </Provider>
    </div>
  );
}

export default App;
