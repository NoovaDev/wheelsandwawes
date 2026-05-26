import { useState } from "react";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";
import LocationSearch from "../components/LocationSearch";
import {
  FaCalendarAlt,
  FaClock,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaRoute,
  FaUndoAlt,
} from "react-icons/fa";
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
  hatchback: [
    "Toyota Aqua - 1-3 Pax",
    "Honda Fit - 1-3 Pax",
    "Suzuki Spacia - 1-3 Pax",
  ],
  sedan: [
    "Toyota Prius - 1-4 Pax",
    "Toyota Axio - 1-4 Pax",
    "Honda Insight - 1-4 Pax",
  ],
  minivan: ["Suzuki Every - 1-5 Pax", "Glory Mini Van - 1-5 Pax"],
  van: ["Toyota KDH - 1-14 Pax", "Nissan E25 - 1-14 Pax"],
  suv: ["Honda Vezel - 1-5 Pax", "DFSK Glory SUV - 1-5 Pax"],
  vip: [
    "Toyota Voxy - 1-5 Pax",
    "Toyota Vellfire - 1-5 Pax",
    "Toyota GDH H300 - 1-5 Pax",
  ],
  bus: ["Toyota Coaster - 10-30 Pax", "Mitsubishi Fuso - 30-50 Pax"],
};

const services = [
  "Airport Pickups",
  "Airport Drop-offs",
  "City & Day Tours",
  "Island Round Trips",
  "Wildlife Safaris",
  "Whale Watching",
  "Crocodile Watching",
  "Turtle Breeding Points",
  "Beach Getaways",
];

const BookingForm = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [hasReturnTrip, setHasReturnTrip] = useState(false);

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

  const [details, setDetails] = useState({
    airport_name: "",
    flight_number: "",
    hotel_name: "",
    places: "",
    days: "",
    route: "",
    activity_location: "",
    accommodation_needed: "",
    special_request: "",
  });

  const updateForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearReturnTrip = () => {
    setHasReturnTrip(false);
    setForm((prev) => ({
      ...prev,
      return_date: "",
      return_time: "",
    }));
  };

  const enableReturnTrip = () => {
    setHasReturnTrip(true);
  };

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

    updateForm(name, value);
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "airport_name") {
      if (form.trip_type === "Airport Pickups") {
        updateForm("pickup_location", value);
      }

      if (form.trip_type === "Airport Drop-offs") {
        updateForm("drop_location", value);
      }
    }
  };

  const handleServiceChange = (e) => {
    const service = e.target.value;

    setForm((prev) => ({
      ...prev,
      trip_type: service,
      pickup_location: "",
      drop_location: "",
      return_date: "",
      return_time: "",
    }));

    setHasReturnTrip(false);

    setDetails({
      airport_name: "",
      flight_number: "",
      hotel_name: "",
      places: "",
      days: "",
      route: "",
      activity_location: "",
      accommodation_needed: "",
      special_request: "",
    });
  };

  const getLocationHelp = () => {
    if (form.trip_type === "Airport Pickups") {
      return "Pickup is the airport. Select airport above, then enter your hotel or destination as drop-off.";
    }

    if (form.trip_type === "Airport Drop-offs") {
      return "Drop-off is the airport. Enter your hotel, home, or current place as pickup location.";
    }

    if (form.trip_type === "Island Round Trips") {
      return "Enter your first pickup point and final drop-off point. Add your full route in service details.";
    }

    return "Enter where we should pick you up and where your trip should end.";
  };

  const submitBooking = async (e) => {
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
      return_date: hasReturnTrip ? form.return_date : "",
      return_time: hasReturnTrip ? form.return_time : "",
      need_driver: finalNeedDriver,
      message: `
Customer Message:
${form.message || "No extra message"}

Selected Service:
${form.trip_type}

Trip Time:
Pickup Date: ${form.pickup_date || "-"}
Pickup Time: ${form.pickup_time || "-"}
Return Trip: ${hasReturnTrip ? "Yes" : "No"}
Return Date: ${hasReturnTrip ? form.return_date || "-" : "No return trip"}
Return Time: ${hasReturnTrip ? form.return_time || "-" : "No return trip"}

Service Details:
Airport: ${details.airport_name || "-"}
Flight Number: ${details.flight_number || "-"}
Hotel / Destination: ${details.hotel_name || "-"}
Places / Tour Plan: ${details.places || "-"}
Days: ${details.days || "-"}
Route: ${details.route || "-"}
Activity Location: ${details.activity_location || "-"}
Accommodation Needed: ${details.accommodation_needed || "-"}
Special Request: ${details.special_request || "-"}

Vehicle Details:
Vehicle Category: ${vehicleCategory || "-"}
Selected Vehicle: ${form.vehicle_type || "-"}
Driver Option: ${finalNeedDriver || "-"}
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
            <p>
              Select your service first. The form will guide you step by step
              and only ask for the details needed for your trip.
            </p>
          </div>

          <div className="booking-guide">
            <div>
              <strong>1</strong>
              <span>Your Details</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Service</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Trip Details</span>
            </div>

            <div>
              <strong>4</strong>
              <span>Vehicle</span>
            </div>
          </div>

          <form className="smart-booking-form" onSubmit={submitBooking}>
            <div className="form-section">
              <h3>1. Your Details</h3>

              <p className="form-help">
                Please enter correct contact details. We may contact you through
                WhatsApp to confirm your booking.
              </p>

              <div className="form-grid">
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

              {form.nationality === "foreigner" && (
                <p className="form-help driver-rule">
                  Foreign customers can book vehicles with driver only.
                  Self-drive service is available only for Sri Lankan customers.
                </p>
              )}
            </div>

            <div className="form-section">
              <h3>2. Select Service</h3>

              <div className="form-grid">
                <select
                  name="trip_type"
                  value={form.trip_type}
                  onChange={handleServiceChange}
                  required
                >
                  <option value="">What service do you need?</option>

                  {services.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>

              {form.trip_type && (
                <p className="form-help">
                  Selected service: {form.trip_type}. Continue below and fill
                  only the details related to this service.
                </p>
              )}
            </div>

            {form.trip_type && (
              <div className="form-section">
                <h3>3. Service Details</h3>

                <div className="form-grid">
                  {(form.trip_type === "Airport Pickups" ||
                    form.trip_type === "Airport Drop-offs") && (
                    <>
                      <select
                        name="airport_name"
                        value={details.airport_name}
                        onChange={handleDetailsChange}
                        required
                      >
                        <option value="">Select Airport</option>

                        {airports.map((airport) => (
                          <option key={airport}>{airport}</option>
                        ))}
                      </select>

                      <input
                        name="flight_number"
                        placeholder="Flight Number"
                        value={details.flight_number}
                        onChange={handleDetailsChange}
                      />

                      <input
                        name="hotel_name"
                        placeholder="Hotel / Destination Name"
                        value={details.hotel_name}
                        onChange={handleDetailsChange}
                        required
                      />
                    </>
                  )}

                  {form.trip_type === "City & Day Tours" && (
                    <textarea
                      name="places"
                      placeholder="Places you want to visit. Example: Colombo City, Galle Fort, Kandy, Ella..."
                      value={details.places}
                      onChange={handleDetailsChange}
                      required
                    />
                  )}

                  {form.trip_type === "Island Round Trips" && (
                    <>
                      <input
                        name="days"
                        type="number"
                        placeholder="How many days?"
                        value={details.days}
                        onChange={handleDetailsChange}
                        required
                      />

                      <textarea
                        name="route"
                        placeholder="Your route. Example: Airport → Kandy → Ella → Yala → Mirissa → Galle"
                        value={details.route}
                        onChange={handleDetailsChange}
                        required
                      />
                    </>
                  )}

                  {[
                    "Wildlife Safaris",
                    "Whale Watching",
                    "Crocodile Watching",
                    "Turtle Breeding Points",
                  ].includes(form.trip_type) && (
                    <input
                      name="activity_location"
                      placeholder="Activity location / area"
                      value={details.activity_location}
                      onChange={handleDetailsChange}
                      required
                    />
                  )}

                  {form.trip_type === "Beach Getaways" && (
                    <>
                      <input
                        name="activity_location"
                        placeholder="Beach destination. Example: Mirissa, Bentota, Unawatuna"
                        value={details.activity_location}
                        onChange={handleDetailsChange}
                        required
                      />

                      <select
                        name="accommodation_needed"
                        value={details.accommodation_needed}
                        onChange={handleDetailsChange}
                        required
                      >
                        <option value="">
                          Need hotel/accommodation support?
                        </option>
                        <option value="yes">Yes, help me find hotel</option>
                        <option value="no">No, transport only</option>
                      </select>
                    </>
                  )}

                  <textarea
                    name="special_request"
                    placeholder="Any special request for this service? Optional"
                    value={details.special_request}
                    onChange={handleDetailsChange}
                  />
                </div>
              </div>
            )}

            {form.trip_type && (
              <div className="form-section travel-time-section">
                <div className="section-title-row">
                  <div>
                    <h3>4. Pickup, Drop-off & Time</h3>
                    <p>{getLocationHelp()}</p>
                  </div>
                </div>

                <div className="location-card-grid">
                  <div className="location-card">
                    <div className="field-icon">
                      <FaMapMarkerAlt />
                    </div>

                    <div className="field-content">
                      <label>Pickup Location</label>

                      <LocationSearch
                        placeholder={
                          form.trip_type === "Airport Pickups"
                            ? "Airport pickup selected above"
                            : "Pickup location / hotel"
                        }
                        value={form.pickup_location}
                        readOnly={form.trip_type === "Airport Pickups"}
                        onChange={(value) =>
                          updateForm("pickup_location", value)
                        }
                      />
                    </div>
                  </div>

                  <div className="location-card">
                    <div className="field-icon">
                      <FaLocationArrow />
                    </div>

                    <div className="field-content">
                      <label>Drop-off Location</label>

                      <LocationSearch
                        placeholder={
                          form.trip_type === "Airport Drop-offs"
                            ? "Airport drop-off selected above"
                            : "Drop-off / destination"
                        }
                        value={form.drop_location}
                        readOnly={form.trip_type === "Airport Drop-offs"}
                        onChange={(value) => updateForm("drop_location", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="trip-date-panel">
                  <div className="trip-date-card main-date-card">
                    <div className="trip-date-icon">
                      <FaCalendarAlt />
                    </div>

                    <div>
                      <label>Pickup Date</label>

                      <input
                        name="pickup_date"
                        type="date"
                        value={form.pickup_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="trip-date-card">
                    <div className="trip-date-icon">
                      <FaClock />
                    </div>

                    <div>
                      <label>Pickup Time</label>

                      <input
                        name="pickup_time"
                        type="time"
                        value={form.pickup_time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="return-choice-card">
                  <div>
                    <span className="return-icon">
                      <FaUndoAlt />
                    </span>

                    <div>
                      <strong>Do you need a return trip?</strong>
                      <p>
                        Select yes only if you want us to arrange return travel.
                      </p>
                    </div>
                  </div>

                  <div className="return-toggle">
                    <button
                      type="button"
                      className={!hasReturnTrip ? "active" : ""}
                      onClick={clearReturnTrip}
                    >
                      No Return
                    </button>

                    <button
                      type="button"
                      className={hasReturnTrip ? "active" : ""}
                      onClick={enableReturnTrip}
                    >
                      Add Return
                    </button>
                  </div>
                </div>

                {hasReturnTrip && (
                  <div className="trip-date-panel return-date-panel">
                    <div className="trip-date-card">
                      <div className="trip-date-icon">
                        <FaCalendarAlt />
                      </div>

                      <div>
                        <label>Return Date</label>

                        <input
                          name="return_date"
                          type="date"
                          value={form.return_date}
                          onChange={handleChange}
                          required={hasReturnTrip}
                        />
                      </div>
                    </div>

                    <div className="trip-date-card">
                      <div className="trip-date-icon">
                        <FaClock />
                      </div>

                      <div>
                        <label>Return Time</label>

                        <input
                          name="return_time"
                          type="time"
                          value={form.return_time}
                          onChange={handleChange}
                          required={hasReturnTrip}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {!hasReturnTrip && (
                  <div className="no-return-note">
                    Return date and time will stay empty because this is a
                    one-way trip.
                  </div>
                )}
              </div>
            )}

            {form.trip_type && (
              <div className="form-section">
                <h3>5. Vehicle Details</h3>

                <p className="form-help">
                  Select a vehicle based on passenger count and comfort level.
                </p>

                <div className="form-grid">
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
                    <option value="minivan">Mini Van</option>
                    <option value="van">Van</option>
                    <option value="suv">SUV</option>
                    <option value="vip">VIP Vehicle</option>
                    <option value="bus">Bus</option>
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
                    value={
                      form.nationality === "foreigner"
                        ? "yes"
                        : form.need_driver
                    }
                    onChange={handleChange}
                    required
                    disabled={form.nationality === "foreigner"}
                  >
                    <option value="">Need Driver?</option>
                    <option value="yes">Yes, I need driver</option>

                    {form.nationality === "sri_lankan" && (
                      <option value="no">No, self drive</option>
                    )}
                  </select>
                </div>
              </div>
            )}

            {form.trip_type && (
              <div className="form-section">
                <h3>6. Extra Notes</h3>

                <textarea
                  name="message"
                  placeholder="Anything else we should know? Example: child seats, luggage count, preferred pickup sign name..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
            )}

            {form.trip_type && (
              <button type="submit" className="booking-submit-btn">
                Send Booking Request
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;