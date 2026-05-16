import { useState } from "react";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification
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
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      // CREATE FIREBASE USER
      const firebaseUser =
        await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      // SEND EMAIL VERIFICATION
      await sendEmailVerification(
        firebaseUser.user
      );

      // GET FIREBASE TOKEN
      const firebaseToken =
        await firebaseUser.user.getIdToken();

      // SAVE USER TO VPS DATABASE
      await axios.post(
        "/api/auth/register",
        {
          firebaseToken,
          full_name: form.full_name,
          phone: form.phone,
        }
      );

      alert(
        "Account created successfully. Please verify your email before login."
      );

      window.location.href = "/login";

    } catch (error) {

      console.log(
        "REGISTER ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        <p>
          Register to book vehicles and
          manage your trips.
        </p>

        <form onSubmit={registerUser}>
          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone / WhatsApp Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </button>
        </form>

        <span>
          Already have an account?{" "}
          <a href="/login">
            Login
          </a>
        </span>
      </div>
    </div>
  );
};

export default Register;