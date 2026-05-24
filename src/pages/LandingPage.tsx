import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaUmbrellaBeach,
  FaRoute,
  FaPaw,
  FaShieldAlt,
  FaWhatsapp,
  FaGlobeAsia,
  FaCheckCircle,
  FaUserShield,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShip,
  FaWater,
  FaTree,
  FaArrowRight,
  FaStar,
  FaCar,
  FaUsers,
  FaCalendarCheck,
  FaSearchLocation,
  FaSuitcaseRolling,
  FaMapMarkedAlt,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LandingPage.css";

const heroSlides = [
  {
    id: 1,
    tag: "Vehicle Rental + Private Driver",
    description:
      "Book a car, van, SUV, VIP vehicle, or bus with a trusted driver for airport transfers, day tours, and Sri Lanka round trips.",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    tag: "Airport Transfers",
    description:
      "Easy airport pickup and drop-off service from Sri Lanka airports to hotels, beaches, cities, and tourist destinations.",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    tag: "Tours & Travel Transport",
    description:
      "Plan safaris, whale watching, city tours, beach getaways, and island trips with comfortable private transport.",
    image: "/hero3.jpg",
  },
];

const quickBookingOptions = [
  {
    icon: <FaPlaneArrival />,
    title: "Airport Transfer",
    text: "Pickup or drop-off from airport to hotel / destination.",
  },
  {
    icon: <FaCar />,
    title: "Rent a Vehicle",
    text: "Choose car, van, SUV, VIP vehicle, or bus for your trip.",
  },
  {
    icon: <FaRoute />,
    title: "Private Tour",
    text: "Book city tours, day tours, round trips, and attractions.",
  },
];

const vehicleTypes = [
  {
    icon: <FaCar />,
    title: "Cars & Sedans",
    text: "Best for couples, small families, airport drops, and city trips.",
    pax: "1 - 4 passengers",
  },
  {
    icon: <FaUsers />,
    title: "Vans & Mini Vans",
    text: "Comfortable choice for families, groups, tours, and luggage.",
    pax: "4 - 14 passengers",
  },
  {
    icon: <FaShieldAlt />,
    title: "SUV & VIP Vehicles",
    text: "Premium option for comfortable long-distance travel.",
    pax: "1 - 5 passengers",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Buses & Group Travel",
    text: "Suitable for large groups, company trips, and long island tours.",
    pax: "10 - 50 passengers",
  },
];

const tripTypes = [
  {
    icon: <FaPlaneArrival />,
    title: "Airport Pickups",
    description: "From airport to hotel, city, beach, or any destination in Sri Lanka.",
  },
  {
    icon: <FaPlaneDeparture />,
    title: "Airport Drop-offs",
    description: "On-time return transport from your location to the airport.",
  },
  {
    icon: <FaRoute />,
    title: "City & Day Tours",
    description: "Private day tours with flexible routes and local travel support.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Island Round Trips",
    description: "Multi-day trips covering beaches, culture, hill country, and nature.",
  },
  {
    icon: <FaPaw />,
    title: "Wildlife Safaris",
    description: "Transport support for Yala, Udawalawe, Wilpattu, and nature parks.",
  },
  {
    icon: <FaUmbrellaBeach />,
    title: "Beach Getaways",
    description: "Relaxing coastal trips to Mirissa, Galle, Bentota, Arugam Bay, and more.",
  },
];

const services = [
  {
    icon: <FaPlaneArrival />,
    title: "Airport Pickups",
    description:
      "Safe and comfortable pickup service from Sri Lanka airports to your hotel or destination.",
  },
  {
    icon: <FaPlaneDeparture />,
    title: "Airport Drop-offs",
    description:
      "Reliable airport drop-off service with on-time travel planning for your departure.",
  },
  {
    icon: <FaRoute />,
    title: "City & Day Tours",
    description:
      "Private day tours and city tours with flexible routes, comfortable vehicles, and local travel support.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Island Round Trips",
    description:
      "Multi-day round trips around Sri Lanka covering beaches, hill country, culture, and nature.",
  },
  {
    icon: <FaPaw />,
    title: "Wildlife Safaris",
    description:
      "Safari travel support for wildlife parks and nature destinations across Sri Lanka.",
  },
  {
    icon: <FaShip />,
    title: "Whale Watching",
    description:
      "Arrange transport and trip plans for whale watching experiences in Sri Lanka.",
  },
  {
    icon: <FaWater />,
    title: "Crocodile Watching",
    description:
      "Guided travel support for crocodile watching and unique nature-based experiences.",
  },
  {
    icon: <FaTree />,
    title: "Turtle Breeding Points",
    description:
      "Visit turtle conservation and breeding points with comfortable private transport.",
  },
  {
    icon: <FaUmbrellaBeach />,
    title: "Beach Getaways",
    description:
      "Relaxing beach trips and coastal getaways arranged with smooth transport and travel support.",
  },
];

const whyChooseUs = [
  {
    icon: <FaUserShield />,
    title: "Reliable Drivers",
    text: "Professional, polite, and experienced chauffeurs with local travel knowledge.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Easy Booking",
    text: "Simple enquiry process for airport transfers, rental vehicles, tours, and full trip plans.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe Travel",
    text: "Clean, well-maintained vehicles and careful drivers for a comfortable journey.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Islandwide Coverage",
    text: "Airport, beaches, hill country, cultural sites, and wildlife destinations.",
  },
];

const popularRoutes = [
  {
    title: "Airport to Hotel Transfer",
    description: "Best for arrival and departure travel with luggage support.",
    image: "/destinations/colombo.jpg",
    tag: "Airport Transfer",
  },
  {
    title: "Private Driver for Sri Lanka Tour",
    description: "Hire a vehicle with driver for one day or multi-day travel.",
    image: "/destinations/kandy.jpg",
    tag: "Vehicle Rental",
  },
  {
    title: "Wildlife Safari Transport",
    description: "Travel support for Yala, Udawalawe, Wilpattu, and nature trips.",
    image: "/destinations/yala.jpg",
    tag: "Safari Trip",
  },
  {
    title: "Beach & Whale Watching Trips",
    description: "Comfortable transport to Mirissa, Galle, Bentota, and south coast.",
    image: "/destinations/mirissa.jpg",
    tag: "Beach Getaway",
  },
];

const howItWorks = [
  {
    icon: <FaSearchLocation />,
    title: "Tell us your route",
    text: "Share pickup location, destination, travel date, passengers, and luggage details.",
  },
  {
    icon: <FaCar />,
    title: "Choose vehicle type",
    text: "Select car, van, SUV, VIP vehicle, or bus depending on your group size.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Confirm your trip",
    text: "We confirm your booking and arrange safe transport with driver support.",
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

  const feedbackLoopItems = feedbackList.length > 0 ? [...feedbackList, ...feedbackList] : [];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const loadFeedback = async () => {
    try {
      const savedFeedback = JSON.parse(
        localStorage.getItem("ww_feedback") || "[]"
      );

      const res = await axios.get("/api/feedback");
      const apiFeedback = Array.isArray(res.data) ? res.data : [];

      setFeedbackList([...savedFeedback, ...apiFeedback]);
    } catch (error) {
      const savedFeedback = JSON.parse(
        localStorage.getItem("ww_feedback") || "[]"
      );
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

    if (!feedbackForm.name || !feedbackForm.message) {
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

      const oldFeedback = JSON.parse(
        localStorage.getItem("ww_feedback") || "[]"
      );

      localStorage.setItem(
        "ww_feedback",
        JSON.stringify([newFeedback, ...oldFeedback])
      );

      setFeedbackList((prev) => [newFeedback, ...prev]);

      alert("Thank you! Your feedback was submitted.");

      setFeedbackForm({
        name: "",
        email: "",
        rating: 5,
        message: "",
      });
    } catch (error: any) {
      console.log("FEEDBACK SUBMIT ERROR:", error);
      alert("Feedback submit failed. Please try again.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const currentHero = heroSlides[activeSlide];

  return (
    <>
      <Navbar />

      <main className="ww-landing">
        <section
          id="home"
          className="ww-hero-structure"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(6,14,28,0.88) 0%, rgba(6,14,28,0.74) 48%, rgba(6,14,28,0.24) 100%), url(${currentHero.image})`,
          }}
        >
          <div className="ww-hero-overlay" />

          <div className="ww-shell">
            <div className="ww-hero-layout">
              <div className="ww-hero-content">
                <span className="ww-hero-badge">
                  W&amp;W Travels • Vehicle Rental &amp; Sri Lanka Tours
                </span>

                <p className="ww-hero-mini">{currentHero.tag}</p>

                <h1>
                  Rent a vehicle with driver for
                  <span>Sri Lanka travel</span>
                </h1>

                <p className="ww-hero-text">{currentHero.description}</p>

                <div className="ww-hero-buttons">
                  <a href="/login" className="ww-btn-primary">
                    Book Your Vehicle
                    <FaArrowRight />
                  </a>
                  <a href="#trip-types" className="ww-btn-secondary">
                    View Trip Options
                  </a>
                </div>

                <div className="ww-hero-trust">
                  <span><FaCheckCircle /> Airport transfers</span>
                  <span><FaCheckCircle /> Cars, vans, SUVs &amp; buses</span>
                  <span><FaCheckCircle /> Private tours islandwide</span>
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
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="ww-booking-card">
                <div className="ww-booking-card-head">
                  <span>Start here</span>
                  <h3>What do you need?</h3>
                  <p>Choose the service type first. Then send your trip details.</p>
                </div>

                <div className="ww-booking-options">
                  {quickBookingOptions.map((item) => (
                    <a href="/login" className="ww-booking-option" key={item.title}>
                      <div>{item.icon}</div>
                      <span>{item.title}</span>
                      <small>{item.text}</small>
                    </a>
                  ))}
                </div>

                <div className="ww-booking-mini-form">
                  <div>
                    <FaSearchLocation /> Pickup location
                  </div>
                  <div>
                    <FaMapMarkerAlt /> Drop location / destination
                  </div>
                  <div>
                    <FaCalendarCheck /> Travel date
                  </div>
                  <div>
                    <FaUsers /> Passengers
                  </div>
                </div>

                <a href="/login" className="ww-booking-submit">
                  Continue to Booking
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="clear-info" className="ww-clear-info-section">
          <div className="ww-shell">
            <div className="ww-clear-info-card">
              <div>
                <span className="ww-section-eyebrow">What is this website?</span>
                <h2>Book private transport for your Sri Lanka trip</h2>
                <p>
                  This website is for customers who need a vehicle with driver,
                  airport transfer, day tour, safari transport, beach trip, or
                  full island round trip. You can choose your service, vehicle
                  type, pickup place, destination, date, and passenger count.
                </p>
              </div>

              <div className="ww-clear-info-points">
                <div><FaCar /> Vehicle rental with driver</div>
                <div><FaPlaneArrival /> Airport pickup and drop-off</div>
                <div><FaSuitcaseRolling /> Tourist trip transport</div>
              </div>
            </div>
          </div>
        </section>

        <section id="vehicle-types" className="ww-section ww-vehicle-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Choose Your Vehicle</span>
              <h2>Vehicle options for every trip</h2>
              <p>
                First select the type of vehicle you need. Then choose your pickup,
                drop location, date, and travel plan.
              </p>
            </div>

            <div className="ww-vehicle-grid">
              {vehicleTypes.map((vehicle) => (
                <article className="ww-vehicle-card" key={vehicle.title}>
                  <div className="ww-vehicle-icon">{vehicle.icon}</div>
                  <div>
                    <h3>{vehicle.title}</h3>
                    <p>{vehicle.text}</p>
                    <span>{vehicle.pax}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="trip-types" className="ww-section ww-trip-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Trip Options</span>
              <h2>What can customers book?</h2>
              <p>
                Customers can clearly understand that this is not only a destination
                website. It is a transport booking website for rental vehicles,
                airport transfers, private tours, and travel activities.
              </p>
            </div>

            <div className="ww-trip-grid">
              {tripTypes.map((trip) => (
                <article className="ww-trip-card" key={trip.title}>
                  <div className="ww-trip-icon">{trip.icon}</div>
                  <h3>{trip.title}</h3>
                  <p>{trip.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="popular-routes" className="ww-section ww-routes-section">
          <div className="ww-shell">
            <div className="ww-title-row">
              <div>
                <span className="ww-section-eyebrow">Popular bookings</span>
                <h2>Common travel requests</h2>
                <p>
                  These examples help customers quickly understand what they can book.
                </p>
              </div>

              <a href="/login" className="ww-small-link">
                Start Booking <FaArrowRight />
              </a>
            </div>

            <div className="ww-routes-grid">
              {popularRoutes.map((route) => (
                <article className="ww-route-card" key={route.title}>
                  <div className="ww-route-img">
                    <img src={route.image} alt={route.title} />
                    <span>{route.tag}</span>
                  </div>

                  <div className="ww-route-content">
                    <h3>{route.title}</h3>
                    <p>{route.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="ww-section ww-about-section">
          <div className="ww-shell">
            <div className="ww-about-layout">
              <div className="ww-about-image">
                <img src="/about.jpg" alt="About W&W Travels" />
              </div>

              <div className="ww-about-content">
                <span>About Us</span>
                <h2>Your trusted vehicle rental and travel partner in Sri Lanka</h2>
                <p>
                  W&amp;W Travels helps local and foreign travelers arrange smooth,
                  safe, and memorable trips across Sri Lanka. We provide rental
                  vehicles with driver, airport pickups, airport drop-offs, city
                  tours, day tours, island round trips, wildlife safaris, whale
                  watching trips, crocodile watching, turtle breeding point visits,
                  and beach getaways.
                </p>
                <p>
                  Whether you need one airport transfer, a private vehicle, a day
                  tour, or a complete island travel plan, we focus on comfort,
                  punctuality, and friendly service.
                </p>

                <div className="ww-about-points">
                  <div>
                    <FaCheckCircle />
                    <span>Professional drivers and clean vehicles</span>
                  </div>
                  <div>
                    <FaCheckCircle />
                    <span>Cars, vans, SUVs, VIP vehicles, and buses</span>
                  </div>
                  <div>
                    <FaCheckCircle />
                    <span>Airport transfers, tours, safaris, and beach trips</span>
                  </div>
                  <div>
                    <FaCheckCircle />
                    <span>Islandwide transport and travel coverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="ww-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>What We Offer</span>
              <h2>Our Services</h2>
              <p>
                From airport transfers to wildlife safaris and beach getaways,
                we help you explore Sri Lanka with comfort and confidence.
              </p>
            </div>

            <div className="ww-services-grid">
              {services.map((service, index) => (
                <article className="ww-service-card" key={index}>
                  <div className="ww-service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ww-section ww-process-section" id="how-it-works">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Simple Process</span>
              <h2>How booking works</h2>
              <p>
                A clear booking flow helps customers understand the website without confusion.
              </p>
            </div>

            <div className="ww-process-grid">
              {howItWorks.map((item, index) => (
                <article className="ww-process-card" key={item.title}>
                  <strong>0{index + 1}</strong>
                  <div>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ww-section ww-light" id="why-choose-us">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Why Us</span>
              <h2>Why Choose W&amp;W Travels</h2>
              <p>
                We help you travel with confidence by arranging your transport,
                routes, and memorable Sri Lankan activities.
              </p>
            </div>

            <div className="ww-why-grid">
              {whyChooseUs.map((item, index) => (
                <article className="ww-why-card" key={index}>
                  <div className="ww-why-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ww-section ww-feedback-section" id="feedback">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Customer Feedback</span>
              <h2>Share Your Travel Experience</h2>
              <p>
                Your feedback helps us improve our airport transfers, tours, and
                Sri Lanka travel services.
              </p>
            </div>

            <div className="ww-feedback-layout ww-feedback-single">
              <form className="ww-feedback-form" onSubmit={submitFeedback}>
                <h3>Send Feedback</h3>
                <p className="ww-feedback-form-note">
                  After submit, your feedback will appear in the live feedback loop below.
                </p>

                <div className="ww-feedback-two-inputs">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={feedbackForm.name}
                    onChange={handleFeedbackChange}
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Optional"
                    value={feedbackForm.email}
                    onChange={handleFeedbackChange}
                  />
                </div>

                <select
                  name="rating"
                  value={feedbackForm.rating}
                  onChange={handleFeedbackChange}
                >
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Very Good</option>
                  <option value="3">3 Stars - Good</option>
                  <option value="2">2 Stars - Fair</option>
                  <option value="1">1 Star - Poor</option>
                </select>

                <textarea
                  name="message"
                  rows={6}
                  placeholder="Write your feedback..."
                  value={feedbackForm.message}
                  onChange={handleFeedbackChange}
                  required
                />

                <button type="submit" disabled={feedbackLoading}>
                  {feedbackLoading ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>

              <div className="ww-feedback-loop-wrap">
                <div className="ww-feedback-loop-title">
                  <span>Recent Feedback</span>
                  <strong>{feedbackList.length} review{feedbackList.length === 1 ? "" : "s"}</strong>
                </div>

                {feedbackList.length > 0 ? (
                  <div className="ww-feedback-loop-mask">
                    <div className="ww-feedback-loop-track">
                      {feedbackLoopItems.map((item, loopIndex) => (
                        <article className="ww-feedback-card" key={`${item.id}-${loopIndex}`}>
                          <div className="ww-feedback-top">
                            <div className="ww-feedback-avatar">
                              {String(item.name || "G").charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <strong>{item.name}</strong>
                              <div className="ww-feedback-stars">
                                {Array.from({ length: Number(item.rating) || 5 }).map(
                                  (_, index) => (
                                    <FaStar key={index} />
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          <p>“{item.message}”</p>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="ww-feedback-empty">
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
              <span><FaClock /> Quick response</span>
              <h2>Need a vehicle for your Sri Lanka trip?</h2>
              <p>
                Book airport pickup, vehicle rental with driver, private tour,
                safari transport, whale watching travel, or a full island round trip.
              </p>

              <div className="ww-cta-action">
                <a
                  href="https://wa.me/94701097969"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ww-cta-whatsapp"
                >
                  <FaWhatsapp />
                  Contact on WhatsApp
                </a>

                <a href="/login" className="ww-cta-booking">
                  Book Online
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="ww-section ww-contact-section" id="contact">
          <div className="ww-shell">
            <div className="ww-contact-wrap">
              <div className="ww-contact-left">
                <span>Contact Info</span>
                <h2>Let’s arrange your next trip smoothly</h2>
                <p>
                  Reach out for vehicle rental, airport transfers, city tours,
                  day tours, round trips, safaris, whale watching, turtle breeding
                  points, and beach getaways.
                </p>

                <div className="ww-contact-list">
                  <div>
                    <strong>
                      <FaPhoneAlt /> Phone
                    </strong>
                    <span>+94 70 109 7969</span>
                  </div>

                  <div>
                    <strong>
                      <FaEnvelope /> Email
                    </strong>
                    <span>info@wwtravels.lk</span>
                  </div>

                  <div>
                    <strong>
                      <FaMapMarkerAlt /> Location
                    </strong>
                    <span>Matara, Sri Lanka</span>
                  </div>
                </div>
              </div>

              <form className="ww-contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <input type="text" placeholder="Phone Number" />
                <textarea
                  rows={6}
                  placeholder="Tell us your pickup location, destination, date, passengers, and vehicle type..."
                />
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
