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
    tag: "Vehicle rental in Sri Lanka",
    title: "Rent a private vehicle with driver for your Sri Lanka trip",
    description:
      "Book cars, vans, SUVs, VIP vehicles and buses for airport transfers, hotel pickups, city rides, round trips and private tours.",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    tag: "Airport transfer service",
    title: "Airport pickups and drop-offs to any destination",
    description:
      "Tell us your pickup point, destination, date and passengers. We help arrange the right vehicle for a smooth journey.",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    tag: "Tours with private transport",
    title: "Need a tour? We provide the vehicle and travel support",
    description:
      "Plan beach trips, safaris, whale watching, hill country routes and island round trips with comfortable private transport.",
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

const services = [
  {
    icon: <FaPlaneArrival />,
    title: "Airport Pickups",
    description:
      "Meet your driver at the airport and travel safely to your hotel, villa or next destination.",
  },
  {
    icon: <FaPlaneDeparture />,
    title: "Airport Drop-offs",
    description:
      "Reliable pickup timing and comfortable airport transfer support for your departure.",
  },
  {
    icon: <FaCarSide />,
    title: "Vehicle With Driver",
    description:
      "Cars, vans, SUVs, VIP vehicles and buses arranged based on passenger count and route.",
  },
  {
    icon: <FaRoute />,
    title: "City & Day Tours",
    description:
      "Private day tours for Colombo, Galle, Kandy, Ella, Mirissa and other popular locations.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Wildlife & Nature Trips",
    description:
      "Transport support for Yala, Udawalawe, crocodile watching, turtle points and nature trips.",
  },
  {
    icon: <FaUmbrellaBeach />,
    title: "Beach Getaways",
    description:
      "Plan relaxing coastal trips to Mirissa, Bentota, Galle, Hikkaduwa and more beach towns.",
  },
];

const popularTrips = [
  {
    title: "Airport Transfers",
    label: "Most requested",
    description: "Colombo Airport to hotels, beaches, cities and custom destinations.",
    image: "/destinations/airport.jpg",
  },
  {
    title: "Kandy & Hill Country",
    label: "Culture + nature",
    description: "Kandy, Nuwara Eliya, Ella, tea fields, waterfalls and scenic viewpoints.",
    image: "/destinations/kandy.jpg",
  },
  {
    title: "South Coast Trips",
    label: "Beach route",
    description: "Galle, Mirissa, Bentota, Hikkaduwa, whale watching and beach holidays.",
    image: "/destinations/mirissa.jpg",
  },
  {
    title: "Safari & Wildlife",
    label: "Adventure",
    description: "Yala, Udawalawe, Minneriya, nature parks and wildlife travel support.",
    image: "/destinations/yala.jpg",
  },
];

const vehicles = [
  { name: "Car", pax: "1 - 4 passengers", text: "Best for couples, small families and airport transfers." },
  { name: "Van", pax: "5 - 14 passengers", text: "Best for families, groups and long island routes." },
  { name: "SUV", pax: "1 - 5 passengers", text: "Best for comfortable long trips and premium routes." },
  { name: "Bus", pax: "10 - 50 passengers", text: "Best for groups, events and tour teams." },
];

const whyChooseUs = [
  {
    title: "Clear booking enquiry",
    text: "Customers can understand the service first, then send a trip request before confirmation.",
  },
  {
    title: "For tourists and locals",
    text: "Useful for foreign travelers, Sri Lankan families, airport passengers and group tours.",
  },
  {
    title: "Private vehicles with driver",
    text: "You choose pickup, destination, passengers and service type. We help arrange the suitable vehicle.",
  },
  {
    title: "Islandwide travel support",
    text: "Airport, beaches, hill country, cultural sites, safari parks and custom routes across Sri Lanka.",
  },
];

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [availabilityMsg, setAvailabilityMsg] = useState(false);

  const currentHero = heroSlides[activeSlide];
  const feedbackLoopItems = useMemo(
    () => (feedbackList.length > 0 ? [...feedbackList, ...feedbackList] : []),
    [feedbackList]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const loadFeedback = async () => {
    try {
      const savedFeedback = JSON.parse(localStorage.getItem("ww_feedback") || "[]");
      const res = await axios.get("/api/feedback");
      const apiFeedback = Array.isArray(res.data) ? res.data : [];
      setFeedbackList([...savedFeedback, ...apiFeedback]);
    } catch (error) {
      const savedFeedback = JSON.parse(localStorage.getItem("ww_feedback") || "[]");
      setFeedbackList(savedFeedback);
      console.log("LOAD FEEDBACK ERROR:", error);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleFeedbackChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!feedbackForm.name.trim() || !feedbackForm.message.trim()) {
      alert("Please enter your name and feedback message");
      return;
    }

    try {
      setFeedbackLoading(true);

      const newFeedback = {
        id: Date.now(),
        name: feedbackForm.name.trim(),
        email: feedbackForm.email.trim(),
        rating: Number(feedbackForm.rating),
        message: feedbackForm.message.trim(),
      };

      try {
        await axios.post("/api/feedback", newFeedback);
      } catch (apiError) {
        console.log("API feedback route not ready. Saved locally:", apiError);
      }

      const oldFeedback = JSON.parse(localStorage.getItem("ww_feedback") || "[]");
      localStorage.setItem("ww_feedback", JSON.stringify([newFeedback, ...oldFeedback]));
      setFeedbackList((prev) => [newFeedback, ...prev]);

      alert("Thank you! Your feedback was submitted.");
      setFeedbackForm({ name: "", email: "", rating: 5, message: "" });
    } catch (error: any) {
      console.log("FEEDBACK SUBMIT ERROR:", error);
      alert("Feedback submit failed. Please try again.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleCheckAvailability = () => {
    setAvailabilityMsg(true);

    window.setTimeout(() => {
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
              <span className="ww-hero-label">{currentHero.tag}</span>
              <h1>{currentHero.title}</h1>
              <p>{currentHero.description}</p>

              <div className="ww-hero-actions">
                <a href="/login" className="ww-btn ww-btn-primary">Start Booking</a>
                <a href="#services" className="ww-btn ww-btn-white">View services</a>
              </div>

              <div className="ww-hero-dots" aria-label="Hero slides">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`ww-hero-dot ${activeSlide === index ? "active" : ""}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

       <section
  className="ww-search-section"
  aria-label="Vehicle booking enquiry"
>
  <div className="ww-shell">

    <div className="ww-search-card">

      <div className="ww-search-field">
        <label>Pickup location</label>

        <input
          type="text"
          placeholder="Airport, hotel or city"
        />
      </div>

      <div className="ww-search-field">
        <label>Destination</label>

        <input
          type="text"
          placeholder="Where do you want to go?"
        />
      </div>

      <div className="ww-search-field">
        <label>Pickup date</label>

        <input type="date" />
      </div>

      <div className="ww-search-field">
        <label>Vehicle type</label>

        <select>
          <option>Car</option>
          <option>Van</option>
          <option>SUV</option>
          <option>Bus</option>
        </select>
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

    <div
      className="ww-service-pills"
      aria-label="Popular vehicle services"
    >
      {serviceTypes.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>

  </div>
</section>

        <section id="services" className="ww-section">
          <div className="ww-shell">
            <div className="ww-section-head">
              <span>What customers can book</span>
              <h2>Private vehicle services for Sri Lanka travel</h2>
              <p>
                Clear services for customers who need a vehicle, airport transfer, tour, safari route or beach trip.
              </p>
            </div>

            <div className="ww-services-grid">
              {services.map((service) => (
                <article className="ww-service-card" key={service.title}>
                  <div className="ww-service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="destinations" className="ww-section ww-soft-section">
          <div className="ww-shell">
            <div className="ww-section-head ww-section-head-left">
              <span>Popular trip ideas</span>
              <h2>Choose by travel need, not only by destination</h2>
              <p>
                This section helps visitors quickly understand what they can book with W&amp;W Travels.
              </p>
            </div>

            <div className="ww-trip-grid">
              {popularTrips.map((trip) => (
                <article className="ww-trip-card" key={trip.title}>
                  <img src={trip.image} alt={trip.title} />
                  <div className="ww-trip-content">
                    <span>{trip.label}</span>
                    <h3>{trip.title}</h3>
                    <p>{trip.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="ww-more-box">
              <div>
                <h3>Need a custom Sri Lanka route?</h3>
                <p>
                  Tell us your pickup place, destinations and passenger count. We will help arrange a suitable vehicle and travel plan.
                </p>
              </div>
              <a href="/login" className="ww-btn ww-btn-primary">Create trip enquiry</a>
            </div>
          </div>
        </section>

        <section id="vehicles" className="ww-section">
          <div className="ww-shell">
            <div className="ww-section-head">
              <span>Vehicle options</span>
              <h2>Find the right vehicle for your trip</h2>
              <p>
                Customers can understand what type of vehicle may fit before sending the booking request.
              </p>
            </div>

            <div className="ww-vehicle-grid">
              {vehicles.map((vehicle) => (
                <article className="ww-vehicle-card" key={vehicle.name}>
                  <div className="ww-vehicle-top">
                    <FaCarSide />
                    <strong>{vehicle.name}</strong>
                  </div>
                  <span>{vehicle.pax}</span>
                  <p>{vehicle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="ww-section ww-about-section">
          <div className="ww-shell">
            <div className="ww-about-layout">
              <div className="ww-about-image">
                <img src="/about.jpg" alt="Private travel support in Sri Lanka" />
              </div>

              <div className="ww-about-content">
                <span>About W&amp;W Travels</span>
                <h2>A simple way to arrange private travel in Sri Lanka</h2>
                <p>
                  W&amp;W Travels is made for travelers who want to rent a vehicle with driver, book an airport transfer, or plan a private tour around Sri Lanka without confusion.
                </p>
                <p>
                  We focus on clear communication, comfortable vehicles, friendly travel support and simple booking enquiry flow.
                </p>

                <div className="ww-about-list">
                  <div><FaCheckCircle /><span>Airport transfers and private tours</span></div>
                  <div><FaCheckCircle /><span>Cars, vans, SUVs, VIP vehicles and buses</span></div>
                  <div><FaCheckCircle /><span>Support for foreign tourists and Sri Lankan customers</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ww-section ww-soft-section" id="why-choose-us">
          <div className="ww-shell">
            <div className="ww-section-head">
              <span>Why choose us</span>
              <h2>Designed to make booking clear and easy</h2>
              <p>
                The website explains the service first, so customers know they can book transport, tours and travel support in one place.
              </p>
            </div>

            <div className="ww-why-grid">
              {whyChooseUs.map((item) => (
                <article className="ww-why-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ww-steps-section">
          <div className="ww-shell">
            <div className="ww-steps-grid">
              <article>
                <FaMapMarkerAlt />
                <strong>1. Send trip details</strong>
                <span>Pickup, drop location, date, passengers and service type.</span>
              </article>
              <article>
                <FaCarSide />
                <strong>2. Choose vehicle</strong>
                <span>We help match your route with a suitable vehicle option.</span>
              </article>
              <article>
                <FaCalendarAlt />
                <strong>3. Confirm booking</strong>
                <span>Confirm pickup time, route, travel support and final details.</span>
              </article>
              <article>
                <FaClock />
                <strong>4. Travel smoothly</strong>
                <span>Meet your driver and enjoy your Sri Lanka journey.</span>
              </article>
            </div>
          </div>
        </section>

        <section className="ww-section ww-feedback-section" id="feedback">
          <div className="ww-shell">
            <div className="ww-section-head">
              <span>Customer feedback</span>
              <h2>Share your travel experience</h2>
              <p>
                Feedback helps improve airport transfers, tours and travel services.
              </p>
            </div>

            <div className="ww-feedback-layout">
              <form className="ww-feedback-form" onSubmit={submitFeedback}>
                <h3>Send Feedback</h3>
                <div className="ww-feedback-two-inputs">
                  <input type="text" name="name" placeholder="Your name" value={feedbackForm.name} onChange={handleFeedbackChange} required />
                  <input type="email" name="email" placeholder="Email optional" value={feedbackForm.email} onChange={handleFeedbackChange} />
                </div>
                <select name="rating" value={feedbackForm.rating} onChange={handleFeedbackChange}>
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Very Good</option>
                  <option value="3">3 Stars - Good</option>
                  <option value="2">2 Stars - Fair</option>
                  <option value="1">1 Star - Poor</option>
                </select>
                <textarea name="message" rows={5} placeholder="Write your feedback..." value={feedbackForm.message} onChange={handleFeedbackChange} required />
                <button type="submit" disabled={feedbackLoading}>
                  {feedbackLoading ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>

              <div className="ww-feedback-list-wrap">
                {feedbackList.length > 0 ? (
                  <div className="ww-feedback-loop-track">
                    {feedbackLoopItems.map((item, index) => (
                      <article className="ww-feedback-card" key={`${item.id}-${index}`}>
                        <div className="ww-feedback-top">
                          <div className="ww-feedback-avatar">{String(item.name || "G").charAt(0).toUpperCase()}</div>
                          <div>
                            <strong>{item.name}</strong>
                            <div className="ww-feedback-stars">
                              {Array.from({ length: Number(item.rating) || 5 }).map((_, starIndex) => (
                                <FaStar key={starIndex} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p>“{item.message}”</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="ww-empty-feedback">
                    <h3>No feedback yet</h3>
                    <p>Be the first customer to share your experience.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="ww-cta-section">
          <div className="ww-shell">
            <div className="ww-cta-box">
              <div>
                <span>Ready to plan?</span>
                <h2>Book your Sri Lanka vehicle or tour enquiry today</h2>
                <p>
                  Airport transfer, private day tour, safari transport, beach getaway or full round trip — send your details and we will help you arrange it.
                </p>
              </div>
              <a href="https://wa.me/94701097969" target="_blank" rel="noopener noreferrer" className="ww-whatsapp-btn">
                <FaWhatsapp /> WhatsApp us
              </a>
            </div>
          </div>
        </section>

        <section className="ww-section ww-contact-section" id="contact">
          <div className="ww-shell">
            <div className="ww-contact-wrap">
              <div className="ww-contact-left">
                <span>Contact</span>
                <h2>Let’s arrange your next trip smoothly</h2>
                <p>
                  Reach out for airport transfers, private vehicles, tours, safaris, whale watching, turtle points and beach getaways.
                </p>

                <div className="ww-contact-list">
                  <div><FaPhoneAlt /><span>+94 77 123 4567</span></div>
                  <div><FaEnvelope /><span>info@wwtravels.lk</span></div>
                  <div><FaMapMarkerAlt /><span>Colombo, Sri Lanka</span></div>
                </div>
              </div>

              <form className="ww-contact-form">
                <input type="text" placeholder="Your name" />
                <input type="email" placeholder="Your email" />
                <input type="text" placeholder="Phone number" />
                <textarea rows={6} placeholder="Tell us your pickup, destination, date and passenger count..." />
                <button type="submit">Send Enquiry</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;
