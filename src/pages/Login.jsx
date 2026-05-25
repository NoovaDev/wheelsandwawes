import { useEffect, useState } from "react";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEnvelope, FaLock, FaWhatsapp } from "react-icons/fa";
import { auth } from "../firebase";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("verified") === "true") {
      alert("Your email has been verified successfully. You can login now.");
      window.history.replaceState({}, "", "/login");
    }
  }, []);

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
        form.email.trim(),
        form.password
      );

      await firebaseUser.user.reload();

      const refreshedUser = auth.currentUser;

      if (!refreshedUser?.emailVerified) {
        alert("Please verify your email before login.");
        return;
      }

      const firebaseToken = await refreshedUser.getIdToken(true);

      const res = await axios.post("/api/auth/login", {
        firebaseToken,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href =
        res.data.user.role === "admin" ? "/admin" : "/dashboard";
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

  const whatsappNumber = "94701097969";

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-container booking-style">

        <div className="auth-left booking-left">

          <div className="auth-brand">
            <img src="/logo.png" alt="W&W Travels" />

            <div>
              <strong>W&W Travels</strong>
              <span>Sri Lanka Vehicle Booking</span>
            </div>
          </div>

          <span className="auth-badge">
            Trusted Sri Lanka Transport Service
          </span>

          <h1>
            Manage your bookings easily and travel across Sri Lanka comfortably
          </h1>

          <p>
            Airport transfers, private vehicles, tours, and travel support
            across Sri Lanka with modern online booking experience.
          </p>

          <div className="booking-mini-card">
            <div>
              <span>Airport pickup</span>
              <strong>Bandaranaike Airport</strong>
            </div>

            <div>
              <span>Destination</span>
              <strong>Anywhere in Sri Lanka</strong>
            </div>

            <div>
              <span>Vehicle</span>
              <strong>Car • Van • SUV</strong>
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
            <FaWhatsapp />
            Quick Booking via WhatsApp
          </a>

        </div>

        <div className="auth-card booking-card">

          <div className="auth-card-top">
            <h2>Login</h2>
            <p>Access your bookings and dashboard</p>
          </div>

          <form onSubmit={loginUser}>

            <label>Email Address</label>

            <div className="auth-input-box">
              <FaEnvelope />

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Password</label>

            <div className="auth-input-box">
              <FaLock />

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="auth-bottom">
            <span>
              Don’t have an account?
              <a href="/register"> Register</a>
            </span>

            <small>
              Please verify your email before login.
            </small>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;