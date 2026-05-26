import React from "react";
import axios from "axios";

const UserTrips = ({ bookings = [], refreshBookings }) => {
  
  // Safely extracts year, month, and day based on Sri Lanka Timezone (Asia/Colombo)
  const getSriLankaDateParts = (dateValue) => {
    if (!dateValue) return null;

    // Handle standard YYYY-MM-DD input strings smoothly
    if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      const [year, month, day] = dateValue.split("-");
      return { year, month, day };
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return null;

    try {
      const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Colombo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const parts = formatter.formatToParts(date);
      return {
        year: parts.find((p) => p.type === "year")?.value,
        month: parts.find((p) => p.type === "month")?.value,
        day: parts.find((p) => p.type === "day")?.value,
      };
    } catch (e) {
      return null;
    }
  };

  // Formats the date cleanly while locking the calculation to UTC to avoid local machine drift
  const formatTripDate = (dateValue) => {
    const parts = getSriLankaDateParts(dateValue);
    if (!parts) return "-";

    const { year, month, day } = parts;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return `${weekdays[date.getUTCDay()]}, ${months[Number(month) - 1]} ${Number(day)}, ${year}`;
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
    return booking.trip_type || booking.service_type || booking.booking_type || "Travel Booking";
  };

  const getDriverText = (value) => {
    if (!value) return "-";
    const normal = String(value).toLowerCase();
    if (normal === "yes" || normal === "true") return "Driver needed";
    if (normal === "no" || normal === "false") return "Self drive";
    return value;
  };

  // Checks if the trip starts within 10 hours using Sri Lanka's offset (+05:30)
  const isLateCancel = (booking) => {
    if (!booking.pickup_date || !booking.pickup_time) return false;

    const dateOnly = getDateForCancelCheck(booking.pickup_date);
    const timeOnly = formatTripTime(booking.pickup_time);

    if (!dateOnly || timeOnly === "-") return false;

    const tripDateTime = new Date(`${dateOnly}T${timeOnly}:00+05:30`);
    const now = new Date();

    if (Number.isNaN(tripDateTime.getTime())) return false;

    const hoursLeft = (tripDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
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
      if (typeof refreshBookings === "function") {
        refreshBookings();
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
            <p>This page shows the trip date you selected in the booking form.</p>
          </div>
        </div>

        {bookings.length > 0 ? (
          <div className="trips-table-wrapper">
            <table className="trips-table">
              <thead>
                <tr>
                  <th>Trip Type</th>
                  <th>Pickup Date</th>
                  <th>Pickup Time</th>
                  <th>Pickup Location</th>
                  <th>Drop Location</th>
                  <th>Vehicle</th>
                  <th>Passengers</th>
                  <th>Driver</th>
                  <th>Return Date</th>
                  <th>Return Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const lateCancel = isLateCancel(booking);
                  const showCancel = canShowCancelButton(booking);
                  
                  return (
                    <tr key={booking.id || Math.random()}>
                      <td data-label="Trip Type">{getBookingType(booking)}</td>
                      <td data-label="Pickup Date">{formatTripDate(booking.pickup_date)}</td>
                      <td data-label="Pickup Time">{formatTripTime(booking.pickup_time)}</td>
                      <td data-label="Pickup Location">{booking.pickup_location || "-"}</td>
                      <td data-label="Drop Location">{booking.drop_location || "-"}</td>
                      <td data-label="Vehicle">{booking.vehicle_type || "-"}</td>
                      <td data-label="Passengers">{booking.passengers || "-"}</td>
                      <td data-label="Driver">{getDriverText(booking.need_driver)}</td>
                      <td data-label="Return Date">{formatTripDate(booking.return_date)}</td>
                      <td data-label="Return Time">{formatTripTime(booking.return_time)}</td>

                      <td data-label="Status">
                        <span className={`status ${booking.status || "pending"}`}>
                          {booking.status || "pending"}
                        </span>
                      </td>

                      <td data-label="Action">
                        {showCancel ? (
                          <>
                            <button
                              type="button"
                              className="cancel-trip-btn"
                              onClick={() => cancelBooking(booking)}
                            >
                              Cancel
                            </button>
                            {lateCancel && (
                              <div className="late-warning" style={{ color: "red", fontSize: "11px", marginTop: "4px" }}>
                                Non refundable
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="booking-finished-box">
                            {booking.status === "cancelled" ? "Cancelled" : "Completed"}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-dashboard-card">
            <h3>No trips booked yet</h3>
            <p>Create your first booking and your selected travel date will show here.</p>
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