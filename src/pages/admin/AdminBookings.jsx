import { useState } from "react";
import axios from "axios";

const AdminBookings = ({ bookings = [], refreshBookings }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
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
      console.log("Update status error:", error.response?.data || error);
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  const getDateOnly = (dateValue) => {
    if (!dateValue) return "";
    return String(dateValue).split("T")[0];
  };

  const makeDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = makeDateString(today);
  const yesterdayStr = makeDateString(yesterday);
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
      booking.vehicle_type?.toLowerCase().includes(searchText);

    const matchStatus =
      statusFilter === "all" || bookingStatus === statusFilter;

    const matchDate =
      dateFilter === "all" ||
      (dateFilter === "yesterday" && bookingDate === yesterdayStr) ||
      (dateFilter === "today" && bookingDate === todayStr) ||
      (dateFilter === "tomorrow" && bookingDate === tomorrowStr);

    return matchSearch && matchStatus && matchDate;
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>Booking Management</h2>
          <p>Search, filter and update customer bookings.</p>
        </div>
      </div>

      <div className="admin-filters">
        <input
          placeholder="Search by name, email, phone, trip, vehicle"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Dates</option>
          <option value="yesterday">Yesterday</option>
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
              <th>ID / Passport</th>
              <th>Trip</th>
              <th>Vehicle</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.full_name}</strong>
                    <span>{booking.nationality}</span>
                  </td>

                  <td>
                    <span>{booking.phone}</span>
                    <span>{booking.email}</span>
                  </td>

                  <td>{booking.nic_number || booking.passport_number || "-"}</td>

                  <td>
                    <strong>{booking.trip_type || "Tour Booking"}</strong>
                    <span>{booking.pickup_location}</span>
                    <span>to {booking.drop_location}</span>
                  </td>

                  <td>{booking.vehicle_type}</td>

                  <td>
                    <span>{getDateOnly(booking.pickup_date)}</span>
                    <span>{booking.pickup_time}</span>
                  </td>

                  <td>
                    <span className={`status ${booking.status || "pending"}`}>
                      {booking.status || "pending"}
                    </span>
                  </td>

                  <td>
                    <select
                      value={booking.status || "pending"}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminBookings;