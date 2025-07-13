import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, sendLoginOtp } from "../../services/operations/authAPI";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get email, password, and role from location state
  const { email, password, role } = location.state || {};
  console.log("Location state received:", { email, password, role });
  
  // State for OTP inputs
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);
  
  // Effect for countdown timer
  useEffect(() => {
    if (!timer) return;
    
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timer]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  // Handle OTP input change
  const handleChange = (index, value) => {
    // Only allow digits
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  
  // Handle key press events
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // If pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      
      // Focus last input
      inputRefs.current[5].focus();
    }
  };
  
  // Resend OTP
  const handleResendOtp = async () => {
    if (!email || !password) {
      console.log("Email or password missing, redirecting to login");
      navigate("/login");
      return;
    }
    
    setIsResending(true);
    
    try {
      console.log("Requesting new OTP for email:", email);
      await dispatch(sendLoginOtp(email, password, () => {}));
      setTimer(300); // Reset timer to 5 minutes
      setOtp(["", "", "", "", "", ""]);
      toast.success("OTP resent successfully");
      
      // Focus first input
      inputRefs.current[0].focus();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };
  
  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      console.log("Email or password missing, redirecting to login");
      navigate("/login");
      return;
    }
    
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsVerifying(true);
    console.log("Verifying OTP:", otpValue);
    
    try {
      // Wrap the login dispatch in a Promise to handle the result
      const userData = await new Promise((resolve, reject) => {
        dispatch(login(email, password, otpValue, (success, userData) => {
          console.log("Login callback received:", { success, userData });
          if (success) {
            resolve(userData);
          } else {
            reject(new Error("Verification failed"));
          }
        }));
      });
      
      // If we reach here, login was successful
      console.log("Login successful, user data:", userData);
      toast.success("Login successful");
      
      // Determine destination based on role
      const userRole = userData?.role || role || "user";
      console.log("Role detected for navigation:", userRole);
      
      // Debug router and navigation
      console.log("React Router navigate function:", navigate);
      console.log("Current location:", window.location.href);
      
      try {
        console.log(`Attempting navigation to: ${userRole === "admin" ? "/admin-dashboard" : "/upload-documents"}`);
        
        // Add a slight delay before navigation
        setTimeout(() => {
          if (userRole === "admin") {
            console.log("Navigating to admin dashboard");
            navigate("/admin-panel", { replace: true });
          } else {
            console.log("Navigating to upload documents");
            navigate("/upload-documents", { replace: true });
          }
          
          // Check if navigation worked
          setTimeout(() => {
            console.log("Current location after navigation attempt:", window.location.href);
          }, 500);
        }, 300);
      } catch (navError) {
        console.error("Navigation error:", navError);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Invalid OTP. Please try again.");
      // Stay on the OTP verification page
    } finally {
      setIsVerifying(false);
    }
  };
  
  // Redirect to login if no email/password in state
  useEffect(() => {
    if (!email || !password) {
      console.log("No email/password in state, redirecting to login");
      navigate("/login");
    } else {
      console.log("Email and password found in state, continuing with OTP verification");
    }
  }, [email, password, navigate]);
  
  // Focus first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

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
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Verify OTP</h2>
            <p className="text-center text-gray-600 mb-6">
              Enter the 6-digit code sent to your email
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800 text-sm flex items-center justify-between">
                <span>Code expires in:</span>
                <span className={`font-mono font-medium ${timer < 60 ? "text-red-600" : ""}`}>
                  {formatTime(timer)}
                </span>
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : null}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                    disabled={isVerifying}
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isVerifying}
                className={`w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
                  isVerifying ? "opacity-70 cursor-not-allowed" : "hover:from-purple-600 hover:to-indigo-700"
                }`}
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
              </motion.button>
              
              <div className="text-center mt-6">
                <p className="text-gray-600 mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending || timer > 0 || isVerifying}
                  className={`text-indigo-600 font-medium hover:text-indigo-800 transition duration-200 ease-in-out ${
                    isResending || timer > 0 || isVerifying ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isResending ? "Sending..." : "Resend OTP"}
                </button>
              </div>
            </form>
          </div>
          
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => {
                console.log("Back to login button clicked");
                navigate("/login");
              }}
              disabled={isVerifying}
              className={`text-center w-full text-indigo-600 font-medium transition duration-200 ease-in-out ${
                isVerifying ? "opacity-50 cursor-not-allowed" : "hover:text-indigo-500"
              }`}
            >
              Back to Login
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;