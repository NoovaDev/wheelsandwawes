const UserProfile = ({ user, totalBookings }) => {
  if (!user) {
    return <p>User profile not found.</p>;
  }

  return (
    <>
      <div className="user-dashboard-header">
        <div>
          <h2>My Profile</h2>
          <p>View your account and profile details.</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {user.full_name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="profile-content">
          <h3>{user.full_name}</h3>
          <p>{user.email}</p>

          <div className="profile-info-grid">
            <div>
              <span>Phone</span>
              <strong>{user.phone || "Not Added"}</strong>
            </div>

            <div>
              <span>Role</span>
              <strong>{user.role}</strong>
            </div>

            <div>
              <span>Total Trips</span>
              <strong>{totalBookings}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;