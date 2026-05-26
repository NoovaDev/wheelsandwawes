import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { allCountries } from "country-telephone-data";
import { auth } from "../firebase";
import "./Auth.css";

const countryCodes = allCountries.map((country) => ({
  name: country.name,
  code: `+${country.dialCode}`,
  iso2: country.iso2,
}));

const Register = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    countryCode: "+94",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "phone") {
      value = value.replace(/\D/g, "");
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (form.phone.length < 6 || form.phone.length > 15) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

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

  const whatsappNumber = "94701097969";

  return (
    <div className="auth-page">


      <div className="auth-top-nav">
  <a href="/" className="auth-back-btn">
    ← Back to Home
  </a>
</div>
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
            Trusted Sri Lanka Travel Service
          </span>

          <h1>
            Create your account and start booking vehicles easily
          </h1>

          <p>
            Register once and manage airport transfers, tours, and private
            vehicle bookings across Sri Lanka.
          </p>

          <div className="booking-mini-card">

            <div>
              <span>Fast booking</span>
              <strong>Simple online process</strong>
            </div>

            <div>
              <span>All Sri Lanka</span>
              <strong>Islandwide transport</strong>
            </div>

            <div>
              <span>Support</span>
              <strong>WhatsApp assistance</strong>
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
            <h2>Create Account</h2>
            <p>Register your customer account</p>
          </div>

          <form onSubmit={registerUser}>

            <label>Full Name</label>

            <div className="auth-input-box">
              <FaUser />

              <input
                name="full_name"
                type="text"
                placeholder="Enter your full name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </div>

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

            <label>Phone Number</label>

            <div className="phone-row">

              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                required
              >
                {countryCodes.map((item, index) => (
                  <option
                    key={`${item.iso2}-${item.code}-${index}`}
                    value={item.code}
                  >
                    {item.name} {item.code}
                  </option>
                ))}
              </select>

              <div className="auth-input-box">
                <FaPhoneAlt />

                <input
                  name="phone"
                  type="tel"
                  placeholder="701097969"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <label>Password</label>

            <div className="auth-input-box">
              <FaLock />

              <input
                name="password"
                type="password"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <label>Confirm Password</label>

            <div className="auth-input-box">
              <FaLock />

              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <div className="auth-bottom">
            <span>
              Already have an account?
              <a href="/login"> Login</a>
            </span>

            <small>
              After registration please verify your email.
            </small>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;