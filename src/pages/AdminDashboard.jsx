import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminHome from "./admin/AdminHome";
import AdminBookings from "./admin/AdminBookings";
import AdminUsers from "./admin/AdminUsers";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      logoutAdmin();
      return null;
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const getBookings = async () => {
    try {
      const config = getAuthHeader();
      if (!config) return;

      const res = await axios.get("/api/bookings", config);
      setBookings(res.data || []);
    } catch (error) {
      console.log("GET BOOKINGS ERROR:", error.response?.data || error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        logoutAdmin();
      }
    }
  };

  const getUsers = async () => {
    try {
      const config = getAuthHeader();
      if (!config) return;

      const res = await axios.get("/api/users", config);
      setUsers(res.data || []);
    } catch (error) {
      console.log("GET USERS ERROR:", error.response?.data || error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        logoutAdmin();
      }
    }
  };

  const refreshAdminData = async () => {
    setLoading(true);
    await Promise.all([getBookings(), getUsers()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshAdminData();
  }, []);

  if (loading) {
    return (
      <>
        <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="admin-page">
          <section className="admin-loading-card">
            <div className="admin-loader"></div>
            <h2>Loading admin panel</h2>
            <p>Preparing bookings, customers, and travel data.</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="admin-page">
        {activeTab === "dashboard" && (
          <AdminHome
            bookings={bookings}
            users={users}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "bookings" && (
          <AdminBookings
            bookings={bookings}
            refreshBookings={getBookings}
          />
        )}

        {activeTab === "users" && (
          <AdminUsers users={users} refreshUsers={getUsers} />
        )}
      </main>
    </>
  );
};

export default AdminDashboard;