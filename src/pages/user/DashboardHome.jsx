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
      <div className="dashboard-hero">
        <div>
          <span>Welcome Back</span>
          <h2>User Dashboard</h2>
          <p>Track your bookings, trip status, and travel plans in one place.</p>
        </div>

        <a href="/booking" className="new-booking-btn">
          + New Booking
        </a>
      </div>

      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <span>Total Bookings</span>
          <h3>{totalBookings}</h3>
          <p>All your trip requests</p>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <h3>{pendingBookings}</h3>
          <p>Waiting for confirmation</p>
        </div>

        <div className="stat-card">
          <span>Confirmed</span>
          <h3>{confirmedBookings}</h3>
          <p>Approved bookings</p>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <h3>{completedBookings}</h3>
          <p>Finished trips</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-title">
          <h3>Latest Booking</h3>
          <p>Your most recent trip request.</p>
        </div>

        {latestBooking ? (
          <div className="latest-booking-pro-card">
            <div>
              <span className="latest-label">Trip Type</span>
              <h3>{latestBooking.trip_type || "Vehicle Booking"}</h3>
              <p>
                {latestBooking.pickup_location} → {latestBooking.drop_location}
              </p>
            </div>

            <div className="latest-info-grid">
              <div>
                <span>Date</span>
                <strong>{latestBooking.pickup_date}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{latestBooking.pickup_time}</strong>
              </div>

              <div>
                <span>Vehicle</span>
                <strong>{latestBooking.vehicle_type || "-"}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className={`status ${latestBooking.status || "pending"}`}>
                  {latestBooking.status || "pending"}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="small-action-btn"
              onClick={() => setActiveTab("trips")}
            >
              View All Trips
            </button>
          </div>
        ) : (
          <div className="empty-dashboard-card">
            <h3>No bookings yet</h3>
            <p>Create your first booking and track it here.</p>
            <a href="/booking" className="new-booking-btn">
              Create Booking
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHome;