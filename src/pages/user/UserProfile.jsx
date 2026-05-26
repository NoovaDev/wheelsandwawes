const UserProfile = ({ user, totalBookings }) => {
  if (!user) {
    return (
      <section className="profile-app-card">
        <h2>User profile not found</h2>
        <p>Please login again to view your profile details.</p>
      </section>
    );
  }

  return (
    <>
      <div className="mobile-page-title">
        <span>Account Center</span>
        <h2>My Profile</h2>
        <p>Manage your travel account and booking activity.</p>
      </div>

      <section className="profile-app-card">
        <div className="profile-hero">
          <div className="profile-avatar">
            {user.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="profile-main-info">
            <span>Verified Customer Account</span>
            <h2>{user.full_name || "Customer"}</h2>
            <p>{user.email || "Email not available"}</p>
          </div>
        </div>

        <div className="profile-app-grid">
          <div>
            <span>Phone Number</span>
            <strong>{user.phone || "Not Added"}</strong>
          </div>

          <div>
            <span>Account Role</span>
            <strong>{user.role || "customer"}</strong>
          </div>

          <div>
            <span>Total Trips</span>
            <strong>{totalBookings}</strong>
          </div>
        </div>

        <div className="profile-note">
          <strong>Travel Support</strong>
          <p>
            Keep your phone number updated so our team can confirm pickup time,
            driver details, and urgent travel updates.
          </p>
        </div>
      </section>
    </>
  );
};

export default UserProfile;