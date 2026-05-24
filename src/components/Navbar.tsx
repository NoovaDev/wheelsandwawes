import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronRight, FaWhatsapp } from "react-icons/fa";
import "./Navbar.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Vehicles", href: "#vehicle-types" },
  { label: "Trip Options", href: "#trip-types" },
  { label: "Popular Routes", href: "#popular-routes" },
  { label: "About", href: "#about" },
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
              <span>Private Transport • Sri Lanka</span>
            </div>
          </Link>

          <nav className="lpnav-links" aria-label="Main navigation">
            {navLinks.map((item) => (
              <a href={item.href} className="lpnav-link-item" key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="lpnav-right">
            <a
              href="https://wa.me/94701097969"
              target="_blank"
              rel="noopener noreferrer"
              className="lpnav-whatsapp"
              aria-label="Contact W&W Travels on WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <Link to="/login" className="lpnav-login-btn">
              Book Now
              <FaChevronRight />
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

      <div
        className={`lpnav-mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      >
        <aside
          className={`lpnav-mobile-panel ${menuOpen ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="lpnav-mobile-top">
            <div className="lpnav-mobile-brand">
              <img src="/logo.png" alt="W&W Travels" className="lpnav-mobile-logo" />
              <div>
                <strong>W&amp;W Travels</strong>
                <span>Vehicle Booking &amp; Tours</span>
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
            Book airport transfers, private vehicles, tours, safaris, and beach trips across Sri Lanka.
          </div>

          <nav className="lpnav-mobile-links" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <a
                href={item.href}
                className="lpnav-mobile-link"
                onClick={closeMenu}
                key={item.label}
              >
                <span>{item.label}</span>
                <FaChevronRight />
              </a>
            ))}
          </nav>

          <div className="lpnav-mobile-actions">
            <Link to="/login" className="lpnav-mobile-login-btn" onClick={closeMenu}>
              Start Booking
            </Link>
            <a
              href="https://wa.me/94701097969"
              target="_blank"
              rel="noopener noreferrer"
              className="lpnav-mobile-whatsapp"
              onClick={closeMenu}
            >
              WhatsApp Us
            </a>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
