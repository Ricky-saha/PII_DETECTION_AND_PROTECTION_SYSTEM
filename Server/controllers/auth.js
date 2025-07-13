import dotenv from "dotenv";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { encrypt, decrypt } from "../utils/Hashing.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

import User from "../models/User.js";
import OTP from "../models/OTP.js";

import otpGenerator from "otp-generator";

dotenv.config();
const result = dotenv.config();
if (result.error) {
  console.log("Error loading .env file:", result.error);
} else {
  console.log(".env file loaded successfully");
}

/* -----------------------------------------------------------------------
   SIGN‑UP
------------------------------------------------------------------------ */
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType } = req.body;

    // 1. Mandatory‑field check
    if (!firstName || !lastName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 3. Password strength validation
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    // 4. Check for existing user (hashing email to keep DB blind)
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");
    const existingUser = await User.findOne({ emailHash });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in.",
      });
    }

    // 5. Avatar image is mandatory
    const avatarLocalPath = req.files?.avatar;
    if (!avatarLocalPath) {
      return res.status(400).json({
        success: false,
        message: "Please provide an avatar image",
      });
    }

    // 6. Upload avatar to Cloudinary
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

    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) throw new Error("ENCRYPTION_SECRET not set");

    // 7. Encrypt user data
    const encryptedFirstName = encrypt(firstName, secret);
    const encryptedLastName = encrypt(lastName, secret);
    const encryptedEmail = encrypt(email, secret);
    const encryptedPassword = encrypt(password, secret);
    const encryptedAvatar = encrypt(avatar.url, secret);

    const normalizedRole =
      accountType && accountType.toLowerCase() === "admin" ? "Admin" : "User";
    const encryptedAccountType = encrypt(normalizedRole, secret);

    // 8. Persist user
    const user = await User.create({
      firstName: encryptedFirstName,
      lastName: encryptedLastName,
      email: encryptedEmail,
      emailHash,
      password: encryptedPassword,
      avatar: encryptedAvatar,
      accountType: encryptedAccountType,
    });

    // 9. Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstName,
        lastName,
        email,
        emailHash,
        avatar: avatar.url,
        role: normalizedRole.toLowerCase(),
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

/* -----------------------------------------------------------------------
   SEND‑OTP (for login)
------------------------------------------------------------------------ */
const sendOtp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const secret = process.env.ENCRYPTION_SECRET;
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");

    const user = await User.findOne({ emailHash });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign up first.",
      });

    if (password !== decrypt(user.password, secret))
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    // Generate unique 6‑digit OTP
    let otp;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    } while (await OTP.findOne({ otp }));

    await OTP.create({ email, otp });

    return res.status(200).json({
      success: true,
      message: "Login OTP sent successfully",
      otp, // ⚠️ In production you would *email* this, not return it!
    });
  } catch (error) {
    console.error("Error sending login OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send login OTP. Please try again.",
    });
  }
};

/* -----------------------------------------------------------------------
   LOGIN
------------------------------------------------------------------------ */
const login = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email, password and OTP are required",
      });
    }

    const secret = process.env.ENCRYPTION_SECRET;
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");

    const user = await User.findOne({ emailHash });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign up.",
      });

    if (password !== decrypt(user.password, secret))
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    // Fetch latest OTP for given email
    const latestOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (!latestOtp.length || otp !== latestOtp[0].otp)
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });

    // Prepare user role for JWT payload
    const decryptedAccountType = decrypt(user.accountType, secret);
    const role = decryptedAccountType === "Admin" ? "admin" : "user";

    const token = jwt.sign(
      { email, id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Update user token in DB (optional; depends on your strategy)
    await User.findByIdAndUpdate(user._id, { token });

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        token,
        user: {
          _id: user._id,
          firstName: decrypt(user.firstName, secret),
          lastName: decrypt(user.lastName, secret),
          email,
          avatar: decrypt(user.avatar, secret),
          role,
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

export { signup, sendOtp, login };
