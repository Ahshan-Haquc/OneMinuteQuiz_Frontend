import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/redux/api/endpoints/authApi";
import { FaUser, FaEnvelope, FaLock, FaCog } from 'react-icons/fa';

const Signup = () => {
  const [user, setUser] = useState({ userName: "", email: "", password: "" });
  const navigate = useNavigate();
  const [signup, { isLoading: loading }] = useSignupMutation();

  useEffect(() => {
    document.title = "Sign Up - 1MinuteQuiz";
    alert("You do not need to verify your email. It is open for all. Just create an account with random email and password to explore the website.")
  }, []);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        name: user.userName,
        email: user.email,
        password: user.password,
      }).unwrap();
      navigate("/login");
    } catch (error: any) {
      console.error("Error during signup:", error);
      alert(error?.data?.error || "An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-100 font-sans">

      {/* Left side with the signup form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#37B7C3] focus:ring-1 focus:ring-[#37B7C3] transition-all duration-300"
                required
                name="userName"
                onChange={handleInput}
              />
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 font-semibold text-white bg-gradient-to-r from-[#37B7C3] to-[#51D8C1] rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[#37B7C3] font-medium hover:underline transition-colors duration-200">
              Log in
            </NavLink>
          </p>
        </div>
      </div>

      {/* Right side with branding and text */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-[#37B7C3] to-[#51D8C1] text-white">
        <div className="text-center">
          <FaCog className="text-8xl md:text-9xl mx-auto mb-4 animate-spin-slow" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">1MinuteQuiz</h1>
          <p className="text-lg md:text-xl font-light max-w-sm mx-auto">
            Ready to test your vocabulary and math skills? Join now and start your challenge!
          </p>
        </div>
      </div>

    </div>
  );
};

export default Signup;