import mongoose from "mongoose";
import  mailSender  from "../utils/mailSender.js";
import  otpTemplate  from "../mail/templates/emailVerificationTemplate.js";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  // Create a transporter to send emails
  // Define the email options
  // Send the email
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;