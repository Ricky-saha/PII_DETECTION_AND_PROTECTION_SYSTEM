import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../services/operations/authAPI";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // Default role is user
    avatar: null,
  });

  const { firstName, lastName, email, password, role, avatar } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(firstName, lastName, email, password, role, avatar, navigate));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
      avatar: null,
    });
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
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                    placeholder="First Name"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                    placeholder="Last Name"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                    placeholder="Email Address"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                    placeholder="Password"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={handleOnChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </motion.div>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                    required
                  />
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:from-purple-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                Sign Up
              </motion.button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-200 ease-in-out"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;