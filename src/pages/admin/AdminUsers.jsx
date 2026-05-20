import { useState } from "react";
import axios from "axios";

const AdminUsers = ({
  users = [],
  refreshUsers,
}) => {
  const [editingUser, setEditingUser] =
    useState(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "customer",
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    setForm({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "customer",
    });
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateCustomer = async () => {
    try {
      await axios.patch(
        `/api/users/${editingUser.id}`,
        form,
        getAuthHeader()
      );

      alert("Customer updated successfully");

      closeModal();

      refreshUsers();
    } catch (error) {
      console.log(
        "UPDATE CUSTOMER ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <span>User Management</span>

          <h2>All Customers</h2>

          <p>
            Manage customer accounts,
            contact details and roles.
          </p>
        </div>
      </div>

      <div className="admin-table-card">
        {users.length > 0 ? (
          <div className="admin-users-table-wrapper">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Trips</th>
                  <th>WhatsApp</th>
                  <th>Manage</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => {
                  const whatsappLink = `https://wa.me/${String(
                    user.phone || ""
                  ).replace(/\D/g, "")}`;

                  return (
                    <tr key={user.id}>
                      <td data-label="Customer">
                        <div className="admin-user-table">
                          <div className="admin-user-avatar">
                            {user.full_name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>

                          <div>
                            <strong>
                              {user.full_name ||
                                "Customer"}
                            </strong>

                            <span>
                              User ID #{user.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td data-label="Email">
                        <strong>
                          {user.email || "-"}
                        </strong>
                      </td>

                      <td data-label="Phone">
                        <strong>
                          {user.phone || "-"}
                        </strong>
                      </td>

                      <td data-label="Role">
                        <span
                          className={`status ${
                            user.role ||
                            "customer"
                          }`}
                        >
                          {user.role ||
                            "customer"}
                        </span>
                      </td>

                      <td data-label="Trips">
                        <strong>
                          {user.total_bookings ||
                            0}
                        </strong>
                      </td>

                      <td data-label="WhatsApp">
                        {user.phone ? (
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="whatsapp-admin-btn"
                          >
                            WhatsApp
                          </a>
                        ) : (
                          <span>
                            No Number
                          </span>
                        )}
                      </td>

                      <td data-label="Manage">
                        <button
                          className="admin-main-btn"
                          onClick={() =>
                            openEditModal(user)
                          }
                        >
                          Edit User
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-admin-box">
            <h3>No Users Found</h3>

            <p>
              Registered customers will
              appear here.
            </p>
          </div>
        )}
      </div>

      {editingUser && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <span>
                  Customer Management
                </span>

                <h3>Edit Customer</h3>
              </div>

              <button onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="admin-modal-grid">
              <input
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="customer">
                  Customer
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>
            </div>

            <div className="admin-modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="admin-main-btn"
                onClick={updateCustomer}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;