// import React, { useState } from "react";
// import "./login.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../../services/operations/authAPI"; // Adjust this import path as needed

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(formData.email, formData.password, navigate));
//   };

//   return (
//     <div className="addUser">
//       <h3>Sign in</h3>
//       <form className="addUserForm" onSubmit={handleSubmit}>
//         <div className="inputGroup">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             autoComplete="off"
//             placeholder="Enter your Email"
//             required
//           />
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             autoComplete="off"
//             placeholder="Enter your Password"
//             required
//           />
//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//         </div>
//       </form>
//       <div className="login">
//         <p>Don't have Account? </p>
//         <Link to="/" className="btn btn-primary">
//           Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { login, sendLoginOtp } from "../../services/operations/authAPI";
=======
import { login } from "../../services/operations/authAPI";
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
<<<<<<< HEAD
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b

  const [formData, setFormData] = useState({
    email: "",
    password: "",
<<<<<<< HEAD
    role: "user" // Default role
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      // Validate email and password
      if (!formData.email || !formData.password) {
        alert("Email and password are required");
        return;
      }
      
      // Request OTP
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
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
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
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h2>
<<<<<<< HEAD
            
            {!otpSent ? (
              // Step 1: Email, Password, and Role Form
              <form onSubmit={handleRequestOtp}>
                <div className="space-y-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      value={formData.password}
                      onChange={handleChange}
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
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
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
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:from-purple-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Request OTP
                </motion.button>
              </form>
            ) : (
              // Step 2: OTP Verification Form
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-blue-800 text-sm">
                      An OTP has been sent to your email. Please check your inbox and enter the code below.
                    </p>
                  </div>
                  
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      pattern="[0-9]{6}"
                      required
                    />
                  </motion.div>
                </div>
                
                <div className="flex justify-between mt-6 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="w-1/2 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
                    onClick={() => setOtpSent(false)}
                  >
                    Back
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
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
          
=======
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out"
                    placeholder="Password"
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
                Login
              </motion.button>
            </form>
          </div>
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/"
                className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-200 ease-in-out"
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