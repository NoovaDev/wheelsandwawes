const express = require("express");
const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/*
========================================
GET LOGGED-IN USER + BOOKINGS
========================================
*/
router.get("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await db.query(
      `
      SELECT 
        id,
        full_name,
        email,
        phone,
        role,
        status
      FROM users
      WHERE id = ?
      `,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const [bookings] = await db.query(
      `
      SELECT *
      FROM bookings
      WHERE user_id = ?
      ORDER BY id DESC
      `,
      [userId]
    );

    res.json({
      user: users[0],
      bookings,
    });
  } catch (error) {
    console.log("GET USER ME ERROR:", error);

    res.status(500).json({
      message: "Failed to get user dashboard data",
    });
  }
});

/*
========================================
GET ALL USERS (ADMIN ONLY)
========================================
*/
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin only",
      });
    }

    const [users] = await db.query(
      `
      SELECT 
        id,
        full_name,
        email,
        phone,
        role,
        status
      FROM users
      ORDER BY id DESC
      `
    );

    res.json(users);
  } catch (error) {
    console.log("GET USERS ERROR:", error);

    res.status(500).json({
      message: "Failed to get users",
    });
  }
});

/*
========================================
UPDATE USER STATUS
========================================
*/
router.patch("/:id/status", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin only",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    await db.query("UPDATE users SET status = ? WHERE id = ?", [status, id]);

    res.json({
      message: "User status updated successfully",
    });
  } catch (error) {
    console.log("UPDATE USER STATUS ERROR:", error);

    res.status(500).json({
      message: "Failed to update user status",
    });
  }
});

module.exports = router;