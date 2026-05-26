import React, { useMemo } from "react";

const DashboardHome = ({ bookings = [], setActiveTab, user }) => {
  // Memoize counts so they don't recalculate unless the bookings array changes
  const stats = useMemo(() => {
    const total = bookings.length;
    let pending = 0;
    let confirmed = 0;
    let completed = 0;

    bookings.forEach((b) => {
      if (!b.status || b.status === "pending") pending++;
      else if (b.status === "confirmed") confirmed++;
      else if (b.status === "completed") completed++;
    });

    return { total, pending, confirmed, completed };
  }, [bookings]);

  // Safely grab the most recent booking entry
  const latestBooking = bookings[0];

  const firstName = user?.full_name?.trim().split(" ")[0] || "Customer";

  const getHeroMessage = () => {
    if (stats.pending > 0) {
      return "You have a booking waiting for confirmation. Our team will review it soon.";
    }
    if (stats.confirmed > 0) {
      return "Your confirmed trip is ready. Please check your trip details before pickup.";
    }
    if (stats.completed > 0) {
      return "Thanks for travelling with us. You can plan your next journey anytime.";
    }
    return "Book your first Sri Lanka travel service and manage everything from your dashboard.";
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
      return "Your trip is completed. Thank you for choosing our travel service.";
    }
    if (status === "cancelled") {
      return "This booking was cancelled. You can create a new booking anytime.";
    }
    return "Your request was received. Our team will check availability and confirm soon.";
  };

  return (
    <>
      <section className="app-hero">
        <div className="hero-content">
          <span className="hero-badge">Customer Dashboard</span>
          <h1>Hello {firstName}, manage your travel bookings here</h1>
          <p>{getHeroMessage()}</p>

          {latestBooking && (
            <div className="hero-status-box">
              <div className="mini-icon status-icon"></div>
              <div>
                <strong>{getStatusTitle(latestBooking.status)}</strong>
                <span>{latestBooking.trip_type || "Travel Booking"}</span>
              </div>
            </div>
          )}
        </div>

        <a href="/booking" className="primary-app-btn">
          New Booking
        </a>
      </section>

      {latestBooking && (
        <section className="dashboard-guide-card">
          <div className="guide-top">
            <div>
              <span className="guide-label">Booking Progress</span>
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
          <div className="stat-icon total-icon"></div>
          <span>Total Bookings</span>
          <h3>{stats.total}</h3>
          <p>All travel requests</p>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon pending-icon"></div>
          <span>Pending</span>
          <h3>{stats.pending}</h3>
          <p>Waiting for approval</p>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon confirmed-icon"></div>
          <span>Confirmed</span>
          <h3>{stats.confirmed}</h3>
          <p>Ready to travel</p>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon completed-icon"></div>
          <span>Completed</span>
          <h3>{stats.completed}</h3>
          <p>Finished journeys</p>
        </div>
      </section>

      <section className="quick-actions-grid">
        <button
          type="button"
          className="quick-action-card"
          onClick={() => setActiveTab("trips")}
        >
          <div className="quick-icon trips-icon"></div>
          <strong>My Trips</strong>
          <p>View booking history and trip status.</p>
        </button>

        <a href="/booking" className="quick-action-card">
          <div className="quick-icon booking-icon"></div>
          <strong>Book New Tour</strong>
          <p>Create a new vehicle or travel booking.</p>
        </a>

        <button
          type="button"
          className="quick-action-card"
          onClick={() => setActiveTab("profile")}
        >
          <div className="quick-icon profile-icon"></div>
          <strong>Profile</strong>
          <p>View your account and contact details.</p>
        </button>
      </section>

      <section className="app-section">
        <div className="app-section-title">
          <div>
            <h2>Latest Booking</h2>
            <p>Your most recent trip request.</p>
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
              {latestBooking.pickup_location || "-"} to{" "}
              {latestBooking.drop_location || "-"}
            </p>

            <div className="latest-mini-grid">
              <div>
                <span>Date</span>
                <strong>{latestBooking.pickup_date || "-"}</strong>
              </div>
              <div>
                <span>Time</span>
                <strong>{latestBooking.pickup_time ? String(latestBooking.pickup_time).slice(0, 5) : "-"}</strong>
              </div>
              <div>
                <span>Vehicle</span>
                <strong>{latestBooking.vehicle_type || "-"}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-app-card">
            <div className="empty-state-icon"></div>
            <h3>Ready to plan your first trip?</h3>
            <p>Create your first booking and track your trip status from here.</p>
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