import axios from "axios";

const UserTrips = ({ bookings, refreshBookings }) => {

  const isLateCancel = (booking) => {
    if (!booking.pickup_date || !booking.pickup_time) return false;

    const dateOnly = booking.pickup_date.split("T")[0];
    const timeOnly = booking.pickup_time.slice(0, 5);

    const tripDateTime = new Date(`${dateOnly}T${timeOnly}:00`);

    const now = new Date();

    const hoursLeft =
      (tripDateTime.getTime() - now.getTime()) /
      (1000 * 60 * 60);

    return hoursLeft < 10;
  };

  const canShowCancelButton = (booking) => {
    return (
      booking.status !== "cancelled" &&
      booking.status !== "completed"
    );
  };

  const cancelBooking = async (booking) => {

    const lateCancel = isLateCancel(booking);

    const confirmCancel = window.confirm(
      lateCancel
        ? "This trip starts within 10 hours.\n\nAdvance payment is NOT refundable.\n\nCancel booking?"
        : "Cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      const token = localStorage.getItem("token");

      await axios.patch(
        `/api/bookings/${booking.id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking cancelled successfully");

      refreshBookings();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Cancel failed"
      );
    }
  };

  return (
    <>
      <div className="user-dashboard-header">
        <div>
          <h2>My Trips</h2>
          <p>
            View and manage all your travel bookings.
          </p>
        </div>

        <a href="/booking" className="new-booking-btn">
          + New Booking
        </a>
      </div>

      <div className="dashboard-section">

        <div className="section-title">
          <h3>Booked Tours</h3>

          <p>
            Cancel before 10 hours to avoid
            payment issues.
          </p>
        </div>

        {bookings.length > 0 ? (

          <div className="mobile-trip-grid">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="trip-mobile-card"
              >

                <div className="trip-mobile-top">

                  <div>
                    <span className="trip-label">
                      Trip Type
                    </span>

                    <h3>
                      {booking.trip_type ||
                        "Tour Booking"}
                    </h3>
                  </div>

                  <span
                    className={`status ${booking.status || "pending"}`}
                  >
                    {booking.status || "pending"}
                  </span>
                </div>

                <div className="trip-route">
                  {booking.pickup_location}
                  <span> → </span>
                  {booking.drop_location}
                </div>

                <div className="trip-mobile-grid">

                  <div>
                    <span>Date</span>
                    <strong>
                      {booking.pickup_date || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Time</span>
                    <strong>
                      {booking.pickup_time || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Vehicle</span>
                    <strong>
                      {booking.vehicle_type || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Passengers</span>
                    <strong>
                      {booking.passengers || "-"}
                    </strong>
                  </div>

                </div>

                {canShowCancelButton(booking) ? (

                  <button
                    type="button"
                    className="cancel-trip-btn full-btn"
                    onClick={() =>
                      cancelBooking(booking)
                    }
                  >
                    Cancel Booking
                  </button>

                ) : (

                  <div className="booking-finished-box">
                    {booking.status === "cancelled"
                      ? "This booking was cancelled"
                      : "Trip completed"}
                  </div>

                )}

                {isLateCancel(booking) && (
                  <div className="late-warning">
                    Late cancellation — payment not refundable
                  </div>
                )}

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-dashboard-card">

            <h3>No bookings yet</h3>

            <p>
              Create your first booking to
              manage your tours here.
            </p>

            <a
              href="/booking"
              className="new-booking-btn"
            >
              Create Booking
            </a>

          </div>

        )}

      </div>
    </>
  );
};

export default UserTrips;