import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

const countryCodes = [
  { code: "+94", label: "Sri Lanka +94", min: 9, max: 9 },
  { code: "+91", label: "India +91", min: 10, max: 10 },
  { code: "+880", label: "Bangladesh +880", min: 10, max: 10 },
  { code: "+971", label: "UAE +971", min: 8, max: 9 },
  { code: "+44", label: "UK +44", min: 10, max: 10 },
  { code: "+1", label: "USA/Canada +1", min: 10, max: 10 },
];

const Register = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    countryCode: "+94",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resending, setResending] = useState(false);

  const selectedCountry = countryCodes.find(
    (item) => item.code === form.countryCode
  );

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "phone") {
      value = value.replace(/\D/g, "");
    }

    setForm({ ...form, [e.target.name]: value });
  };

  const validatePhone = () => {
    const phone = form.phone.trim();

    if (!phone) {
      alert("Please enter your phone number.");
      return false;
    }

    if (
      selectedCountry &&
      (phone.length < selectedCountry.min || phone.length > selectedCountry.max)
    ) {
      alert(
        `Please enter a valid phone number for ${selectedCountry.label}. Required length: ${selectedCountry.min} digits.`
      );
      return false;
    }

    return true;
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!validatePhone()) return;

    setLoading(true);

    try {
      const fullPhoneNumber = `${form.countryCode}${form.phone}`;

      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const firebaseToken = await firebaseUser.user.getIdToken(true);

      await axios.post("/api/auth/register", {
        firebaseToken,
        full_name: form.full_name.trim(),
        phone: fullPhoneNumber,
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

      alert("Verification email sent again. Please check inbox or spam.");
    } catch (error) {
      console.log("RESEND VERIFICATION ERROR:", error.response?.data || error);
      alert(
        error.response?.data?.message || "Failed to resend verification email"
      );
    } finally {
      setResending(false);
    }
  };

  const whatsappNumber = "94701097969";

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
              <strong>Phone validation</strong>
              <span>Save your WhatsApp number with country code.</span>
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
                <div className="phone-row">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    required
                  >
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <input
                    name="phone"
                    type="tel"
                    placeholder="701097969"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <small className="phone-help">
                  Do not add 0 before number. Example Sri Lanka: +94 701097969
                </small>

                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  minLength="6"
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
                  After register, check your email inbox or spam folder.
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
                Please verify your email before login. Check spam folder also.
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