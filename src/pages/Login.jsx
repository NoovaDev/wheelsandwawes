import { useState } from "react";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        error.response?.data?.message ||
          error.message ||
          "Login failed"
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
          <span className="auth-badge">Fast & Secure Booking</span>

          <h1>Welcome back to your travel dashboard</h1>

          <p>
            Login to manage your bookings, check trip status, and plan your next
            journey with ease.
          </p>

          <div className="auth-features">
            <div>
              <strong>Manage bookings</strong>
              <span>View pending, confirmed, and completed trips.</span>
            </div>

            <div>
              <strong>Quick support</strong>
              <span>Contact us through WhatsApp for urgent bookings.</span>
            </div>

            <div>
              <strong>Secure login</strong>
              <span>Email verification protects customer accounts.</span>
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
          <h2>Login</h2>
          <p>Enter your details to continue.</p>

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

          <div className="auth-bottom">
            <span>
              Don’t have an account? <a href="/register">Register</a>
            </span>

            <small>Please verify your email before login.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;