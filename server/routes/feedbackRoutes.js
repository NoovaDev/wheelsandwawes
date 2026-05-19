const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !rating || !message) {
      return res.status(400).json({
        message: "Name, rating, and feedback message are required",
      });
    }

    await db.query(
      "INSERT INTO feedback (name, email, rating, message) VALUES (?, ?, ?, ?)",
      [name, email || null, rating, message]
    );

    res.json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.log("FEEDBACK SAVE ERROR:", error);
    res.status(500).json({ message: "Failed to save feedback" });
  }
});

router.get("/", async (req, res) => {
  try {
    const [feedback] = await db.query(
      "SELECT * FROM feedback ORDER BY created_at DESC LIMIT 6"
    );

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Failed to load feedback" });
  }
});

module.exports = router;