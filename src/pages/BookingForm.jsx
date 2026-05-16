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
    transfer_type: "",
    airport_name: "",
    flight_number: "",
    hotel_name: "",
    tour_location: "",
    round_days: "",
    round_route: "",
    event_location: "",
    event_time: "",
    company_name: "",
    business_location: "",
    other_details: "",
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

    if (name === "transfer_type") {
      setForm((prev) => ({
        ...prev,
        pickup_location: "",
        drop_location: "",
      }));
    }

    if (name === "airport_name") {
      if (serviceDetails.transfer_type === "Airport Pickup") {
        updateForm("pickup_location", value);
      }

      if (serviceDetails.transfer_type === "Airport Drop-off") {
        updateForm("drop_location", value);
      }
    }
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

Service Details:
Trip Type: ${form.trip_type}
Airport Service: ${serviceDetails.transfer_type}
Airport Name: ${serviceDetails.airport_name}
Flight Number: ${serviceDetails.flight_number}
Hotel Name: ${serviceDetails.hotel_name}
Day Tour Location: ${serviceDetails.tour_location}
Round Tour Days: ${serviceDetails.round_days}
Round Tour Route: ${serviceDetails.round_route}
Wedding/Event Location: ${serviceDetails.event_location}
Wedding/Event Time: ${serviceDetails.event_time}
Company Name: ${serviceDetails.company_name}
Business Location: ${serviceDetails.business_location}
Other Details: ${serviceDetails.other_details}

Vehicle Details:
Vehicle Category: ${vehicleCategory}
Selected Vehicle: ${form.vehicle_type}
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
            <span>W&W Travels</span>
            <h2>Vehicle Booking Request</h2>
            <p>Select your service first. Location search is powered by OpenStreetMap.</p>
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
              <h3>Service Type</h3>

              <div className="form-grid">
                <select name="trip_type" value={form.trip_type} onChange={handleChange} required>
                  <option value="">Select Service Type</option>
                  <option>Airport Transfer</option>
                  <option>Day Tour</option>
                  <option>Round Tour</option>
                  <option>Hotel Transfer</option>
                  <option>Wedding</option>
                  <option>Business Trip</option>
                  <option>Other</option>
                </select>

                {form.trip_type === "Airport Transfer" && (
                  <>
                    <select name="transfer_type" value={serviceDetails.transfer_type} onChange={handleServiceChange} required>
                      <option value="">Select Airport Service</option>
                      <option>Airport Pickup</option>
                      <option>Airport Drop-off</option>
                    </select>

                    <select name="airport_name" value={serviceDetails.airport_name} onChange={handleServiceChange} required>
                      <option value="">Select Airport</option>
                      {airports.map((airport) => (
                        <option key={airport}>{airport}</option>
                      ))}
                    </select>

                    <input name="flight_number" placeholder="Flight Number" value={serviceDetails.flight_number} onChange={handleServiceChange} />
                  </>
                )}

                {form.trip_type === "Day Tour" && (
                  <input name="tour_location" placeholder="Tour Location / Places" value={serviceDetails.tour_location} onChange={handleServiceChange} required />
                )}

                {form.trip_type === "Round Tour" && (
                  <>
                    <input name="round_days" type="number" placeholder="How many days?" value={serviceDetails.round_days} onChange={handleServiceChange} required />
                    <textarea name="round_route" placeholder="Route example: Colombo → Kandy → Ella → Galle" value={serviceDetails.round_route} onChange={handleServiceChange} required />
                  </>
                )}

                {form.trip_type === "Hotel Transfer" && (
                  <input name="hotel_name" placeholder="Hotel Name" value={serviceDetails.hotel_name} onChange={handleServiceChange} required />
                )}

                {form.trip_type === "Wedding" && (
                  <>
                    <input name="event_location" placeholder="Wedding / Event Location" value={serviceDetails.event_location} onChange={handleServiceChange} required />
                    <input name="event_time" type="time" value={serviceDetails.event_time} onChange={handleServiceChange} required />
                  </>
                )}

                {form.trip_type === "Business Trip" && (
                  <>
                    <input name="company_name" placeholder="Company Name" value={serviceDetails.company_name} onChange={handleServiceChange} />
                    <input name="business_location" placeholder="Meeting Location" value={serviceDetails.business_location} onChange={handleServiceChange} required />
                  </>
                )}

                {form.trip_type === "Other" && (
                  <textarea name="other_details" placeholder="Tell us your requirement" value={serviceDetails.other_details} onChange={handleServiceChange} required />
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Trip Locations & Time</h3>

              {form.trip_type === "Airport Transfer" && serviceDetails.transfer_type && (
                <p className="form-help">
                  {serviceDetails.transfer_type === "Airport Pickup"
                    ? "Airport Pickup: pickup is selected airport. Search your hotel or destination as drop-off."
                    : "Airport Drop-off: search your hotel/home as pickup. Drop-off is selected airport."}
                </p>
              )}

              <div className="form-grid">
                <LocationSearch
                  placeholder={
                    serviceDetails.transfer_type === "Airport Pickup"
                      ? "Pickup Airport"
                      : "Search Pickup Location / Hotel"
                  }
                  value={form.pickup_location}
                  readOnly={serviceDetails.transfer_type === "Airport Pickup"}
                  onChange={(value) => updateForm("pickup_location", value)}
                />

                <LocationSearch
                  placeholder={
                    serviceDetails.transfer_type === "Airport Drop-off"
                      ? "Drop-off Airport"
                      : "Search Drop-off Location / Hotel"
                  }
                  value={form.drop_location}
                  readOnly={serviceDetails.transfer_type === "Airport Drop-off"}
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
              <textarea name="message" placeholder="Special request / notes" value={form.message} onChange={handleChange} />
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