const AdminHome = ({ bookings = [], users = [] }) => {
  const pending = bookings.filter((b) => (b.status || "pending") === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Overview of bookings, users and trip requests.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total Bookings</span>
          <h3>{bookings.length}</h3>
        </div>

        <div className="admin-stat-card">
          <span>Pending</span>
          <h3>{pending}</h3>
        </div>

        <div className="admin-stat-card">
          <span>Confirmed</span>
          <h3>{confirmed}</h3>
        </div>

        <div className="admin-stat-card">
          <span>Cancelled</span>
          <h3>{cancelled}</h3>
        </div>

        <div className="admin-stat-card">
          <span>Completed</span>
          <h3>{completed}</h3>
        </div>

        <div className="admin-stat-card">
          <span>Total Users</span>
          <h3>{users.length}</h3>
        </div>
      </div>
    </>
  );
};

export default AdminHome;