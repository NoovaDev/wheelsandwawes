import axios from "axios";

const UserTrips = ({ bookings, refreshBookings }) => {
  const isLateCancel = (booking) => {
    if (!booking.pickup_date || !booking.pickup_time) return false;

    const dateOnly = booking.pickup_date.split("T")[0];
    const timeOnly = booking.pickup_time.slice(0, 5);
    const tripDateTime = new Date(`${dateOnly}T${timeOnly}:00`);

    const now = new Date();
    const hoursLeft =
      (tripDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    return hoursLeft < 10;
  };

  const canShowCancelButton = (booking) => {
    return booking.status !== "cancelled" && booking.status !== "completed";
  };

  const cancelBooking = async (booking) => {
    const lateCancel = isLateCancel(booking);

    const confirmCancel = window.confirm(
      lateCancel
        ? "This trip starts within 10 hours.\n\nYou can cancel, but advance payment is NOT refundable.\n\nDo you still want to cancel?"
        : "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `https://wheelsandwawes.com/api/bookings/${booking.id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        lateCancel
          ? "Booking cancelled. Advance payment is not refundable."
          : "Booking cancelled successfully."
      );

      if (refreshBookings) {
        refreshBookings();
      } else {
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <>
      <div className="user-dashboard-header">
        <div>
          <h2>My Trips</h2>
          <p>View all bookings connected to your account.</p>
        </div>

        <a href="/booking" className="new-booking-btn">
          + New Booking
        </a>
      </div>

      <div className="dashboard-section">
        <div className="section-title">
          <h3>My Booked Tours</h3>
          <p>
            You can cancel anytime. If you cancel within 10 hours before the
            trip, advance payment is not refundable.
          </p>
        </div>

        <div className="table-scroll">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Trip</th>
                <th>Vehicle</th>
                <th>Passengers</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.trip_type || "Tour Booking"}</strong>
                      <span>
                        {booking.pickup_location} → {booking.drop_location}
                      </span>
                    </td>

                    <td>{booking.vehicle_type}</td>
                    <td>{booking.passengers || "-"}</td>

                    <td>
                      <span>{booking.pickup_date}</span>
                      <span>{booking.pickup_time}</span>
                    </td>

                    <td>
                      <span className={`status ${booking.status || "pending"}`}>
                        {booking.status || "pending"}
                      </span>
                    </td>

                    <td>
                      {canShowCancelButton(booking) ? (
                        <>
                          <button
                            type="button"
                            className="cancel-trip-btn"
                            onClick={() => cancelBooking(booking)}
                          >
                            Cancel
                          </button>

                          {isLateCancel(booking) && (
                            <span className="late-cancel-note">No refund</span>
                          )}
                        </>
                      ) : (
                        <span className="cancel-disabled">
                          {booking.status === "cancelled"
                            ? "Cancelled"
                            : "Completed"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No bookings found for this user.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserTrips;