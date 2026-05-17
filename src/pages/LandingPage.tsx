import { useEffect, useState } from "react";
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
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../components/Footer";
import "./LandingPage.css";

const heroSlides = [
  {
    id: 1,
    tag: "Airport Transfer",
    description:
      "Premium airport pickups, drop-offs, day tours, round trips, safaris, and beach getaways across Sri Lanka.",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    tag: "Sri Lanka Tours",
    description:
      "Explore wildlife, beaches, whale watching, turtle breeding points, crocodile watching, and island round trips.",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    tag: "Complete Trip Planning",
    description:
      "From airport transfers to custom tours, we help arrange your Sri Lanka journey from start to finish.",
    image: "/hero3.jpg",
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
    text: "Simple enquiry process for airport transfers, tours, and full trip plans.",
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

const destinations = [
  {
    title: "Sigiriya",
    description: "Ancient rock fortress with beautiful views and history.",
    image: "/destinations/sigiriya.jpg",
  },
  {
    title: "Ella",
    description: "Hill country destination with waterfalls, tea fields, and Nine Arch Bridge.",
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentHero = heroSlides[activeSlide];

  return (
    <>
      <Navbar />

      <main className="ww-landing">
        <section
          id="home"
          className="ww-hero-structure"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(6,14,28,0.84) 0%, rgba(6,14,28,0.62) 48%, rgba(6,14,28,0.18) 100%), url(${currentHero.image})`,
          }}
        >
          <div className="ww-hero-overlay" />

          <div className="ww-shell">
            <div className="ww-hero-center">
              <span className="ww-hero-badge">
                W&amp;W Travels • Sri Lanka Trip Planner
              </span>

              <p className="ww-hero-mini">{currentHero.tag}</p>

              <h1>
                Airport Transfers,
                <span>Private Tours and</span>
                <span>Sri Lanka Adventures</span>
              </h1>

              <p className="ww-hero-text">{currentHero.description}</p>

              <div className="ww-hero-buttons">
                <a href="booking" className="ww-btn-primary">
                  Book Your Trip
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

        <section id="about" className="ww-section ww-about-section">
          <div className="ww-shell">
            <div className="ww-about-layout">
              <div className="ww-about-image">
                <img src="/about.jpg" alt="About W&W Travels" />
              </div>

              <div className="ww-about-content">
                <span>About Us</span>
                <h2>Your trusted travel partner in Sri Lanka</h2>
                <p>
                  W&amp;W Travels helps travelers arrange smooth, safe, and
                  memorable trips across Sri Lanka. We provide airport pickups,
                  airport drop-offs, city tours, day tours, island round trips,
                  wildlife safaris, whale watching trips, crocodile watching,
                  turtle breeding point visits, and beach getaways.
                </p>
                <p>
                  Whether you need one airport transfer, a private tour, or a
                  complete island travel plan, we focus on comfort, punctuality,
                  and friendly service.
                </p>

                <div className="ww-about-points">
                  <div>
                    <FaCheckCircle />
                    <span>Professional drivers and clean vehicles</span>
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

        <section id="destinations" className="ww-section ww-destinations-section">
  <div className="ww-shell">
    <div className="ww-title-block">
      <span>Sri Lankan Destinations</span>
      <h2>Places You Can Explore</h2>
      <p>
        Discover beautiful destinations across Sri Lanka with comfortable
        transport and custom travel planning.
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

            <a href="/destinations" className="ww-see-more-btn">
              See More <FaArrowRight />
            </a>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

        <section className="ww-cta-section">
          <div className="ww-shell">
            <div className="ww-cta-box">
              <h2>Plan Your Sri Lanka Journey Today</h2>
              <p>
                Need an airport pickup, day tour, wildlife safari, whale watching
                trip, or full island round trip? Contact us and we will help
                arrange your journey.
              </p>
              <a
                href="https://wa.me/94771234567"
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
        </section>

        <section className="ww-section ww-contact-section" id="contact">
          <div className="ww-shell">
            <div className="ww-contact-wrap">
              <div className="ww-contact-left">
                <span>Contact Info</span>
                <h2>Let’s arrange your next trip smoothly</h2>
                <p>
                  Reach out for airport transfers, city tours, day tours, round
                  trips, safaris, whale watching, turtle breeding points, and
                  beach getaways.
                </p>

                <div className="ww-contact-list">
                  <div>
                    <strong>
                      <FaPhoneAlt /> Phone
                    </strong>
                    <span>+94 77 123 4567</span>
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
                    <span>Colombo, Sri Lanka</span>
                  </div>
                </div>
              </div>

              <form className="ww-contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <input type="text" placeholder="Phone Number" />
                <textarea
                  rows={6}
                  placeholder="Tell us about your travel plans..."
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