import AdminDashboard from "./pages/AdminDashboard";
import AdminManageFeedback from "./pages/AdminManageFeedback";
import AdminManageUsers from "./pages/AdminManageUsers";
import Feedback from "./pages/Feedback";
import GuessTheWord from "./pages/GuessTheWord";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageGuessTheWord from "./pages/ManageGuessTheWord";
import ManageQuickCalculate from "./pages/ManageQuickCalculate";
import QuickCalculate from "./pages/QuickCalculate";
import QuizInfo from "./pages/QuizInfo";
import Signup from "./pages/Signup";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { StoreClickedNumProvider } from "./context/quickCalculate/StoreClickedNum";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-[#EBF4F6] h-screen w-screen">
        <AuthProvider>
          <StoreClickedNumProvider>
            <BrowserRouter>
              <Routes>
                {/*Public route - (all user can access) */}

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/*Protected route - (unauthenticate user can not access) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/guessTheWord" element={<GuessTheWord />} />

                  <Route path="/quickCalculate" element={<QuickCalculate />} />

                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/quizInfo" element={<QuizInfo />} />
                </Route>
                <Route element={<AdminRoute />}>
                  <Route path="/adminDashboard" element={<AdminDashboard />} />
                  <Route
                    path="/adminManageUsers"
                    element={<AdminManageUsers />}
                  />
                  <Route
                    path="/adminManageFeedback"
                    element={<AdminManageFeedback />}
                  />
                  <Route
                    path="/manageGuessTheWord"
                    element={<ManageGuessTheWord />}
                  />
                  <Route
                    path="/manageQuickCalculate"
                    element={<ManageQuickCalculate />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </StoreClickedNumProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
