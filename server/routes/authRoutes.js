const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const admin = require("../firebaseAdmin");

const router = express.Router();

/*
========================================
REGISTER USER FROM FIREBASE
========================================
*/
router.post("/register", async (req, res) => {
  try {
    const { firebaseToken, full_name, phone } = req.body;

    if (!firebaseToken || !full_name || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const firebase_uid = decodedToken.uid;
    const email = decodedToken.email;

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ? OR firebase_uid = ?",
      [email, firebase_uid]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await db.query(
      "INSERT INTO users (firebase_uid, full_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [firebase_uid, full_name, email, phone, null, "customer"]
    );

    res.json({ message: "Registration successful" });
  } catch (error) {
    console.log("FIREBASE REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
========================================
LOGIN USER FROM FIREBASE
========================================
*/
router.post("/login", async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({ message: "Firebase token required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const firebase_uid = decodedToken.uid;
    const email = decodedToken.email;

    const [users] = await db.query(
      "SELECT * FROM users WHERE firebase_uid = ? OR email = ?",
      [firebase_uid, email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const user = users[0];

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
      { expiresIn: "7d" }
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
      },
    });
  } catch (error) {
    console.log("FIREBASE LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;