import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaCarSide,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRoute,
  FaShieldAlt,
  FaStar,
  FaUmbrellaBeach,
  FaWhatsapp,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LandingPage.css";

const heroSlides = [
  {
    id: 1,
    tag: "Private vehicle booking",
    title: "Rent vehicles and travel across Sri Lanka comfortably",
    description:
      "Airport transfers, private vehicles with drivers, tours, beach trips and island round trips arranged smoothly.",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    tag: "Sri Lanka transport",
    title: "Private vehicles, airport transfers and custom travel support",
    description:
      "Choose your pickup location, destination and vehicle type. We help arrange smooth travel across Sri Lanka.",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    tag: "Airport to anywhere",
    title: "Travel from Colombo airport to beaches, safaris and hill country",
    description:
      "Book comfortable transport for Mirissa, Ella, Kandy, Yala, Galle and custom Sri Lanka routes.",
    image: "/hero3.jpg",
  },
];

const serviceTypes = [
  "Airport transfers",
  "Private vehicle rental",
  "Vehicle with driver",
  "Cars, vans & SUVs",
  "City and day tours",
  "Island round trips",
];

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [availabilityMsg, setAvailabilityMsg] = useState("");

  const currentHero = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const handleCheckAvailability = () => {
    setAvailabilityMsg("Available! You can book now.");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);
  };

  return (
    <>
      <Navbar />

      <main className="ww-page">

        <section
          id="home"
          className="ww-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(15,23,42,0.82) 0%, rgba(37,99,235,0.68) 48%, rgba(15,23,42,0.2) 100%), url(${currentHero.image})`,
          }}
        >
          <div className="ww-shell ww-hero-shell">

            <div className="ww-hero-copy">

              <span className="ww-hero-label">
                {currentHero.tag}
              </span>

              <h1>{currentHero.title}</h1>

              <p>{currentHero.description}</p>

              <div className="ww-hero-actions">
                <a href="/login" className="ww-btn ww-btn-primary">
                  Start Booking
                </a>

                <a href="#services" className="ww-btn ww-btn-white">
                  View services
                </a>
              </div>

              <div className="ww-hero-dots">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`ww-hero-dot ${
                      activeSlide === index ? "active" : ""
                    }`}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>

            </div>

          </div>
        </section>

        <section
          className="ww-search-section"
          aria-label="Booking enquiry"
        >
          <div className="ww-shell">

            <div className="ww-search-card">

              <div className="ww-search-field">
                <span>Pickup location</span>
                <strong>Airport, hotel or city</strong>
              </div>

              <div className="ww-search-field">
                <span>Drop-off / destination</span>
                <strong>Where do you want to go?</strong>
              </div>

              <div className="ww-search-field">
                <span>Pickup date</span>
                <strong>Choose travel date</strong>
              </div>

              <div className="ww-search-field">
                <span>Vehicle type</span>
                <strong>Car, van, SUV or bus</strong>
              </div>

              <button
                type="button"
                className="ww-search-btn"
                onClick={handleCheckAvailability}
              >
                Check availability
              </button>

            </div>

            {availabilityMsg && (
              <div className="ww-available-msg">

                <div className="ww-available-icon">
                  ✓
                </div>

                <div>
                  <strong>Vehicle available</strong>

                  <p>
                    You can continue booking now.
                  </p>
                </div>

              </div>
            )}

            <div className="ww-service-pills">
              {serviceTypes.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default LandingPage;