import axios from "axios";

const AdminUsers = ({ users = [], refreshUsers }) => {
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
      console.log("UPDATE USER STATUS ERROR:", error.response?.data || error);
      alert(error.response?.data?.message || "User status update failed");
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>User Management</h2>
          <p>View customers and manage account access.</p>
        </div>
      </div>

      <div className="admin-table-card">
        <table className="booking-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.full_name}</strong>
                  </td>

                  <td>{user.email}</td>
                  <td>{user.phone || "-"}</td>
                  <td>{user.role}</td>

                  <td>
                    <span className={`status ${user.status || "active"}`}>
                      {user.status || "active"}
                    </span>
                  </td>

                  <td>
                    {user.status === "blocked" ? (
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsers;