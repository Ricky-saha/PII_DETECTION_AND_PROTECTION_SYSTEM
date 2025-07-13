// Import the required modules
import express from "express";
<<<<<<< HEAD
import { login, signup, sendOtp } from "../controllers/auth.js";
import { createDocument } from "../controllers/documents.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

=======
const router = express.Router();

// Import the required controllers and middleware functions
import { login, signup } from "../controllers/auth.js";
import { createDocument } from "../controllers/documents.js";
import { auth } from "../middlewares/auth.js";

>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
// Routes for Login, Signup, and Authentication

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

<<<<<<< HEAD
router.post("/sendotp", sendOtp)

=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
// Export the router for use in the main application
export default router;