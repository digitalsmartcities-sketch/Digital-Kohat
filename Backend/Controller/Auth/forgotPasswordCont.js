import argon2 from "argon2";
import { Admins } from "../../Models/Admins.js";
import { UserOtpVerifications } from "../../Models/UserOTPVerification.js";
import { sendEmailSmtp } from "../../utils/emailSender.js";
import { Users } from "../../Models/User.js";

/**
 * Generate 6-digit random OTP
 */
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * REQUEST OTP FOR PASSWORD RESET
 * POST /auth/forgot-password/request-otp
 */
export const requestResetOtp = async (req, res) => {
    try {
        const { email, type } = req.body; // type: 'admin' or 'user'

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // 1. Check if user exists (case-insensitive)
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const emailRegex = new RegExp(`^${escapeRegex(email.toLowerCase())}$`, "i");

        let person = null;
        if (type === "admin") {
            person = await Admins.findOne({ AdminEmail: emailRegex });
        } else {
            person = await Users.findOne({ email: emailRegex });
        }

        if (!person) {
            return res.status(404).json({ success: false, message: "Account not found with this email" });
        }

        // 2. Generate and Store OTP
        const otp = generateOtp();
        const otpHash = await argon2.hash(otp);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete any existing reset OTPs for this email
        await UserOtpVerifications.deleteMany({ email: email.toLowerCase(), purpose: "RESET_PASSWORD" });

        await UserOtpVerifications.create({
            email: email.toLowerCase(),
            otpHash,
            purpose: "RESET_PASSWORD",
            expiresAt
        });

        // 3. Send Email
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #1f8e5c; text-align: center;">Password Reset Request</h2>
                <p>Hello,</p>
                <p>You requested a password reset for your Digital Kohat account. Use the following 6-digit OTP to proceed:</p>
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="font-size: 12px; color: #777; text-align: center;">Digital Kohat Platform - Secure Authentication</p>
            </div>
        `;

        const sent = await sendEmailSmtp({
            to: email,
            subject: "Your Password Reset OTP - Digital Kohat",
            html: emailHtml
        });

        if (sent) {
            return res.json({ success: true, message: "OTP sent to your email address" });
        } else {
            return res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
        }

    } catch (error) {
        console.error("requestResetOtp error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * VERIFY RESET OTP
 * POST /auth/forgot-password/verify-otp
 */
export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" });
        }

        const verification = await UserOtpVerifications.findOne({
            email: email.toLowerCase(),
            purpose: "RESET_PASSWORD"
        });

        if (!verification) {
            return res.status(400).json({ success: false, message: "OTP expired or not found. Please request again." });
        }

        const valid = await argon2.verify(verification.otpHash, otp);
        if (!valid) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        return res.json({ success: true, message: "OTP verified. You can now reset your password." });

    } catch (error) {
        console.error("verifyResetOtp error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * RESET PASSWORD
 * POST /auth/forgot-password/reset
 */
export const resetPassword = async (req, res) => {
    try {
        const { email, type, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // 1. Verify OTP one last time (or we could use a temporary token from verify-otp)
        const verification = await UserOtpVerifications.findOne({
            email: email.toLowerCase(),
            purpose: "RESET_PASSWORD"
        });

        if (!verification) {
            return res.status(400).json({ success: false, message: "Session expired or invalid. Please start over." });
        }

        const valid = await argon2.verify(verification.otpHash, otp);
        if (!valid) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // 2. Hash New Password
        const hashedPassword = await argon2.hash(newPassword);

        // 3. Update Account (case-insensitive email match)
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const emailRegex = new RegExp(`^${escapeRegex(email.toLowerCase())}$`, "i");

        if (type === "admin") {
            const result = await Admins.findOneAndUpdate(
                { AdminEmail: emailRegex },
                { AdminPassword: hashedPassword }
            );
            if (!result) return res.status(404).json({ success: false, message: "Admin not found" });
        } else {
            const result = await Users.findOneAndUpdate(
                { email: emailRegex },
                { password: hashedPassword }
            );
            if (!result) return res.status(404).json({ success: false, message: "User not found" });
        }

        // 4. Cleanup
        await UserOtpVerifications.deleteMany({ email: email.toLowerCase(), purpose: "RESET_PASSWORD" });

        return res.json({ success: true, message: "Password reset successful. You can now login with your new password." });

    } catch (error) {
        console.error("resetPassword error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
