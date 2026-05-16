import "./AdminNavbar.css";

const AdminNavbar = ({ activeTab, setActiveTab }) => {
  const logoutAdmin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="admin-nav">
      <div className="admin-nav-logo">
        <strong>W&W Travels</strong>
        <span>Admin Panel</span>
      </div>

      <div className="admin-nav-links">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      <button className="admin-logout-btn" onClick={logoutAdmin}>
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;