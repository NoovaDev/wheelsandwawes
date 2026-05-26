import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaCar,
  FaChartPie,
  FaListAlt,
  FaUser,
  FaRoute,
} from "react-icons/fa";
import "./DashboardNavbar.css";

const DashboardNavbar = ({ user, activeTab = "dashboard", setActiveTab }) => {
  const [open, setOpen] = useState(false);

  const changeTab = (tab) => {
    setOpen(false);

    if (setActiveTab) {
      setActiveTab(tab);
      return;
    }

    window.location.href = "/dashboard";
  };

  const goToPage = (path) => {
    setOpen(false);
    window.location.href = path;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="lpnav">
        <div className="lpnav-shell">
          <button
            type="button"
            className="lpnav-brand"
            onClick={(e) => {
              e.preventDefault();
              changeTab("dashboard");
            }}
          >
            <img src="/logo.png" alt="W&W Travels" className="lpnav-logo-img" />

            <div className="lpnav-brand-text">
              <strong>W&W Travels</strong>
              <span>User Dashboard</span>
            </div>
          </button>

          <div className="lpnav-links">
            <button
              type="button"
              className={`lpnav-link-item ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                changeTab("dashboard");
              }}
            >
              <FaChartPie /> Dashboard
            </button>

            <button
              type="button"
              className="lpnav-link-item"
              onClick={() => goToPage("/booking")}
            >
              <FaRoute /> Book Tour
            </button>

            <button
              type="button"
              className="lpnav-link-item rent-link"
              onClick={() => goToPage("/rent")}
            >
              <FaCar /> Rent Vehicle
            </button>

            <button
              type="button"
              className={`lpnav-link-item ${
                activeTab === "trips" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                changeTab("trips");
              }}
            >
              <FaListAlt /> My Trips
            </button>

            <button
              type="button"
              className={`lpnav-link-item ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                changeTab("profile");
              }}
            >
              <FaUser /> Profile
            </button>
          </div>

          <div className="lpnav-right">
            <button
              type="button"
              className="lpnav-login-btn"
              onClick={logoutUser}
            >
              Logout
            </button>

            <button
              type="button"
              className="lpnav-mobile-toggle"
              onClick={() => setOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      <div className={`lpnav-mobile-overlay ${open ? "show" : ""}`}>
        <div className={`lpnav-mobile-panel ${open ? "show" : ""}`}>
          <div className="lpnav-mobile-top">
            <div className="lpnav-mobile-brand">
              <img
                src="/logo.png"
                alt="W&W Travels"
                className="lpnav-mobile-logo"
              />

              <div>
                <strong>{user?.full_name || "User"}</strong>
                <span>{user?.email || "Dashboard"}</span>
              </div>
            </div>

            <button
              type="button"
              className="lpnav-mobile-close"
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="lpnav-mobile-links">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                changeTab("dashboard");
              }}
              className="lpnav-mobile-link"
            >
              <FaChartPie /> Dashboard
            </button>

            <button
              type="button"
              onClick={() => goToPage("/booking")}
              className="lpnav-mobile-link"
            >
              <FaRoute /> Book Tour
            </button>

            <button
              type="button"
              onClick={() => goToPage("/rent")}
              className="lpnav-mobile-link rent-mobile-link"
            >
              <FaCar /> Rent Vehicle
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                changeTab("trips");
              }}
              className="lpnav-mobile-link"
            >
              <FaListAlt /> My Trips
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                changeTab("profile");
              }}
              className="lpnav-mobile-link"
            >
              <FaUser /> Profile
            </button>
          </div>

          <button
            type="button"
            className="lpnav-mobile-login-btn"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;