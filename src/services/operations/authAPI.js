/* ----------------------------------------------------------------
   Imports & Constants
---------------------------------------------------------------- */
import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import {
  setDashboardData,
  setError,
  setLoading as setAdminLoading,
} from "../../slices/adminSlice";

import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
  SIGNUP_API,
  LOGIN_API,
  VERIFY_OTP,
  UPLOAD_DOCUMENT_API,
  ADMIN_DASHBOARD,
} = endpoints;

/* ----------------------------------------------------------------
   AUTH ‑ SIGN‑UP
---------------------------------------------------------------- */
export function signUp(
  firstName,
  lastName,
  email,
  password,
  accountType, // "user" | "admin"
  avatar,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing you up...");
    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("accountType", accountType);
      if (avatar) formData.append("avatar", avatar, avatar.name);

      const response = await apiConnector("POST", SIGNUP_API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.success) throw new Error(response.message);

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP API ERROR:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ----------------------------------------------------------------
   AUTH ‑ LOGIN (step 1 – send OTP)
---------------------------------------------------------------- */
export function sendLoginOtp(email, password, setOtpSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", VERIFY_OTP, { email, password });
      if (!response.success) throw new Error(response.message);

      toast.success("OTP sent to your email");
      if (setOtpSent) setOtpSent(true);
      return response.otp; // for tests; remove in prod
    } catch (error) {
      console.error("SEND OTP API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
      throw error;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ----------------------------------------------------------------
   AUTH ‑ LOGIN (step 2 – verify OTP & log in)
---------------------------------------------------------------- */
export function login(email, password, otp, navigate, callback) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
        otp,
      });

      if (!response.success) throw new Error(response.message);

      toast.success(response.message || "Login successful");
      dispatch(setToken(response.token));

      /* -------- Store user & role -------- */
      const userImage =
        response.user.avatar ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`;

      const userData = { ...response.user, image: userImage };
      dispatch(setUser(userData));

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(response.token));

      /* -------- Navigate by role -------- */
      if (response.user.role === "admin") {
        navigate("/admin-panel");
      } else {
        navigate("/upload-documents");
      }

      if (typeof callback === "function") callback(true, userData);
    } catch (error) {
      console.error("LOGIN API ERROR:", error);
      toast.error(error.response?.data?.message || "Login failed");
      if (typeof callback === "function") callback(false);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ----------------------------------------------------------------
   AUTH ‑ LOGOUT
---------------------------------------------------------------- */
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/");
  };
}

/* ----------------------------------------------------------------
   DOCUMENT UPLOAD (User)
---------------------------------------------------------------- */
export function uploadDocument(file) {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    const toastId = toast.loading("Uploading document...");
    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      formData.append("documentImage", file);

      const response = await apiConnector("POST", UPLOAD_DOCUMENT_API, formData, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      });

      if (!response.success) throw new Error(response.message);

      toast.success("Document uploaded successfully");
    } catch (error) {
      console.error("UPLOAD DOCUMENT API ERROR:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired, please log in again");
        dispatch(setToken(null));
        localStorage.removeItem("token");
      } else {
        toast.error(error.response?.data?.message || "Upload failed");
      }
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ----------------------------------------------------------------
   ADMIN ‑ DASHBOARD
---------------------------------------------------------------- */
export function fetchAdminDashboard() {
  return async (dispatch) => {
    dispatch(setAdminLoading(true));

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in as admin");

      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 60000)
      );
      const response = await Promise.race([
        apiConnector("GET", ADMIN_DASHBOARD, null, {
          Authorization: `Bearer ${token}`,
        }),
        timeout,
      ]);

      const data = typeof response === "string" ? JSON.parse(response) : response;
      if (data.success && Array.isArray(data.data)) {
        dispatch(setDashboardData(data.data));
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("ADMIN DASHBOARD API ERROR:", error);
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setAdminLoading(false));
    }
  };
}
