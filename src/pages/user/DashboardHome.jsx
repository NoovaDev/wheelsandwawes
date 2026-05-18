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

  const getHeroMessage = () => {
    if (pendingBookings > 0) {
      return "You have a booking waiting for confirmation. Our team will review it soon.";
    }

    if (confirmedBookings > 0) {
      return "Your confirmed trip is ready. Check your trip details before pickup.";
    }

    if (completedBookings > 0) {
      return "Thanks for travelling with us. Ready to plan your next Sri Lanka tour?";
    }

    return "Book your first Sri Lanka travel service and manage everything here.";
  };

  const getStatusTitle = (status) => {
    if (status === "confirmed") return "Booking Confirmed";
    if (status === "completed") return "Trip Completed";
    if (status === "cancelled") return "Booking Cancelled";
    return "Waiting For Confirmation";
  };

  const getStatusMessage = (status) => {
    if (status === "confirmed") {
      return "Your booking is approved. Our team will share driver and trip details before pickup.";
    }

    if (status === "completed") {
      return "Your trip is completed. Thank you for choosing Wheels & Waves Travels.";
    }

    if (status === "cancelled") {
      return "This booking was cancelled. You can create a new booking anytime.";
    }

    return "Your request was received. Our team will check availability and confirm soon.";
  };

  return (
    <>
      <section className="app-hero">
        <div>
          <span className="hero-badge">Welcome Back 👋</span>

          <h1>Your Travel Dashboard</h1>

          <p>{getHeroMessage()}</p>

          {latestBooking && (
            <div className="hero-status-box">
              <strong>
                {latestBooking.status === "confirmed"
                  ? "✅ Booking Confirmed"
                  : latestBooking.status === "completed"
                  ? "🎉 Trip Completed"
                  : latestBooking.status === "cancelled"
                  ? "❌ Booking Cancelled"
                  : "⏳ Waiting For Confirmation"}
              </strong>

              <span>{latestBooking.trip_type || "Travel Booking"}</span>
            </div>
          )}
        </div>

        <a href="/booking" className="primary-app-btn">
          + New Booking
        </a>
      </section>

      {latestBooking && (
        <section className="dashboard-guide-card">
          <div className="guide-top">
            <div>
              <span className="guide-label">Booking Status</span>
              <h3>{getStatusTitle(latestBooking.status)}</h3>
              <p>{getStatusMessage(latestBooking.status)}</p>
            </div>

            <span className={`status ${latestBooking.status || "pending"}`}>
              {latestBooking.status || "pending"}
            </span>
          </div>

          <div className="guide-steps">
            <div className="guide-step active">
              <div className="guide-dot"></div>

              <div>
                <strong>Request Received</strong>
                <p>Your booking request was submitted successfully.</p>
              </div>
            </div>

            <div
              className={`guide-step ${
                latestBooking.status === "confirmed" ||
                latestBooking.status === "completed"
                  ? "active"
                  : ""
              }`}
            >
              <div className="guide-dot"></div>

              <div>
                <strong>Booking Confirmation</strong>
                <p>Our team will confirm your booking after checking availability.</p>
              </div>
            </div>

            <div
              className={`guide-step ${
                latestBooking.status === "completed" ? "active" : ""
              }`}
            >
              <div className="guide-dot"></div>

              <div>
                <strong>Trip Completed</strong>
                <p>Your travel service is completed successfully.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="stats-app-grid">
        <div className="app-stat-card">
          <span>📦 Total Bookings</span>
          <h3>{totalBookings}</h3>
          <p>All travel requests</p>
        </div>

        <div className="app-stat-card warning">
          <span>⏳ Pending</span>
          <h3>{pendingBookings}</h3>
          <p>Waiting for approval</p>
        </div>

        <div className="app-stat-card success">
          <span>✅ Confirmed</span>
          <h3>{confirmedBookings}</h3>
          <p>Ready to travel</p>
        </div>

        <div className="app-stat-card blue">
          <span>🎉 Completed</span>
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
          <span>🧳</span>
          <strong>My Trips</strong>
          <p>View booking history and trip status</p>
        </button>

        <a href="/booking" className="quick-action-card">
          <span>🚐</span>
          <strong>Book New Tour</strong>
          <p>Create a new travel booking</p>
        </a>

        <button
          type="button"
          className="quick-action-card"
          onClick={() => setActiveTab("profile")}
        >
          <span>👤</span>
          <strong>Profile</strong>
          <p>View your account details</p>
        </button>
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
            <div className="empty-icon">🌴</div>

            <h3>Ready for your Sri Lanka adventure?</h3>

            <p>
              Create your first booking and track your trip status from here.
            </p>

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