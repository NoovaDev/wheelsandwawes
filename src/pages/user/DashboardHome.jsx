const DashboardHome = ({ bookings, setActiveTab, user }) => {
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
  const firstName = user?.full_name?.split(" ")[0] || "Customer";

  return (
    <>
      <section className="booking-style-hero">
        <div>
          <span className="hero-badge">W&W Travels Customer Area</span>
          <h1>Welcome back, {firstName}</h1>
          <p>
            Manage your Sri Lanka tours, vehicle bookings, pickup details, and
            travel status from one clean dashboard.
          </p>
        </div>

        <div className="hero-booking-box">
          <span>Plan your next trip</span>
          <h3>Where are you going next?</h3>

          <div className="hero-search-row">
            <div>
              <small>Service</small>
              <strong>{latestBooking?.trip_type || "Airport / Tour / Rent"}</strong>
            </div>

            <div>
              <small>Status</small>
              <strong>{latestBooking?.status || "Ready to book"}</strong>
            </div>

            <a href="/booking" className="primary-app-btn">
              New Booking
            </a>
          </div>
        </div>
      </section>

      <section className="stats-app-grid">
        <div className="app-stat-card">
          <span>Total Bookings</span>
          <h3>{totalBookings}</h3>
          <p>All travel requests</p>
        </div>

        <div className="app-stat-card">
          <span>Pending</span>
          <h3>{pendingBookings}</h3>
          <p>Waiting for approval</p>
        </div>

        <div className="app-stat-card">
          <span>Confirmed</span>
          <h3>{confirmedBookings}</h3>
          <p>Ready to travel</p>
        </div>

        <div className="app-stat-card">
          <span>Completed</span>
          <h3>{completedBookings}</h3>
          <p>Finished journeys</p>
        </div>
      </section>

      <section className="quick-actions-grid">
        <button
          type="button"
          className="quick-action-card"
          onClick={() => setActiveTab("trips")}
        >
          <strong>My Trips</strong>
          <p>Check booking dates, route, vehicle, and status.</p>
        </button>

        <a href="/booking" className="quick-action-card">
          <strong>Book New Tour</strong>
          <p>Create a new airport transfer, tour, or vehicle booking.</p>
        </a>

        <button
          type="button"
          className="quick-action-card"
          onClick={() => setActiveTab("profile")}
        >
          <strong>My Profile</strong>
          <p>View your account and contact information.</p>
        </button>
      </section>

      <section className="app-section">
        <div className="app-section-title">
          <div>
            <h2>Latest Booking</h2>
            <p>Your most recent travel request.</p>
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
          <div className="latest-app-card booking-card-style">
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
              {latestBooking.pickup_location || "-"} →{" "}
              {latestBooking.drop_location || "-"}
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
            <h3>Ready to plan your first trip?</h3>
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