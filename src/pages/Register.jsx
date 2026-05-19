import { useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

const Register = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await sendEmailVerification(firebaseUser.user);

      const firebaseToken = await firebaseUser.user.getIdToken();

      await axios.post("/api/auth/register", {
        firebaseToken,
        full_name: form.full_name,
        phone: form.phone,
      });

      alert(
        "Account created successfully. Please verify your email before login."
      );

      window.location.href = "/login";
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = "947XXXXXXXX"; // change your WhatsApp number

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <span className="auth-badge">Create Your Travel Account</span>

          <h1>Start booking vehicles in a smarter way</h1>

          <p>
            Register once and easily manage your future trips, bookings, and
            customer details.
          </p>

          <div className="auth-features">
            <div>
              <strong>Easy booking</strong>
              <span>Save your details for faster future reservations.</span>
            </div>

            <div>
              <strong>Booking history</strong>
              <span>Track all your previous and upcoming trips.</span>
            </div>

            <div>
              <strong>Email protection</strong>
              <span>Verify your email before using your account.</span>
            </div>
          </div>

          <a
            className="whatsapp-btn"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello, I want to make a quick vehicle booking."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Quick Booking via WhatsApp
          </a>
        </div>

        <div className="auth-card">
          <h2>Create Account</h2>
          <p>Register to book and manage your trips.</p>

          <form onSubmit={registerUser}>
            <label>Full Name</label>
            <input
              name="full_name"
              placeholder="Enter your full name"
              value={form.full_name}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Phone / WhatsApp Number</label>
            <input
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="auth-bottom">
            <span>
              Already have an account? <a href="/login">Login</a>
            </span>

            <small>After register, check your email verification link.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;