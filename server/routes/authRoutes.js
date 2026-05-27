const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const admin = require("../firebaseAdmin");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firebaseToken, full_name, phone } = req.body;

    if (!firebaseToken || !full_name || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const firebase_uid = decodedToken.uid;
    const email = decodedToken.email;

    if (!email) {
      return res.status(400).json({
        message: "Email not found from Firebase account",
      });
    }

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ? OR firebase_uid = ?",
      [email, firebase_uid]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    await db.query(
      `
      INSERT INTO users 
      (firebase_uid, full_name, email, phone, password, role, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [firebase_uid, full_name, email, phone, null, "customer", "active"]
    );

    const verificationLink =
      await admin.auth().generateEmailVerificationLink(email, {
        url: "https://wheelsandwawes.com/login?verified=true",
        handleCodeInApp: false,
      });

    await sendEmail({
      to: email,
      subject: "Verify your Wheels & Waves account",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:16px; padding:28px; border:1px solid #e2e8f0;">
            <h2 style="color:#0f172a; margin-top:0;">Welcome to Wheels & Waves Travels</h2>

            <p style="color:#475569; line-height:1.6;">
              Hello ${full_name},
            </p>

            <p style="color:#475569; line-height:1.6;">
              Thank you for creating your account. Please verify your email address to activate your account and manage your bookings securely.
            </p>

            <p style="margin:28px 0;">
              <a 
                href="${verificationLink}" 
                style="background:#2563eb; color:#ffffff; padding:13px 22px; border-radius:10px; text-decoration:none; font-weight:bold; display:inline-block;"
              >
                Verify Email
              </a>
            </p>

            <p style="color:#64748b; line-height:1.6;">
              If the button does not work, copy and paste this link into your browser:
            </p>

            <p style="word-break:break-all; color:#2563eb; font-size:13px;">
              ${verificationLink}
            </p>

            <p style="color:#64748b; line-height:1.6;">
              If you did not create this account, you can safely ignore this email.
            </p>

            <p style="color:#0f172a; margin-bottom:0;">
              Thanks,<br/>
              Wheels & Waves Travels Team
            </p>
          </div>
        </div>
      `,
    });

    res.json({
      message: "Registration successful. Verification email sent.",
    });
  } catch (error) {
    console.log("FIREBASE REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({
        message: "Firebase token required",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const firebase_uid = decodedToken.uid;
    const email = decodedToken.email;
    const emailVerified = decodedToken.email_verified;

    if (!emailVerified) {
      return res.status(403).json({
        message: "Please verify your email before login.",
      });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE firebase_uid = ? OR email = ?",
      [firebase_uid, email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found. Please register first.",
      });
    }

    const user = users[0];

    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked. Please contact support.",
      });
    }

    if (!user.firebase_uid) {
      await db.query("UPDATE users SET firebase_uid = ? WHERE id = ?", [
        firebase_uid,
        user.id,
      ]);
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.log("FIREBASE LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message || "Login failed",
    });
  }
});

router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const userRecord = await admin.auth().getUserByEmail(email);

    if (userRecord.emailVerified) {
      return res.status(400).json({
        message: "Email is already verified. Please login.",
      });
    }

    const verificationLink =
      await admin.auth().generateEmailVerificationLink(email, {
        url: "https://wheelsandwawes.com/login?verified=true",
        handleCodeInApp: false,
      });

    await sendEmail({
      to: email,
      subject: "Verify your Wheels & Waves account",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:16px; padding:28px; border:1px solid #e2e8f0;">
            <h2 style="color:#0f172a;">Verify Your Email</h2>

            <p style="color:#475569; line-height:1.6;">
              Please verify your Wheels & Waves Travels account to continue.
            </p>

            <p style="margin:28px 0;">
              <a href="${verificationLink}" style="background:#2563eb; color:#ffffff; padding:13px 22px; border-radius:10px; text-decoration:none; font-weight:bold; display:inline-block;">
                Verify Email
              </a>
            </p>

            <p style="word-break:break-all; color:#2563eb; font-size:13px;">
              ${verificationLink}
            </p>

            <p style="color:#0f172a;">
              Thanks,<br/>
              Wheels & Waves Travels Team
            </p>
          </div>
        </div>
      `,
    });

    res.json({
      message: "Verification email sent again.",
    });
  } catch (error) {
    console.log("RESEND VERIFICATION ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to resend verification email",
    });
  }
});

module.exports = router;