const express = require("express");
const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

/*
========================================
CREATE BOOKING
========================================
*/
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      nationality,
      nic_number,
      passport_number,
      pickup_location,
      drop_location,
      pickup_date,
      pickup_time,
      return_date,
      return_time,
      vehicle_type,
      passengers,
      need_driver,
      trip_type,
      message,
    } = req.body;

    if (
      !full_name ||
      !email ||
      !phone ||
      !pickup_location ||
      !drop_location ||
      !pickup_date ||
      !pickup_time ||
      !vehicle_type ||
      !passengers ||
      !need_driver ||
      !trip_type
    ) {
      return res.status(400).json({
        message: "Please fill all required booking fields",
      });
    }

    await db.query(
      `
      INSERT INTO bookings (
        user_id, 
        full_name, 
        email, 
        phone, 
        nationality, 
        nic_number, 
        passport_number,
        pickup_location, 
        drop_location, 
        pickup_date, 
        pickup_time,
        return_date, 
        return_time, 
        vehicle_type, 
        passengers,
        need_driver, 
        trip_type, 
        message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        req.user.id,
        full_name,
        email,
        phone,
        nationality || null,
        nic_number || null,
        passport_number || null,
        pickup_location,
        drop_location,
        pickup_date,
        pickup_time,
        return_date || null,
        return_time || null,
        vehicle_type,
        passengers,
        need_driver,
        trip_type,
        message || null,
      ]
    );

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Booking Request - W&W Travels",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
          <div style="max-width:700px; margin:auto; background:#ffffff; border-radius:16px; padding:28px; border:1px solid #e2e8f0;">
            <h2 style="color:#0f172a; margin-top:0;">New Booking Request</h2>

            <h3 style="color:#2563eb;">Customer Details</h3>
            <p><b>Name:</b> ${full_name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Nationality:</b> ${nationality || "-"}</p>
            <p><b>ID / Passport:</b> ${nic_number || passport_number || "-"}</p>

            <hr />

            <h3 style="color:#2563eb;">Trip Details</h3>
            <p><b>Trip Type:</b> ${trip_type}</p>
            <p><b>Pickup:</b> ${pickup_location}</p>
            <p><b>Drop:</b> ${drop_location}</p>
            <p><b>Pickup Date:</b> ${pickup_date}</p>
            <p><b>Pickup Time:</b> ${pickup_time}</p>
            <p><b>Return Date:</b> ${return_date || "-"}</p>
            <p><b>Return Time:</b> ${return_time || "-"}</p>

            <hr />

            <h3 style="color:#2563eb;">Vehicle Details</h3>
            <p><b>Vehicle:</b> ${vehicle_type}</p>
            <p><b>Passengers:</b> ${passengers}</p>
            <p><b>Need Driver:</b> ${need_driver}</p>

            <hr />

            <h3 style="color:#2563eb;">Message / Extra Details</h3>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:12px;">${
              message || "No message"
            }</pre>

            <p style="margin-top:24px;">
              <a href="https://wa.me/${String(phone).replace(/\D/g, "")}" 
                 style="background:#22c55e; color:white; padding:12px 18px; border-radius:10px; text-decoration:none; font-weight:bold;">
                Contact Customer on WhatsApp
              </a>
            </p>
          </div>
        </div>
      `,
    });

    res.json({
      message: "Booking request sent successfully",
    });
  } catch (error) {
    console.log("BOOKING ERROR:", error);

    res.status(500).json({
      message: error.message || "Booking failed",
    });
  }
});

/*
========================================
GET ALL BOOKINGS
========================================
*/
router.get("/", async (req, res) => {
  try {
    const [bookings] = await db.query(
      "SELECT * FROM bookings ORDER BY pickup_date ASC"
    );

    res.json(bookings);
  } catch (error) {
    console.log("GET BOOKINGS ERROR:", error);

    res.status(500).json({
      message: "Failed to get bookings",
    });
  }
});

/*
========================================
UPDATE BOOKING STATUS
========================================
*/
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    await db.query("UPDATE bookings SET status = ? WHERE id = ?", [
      status,
      id,
    ]);

    res.json({
      message: "Booking status updated",
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);

    res.status(500).json({
      message: "Failed to update booking",
    });
  }
});

/*
========================================
CANCEL BOOKING
========================================
*/
router.patch("/:id/cancel", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [bookings] = await db.query(
      "SELECT * FROM bookings WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const booking = bookings[0];

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }

    if (booking.status === "completed") {
      return res.status(400).json({
        message: "Completed trip cannot cancel",
      });
    }

    await db.query("UPDATE bookings SET status = ? WHERE id = ?", [
      "cancelled",
      id,
    ]);

    res.json({
      message:
        "Booking cancelled successfully. If cancelled within 10 hours, advance payment is not refundable.",
    });
  } catch (error) {
    console.log("CANCEL BOOKING ERROR:", error);

    res.status(500).json({
      message: "Failed to cancel booking",
    });
  }
});

module.exports = router;