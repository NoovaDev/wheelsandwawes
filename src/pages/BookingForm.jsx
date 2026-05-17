import { useState } from "react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";
import LocationSearch from "../components/LocationSearch";
import "./BookingForm.css";

const airports = [
  "Bandaranaike International Airport - Colombo",
  "Mattala Rajapaksa International Airport - Hambantota",
  "Ratmalana International Airport - Colombo",
  "Jaffna International Airport",
  "Batticaloa International Airport",
];

const vehicleGroups = {
  mini: ["Wagon R - 1-2 Pax", "Alto - 1-2 Pax", "Nano - 1-2 Pax"],
  hatchback: ["Toyota Aqua - 1-3 Pax", "Honda Fit - 1-3 Pax", "Suzuki Spacia - 1-3 Pax"],
  sedan: ["Toyota Prius - 1-4 Pax", "Toyota Axio - 1-4 Pax", "Honda Insight - 1-4 Pax"],
  minivan: ["Suzuki Every - 1-5 Pax", "Glory Mini Van - 1-5 Pax"],
  van: ["Toyota KDH - 1-14 Pax", "Nissan E25 - 1-14 Pax"],
  suv: ["Honda Vezel - 1-5 Pax", "DFSK Glory SUV - 1-5 Pax"],
  vip: ["Toyota Voxy - 1-5 Pax", "Toyota Vellfire - 1-5 Pax", "Toyota GDH H300 - 1-5 Pax"],
  bus: ["Toyota Coaster - 10-30 Pax", "Mitsubishi Fuso - 30-50 Pax"],
};

const BookingForm = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [vehicleCategory, setVehicleCategory] = useState("");

  const [form, setForm] = useState({
    full_name: savedUser?.full_name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
    nationality: "",
    nic_number: "",
    passport_number: "",
    pickup_location: "",
    drop_location: "",
    pickup_date: "",
    pickup_time: "",
    return_date: "",
    return_time: "",
    vehicle_type: "",
    passengers: "",
    need_driver: "",
    trip_type: "",
    message: "",
  });

  const [serviceDetails, setServiceDetails] = useState({
    airport_name: "",
    flight_number: "",
    hotel_name: "",
    tour_places: "",
    round_days: "",
    round_route: "",
    safari_park: "",
    activity_location: "",
    beach_location: "",
    accommodation_needed: "",
    special_requirements: "",
  });

  const updateForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => updateForm(e.target.name, e.target.value);

  const handleServiceChange = (e) => {
    const { name, value } = e.target;

    setServiceDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "airport_name") {
      if (form.trip_type === "Airport Pickups") updateForm("pickup_location", value);
      if (form.trip_type === "Airport Drop-offs") updateForm("drop_location", value);
    }
  };

  const handleTripTypeChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      trip_type: value,
      pickup_location: "",
      drop_location: "",
    }));

    setServiceDetails({
      airport_name: "",
      flight_number: "",
      hotel_name: "",
      tour_places: "",
      round_days: "",
      round_route: "",
      safari_park: "",
      activity_location: "",
      beach_location: "",
      accommodation_needed: "",
      special_requirements: "",
    });
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    const finalForm = {
      ...form,
      message: `
Customer Message:
${form.message || "No extra message"}

Selected Service:
${form.trip_type}

Service Details:
Airport Name: ${serviceDetails.airport_name || "-"}
Flight Number: ${serviceDetails.flight_number || "-"}
Hotel / Destination: ${serviceDetails.hotel_name || "-"}
Tour Places: ${serviceDetails.tour_places || "-"}
Round Trip Days: ${serviceDetails.round_days || "-"}
Round Trip Route: ${serviceDetails.round_route || "-"}
Safari Park: ${serviceDetails.safari_park || "-"}
Activity Location: ${serviceDetails.activity_location || "-"}
Beach Location: ${serviceDetails.beach_location || "-"}
Accommodation Needed: ${serviceDetails.accommodation_needed || "-"}
Special Requirements: ${serviceDetails.special_requirements || "-"}

Vehicle Details:
Vehicle Category: ${vehicleCategory || "-"}
Selected Vehicle: ${form.vehicle_type || "-"}
`,
    };

    try {
      await axios.post("/api/bookings", finalForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Booking request sent successfully");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <>
      <DashboardNavbar user={savedUser} />

      <div className="booking-page">
        <div className="booking-card">
          <div className="booking-header">
            <span>Wheels & Waves Travels</span>
            <h2>Book Your Travel Service</h2>
            <p>Select your service and share your travel details. Our team will contact you soon.</p>
          </div>

          <form className="smart-booking-form" onSubmit={submitBooking}>
            <div className="form-section">
              <h3>Customer Details</h3>

              <div className="form-grid">
                <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                <input name="phone" placeholder="WhatsApp / Phone Number" value={form.phone} onChange={handleChange} required />

                <select name="nationality" value={form.nationality} onChange={handleChange} required>
                  <option value="">Select Nationality</option>
                  <option value="sri_lankan">Sri Lankan</option>
                  <option value="foreigner">Foreigner</option>
                </select>

                {form.nationality === "sri_lankan" && (
                  <input name="nic_number" placeholder="NIC Number" value={form.nic_number} onChange={handleChange} required />
                )}

                {form.nationality === "foreigner" && (
                  <input name="passport_number" placeholder="Passport Number" value={form.passport_number} onChange={handleChange} required />
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Service Details</h3>

              <div className="form-grid">
                <select name="trip_type" value={form.trip_type} onChange={handleTripTypeChange} required>
                  <option value="">Select Service</option>
                  <option>Airport Pickups</option>
                  <option>Airport Drop-offs</option>
                  <option>City & Day Tours</option>
                  <option>Island Round Trips</option>
                  <option>Wildlife Safaris</option>
                  <option>Whale Watching</option>
                  <option>Crocodile Watching</option>
                  <option>Turtle Breeding Points</option>
                  <option>Beach Getaways</option>
                </select>

                {(form.trip_type === "Airport Pickups" || form.trip_type === "Airport Drop-offs") && (
                  <>
                    <select name="airport_name" value={serviceDetails.airport_name} onChange={handleServiceChange} required>
                      <option value="">Select Airport</option>
                      {airports.map((airport) => (
                        <option key={airport}>{airport}</option>
                      ))}
                    </select>

                    <input name="flight_number" placeholder="Flight Number" value={serviceDetails.flight_number} onChange={handleServiceChange} />
                    <input name="hotel_name" placeholder="Hotel / Destination Name" value={serviceDetails.hotel_name} onChange={handleServiceChange} required />
                  </>
                )}

                {form.trip_type === "City & Day Tours" && (
                  <textarea name="tour_places" placeholder="Places you want to visit. Example: Colombo city tour, Galle Fort, Kandy Temple..." value={serviceDetails.tour_places} onChange={handleServiceChange} required />
                )}

                {form.trip_type === "Island Round Trips" && (
                  <>
                    <input name="round_days" type="number" placeholder="How many days?" value={serviceDetails.round_days} onChange={handleServiceChange} required />
                    <textarea name="round_route" placeholder="Route example: Airport → Kandy → Ella → Yala → Mirissa → Galle" value={serviceDetails.round_route} onChange={handleServiceChange} required />
                  </>
                )}

                {form.trip_type === "Wildlife Safaris" && (
                  <input name="safari_park" placeholder="Safari park. Example: Yala, Udawalawe, Wilpattu" value={serviceDetails.safari_park} onChange={handleServiceChange} required />
                )}

                {["Whale Watching", "Crocodile Watching", "Turtle Breeding Points"].includes(form.trip_type) && (
                  <input name="activity_location" placeholder="Preferred location / area" value={serviceDetails.activity_location} onChange={handleServiceChange} required />
                )}

                {form.trip_type === "Beach Getaways" && (
                  <>
                    <input name="beach_location" placeholder="Beach destination. Example: Mirissa, Bentota, Unawatuna" value={serviceDetails.beach_location} onChange={handleServiceChange} required />
                    <select name="accommodation_needed" value={serviceDetails.accommodation_needed} onChange={handleServiceChange} required>
                      <option value="">Need accommodation support?</option>
                      <option value="yes">Yes, help me find hotel</option>
                      <option value="no">No, transport only</option>
                    </select>
                  </>
                )}

                {form.trip_type && (
                  <textarea name="special_requirements" placeholder="Any special requirements for this service?" value={serviceDetails.special_requirements} onChange={handleServiceChange} />
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Pickup, Drop-off & Time</h3>

              <div className="form-grid">
                <LocationSearch
                  placeholder={form.trip_type === "Airport Pickups" ? "Pickup Airport" : "Search Pickup Location"}
                  value={form.pickup_location}
                  readOnly={form.trip_type === "Airport Pickups"}
                  onChange={(value) => updateForm("pickup_location", value)}
                />

                <LocationSearch
                  placeholder={form.trip_type === "Airport Drop-offs" ? "Drop-off Airport" : "Search Drop-off / Destination"}
                  value={form.drop_location}
                  readOnly={form.trip_type === "Airport Drop-offs"}
                  onChange={(value) => updateForm("drop_location", value)}
                />

                <input name="pickup_date" type="date" value={form.pickup_date} onChange={handleChange} required />
                <input name="pickup_time" type="time" value={form.pickup_time} onChange={handleChange} required />
                <input name="return_date" type="date" value={form.return_date} onChange={handleChange} />
                <input name="return_time" type="time" value={form.return_time} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section">
              <h3>Vehicle Details</h3>

              <div className="form-grid">
                <select value={vehicleCategory} onChange={(e) => {
                  setVehicleCategory(e.target.value);
                  updateForm("vehicle_type", "");
                }} required>
                  <option value="">Select Vehicle Category</option>
                  <option value="mini">Mini Car</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="sedan">Sedan</option>
                  <option value="minivan">Mini Van</option>
                  <option value="van">Van</option>
                  <option value="suv">SUV</option>
                  <option value="vip">VIP Vehicle</option>
                  <option value="bus">Bus</option>
                </select>

                {vehicleCategory && (
                  <select name="vehicle_type" value={form.vehicle_type} onChange={handleChange} required>
                    <option value="">Select Vehicle</option>
                    {vehicleGroups[vehicleCategory].map((vehicle) => (
                      <option key={vehicle}>{vehicle}</option>
                    ))}
                  </select>
                )}

                <input name="passengers" type="number" placeholder="Number of Passengers" value={form.passengers} onChange={handleChange} required />

                <select name="need_driver" value={form.need_driver} onChange={handleChange} required>
                  <option value="">Need Driver?</option>
                  <option value="yes">Yes, I need driver</option>
                  <option value="no">No, self drive</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>Extra Notes</h3>
              <textarea name="message" placeholder="Extra message / travel notes" value={form.message} onChange={handleChange} />
            </div>

            <button type="submit" className="booking-submit-btn">
              Send Booking Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;