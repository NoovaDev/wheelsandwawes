import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resending, setResending] = useState(false);

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

      const firebaseToken = await firebaseUser.user.getIdToken(true);

      await axios.post("/api/auth/register", {
        firebaseToken,
        full_name: form.full_name,
        phone: form.phone,
      });

      setRegisteredEmail(form.email);

      alert(
        "Account created successfully. Please check your email and verify your account before login."
      );
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error);

      const firebaseCode = error.code;
      const serverMessage =
        error.response?.data?.message || error.message || "";

      if (
        firebaseCode === "auth/email-already-in-use" ||
        serverMessage.includes("already registered")
      ) {
        alert("This email is already registered. Please login instead.");
      } else if (
        firebaseCode === "auth/too-many-requests" ||
        serverMessage.includes("TOO_MANY_ATTEMPTS")
      ) {
        alert("Too many attempts. Please wait 1 hour and try again.");
      } else if (firebaseCode === "auth/weak-password") {
        alert("Password is too weak. Please use at least 6 characters.");
      } else if (firebaseCode === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else {
        alert(serverMessage || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    const emailToSend = registeredEmail || form.email;

    if (!emailToSend) {
      alert("Please enter your email first.");
      return;
    }

    setResending(true);

    try {
      await axios.post("/api/auth/resend-verification", {
        email: emailToSend,
      });

      alert("Verification email sent again. Please check your inbox or spam folder.");
    } catch (error) {
      console.log("RESEND VERIFICATION ERROR:", error.response?.data || error);

      alert(
        error.response?.data?.message ||
          "Failed to resend verification email"
      );
    } finally {
      setResending(false);
    }
  };

  const whatsappNumber = "947XXXXXXXX";

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
          {!registeredEmail ? (
            <>
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

                <small>
                  After register, check your email inbox or spam folder for the
                  verification link.
                </small>
              </div>
            </>
          ) : (
            <div className="auth-verify-box">
              <h2>Check Your Email</h2>

              <p>
                We sent a verification link to:
                <strong> {registeredEmail}</strong>
              </p>

              <p>
                Please verify your email before login. If you cannot find the
                email, check your spam folder or resend the email.
              </p>

              <button
                type="button"
                onClick={resendVerificationEmail}
                disabled={resending}
              >
                {resending ? "Sending..." : "Resend Verification Email"}
              </button>

              <a href="/login">Go to Login</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;