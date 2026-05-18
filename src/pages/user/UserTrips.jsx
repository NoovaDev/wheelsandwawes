import axios from "axios";

const UserTrips = ({ bookings, refreshBookings }) => {
  /*
    IMPORTANT:
    MySQL DATE fields can come to React like:
    2026-05-18T18:30:00.000Z

    In Sri Lanka timezone, that is actually:
    2026-05-19

    So we format dates using Asia/Colombo timezone.
  */

  const getSriLankaDateParts = (dateValue) => {
    if (!dateValue) return null;

    // If backend sends normal date input format: 2026-05-19
    if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      const [year, month, day] = dateValue.split("-");
      return {
        year,
        month,
        day,
      };
    }

    // If backend sends ISO date: 2026-05-18T18:30:00.000Z
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return null;

    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date);

    return {
      year: parts.find((p) => p.type === "year")?.value,
      month: parts.find((p) => p.type === "month")?.value,
      day: parts.find((p) => p.type === "day")?.value,
    };
  };

  const formatTripDate = (dateValue) => {
    const parts = getSriLankaDateParts(dateValue);

    if (!parts) return "-";

    const { year, month, day } = parts;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return `${weekdays[date.getDay()]}, ${months[Number(month) - 1]} ${Number(
      day
    )}, ${year}`;
  };

  const getDateForCancelCheck = (dateValue) => {
    const parts = getSriLankaDateParts(dateValue);

    if (!parts) return null;

    return `${parts.year}-${parts.month}-${parts.day}`;
  };

  const formatTripTime = (timeValue) => {
    if (!timeValue) return "-";
    return String(timeValue).slice(0, 5);
  };

  const getBookingType = (booking) => {
    return (
      booking.trip_type ||
      booking.service_type ||
      booking.booking_type ||
      "Travel Booking"
    );
  };

  const getDriverText = (value) => {
    if (!value) return "-";
    if (value === "yes") return "Driver needed";
    if (value === "no") return "Self drive";
    return value;
  };

  const isLateCancel = (booking) => {
    if (!booking.pickup_date || !booking.pickup_time) return false;

    const dateOnly = getDateForCancelCheck(booking.pickup_date);
    const timeOnly = formatTripTime(booking.pickup_time);

    if (!dateOnly || timeOnly === "-") return false;

    // Sri Lanka timezone offset
    const tripDateTime = new Date(`${dateOnly}T${timeOnly}:00+05:30`);
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
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <>
      <div className="user-dashboard-header">
        <div>
          <h2>My Trips</h2>
          <p>View your selected travel date, route, and booking status.</p>
        </div>

        <a href="/booking" className="new-booking-btn">
          + New Booking
        </a>
      </div>

      <div className="dashboard-section">
        <div className="section-title trips-title-row">
          <div>
            <h3>Booked Trips</h3>
            <p>
              This page shows the trip date you selected in the booking form.
            </p>
          </div>
        </div>

        {bookings.length > 0 ? (
          <div className="mobile-trip-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="trip-mobile-card compact-trip-card">
                <div className="trip-card-header">
                  <div>
                    <span className="trip-label">Booking Type</span>
                    <h3>{getBookingType(booking)}</h3>
                  </div>

                  <span className={`status ${booking.status || "pending"}`}>
                    {booking.status || "pending"}
                  </span>
                </div>

                <div className="trip-date-highlight">
                  <span>Selected Trip Date</span>
                  <strong>{formatTripDate(booking.pickup_date)}</strong>
                  <p>Pickup time: {formatTripTime(booking.pickup_time)}</p>
                </div>

                <div className="trip-route-box">
                  <span>Route</span>

                  <strong>{booking.pickup_location || "-"}</strong>

                  <small>to</small>

                  <strong>{booking.drop_location || "-"}</strong>
                </div>

                <div className="trip-mobile-grid compact-info-grid">
                  <div>
                    <span>Vehicle</span>
                    <strong>{booking.vehicle_type || "-"}</strong>
                  </div>

                  <div>
                    <span>Passengers</span>
                    <strong>{booking.passengers || "-"}</strong>
                  </div>

                  <div>
                    <span>Driver</span>
                    <strong>{getDriverText(booking.need_driver)}</strong>
                  </div>

                  <div>
                    <span>Return Date</span>
                    <strong>{formatTripDate(booking.return_date)}</strong>
                  </div>
                </div>

                {canShowCancelButton(booking) ? (
                  <button
                    type="button"
                    className="cancel-trip-btn full-btn"
                    onClick={() => cancelBooking(booking)}
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

                {isLateCancel(booking) && canShowCancelButton(booking) && (
                  <div className="late-warning">
                    Late cancellation — payment not refundable
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-dashboard-card">
            <h3>No trips booked yet</h3>

            <p>
              Create your first booking and your selected travel date will show
              here.
            </p>

            <a href="/booking" className="new-booking-btn">
              Create Booking
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default UserTrips;
