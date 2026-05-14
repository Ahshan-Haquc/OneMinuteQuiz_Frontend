import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/api/endpoints/authApi";
import { FaEnvelope, FaLock, FaBolt } from 'react-icons/fa';

const Login = () => {
  const [formUser, setFormUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading: loading }] = useLoginMutation();

  useEffect(() => {
    document.title = "Login - 1MinuteQuiz";

    const timer = setTimeout(() => {
      alert(
        "You do not need to verify your email. It is open for all. Just create an account with random email and password to explore the website."
      );
    }, 3000); // 3 seconds delay

    // cleanup to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);


  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(formUser).unwrap();
      dispatch(setUser(data.user));
      if (data.user.role === "user") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-100 font-sans">

      {/* Left side with branding and text */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-[#37B7C3] to-[#51D8C1] text-white">
        <div className="text-center">
          <FaBolt className="text-8xl md:text-9xl mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">1MinuteQuiz</h1>
          <p className="text-lg md:text-xl font-light max-w-sm mx-auto">
            Test your knowledge and sharpen your skills in just 60 seconds.
            Get ready for a challenge!
          </p>
        </div>
      </div>

      {/* Right side with the login form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#37B7C3] focus:ring-1 focus:ring-[#37B7C3] transition-all duration-300"
                required
                name="email"
                onChange={handleInput}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#37B7C3] focus:ring-1 focus:ring-[#37B7C3] transition-all duration-300"
                required
                name="password"
                onChange={handleInput}
              />
            </div>

            <div className="w-full flex justify-end">
              <NavLink to="#" className="text-sm text-gray-500 hover:text-[#37B7C3] transition-colors duration-200">
                Forgot Password?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 font-semibold text-white bg-gradient-to-r from-[#37B7C3] to-[#51D8C1] rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-[#37B7C3] font-medium hover:underline transition-colors duration-200">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;