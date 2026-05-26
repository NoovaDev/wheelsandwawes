import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DashboardHome from "./DashboardHome";
import UserTrips from "./UserTrips";
import UserProfile from "./UserProfile";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complete dataset for the logged-in customer
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      // Replace these endpoints with your actual backend routes if they differ
      const headers = { Authorization: `Bearer ${token}` };
      const [userRes, bookingsRes] = await Promise.all([
        axios.get("/api/user/profile", { headers }),
        axios.get("/api/bookings/my-bookings", { headers }),
      ]);

      setUser(userRes.data);
      
      // Ensure bookings come sorted with the newest trip first
      const sortedBookings = (bookingsRes.data || []).sort((a, b) => {
        return new Date(b.created_at || b.id) - new Date(a.created_at || a.id);
      });
      setBookings(sortedBookings);
      setError(null);
    } catch (err) {
      console.error("Dashboard data fetch failed:", err);
      setError("Failed to load dashboard data. Please try again.");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <div className="dashboard-spinner"></div>
        <p>Loading your travel dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error-container">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="primary-app-btn">
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>Sri Lanka Travel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Dashboard Home
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === "trips" ? "active" : ""}`}
            onClick={() => setActiveTab("trips")}
          >
            My Trips
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="dashboard-main-content">
        <header className="dashboard-top-bar">
          <span className="welcome-text">
            Welcome back, <strong>{user?.full_name || "Customer"}</strong>
          </span>
        </header>

        <div className="dashboard-page-container">
          {activeTab === "home" && (
            <DashboardHome
              bookings={bookings}
              setActiveTab={setActiveTab}
              user={user}
            />
          )}
          {activeTab === "trips" && (
            <UserTrips
              bookings={bookings}
              refreshBookings={fetchDashboardData}
            />
          )}
          {activeTab === "profile" && (
            <UserProfile user={user} totalBookings={bookings.length} />
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;