import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaMapMarkedAlt,
  FaConciergeBell,
  FaInfoCircle,
  FaCheckCircle,
  FaEnvelope,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="lpnav">
        <div className="lpnav-shell">
          <div className="lpnav-left">
            <Link to="/" className="lpnav-brand" onClick={closeMenu}>
              <img src="/logo.png" alt="W&W Travels" className="lpnav-logo-img" />
              <div className="lpnav-brand-text">
                <strong>W&amp;W Travels</strong>
                <span>Sri Lanka Tours</span>
              </div>
            </Link>
          </div>

          <nav className="lpnav-links">
            <a href="#home" className="lpnav-link-item">
              <FaHome />
              <span>Home</span>
            </a>

            <a href="#destinations" className="lpnav-link-item">
              <FaMapMarkedAlt />
              <span>Destinations</span>
            </a>

            <a href="#services" className="lpnav-link-item">
              <FaConciergeBell />
              <span>Services</span>
            </a>

            <a href="#about" className="lpnav-link-item">
              <FaInfoCircle />
              <span>About</span>
            </a>

            <a href="#why-choose-us" className="lpnav-link-item">
              <FaCheckCircle />
              <span>Why Choose Us</span>
            </a>

            <a href="#contact" className="lpnav-link-item">
              <FaEnvelope />
              <span>Contact</span>
            </a>
          </nav>

          <div className="lpnav-right">
            <Link to="/login" className="lpnav-login-btn">
              Login
            </Link>

            <button
              type="button"
              className="lpnav-mobile-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      <div className={`lpnav-mobile-overlay ${menuOpen ? "show" : ""}`}>
        <div className={`lpnav-mobile-panel ${menuOpen ? "show" : ""}`}>
          <div className="lpnav-mobile-top">
            <div className="lpnav-mobile-brand">
              <img src="/logo.png" alt="W&W Travels" className="lpnav-mobile-logo" />
              <div>
                <strong>W&amp;W Travels</strong>
                <span>Sri Lanka Tours</span>
              </div>
            </div>

            <button
              type="button"
              className="lpnav-mobile-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="lpnav-mobile-links">
            <a href="#home" className="lpnav-mobile-link" onClick={closeMenu}>
              <FaHome />
              <span>Home</span>
            </a>

            <a
              href="#destinations"
              className="lpnav-mobile-link"
              onClick={closeMenu}
            >
              <FaMapMarkedAlt />
              <span>Destinations</span>
            </a>

            <a href="#services" className="lpnav-mobile-link" onClick={closeMenu}>
              <FaConciergeBell />
              <span>Services</span>
            </a>

            <a href="#about" className="lpnav-mobile-link" onClick={closeMenu}>
              <FaInfoCircle />
              <span>About</span>
            </a>

            <a
              href="#why-choose-us"
              className="lpnav-mobile-link"
              onClick={closeMenu}
            >
              <FaCheckCircle />
              <span>Why Choose Us</span>
            </a>

            <a href="#contact" className="lpnav-mobile-link" onClick={closeMenu}>
              <FaEnvelope />
              <span>Contact</span>
            </a>
          </div>

          <Link to="/login" className="lpnav-mobile-login-btn" onClick={closeMenu}>
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Vehicles", href: "#vehicles" },
  { label: "Why Us", href: "#why-choose-us" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="lpnav">
        <div className="lpnav-shell">
          <Link to="/" className="lpnav-brand" onClick={closeMenu}>
            <img src="/logo.png" alt="W&W Travels" className="lpnav-logo-img" />
            <div className="lpnav-brand-text">
              <strong>W&amp;W Travels</strong>
              <span>Sri Lanka private travel</span>
            </div>
          </Link>

          <nav className="lpnav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a href={link.href} className="lpnav-link-item" key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="lpnav-right">
            <a href="https://wa.me/94701097969" target="_blank" rel="noopener noreferrer" className="lpnav-help-link">
              WhatsApp
            </a>
            <Link to="/login" className="lpnav-login-btn">
              Book Now
            </Link>

            <button
              type="button"
              className="lpnav-mobile-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      <div className={`lpnav-mobile-overlay ${menuOpen ? "show" : ""}`} onClick={closeMenu}>
        <aside className={`lpnav-mobile-panel ${menuOpen ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className="lpnav-mobile-top">
            <div className="lpnav-mobile-brand">
              <img src="/logo.png" alt="W&W Travels" className="lpnav-mobile-logo" />
              <div>
                <strong>W&amp;W Travels</strong>
                <span>Vehicles, transfers and tours</span>
              </div>
            </div>

            <button
              type="button"
              className="lpnav-mobile-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="lpnav-mobile-note">
            Book a private vehicle with driver for airport transfers, city tours, safaris, beach trips and island round trips.
          </div>

          <div className="lpnav-mobile-links">
            {navLinks.map((link) => (
              <a href={link.href} className="lpnav-mobile-link" key={link.label} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>

          <Link to="/login" className="lpnav-mobile-login-btn" onClick={closeMenu}>
            Start Booking
          </Link>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
