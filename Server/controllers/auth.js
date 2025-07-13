import {encrypt,decrypt} from "../utils/Hashing.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
<<<<<<< HEAD
import OTP from "../models/OTP.js";
import otpGenerator from "otp-generator";
import {uploadImageToCloudinary} from "../utils/imageUploader.js"
import crypto from "crypto"



=======
import {uploadImageToCloudinary} from "../utils/imageUploader.js"
import crypto from "crypto"
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
dotenv.config();
const result = dotenv.config();
if (result.error) {
  console.log("Error loading .env file:", result.error);
} else {
  console.log(".env file loaded successfully");
}

// Signup Controller for Registering Users
const signup = async (req, res) => {
    try {
<<<<<<< HEAD
        const { firstName, lastName, email, password, accountType } = req.body;

        // Validate required fields
=======
        const { firstName, lastName, email, password } = req.body;

>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        if (!firstName || !lastName || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // Validate password strength
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            });
        }
<<<<<<< HEAD
        
        // Generate email hash and check for existing user
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        const emailHash = crypto.createHash('sha256').update(email).digest('hex');
        const existingUser = await User.findOne({ emailHash });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

<<<<<<< HEAD
        // Check for avatar image
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        const avatarLocalPath = req.files?.avatar;
        if (!avatarLocalPath) {
            return res.status(400).json({
                success: false,
                message: "Please provide an avatar image",
            });
        }

<<<<<<< HEAD
        // Upload image to Cloudinary
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        const avatar = await uploadImageToCloudinary(
            avatarLocalPath,
            process.env.FOLDER_NAME
        );

        if (!avatar) {
            return res.status(400).json({
                success: false,
                message: "Avatar upload failed",
            });
        }

<<<<<<< HEAD
        // Get encryption secret from environment variables
=======
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        const secret = process.env.ENCRYPTION_SECRET;
        if (!secret) {
            throw new Error('ENCRYPTION_SECRET is not set in environment variables');
        }
        
<<<<<<< HEAD
        // Prepare data for user creation
        console.log("Creating user with email hash:", emailHash);
        
        // Determine account type (Admin or User) from role
        const normalizedRole = accountType ? (accountType.toLowerCase() === "admin" ? "Admin" : "User") : "User";
        
        // Encrypt user data
=======
        console.log(emailHash);
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        const encryptedFirstName = encrypt(firstName, secret);
        const encryptedLastName = encrypt(lastName, secret);
        const encryptedEmail = encrypt(email, secret);
        const encryptedPassword = encrypt(password, secret);
        const encryptedAvatar = encrypt(avatar.url, secret);
<<<<<<< HEAD
        const encryptedAccountType = encrypt(normalizedRole, secret);

        // Create user in database
=======

>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        const user = await User.create({
            firstName: encryptedFirstName,
            lastName: encryptedLastName,
            email: encryptedEmail,
<<<<<<< HEAD
            emailHash: emailHash,
            password: encryptedPassword,
            avatar: encryptedAvatar,
            accountType: encryptedAccountType  // This was missing in the original code
        });

        // Return success response
=======
            emailHash:emailHash,
            password: encryptedPassword,
            avatar: encryptedAvatar
        });

>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
<<<<<<< HEAD
                firstName: decrypt(user.firstName, secret),
                lastName: decrypt(user.lastName, secret),
                email: decrypt(user.email, secret),
                emailHash: emailHash,
                avatar: decrypt(user.avatar, secret),
                role: normalizedRole.toLowerCase()  // Return role in lowercase for frontend
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
=======
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                emailHash:emailHash,
                avatar: user.avatar,
            },
            
        });
    } catch (error) {
        console.error(error);
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};
<<<<<<< HEAD


// Login Controller for Registered Users with OTP verification
const login = async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        // Check if all required fields are provided
        if (!email || !password || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please fill up all the required fields (email, password, and OTP)",
=======
// login Controller for Registered Users
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill up all the required fields",
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
            });
        }

        const secret = process.env.ENCRYPTION_SECRET;
<<<<<<< HEAD
        // Create email hash for database lookup
        const emailHash = crypto.createHash('sha256').update(email).digest('hex');
        console.log("Login attempt for:", emailHash);
        
        // Find user by email hash
        const user = await User.findOne({ emailHash: emailHash });
        
=======
        // const encryptedEmail = encrypt(email, secret);
        const emailHash = crypto.createHash('sha256').update(email).digest('hex');
        console.log("login", emailHash);
        const user = await User.findOne({ emailHash: emailHash });

>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered with us. Please sign up to continue.",
            });
        }
<<<<<<< HEAD
        
        // Verify password
        const decryptedPassword = decrypt(user.password, secret);
        
=======

        const decryptedPassword = decrypt(user.password, secret);

>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        if (password !== decryptedPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
<<<<<<< HEAD

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("OTP response:", response);
        
        // Verify OTP
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "No OTP found. Please request a new OTP.",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }
        
        // OTP is valid, proceed with login
        const decryptedEmail = decrypt(user.email, secret);
        const decryptedAccountType = decrypt(user.accountType, secret);
        
        // Convert accountType to role format for frontend (admin/user)
        const userRole = decryptedAccountType === "Admin" ? "admin" : "user";
        
        // Generate JWT token
        const token = jwt.sign(
            { email: decryptedEmail, id: user._id, role: userRole },
=======
        const decryptedEmail= decrypt(user.email, secret)
        const token = jwt.sign(
            { email:decryptedEmail, id: user._id },
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
        );
        
<<<<<<< HEAD
        // Update user with token
        await User.findByIdAndUpdate(user._id, { token: token });
        
        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
=======
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };
<<<<<<< HEAD
        
        // Send successful response with token and user data
=======

>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                firstName: decrypt(user.firstName, secret),
                lastName: decrypt(user.lastName, secret),
<<<<<<< HEAD
                email: decryptedEmail,
                avatar: decrypt(user.avatar, secret),
                role: userRole // Using converted role format for frontend
=======
                email: decrypt(user.email, secret),
                avatar: decrypt(user.avatar, secret)
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
            },
            message: "User login successful",
        });
    } catch (error) {
<<<<<<< HEAD
        console.error("Login error:", error);
=======
        console.error(error);
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
        return res.status(500).json({
            success: false,
            message: "Login failure. Please try again.",
        });
    }
};

<<<<<<< HEAD


// Send OTP specifically for login verification
const sendOtp = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Get encryption secret
        const secret = process.env.ENCRYPTION_SECRET;
        if (!secret) {
            throw new Error('ENCRYPTION_SECRET is not set in environment variables');
        }

        // Create email hash for database lookup
        const emailHash = crypto.createHash('sha256').update(email).digest('hex');
        
        // Check if user exists
        const user = await User.findOne({ emailHash: emailHash });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered. Please sign up first.",
            });
        }

        // Verify password
        const decryptedPassword = decrypt(user.password, secret);
        if (password !== decryptedPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        
        console.log("Password verified, generating OTP for login");

        // Generate a 6-digit OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Check if OTP already exists
        let result = await OTP.findOne({ otp: otp });
        
        // Keep generating new OTP until we get a unique one
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        // Create OTP payload
        const otpPayload = { 
            email: email,  // Keep email as is for sending emails
            otp: otp,
            

        };

        // Store OTP in database
        const otpBody = await OTP.create(otpPayload);
        console.log("Login OTP created:", otpBody);

       
        res.status(200).json({
            success: true,
            message: "Login OTP sent successfully",
            otp
        });
    } catch (error) {
        console.error("Error sending login OTP:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to send login OTP. Please try again.",
            error: error.message 
        });
    }
};



export { signup, login, sendOtp };
=======
export { signup, login };
>>>>>>> ed8ccaa91ab5e2b900a2d7c9aa7af1eec127109b
