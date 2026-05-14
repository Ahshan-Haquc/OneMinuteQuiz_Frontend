import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AdminRoute from "@/components/routes/AdminRoute";
import NotFound from "@/pages/public/NotFound";

import Home from "@/pages/public/Home";
import GuessTheWord from "@/pages/public/GuessTheWord";
import QuickCalculate from "@/pages/public/QuickCalculate";
import Feedback from "@/pages/public/Feedback";
import QuizInfo from "@/pages/public/QuizInfo";

import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminManageUsers from "@/pages/admin/AdminManageUsers";
import AdminManageFeedback from "@/pages/admin/AdminManageFeedback";
import ManageGuessTheWord from "@/pages/admin/ManageGuessTheWord";
import ManageQuickCalculate from "@/pages/admin/ManageQuickCalculate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "guess-the-word",
        element: <GuessTheWord />,
      },
      {
        path: "quick-calculate",
        element: <QuickCalculate />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "quiz-info",
        element: <QuizInfo />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "manage-users",
        element: <AdminManageUsers />,
      },
      {
        path: "manage-feedback",
        element: <AdminManageFeedback />,
      },
      {
        path: "manage-guess-the-word",
        element: <ManageGuessTheWord />,
      },
      {
        path: "manage-quick-calculate",
        element: <ManageQuickCalculate />,
      },
    ],
  },
]);
