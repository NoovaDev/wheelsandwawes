import { useState } from "react";
import axios from "axios";

const AdminBookings = ({ bookings = [], refreshBookings }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `/api/bookings/${id}/status`,
        { status },
        getAuthHeader()
      );

      refreshBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  const cleanPhone = (phone) => {
    if (!phone) return "";
    let number = String(phone).replace(/\D/g, "");

    if (number.startsWith("0")) {
      number = "94" + number.slice(1);
    }

    if (!number.startsWith("94")) {
      number = "94" + number;
    }

    return number;
  };

  const getDateOnly = (dateValue) => {
    if (!dateValue) return "";
    return String(dateValue).split("T")[0];
  };

  const getBookingType = (booking) => {
    return (
      booking.trip_type ||
      booking.service_type ||
      booking.booking_type ||
      "Travel Booking"
    );
  };

  const makeDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = makeDateString(today);
  const tomorrowStr = makeDateString(tomorrow);

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = getDateOnly(booking.pickup_date);
    const bookingStatus = booking.status || "pending";
    const searchText = search.toLowerCase();

    const matchSearch =
      !search ||
      booking.full_name?.toLowerCase().includes(searchText) ||
      booking.email?.toLowerCase().includes(searchText) ||
      booking.phone?.toString().includes(search) ||
      booking.trip_type?.toLowerCase().includes(searchText) ||
      booking.vehicle_type?.toLowerCase().includes(searchText) ||
      booking.pickup_location?.toLowerCase().includes(searchText) ||
      booking.drop_location?.toLowerCase().includes(searchText);

    const matchStatus =
      statusFilter === "all" || bookingStatus === statusFilter;

    const matchDate =
      dateFilter === "all" ||
      (dateFilter === "today" && bookingDate === todayStr) ||
      (dateFilter === "tomorrow" && bookingDate === tomorrowStr);

    return matchSearch && matchStatus && matchDate;
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <span>Booking Management</span>
          <h2>Manage Bookings</h2>
          <p>Search, contact customers, and update trip status quickly.</p>
        </div>
      </div>

      <div className="admin-filters advanced">
        <input
          placeholder="Search customer, phone, email, route, trip, vehicle"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>

      <div className="admin-table-card">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Trip Details</th>
              <th>Vehicle</th>
              <th>Travel Date</th>
              <th>Status</th>
              <th>Quick Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => {
                const phone = cleanPhone(booking.phone);
                const message = `Hello ${booking.full_name || ""}, this is about your ${
                  getBookingType(booking)
                } booking on ${getDateOnly(booking.pickup_date)} at ${
                  booking.pickup_time || ""
                }.`;

                return (
                  <tr key={booking.id}>
                    <td data-label="Customer">
                      <strong>{booking.full_name || "-"}</strong>
                      <span>{booking.nationality || "Customer"}</span>
                      <span>{booking.nic_number || booking.passport_number || ""}</span>
                    </td>

                    <td data-label="Contact">
                      <span>{booking.phone || "-"}</span>
                      <span>{booking.email || "-"}</span>
                    </td>

                    <td data-label="Trip Details">
                      <strong>{getBookingType(booking)}</strong>
                      <span>{booking.pickup_location || "-"}</span>
                      <span>to {booking.drop_location || "-"}</span>
                    </td>

                    <td data-label="Vehicle">
                      <strong>{booking.vehicle_type || "-"}</strong>
                      <span>{booking.passengers || "-"} passengers</span>
                      <span>{booking.need_driver || "-"}</span>
                    </td>

                    <td data-label="Travel Date">
                      <strong>{getDateOnly(booking.pickup_date) || "-"}</strong>
                      <span>{booking.pickup_time || "-"}</span>
                    </td>

                    <td data-label="Status">
                      <span className={`status ${booking.status || "pending"}`}>
                        {booking.status || "pending"}
                      </span>
                    </td>

                    <td data-label="Quick Actions">
                      <div className="admin-action-stack">
                        <select
                          value={booking.status || "pending"}
                          onChange={(e) => updateStatus(booking.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <div className="quick-status-buttons">
                          <button onClick={() => updateStatus(booking.id, "confirmed")}>
                            Confirm
                          </button>

                          <button onClick={() => updateStatus(booking.id, "completed")}>
                            Complete
                          </button>
                        </div>

                        {phone ? (
                          <a
                            className="whatsapp-admin-btn"
                            href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            WhatsApp Customer
                          </a>
                        ) : (
                          <span>No WhatsApp</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminBookings;