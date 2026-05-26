import {
  FaArrowRight,
  FaCalendarAlt,
  FaCar,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaMapMarkerAlt,
  FaRoute,
  FaSuitcaseRolling,
} from "react-icons/fa";

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
      {/* HERO */}

      <section className="booking-style-hero">
        <div className="hero-left">
          <span className="hero-badge">
            <FaCompass />
            W&W Travels Premium Dashboard
          </span>

          <h1>
            Welcome back,
            <br />
            {firstName} 👋
          </h1>

          <p>
            Manage airport pickups, private tours, vehicle rentals, and Sri
            Lanka travel plans from one modern travel dashboard.
          </p>

          <div className="hero-mini-stats">
            <div>
              <strong>{completedBookings}</strong>
              <span>Trips Completed</span>
            </div>

            <div>
              <strong>{confirmedBookings}</strong>
              <span>Confirmed Tours</span>
            </div>

            <div>
              <strong>{totalBookings}</strong>
              <span>Total Bookings</span>
            </div>
          </div>
        </div>

        <div className="hero-booking-box">
          <div className="hero-booking-top">
            <div>
              <span>Plan your next adventure</span>
              <h3>Where are you going next?</h3>
            </div>

            <div className="live-badge">
              <span></span>
              Active
            </div>
          </div>

          <div className="hero-search-grid">
            <div className="hero-search-item">
              <FaRoute />

              <div>
                <small>Service</small>

                <strong>
                  {latestBooking?.trip_type || "Airport / Tour / Rent"}
                </strong>
              </div>
            </div>

            <div className="hero-search-item">
              <FaCheckCircle />

              <div>
                <small>Status</small>

                <strong>
                  {latestBooking?.status || "Ready to travel"}
                </strong>
              </div>
            </div>
          </div>

          <a href="/booking" className="primary-app-btn hero-main-btn">
            Create Booking
            <FaArrowRight />
          </a>
        </div>
      </section>

      {/* STATS */}

      <section className="stats-app-grid">
        <div className="app-stat-card">
          <div className="stat-icon blue">
            <FaSuitcaseRolling />
          </div>

          <span>Total Bookings</span>

          <h3>{totalBookings}</h3>

          <p>All travel requests</p>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon orange">
            <FaClock />
          </div>

          <span>Pending</span>

          <h3>{pendingBookings}</h3>

          <p>Waiting for approval</p>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon green">
            <FaCheckCircle />
          </div>

          <span>Confirmed</span>

          <h3>{confirmedBookings}</h3>

          <p>Ready to travel</p>
        </div>

        <div className="app-stat-card">
          <div className="stat-icon purple">
            <FaCompass />
          </div>

          <span>Completed</span>

          <h3>{completedBookings}</h3>

          <p>Finished journeys</p>
        </div>
      </section>

      {/* QUICK ACTIONS */}

      <section className="quick-actions-grid">
        <button
          type="button"
          className="quick-action-card"
          onClick={() => setActiveTab("trips")}
        >
          <div className="quick-action-icon">
            <FaMapMarkerAlt />
          </div>

          <strong>My Trips</strong>

          <p>
            Check pickup dates, routes, vehicle details, and booking status.
          </p>
        </button>

        <a href="/booking" className="quick-action-card">
          <div className="quick-action-icon">
            <FaCalendarAlt />
          </div>

          <strong>Book New Tour</strong>

          <p>
            Create a new airport transfer, island tour, or vehicle booking.
          </p>
        </a>

        <button
          type="button"
          className="quick-action-card"
          onClick={() => setActiveTab("profile")}
        >
          <div className="quick-action-icon">
            <FaCar />
          </div>

          <strong>My Profile</strong>

          <p>Manage your travel account and contact information.</p>
        </button>
      </section>

      {/* LATEST BOOKING */}

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
          <div className="latest-travel-card">
            <div className="latest-travel-left">
              <div className="travel-image-box">
                <FaCar />
              </div>

              <div className="travel-main-content">
                <div className="travel-top-row">
                  <div>
                    <span className="travel-label">Trip Type</span>

                    <h3>
                      {latestBooking.trip_type || "Vehicle Booking"}
                    </h3>
                  </div>

                  <strong
                    className={`status ${
                      latestBooking.status || "pending"
                    }`}
                  >
                    {latestBooking.status || "pending"}
                  </strong>
                </div>

                <div className="travel-route">
                  <FaMapMarkerAlt />

                  <p>
                    {latestBooking.pickup_location || "-"} →{" "}
                    {latestBooking.drop_location || "-"}
                  </p>
                </div>

                <div className="travel-info-grid">
                  <div>
                    <span>Date</span>

                    <strong>
                      {latestBooking.pickup_date
                        ?.split("T")[0] || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Pickup Time</span>

                    <strong>
                      {latestBooking.pickup_time || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Vehicle</span>

                    <strong>
                      {latestBooking.vehicle_type || "-"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-app-card">
            <h3>Ready for your next adventure?</h3>

            <p>
              Create your first booking and manage your Sri Lanka trips from
              this dashboard.
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