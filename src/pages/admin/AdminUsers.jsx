import { useState } from "react";
import axios from "axios";

const AdminUsers = ({ users = [], refreshUsers }) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const updateUserStatus = async (id, status) => {
    try {
      await axios.patch(
        `/api/users/${id}/status`,
        { status },
        getAuthHeader()
      );

      refreshUsers();
    } catch (error) {
      alert(error.response?.data?.message || "User status update failed");
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

  const filteredUsers = users.filter((user) => {
    const text = search.toLowerCase();
    const role = user.role || "customer";
    const status = user.status || "active";

    const matchSearch =
      !search ||
      user.full_name?.toLowerCase().includes(text) ||
      user.email?.toLowerCase().includes(text) ||
      user.phone?.toString().includes(search);

    const matchRole = roleFilter === "all" || role === roleFilter;
    const matchStatus = statusFilter === "all" || status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <span>User Management</span>
          <h2>Manage Customers</h2>
          <p>Search customers, contact them, and control account status.</p>
        </div>
      </div>

      <div className="admin-filters advanced">
        <input
          placeholder="Search name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="customer">Customers</option>
          <option value="admin">Admins</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="admin-users-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const phone = cleanPhone(user.phone);
            const message = `Hello ${user.full_name || ""}, this is regarding your travel account.`;

            return (
              <div className="admin-user-card" key={user.id}>
                <div className="admin-user-top">
                  <div className="admin-user-avatar">
                    {user.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <h3>{user.full_name || "Customer"}</h3>
                    <p>{user.email || "-"}</p>
                  </div>
                </div>

                <div className="admin-user-info">
                  <div>
                    <span>Phone</span>
                    <strong>{user.phone || "Not Added"}</strong>
                  </div>

                  <div>
                    <span>Role</span>
                    <strong>{user.role || "customer"}</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong className={`status ${user.status || "active"}`}>
                      {user.status || "active"}
                    </strong>
                  </div>
                </div>

                <div className="admin-user-actions">
                  {phone && (
                    <a
                      className="whatsapp-admin-btn"
                      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  )}

                  {(user.status || "active") === "blocked" ? (
                    <button
                      className="unblock-btn"
                      onClick={() => updateUserStatus(user.id, "active")}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="block-btn"
                      onClick={() => updateUserStatus(user.id, "blocked")}
                    >
                      Block
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-admin-box">
            <h3>No users found</h3>
            <p>Try changing search or filters.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUsers;