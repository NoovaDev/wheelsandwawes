const AdminHome = ({ bookings = [], users = [], setActiveTab }) => {
  const pending = bookings.filter((b) => (b.status || "pending") === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  const latestBookings = bookings.slice(0, 5);
  const pendingBookings = bookings
    .filter((b) => (b.status || "pending") === "pending")
    .slice(0, 4);

  return (
    <>
      <section className="admin-hero">
        <div>
          <span>Admin Control Center</span>
          <h1>Manage bookings, customers, and daily travel operations.</h1>
          <p>
            Review new trip requests, contact customers, update booking status,
            and manage user accounts from one place.
          </p>
        </div>

        <div className="admin-hero-actions">
          <button onClick={() => setActiveTab("bookings")}>Manage Bookings</button>
          <button onClick={() => setActiveTab("users")}>Manage Users</button>
        </div>
      </section>

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total Bookings</span>
          <h3>{bookings.length}</h3>
          <p>All customer requests</p>
        </div>

        <div className="admin-stat-card warning">
          <span>Pending</span>
          <h3>{pending}</h3>
          <p>Need admin action</p>
        </div>

        <div className="admin-stat-card success">
          <span>Confirmed</span>
          <h3>{confirmed}</h3>
          <p>Approved trips</p>
        </div>

        <div className="admin-stat-card blue">
          <span>Completed</span>
          <h3>{completed}</h3>
          <p>Finished trips</p>
        </div>

        <div className="admin-stat-card danger">
          <span>Cancelled</span>
          <h3>{cancelled}</h3>
          <p>Cancelled requests</p>
        </div>

        <div className="admin-stat-card">
          <span>Total Users</span>
          <h3>{users.length}</h3>
          <p>Registered customers</p>
        </div>
      </section>

      <section className="admin-two-grid">
        <div className="admin-panel-card">
          <div className="admin-card-title">
            <div>
              <span>Action Needed</span>
              <h3>Pending Bookings</h3>
            </div>

            <button onClick={() => setActiveTab("bookings")}>View All</button>
          </div>

          {pendingBookings.length > 0 ? (
            <div className="admin-mini-list">
              {pendingBookings.map((booking) => (
                <div className="admin-mini-item" key={booking.id}>
                  <div>
                    <strong>{booking.full_name || "Customer"}</strong>
                    <span>{booking.trip_type || "Travel Booking"}</span>
                  </div>
                  <span className="status pending">pending</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-empty-text">No pending bookings right now.</p>
          )}
        </div>

        <div className="admin-panel-card">
          <div className="admin-card-title">
            <div>
              <span>Recent Activity</span>
              <h3>Latest Bookings</h3>
            </div>

            <button onClick={() => setActiveTab("bookings")}>Open</button>
          </div>

          {latestBookings.length > 0 ? (
            <div className="admin-mini-list">
              {latestBookings.map((booking) => (
                <div className="admin-mini-item" key={booking.id}>
                  <div>
                    <strong>{booking.full_name || "Customer"}</strong>
                    <span>{booking.pickup_location || "-"} to {booking.drop_location || "-"}</span>
                  </div>
                  <span className={`status ${booking.status || "pending"}`}>
                    {booking.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-empty-text">No bookings available yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminHome;