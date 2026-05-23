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
    tag: "Trip Planning + Vehicle Rental",
    description:
      "Plan your Sri Lanka journey with airport transfers, private tours, vehicle rentals, safaris, beach trips, and full island travel support.",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    tag: "Rent a Vehicle in Sri Lanka",
    description:
      "Choose mini cars, hatchbacks, and sedans for daily travel, airport pickup, private journeys, or comfortable island trips.",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    tag: "Complete Sri Lanka Travel Support",
    description:
      "From airport transfers to custom tours and vehicle rental, W&W Travels helps arrange your journey from start to finish.",
    image: "/hero3.jpg",
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
    title: "Reliable Travel Support",
    text: "Friendly local support for vehicle rental, airport transfers, and trip planning.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Easy Booking",
    text: "Simple enquiry process for vehicle rent, airport transfers, tours, and full trip plans.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe Travel",
    text: "Clean vehicles, careful drivers, and comfortable travel arrangements.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Islandwide Coverage",
    text: "Airport, beaches, hill country, cultural sites, and wildlife destinations.",
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
            backgroundImage: `linear-gradient(90deg, rgba(6,14,28,0.86) 0%, rgba(6,14,28,0.62) 48%, rgba(6,14,28,0.2) 100%), url(${currentHero.image})`,
          }}
        >
          <div className="ww-hero-overlay" />

          <div className="ww-shell">
            <div className="ww-hero-center">
              <span className="ww-hero-badge">
                W&amp;W Travels • Sri Lanka Travel & Vehicle Rental
              </span>

              <p className="ww-hero-mini">{currentHero.tag}</p>

              <h1>
                Rent Vehicles,
                <span>Plan Trips and</span>
                <span>Explore Sri Lanka</span>
              </h1>

              <p className="ww-hero-text">{currentHero.description}</p>

              <div className="ww-hero-buttons">
                <a href="/rent" className="ww-btn-gold">
                  <FaCar /> Rent Vehicle
                </a>

                <a href="/login" className="ww-btn-primary">
                  <FaRoute /> Plan Your Trip
                </a>

                <a href="#services" className="ww-btn-secondary">
                  View Services
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
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="destinations" className="ww-section ww-destinations-section">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Sri Lankan Destinations</span>
              <h2>Places You Can Explore</h2>
              <p>
                Explore Sri Lanka with flexible trip planning, airport transfers,
                and vehicle rental support.
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

        <section className="ww-section ww-rent-highlight" id="vehicle-rent">
          <div className="ww-shell">
            <div className="ww-rent-box">
              <div className="ww-rent-content">
                <span>Vehicle Rental</span>
                <h2>Rent a Vehicle or Plan Your Full Sri Lanka Trip</h2>
                <p>
                  W&amp;W Travels helps both local and foreign customers with
                  simple vehicle rentals and complete Sri Lanka trip planning.
                  Choose a mini car, hatchback, or sedan for comfortable travel,
                  or let us arrange your full journey with tours, airport
                  transfers, safaris, and beach getaways.
                </p>

                <div className="ww-rent-features">
                  <div><FaCheckCircle /> Mini Cars, Hatchbacks & Sedans</div>
                  <div><FaCheckCircle /> Self Drive for Sri Lankan Customers</div>
                  <div><FaCheckCircle /> Driver Service for Foreign Customers</div>
                  <div><FaCheckCircle /> Trip Planning + Vehicle Support</div>
                </div>

                <div className="ww-rent-actions">
                  <a href="/rent" className="ww-btn-gold">
                    <FaCar /> Rent a Vehicle
                  </a>

                  <a href="/login" className="ww-btn-primary">
                    <FaRoute /> Plan a Trip
                  </a>
                </div>
              </div>

              <div className="ww-rent-cards">
                <article>
                  <h3>Mini Cars</h3>
                  <p>Alto • Nano • Wagon R</p>
                  <span>Best for city travel and budget trips.</span>
                </article>

                <article>
                  <h3>Hatchbacks</h3>
                  <p>Aqua • Honda Fit • Spacia</p>
                  <span>Fuel efficient and comfortable for small groups.</span>
                </article>

                <article>
                  <h3>Sedans</h3>
                  <p>Prius • Axio • Insight</p>
                  <span>Better comfort for airport transfers and long trips.</span>
                </article>
              </div>
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
                <h2>Your trusted travel and vehicle rental partner in Sri Lanka</h2>
                <p>
                  W&amp;W Travels helps travelers arrange smooth, safe, and
                  memorable journeys across Sri Lanka. We support vehicle
                  rentals, airport transfers, city tours, day tours, island round
                  trips, wildlife safaris, whale watching trips, and beach
                  getaways.
                </p>
                <p>
                  Whether you need a vehicle for daily travel, one airport
                  transfer, a private tour, or a complete island travel plan, we
                  focus on comfort, punctuality, and friendly service.
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
                    <span>Islandwide travel planning and vehicle support</span>
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
                From vehicle rental to airport transfers, wildlife safaris, and
                beach getaways, we help you explore Sri Lanka with comfort.
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

        <section className="ww-section ww-light" id="why-choose-us">
          <div className="ww-shell">
            <div className="ww-title-block">
              <span>Why Us</span>
              <h2>Why Choose W&amp;W Travels</h2>
              <p>
                One website for both vehicle rental and complete Sri Lanka trip
                planning.
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
              <h2>Need a Vehicle or Trip Plan?</h2>
              <p>
                Rent a vehicle, book an airport transfer, plan a day tour, or
                arrange a full Sri Lanka journey with W&amp;W Travels.
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
                <h2>Let’s arrange your vehicle or trip smoothly</h2>
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