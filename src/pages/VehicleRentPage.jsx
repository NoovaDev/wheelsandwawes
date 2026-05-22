import { useState } from "react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";
import LocationSearch from "../components/LocationSearch";
import "./VehicleRentPage.css";

const vehicleGroups = {
  mini: ["Wagon R - 1-2 Pax", "Alto - 1-2 Pax", "Nano - 1-2 Pax"],
  hatchback: ["Toyota Aqua - 1-3 Pax", "Honda Fit - 1-3 Pax", "Suzuki Spacia - 1-3 Pax"],
  sedan: ["Toyota Prius - 1-4 Pax", "Toyota Axio - 1-4 Pax", "Honda Insight - 1-4 Pax"],
};

const VehicleRentPage = () => {
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
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nationality") {
      setForm((prev) => ({
        ...prev,
        nationality: value,
        nic_number: value === "sri_lankan" ? prev.nic_number : "",
        passport_number: value === "foreigner" ? prev.passport_number : "",
        need_driver: value === "foreigner" ? "yes" : prev.need_driver,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitRent = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    const finalNeedDriver =
      form.nationality === "foreigner" ? "yes" : form.need_driver;

    const finalForm = {
      ...form,
      booking_type: "vehicle_rent",
      trip_type: "Vehicle Rent",
      need_driver: finalNeedDriver,
      message: `
Vehicle Rent Request

Customer Message:
${form.message || "No extra message"}

Rental Details:
Pickup Location: ${form.pickup_location}
Return Location: ${form.drop_location}
Pickup Date: ${form.pickup_date}
Pickup Time: ${form.pickup_time}
Return Date: ${form.return_date}
Return Time: ${form.return_time}

Vehicle Details:
Vehicle Category: ${vehicleCategory || "-"}
Selected Vehicle: ${form.vehicle_type || "-"}
Passengers: ${form.passengers || "-"}
Driver Option: ${finalNeedDriver || "-"}
`,
    };

    try {
      await axios.post("/api/bookings", finalForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Vehicle rent request sent successfully");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Vehicle rent request failed");
    }
  };

  return (
    <>
      <DashboardNavbar user={savedUser} />

      <div className="rent-page">
        <section className="rent-hero">
          <span>W&W Travels Vehicle Rental</span>
          <h1>Rent a Vehicle in Sri Lanka</h1>
          <p>
            Choose from mini cars, hatchbacks, and sedans for your daily travel,
            airport pickup, or private journey.
          </p>
        </section>

        <section className="rent-cards">
          <div className="rent-card">
            <h3>Mini Cars</h3>
            <p>Alto • Nano • Wagon R</p>
            <span>Best for 1–2 passengers</span>
          </div>

          <div className="rent-card">
            <h3>Hatchbacks</h3>
            <p>Aqua • Honda Fit • Spacia</p>
            <span>Best for 1–3 passengers</span>
          </div>

          <div className="rent-card">
            <h3>Sedans</h3>
            <p>Prius • Axio • Insight</p>
            <span>Best for 1–4 passengers</span>
          </div>
        </section>

        <section className="rent-form-card">
          <div className="rent-form-header">
            <h2>Vehicle Rent Request</h2>
            <p>Fill the details below. We will contact you on WhatsApp.</p>
          </div>

          <form onSubmit={submitRent} className="rent-form">
            <h3>1. Your Details</h3>

            <div className="rent-grid">
              <input
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="WhatsApp / Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <select
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                required
              >
                <option value="">Select Nationality</option>
                <option value="sri_lankan">Sri Lankan</option>
                <option value="foreigner">Foreigner</option>
              </select>

              {form.nationality === "sri_lankan" && (
                <input
                  name="nic_number"
                  placeholder="NIC Number"
                  value={form.nic_number}
                  onChange={handleChange}
                  required
                />
              )}

              {form.nationality === "foreigner" && (
                <input
                  name="passport_number"
                  placeholder="Passport Number"
                  value={form.passport_number}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            <h3>2. Rental Details</h3>

            <div className="rent-grid">
              <LocationSearch
                placeholder="Pickup Location"
                value={form.pickup_location}
                onChange={(value) => updateForm("pickup_location", value)}
              />

              <LocationSearch
                placeholder="Return Location"
                value={form.drop_location}
                onChange={(value) => updateForm("drop_location", value)}
              />

              <input
                name="pickup_date"
                type="date"
                value={form.pickup_date}
                onChange={handleChange}
                required
              />

              <input
                name="pickup_time"
                type="time"
                value={form.pickup_time}
                onChange={handleChange}
                required
              />

              <input
                name="return_date"
                type="date"
                value={form.return_date}
                onChange={handleChange}
                required
              />

              <input
                name="return_time"
                type="time"
                value={form.return_time}
                onChange={handleChange}
                required
              />
            </div>

            <h3>3. Vehicle Selection</h3>

            <div className="rent-grid">
              <select
                value={vehicleCategory}
                onChange={(e) => {
                  setVehicleCategory(e.target.value);
                  updateForm("vehicle_type", "");
                }}
                required
              >
                <option value="">Select Vehicle Category</option>
                <option value="mini">Mini Car</option>
                <option value="hatchback">Hatchback</option>
                <option value="sedan">Sedan</option>
              </select>

              {vehicleCategory && (
                <select
                  name="vehicle_type"
                  value={form.vehicle_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicleGroups[vehicleCategory].map((vehicle) => (
                    <option key={vehicle}>{vehicle}</option>
                  ))}
                </select>
              )}

              <input
                name="passengers"
                type="number"
                placeholder="Number of Passengers"
                value={form.passengers}
                onChange={handleChange}
                required
              />

              <select
                name="need_driver"
                value={form.nationality === "foreigner" ? "yes" : form.need_driver}
                onChange={handleChange}
                disabled={form.nationality === "foreigner"}
                required
              >
                <option value="">Need Driver?</option>
                <option value="yes">Yes, with driver</option>
                {form.nationality === "sri_lankan" && (
                  <option value="no">No, self drive</option>
                )}
              </select>
            </div>

            {form.nationality === "foreigner" && (
              <p className="rent-note">
                Foreign customers can rent vehicles with driver only.
              </p>
            )}

            <h3>4. Extra Notes</h3>

            <textarea
              name="message"
              placeholder="Special requests, luggage details, child seat, airport pickup, etc."
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit" className="rent-submit-btn">
              Send Vehicle Rent Request
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default VehicleRentPage;