import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHome from "./user/DashboardHome";
import UserTrips from "./user/UserTrips";
import UserProfile from "./user/UserProfile";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        logoutUser();
        return;
      }

      const res = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.log("USER DASHBOARD ERROR:", error.response?.data || error);

      if (error.response?.status === 401) {
        logoutUser();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <>
        <DashboardNavbar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="user-dashboard-page">
          <section className="dashboard-loading-card">
            <div className="loading-ring"></div>
            <h2>Loading your dashboard</h2>
            <p>Please wait while we prepare your booking details.</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="user-dashboard-page">
        {activeTab === "dashboard" && (
          <DashboardHome
            bookings={bookings}
            user={user}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "trips" && (
          <UserTrips bookings={bookings} refreshBookings={getUserData} />
        )}

        {activeTab === "profile" && (
          <UserProfile user={user} totalBookings={bookings.length} />
        )}
      </main>
    </>
  );
};

export default UserDashboard;