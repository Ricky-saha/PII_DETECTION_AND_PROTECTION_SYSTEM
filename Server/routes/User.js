// Import the required modules
import express from "express";
import { login, signup, sendOtp } from "../controllers/auth.js";
import { createDocument } from "../controllers/documents.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Routes for Login, Signup, and Authentication

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

router.post("/sendotp", sendOtp)

// Export the router for use in the main application
export default router;