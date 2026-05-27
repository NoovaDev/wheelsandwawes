import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h3>W&W Travels</h3>
          <p>
            A decade of excellence in the tourism industry serving thousands of
            happy customers.
          </p>

          <div className="social-icons">
            <a href="https://www.instagram.com/wwtravels.lk/" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/wwtravels.lk" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://wa.me/94701097969" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><a href="#services">Airport Pickup</a></li>
            <li><a href="#services">Custom Tours</a></li>
            <li><a href="#services">Rent a Car</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>123, Galle Road, Moratuwa</p>
          <p>+94701097969</p>
          <p>wwtravelandtour@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 W&W Travels. All rights reserved. | Developed by NoovaDev</p>
      </div>
    </footer>
  );
};

export default Footer;