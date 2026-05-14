import { AuthProvider } from "@/contexts/AuthContext";
import { StoreClickedNumProvider } from "@/contexts/quickCalculate/StoreClickedNum";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/routes";

import "./App.css";

function App() {
  return (
    <div className="bg-[#EBF4F6] min-h-screen w-screen">
      <AuthProvider>
        <StoreClickedNumProvider>
          <RouterProvider router={router} />
        </StoreClickedNumProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
