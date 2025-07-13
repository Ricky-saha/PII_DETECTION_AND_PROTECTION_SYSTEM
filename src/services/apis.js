const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  VERIFY_OTP:BASE_URL + "/auth/sendOtp",
  UPLOAD_DOCUMENT_API: BASE_URL + "/auth/upload-documents",
  ADMIN_DASHBOARD: BASE_URL + "/auth/admin-dashboard",

};


