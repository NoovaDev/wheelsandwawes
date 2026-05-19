import { useState } from "react";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      if (!firebaseUser.user.emailVerified) {
        alert("Please verify your email before login.");
        return;
      }

      const firebaseToken = await firebaseUser.user.getIdToken();

      const res = await axios.post("/api/auth/login", {
        firebaseToken,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error);

      alert(
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = "947XXXXXXXX"; // change this
  const whatsappMessage =
    "Hello, I want to make a quick vehicle booking.";

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-info">
          <span className="auth-badge">Sri Lanka Travel Booking</span>

          <h1>Book your ride faster and safer</h1>

          <p>
            Login to manage your bookings, view trip status, cancel trips,
            and plan your next journey easily.
          </p>

          <div className="auth-tips">
            <div>
              <strong>Fast booking</strong>
              <span>Save your details and book faster next time.</span>
            </div>

            <div>
              <strong>Trip tracking</strong>
              <span>Check pending, confirmed, and completed bookings.</span>
            </div>

            <div>
              <strong>Secure account</strong>
              <span>Email verification keeps your account protected.</span>
            </div>
          </div>

          <a
            className="whatsapp-btn"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Quick Booking via WhatsApp
          </a>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Welcome Back</h2>
            <p>Login to continue your travel booking.</p>
          </div>

          <form onSubmit={loginUser}>
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-help">
            <p>
              New customer? <a href="/register">Create account</a>
            </p>

            <small>
              Tip: Verify your email before login. Otherwise login will be
              blocked.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;