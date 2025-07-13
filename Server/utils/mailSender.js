import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sends an email using nodemailer
 * @param {string} email - Recipient email address
 * @param {string} title - Email subject
 * @param {string} body - Email body content in HTML format
 * @returns {Promise<Object>} - Information about the sent email or error
 */
const mailSender = async (email, title, body) => {
    try {
        // Create a transporter object using SMTP
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: `" TEAM INVINCIBLES" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        
        console.log('Email sent successfully:', info);
        return info;
    } catch (error) {
        console.log('Error sending email:', error.message);
        return error;
    }
};

export default mailSender;