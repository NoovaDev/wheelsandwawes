import React from "react";

const UserProfile = ({ user, totalBookings = 0 }) => {
  if (!user) {
    return (
      <section className="profile-app-card">
        <h2>User profile not found</h2>
        <p>Please login again to view your profile details.</p>
      </section>
    );
  }

  // Generate an avatar initial letter safely
  const initialLetter = user.full_name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <div className="mobile-page-title">
        <span>Account Center</span>
        <h2>My Profile</h2>
        <p>View your account, contact details, and booking activity.</p>
      </div>

      <section className="profile-app-card">
        <div className="profile-hero">
          <div className="profile-avatar">{initialLetter}</div>

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
          <strong>Important Travel Tip</strong>
          <p>
            Keep your phone number updated. Our team may use it to confirm
            pickup time, driver details, and urgent trip updates.
          </p>
        </div>
      </section>
    </>
  );
};

export default UserProfile;