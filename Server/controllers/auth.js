import {encrypt,decrypt} from "../utils/Hashing.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import OTP from "../models/OTP.js";
import otpGenerator from "otp-generator";
import {uploadImageToCloudinary} from "../utils/imageUploader.js"
import crypto from "crypto"



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
        const { firstName, lastName, email, password, accountType } = req.body;

        // Validate required fields
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
        
        // Generate email hash and check for existing user
        const emailHash = crypto.createHash('sha256').update(email).digest('hex');
        const existingUser = await User.findOne({ emailHash });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Check for avatar image
        const avatarLocalPath = req.files?.avatar;
        if (!avatarLocalPath) {
            return res.status(400).json({
                success: false,
                message: "Please provide an avatar image",
            });
        }

        // Upload image to Cloudinary
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

        // Get encryption secret from environment variables
        const secret = process.env.ENCRYPTION_SECRET;
        if (!secret) {
            throw new Error('ENCRYPTION_SECRET is not set in environment variables');
        }
        
        // Prepare data for user creation
        console.log("Creating user with email hash:", emailHash);
        
        // Determine account type (Admin or User) from role
        const normalizedRole = accountType ? (accountType.toLowerCase() === "admin" ? "Admin" : "User") : "User";
        
        // Encrypt user data
        const encryptedFirstName = encrypt(firstName, secret);
        const encryptedLastName = encrypt(lastName, secret);
        const encryptedEmail = encrypt(email, secret);
        const encryptedPassword = encrypt(password, secret);
        const encryptedAvatar = encrypt(avatar.url, secret);
        const encryptedAccountType = encrypt(normalizedRole, secret);

        // Create user in database
        const user = await User.create({
            firstName: encryptedFirstName,
            lastName: encryptedLastName,
            email: encryptedEmail,
            emailHash: emailHash,
            password: encryptedPassword,
            avatar: encryptedAvatar,
            accountType: encryptedAccountType  // This was missing in the original code
        });

        // Return success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
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
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};


// Login Controller for Registered Users with OTP verification
const login = async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        // Check if all required fields are provided
        if (!email || !password || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please fill up all the required fields (email, password, and OTP)",
            });
        }

        const secret = process.env.ENCRYPTION_SECRET;
        // Create email hash for database lookup
        const emailHash = crypto.createHash('sha256').update(email).digest('hex');
        console.log("Login attempt for:", emailHash);
        
        // Find user by email hash
        const user = await User.findOne({ emailHash: emailHash });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered with us. Please sign up to continue.",
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
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
        );
        
        // Update user with token
        await User.findByIdAndUpdate(user._id, { token: token });
        
        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };
        
        // Send successful response with token and user data
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                firstName: decrypt(user.firstName, secret),
                lastName: decrypt(user.lastName, secret),
                email: decryptedEmail,
                avatar: decrypt(user.avatar, secret),
                role: userRole // Using converted role format for frontend
            },
            message: "User login successful",
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failure. Please try again.",
        });
    }
};



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