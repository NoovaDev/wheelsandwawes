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
  FaArrowRight,
  FaStar,
  FaCar,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LandingPage.css";

const heroSlides = [
  {
    id: 1,
    tag: "Vehicle Rental in Sri Lanka",
    title1: "Rent Vehicles,",
    title2: "Travel Comfortably and",
    title3: "Explore Sri Lanka",
    description:
      "Mini cars, hatchbacks, and sedans for daily rental, airport transfers, private travel, and Sri Lanka trip support.",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    tag: "Mini Cars • Hatchbacks • Sedans",
    title1: "Choose Your Car,",
    title2: "Book Your Dates and",
    title3: "Start Your Journey",
    description:
      "Simple vehicle rental options for local customers and foreign travelers with driver-supported travel.",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    tag: "Vehicle Rental + Travel Services",
    title1: "Rent a Vehicle,",
    title2: "Book Transfers and",
    title3: "Plan Tours",
    description:
      "Along with vehicle rental, we support airport pickups, day tours, safaris, beach getaways, and island trips.",
    image: "/hero3.jpg",
  },
];

const vehicleCategories = [
  {
    title: "Mini Cars",
    models: "Alto • Nano • Wagon R",
    pax: "Best for 1–2 passengers",
    text: "Affordable and easy for city travel, short trips, and budget-friendly daily rental.",
    image: "/vehicles/mini-car.jpg",
  },
  {
    title: "Hatchbacks",
    models: "Aqua • Honda Fit • Spacia",
    pax: "Best for 1–3 passengers",
    text: "Fuel efficient, comfortable, and ideal for airport transfers or small family trips.",
    image: "/vehicles/hatchback.jpg",
  },
  {
    title: "Sedans",
    models: "Prius • Axio • Insight",
    pax: "Best for 1–4 passengers",
    text: "More comfort for longer journeys, business travel, airport pickups, and private tours.",
    image: "/vehicles/sedan.jpg",
  },
];

const services = [
  {
    icon: <FaCar />,
    title: "Vehicle Rental",
    description:
      "Mini cars, hatchbacks, and sedans available for simple and comfortable vehicle rental.",
  },
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
    icon: <FaUmbrellaBeach />,
    title: "Beach Getaways",
    description:
      "Relaxing beach trips and coastal getaways arranged with smooth transport and travel support.",
  },
];

const whyChooseUs = [
  {
    icon: <FaUserShield />,
    title: "Reliable Vehicles",
    text: "Clean and comfortable vehicles for daily rental, airport transfers, and private travel.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Easy Booking",
    text: "Simple booking process through website or WhatsApp with quick confirmation support.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe Travel",
    text: "Careful drivers, maintained vehicles, and travel support for smooth journeys.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Travel Support",
    text: "Vehicle rental plus airport transfers, tours, safaris, beach trips, and island coverage.",
  },
];

const rentalSteps = [
  {
    number: "01",
    title: "Choose Vehicle",
    text: "Select mini car, hatchback, or sedan based on your comfort and passenger count.",
  },
  {
    number: "02",
    title: "Send Request",
    text: "Submit your pickup date, return date, location, and driver preference.",
  },
  {
    number: "03",
    title: "Get Confirmation",
    text: "Our team will contact you through WhatsApp to confirm the vehicle and details.",
  },
];

const destinations = [
  {
    title: "Sigiriya",
    description: "Ancient rock fortress with beautiful views and history.",
    image: "/destinations/sigiriya.jpg",
  },
  {
    title: "Ella",
    description:
      "Hill country destination with waterfalls, tea fields, and Nine Arch Bridge.",
    image: "/destinations/ella.jpg",
  },
  {
    title: "Mirissa",
    description: "Popular beach town for whale watching and relaxing holidays.",
    image: "/destinations/mirissa.jpg",
  },
  {
    title: "Yala National Park",
    description: "Wildlife safari destination famous for leopards and elephants.",
    image: "/destinations/yala.jpg",
  },
];

const galleryImages = [
  {
    image: "/gallery/car-rental.jpg",
    title: "Vehicle Rental",
  },
  {
    image: "/gallery/airport-transfer.jpg",
    title: "Airport Transfers",
  },
  {
    image: "/gallery/private-tour.jpg",
    title: "Private Tours",
  },
  {
    image: "/gallery/safari.jpg",
    title: "Wildlife Safaris",
  },
  {
    image: "/gallery/beach-trip.jpg",
    title: "Beach Getaways",
  },
  {
    image: "/gallery/round-trip.jpg",
    title: "Island Round Trips",
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

  const feedbackLoopItems =
    feedbackList.length > 0 ? [...feedbackList, ...feedbackList] : [];

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
            backgroundImage: `linear-gradient(90deg, rgba(6,14,28,0.88) 0%, rgba(6,14,28,0.64) 48%, rgba(6,14,28,0.2) 100%), url(${currentHero.image})`,
          }}
        >
          <div className="ww-hero-overlay" />

          <div className="ww-shell">
            <div className="ww-hero-center">
              <span className="ww-hero-badge">
                W&amp;W Travels • Vehicle Rental & Travel Support
              </span>

              <p className="ww-hero-mini">{currentHero.tag}</p>

              <h1>
                {currentHero.title1}
                <span>{currentHero.title2}</span>
                <span>{currentHero.title3}</span>
              </h1>

              <p className="ww-hero-text">{currentHero.description}</p>

              <div className="ww-hero-buttons">
                <a href="/rent" className="ww-btn-gold">
                  <FaCar /> Rent Vehicle
                </a>

                <a href="https://wa.me/94701097969" className="ww-btn-primary">
                  <FaWhatsapp /> WhatsApp Booking
                </a>

                <a href="#vehicles" className="ww-btn-secondary">
                  View Vehicles
                </a>
              </div>

              <div className="ww-hero-stats">
                <div>
                  <strong>3</strong>
                  <span>Vehicle Categories</span>
                </div>
                <div>
                  <strong>24/7</strong>
                  <span>Travel Support</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Customer Focused</span>
                </div>
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
          </div>
        </section>

        <section id="vehicles" className="ww-section ww-vehicle-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Vehicle Rental</span>
              <h2>Choose Your Rental Vehicle</h2>
              <p>
                Start with the right vehicle for your journey. We provide mini
                cars, hatchbacks, and sedans for comfortable travel in Sri Lanka.
              </p>
            </div>

            <div className="ww-vehicle-grid">
              {vehicleCategories.map((vehicle) => (
                <article className="ww-vehicle-card" key={vehicle.title}>
                  <div className="ww-vehicle-img">
                    <img src={vehicle.image} alt={vehicle.title} />
                    <span>{vehicle.pax}</span>
                  </div>

                  <div className="ww-vehicle-content">
                    <h3>{vehicle.title}</h3>
                    <strong>{vehicle.models}</strong>
                    <p>{vehicle.text}</p>

                    <a href="/rent" className="ww-vehicle-btn">
                      Rent This Type <FaArrowRight />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ww-section ww-process-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>How It Works</span>
              <h2>Simple Vehicle Booking Process</h2>
              <p>
                Send your rental request in a few steps and our team will contact
                you to confirm availability and details.
              </p>
            </div>

            <div className="ww-process-grid">
              {rentalSteps.map((step) => (
                <article className="ww-process-card" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="ww-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>More Than Rental</span>
              <h2>Travel Services Available Too</h2>
              <p>
                Vehicle rental is our main service, but we also help with
                airport transfers, private tours, safaris, and beach trips.
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

        <section className="ww-section ww-gallery-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Gallery</span>
              <h2>Vehicles, Transfers & Sri Lanka Trips</h2>
              <p>
                Add real photos here to make your website more trustworthy and
                attractive for visitors.
              </p>
            </div>

            <div className="ww-gallery-grid">
              {galleryImages.map((item) => (
                <article className="ww-gallery-card" key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <span>{item.title}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="destinations" className="ww-section ww-destinations-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Sri Lankan Destinations</span>
              <h2>Places You Can Explore</h2>
              <p>
                Rent a vehicle or request travel support to explore Sri Lanka’s
                beaches, mountains, wildlife parks, and cultural sites.
              </p>
            </div>

            <div className="ww-destinations-grid">
              {destinations.map((place) => (
                <article className="ww-destination-card" key={place.title}>
                  <div className="ww-destination-img">
                    <img src={place.image} alt={place.title} />
                  </div>

                  <div className="ww-destination-content">
                    <h3>{place.title}</h3>
                    <p>{place.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="ww-destination-more-wrap">
              <a href="/login" className="ww-see-more-btn ww-see-more-main">
                See More Destinations
                <FaArrowRight />
              </a>
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
                <h2>Your trusted vehicle rental partner in Sri Lanka</h2>
                <p>
                  W&amp;W Travels focuses on simple and reliable vehicle rental
                  for customers who need comfortable transportation in Sri
                  Lanka. We provide mini cars, hatchbacks, and sedans for daily
                  rental, airport transfers, and private travel.
                </p>
                <p>
                  Along with vehicle rental, we also support tours, round trips,
                  wildlife safaris, whale watching, and beach getaways for
                  customers who want more than just transport.
                </p>

                <div className="ww-about-points">
                  <div>
                    <FaCheckCircle />
                    <span>Mini cars, hatchbacks, and sedans for rent</span>
                  </div>
                  <div>
                    <FaCheckCircle />
                    <span>Airport transfers, tours, safaris, and beach trips</span>
                  </div>
                  <div>
                    <FaCheckCircle />
                    <span>Vehicle rental with travel support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ww-section ww-light" id="why-choose-us">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Why Us</span>
              <h2>Why Choose W&amp;W Travels</h2>
              <p>
                We make vehicle rental easier with clean vehicles, quick
                communication, and travel support when you need it.
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
              <h2>Share Your Experience</h2>
              <p>
                Your feedback helps us improve our vehicle rental, airport
                transfers, tours, and Sri Lanka travel services.
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
                  <strong>
                    {feedbackList.length} review
                    {feedbackList.length === 1 ? "" : "s"}
                  </strong>
                </div>

                {feedbackList.length > 0 ? (
                  <div className="ww-feedback-loop-mask">
                    <div className="ww-feedback-loop-track">
                      {feedbackLoopItems.map((item, loopIndex) => (
                        <article
                          className="ww-feedback-card"
                          key={`${item.id}-${loopIndex}`}
                        >
                          <div className="ww-feedback-top">
                            <div className="ww-feedback-avatar">
                              {String(item.name || "G").charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <strong>{item.name}</strong>
                              <div className="ww-feedback-stars">
                                {Array.from({
                                  length: Number(item.rating) || 5,
                                }).map((_, index) => (
                                  <FaStar key={index} />
                                ))}
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
              <h2>Need a Vehicle in Sri Lanka?</h2>
              <p>
                Rent a mini car, hatchback, or sedan. You can also request
                airport transfers, private tours, or complete travel support.
              </p>

              <div className="ww-cta-action">
                <a href="/rent" className="ww-cta-gold">
                  <FaCar />
                  Rent Vehicle
                </a>

                <a
                  href="https://wa.me/94701097969"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ww-cta-whatsapp"
                >
                  <FaWhatsapp />
                  Contact on WhatsApp
                </a>

                <small>We typically reply within 15 minutes.</small>
              </div>
            </div>
          </div>
        </section>

        <section className="ww-section ww-contact-section" id="contact">
          <div className="ww-shell">
            <div className="ww-contact-wrap">
              <div className="ww-contact-left">
                <span>Contact Info</span>
                <h2>Let’s arrange your vehicle smoothly</h2>
                <p>
                  Reach out for vehicle rentals, airport transfers, city tours,
                  day tours, round trips, safaris, whale watching, and beach
                  getaways.
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
                    <span>wwtravelandtour@gmail.com</span>
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
                  placeholder="Tell us about your vehicle rental or travel plans..."
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