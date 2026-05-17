const DashboardHome = ({ bookings, setActiveTab }) => {
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (b) => !b.status || b.status === "pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;

  const completedBookings = bookings.filter(
    (b) => b.status === "completed"
  ).length;

  const latestBooking = bookings[0];

  return (
    <>
      <section className="app-hero">
        <div>
          <span className="hero-badge">Welcome Back</span>
          <h1>Your Travel Dashboard</h1>
          <p>Manage bookings, track trip status, and plan your next Sri Lanka tour.</p>
        </div>

        <a href="/booking" className="primary-app-btn">
          + New Booking
        </a>
      </section>

      <section className="stats-app-grid">
        <div className="app-stat-card">
          <span>Total</span>
          <h3>{totalBookings}</h3>
          <p>All bookings</p>
        </div>

        <div className="app-stat-card warning">
          <span>Pending</span>
          <h3>{pendingBookings}</h3>
          <p>Waiting</p>
        </div>

        <div className="app-stat-card success">
          <span>Confirmed</span>
          <h3>{confirmedBookings}</h3>
          <p>Approved</p>
        </div>

        <div className="app-stat-card blue">
          <span>Completed</span>
          <h3>{completedBookings}</h3>
          <p>Finished</p>
        </div>
      </section>

      <section className="app-section">
        <div className="app-section-title">
          <div>
            <h2>Latest Booking</h2>
            <p>Your most recent trip request</p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("trips")}
            className="text-action-btn"
          >
            View All
          </button>
        </div>

        {latestBooking ? (
          <div className="latest-app-card">
            <div className="latest-card-top">
              <div>
                <span>Trip Type</span>
                <h3>{latestBooking.trip_type || "Vehicle Booking"}</h3>
              </div>

              <strong className={`status ${latestBooking.status || "pending"}`}>
                {latestBooking.status || "pending"}
              </strong>
            </div>

            <p className="latest-route">
              {latestBooking.pickup_location || "-"} → {latestBooking.drop_location || "-"}
            </p>

            <div className="latest-mini-grid">
              <div>
                <span>Date</span>
                <strong>{latestBooking.pickup_date || "-"}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{latestBooking.pickup_time || "-"}</strong>
              </div>

              <div>
                <span>Vehicle</span>
                <strong>{latestBooking.vehicle_type || "-"}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-app-card">
            <div className="empty-icon">🚐</div>
            <h3>No bookings yet</h3>
            <p>Create your first booking and track everything here.</p>

            <a href="/booking" className="primary-app-btn">
              Create Booking
            </a>
          </div>
        )}
      </section>
    </>
  );
};

export default DashboardHome;