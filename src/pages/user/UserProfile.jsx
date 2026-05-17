const UserProfile = ({ user, totalBookings }) => {
  if (!user) {
    return <p>User profile not found.</p>;
  }

  return (
    <>
      <div className="mobile-page-title">
        <h2>My Profile</h2>
        <p>Account and travel profile details</p>
      </div>

      <section className="profile-app-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {user.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2>{user.full_name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-app-grid">
          <div>
            <span>Phone</span>
            <strong>{user.phone || "Not Added"}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>{user.role || "customer"}</strong>
          </div>

          <div>
            <span>Total Trips</span>
            <strong>{totalBookings}</strong>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;