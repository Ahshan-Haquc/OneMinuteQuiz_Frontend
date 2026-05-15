import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/routes";

import "./App.css";

function AuthLoader({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function App() {
  return (
    <div className="min-h-screen w-screen">
      <Provider store={store}>
        <AuthLoader>
          <RouterProvider router={router} />
        </AuthLoader>
      </Provider>
    </div>
  );
}

export default App;
