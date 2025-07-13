import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, sendLoginOtp } from "../../services/operations/authAPI";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      return;
    }

    try {
      await dispatch(sendLoginOtp(formData.email, formData.password, setOtpSent));
    } catch (error) {
      console.error("OTP request failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP sent to your email");
      return;
    }
    dispatch(login(formData.email, formData.password, otp, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Sign In
            </h2>

            {!otpSent ? (
              <form onSubmit={handleRequestOtp}>
                <div className="space-y-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none"
                      placeholder="Email Address"
                      required
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none"
                      placeholder="Password"
                      required
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none"
                      required
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:from-purple-600 hover:to-indigo-700 transition duration-300"
                >
                  Request OTP
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      An OTP has been sent to your email. Please check your inbox and enter the code below.
                    </p>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <input
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      maxLength="6"
                      pattern="[0-9]{6}"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none"
                      placeholder="Enter 6-digit OTP"
                      required
                    />
                  </motion.div>
                </div>

                <div className="flex justify-between mt-6 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="w-1/2 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400"
                    onClick={() => setOtpSent(false)}
                  >
                    Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-300"
                  >
                    Login
                  </motion.button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/"
                className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-200"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
