import { useState } from "react";
import axios from "axios";
import {
  signInWithEmailAndPassword
} from "firebase/auth";

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

      // FIREBASE LOGIN
      const firebaseUser =
        await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      // CHECK EMAIL VERIFIED
      if (!firebaseUser.user.emailVerified) {

        alert(
          "Please verify your email before login."
        );

        return;
      }

      // GET FIREBASE TOKEN
      const firebaseToken =
        await firebaseUser.user.getIdToken();

      // SEND TOKEN TO VPS BACKEND
      const res = await axios.post(
        "/api/auth/login",
        {
          firebaseToken,
        }
      );

      console.log("LOGIN SUCCESS:", res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <p>
          Login to manage your bookings,
          tours, and account details.
        </p>

        <form onSubmit={loginUser}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
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
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <span>
          Don’t have an account?{" "}
          <a href="/register">
            Register
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;