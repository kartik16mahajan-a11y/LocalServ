import { Link } from 'react-router-dom';
import { SERVICES_DATA, CITIES } from '../../data/servicesData';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-root">
      <div className="container">
        <div className="footer-partner-banner">
          <div className="partner-banner-text">
            <span className="partner-badge">💼 Service Provider Network</span>
            <h3>Are you a certified electrician, chef, plumber, or technician?</h3>
            <p>Join 1,200+ top service professionals earning consistent income with guaranteed weekly payouts.</p>
          </div>
          <button type="button" className="partner-cta-btn" disabled>
            Provider Sign In & Registration →
          </button>
        </div>

        <div className="footer-main-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand">
              <span className="brand-icon">⭐</span>
              <span className="brand-title">Local<span className="brand-grad">Serv</span></span>
            </Link>
            <p className="footer-bio">
              India's premier on-demand marketplace for trusted local trade and household services. Quality-checked, transparent pricing, and instant doorstep booking.
            </p>
            <div className="footer-trust-tags">
              <span className="trust-pill">🛡️ 100% Verified</span>
              <span className="trust-pill">⚡ 30-Min Fast Dispatch</span>
              <span className="trust-pill">💳 Secure UPI / Card</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Popular Services</h4>
            <ul className="footer-links-list">
              {SERVICES_DATA.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <Link to="/services">{srv.icon} {srv.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Explore Pages</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">All Service Categories</Link></li>
              <li><Link to="/bookings">My Bookings</Link></li>
              <li><Link to="/plans">Membership Plans & Combos</Link></li>
              <li><Link to="/profile/provider">Provider Profile</Link></li>
              <li><Link to="/profile/consumer">Consumer Profile</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Available Cities</h4>
            <div className="footer-cities-chips">
              {CITIES.map((city) => (
                <span key={city.id} className="footer-city-tag">📍 {city.name}</span>
              ))}
            </div>

            <h4 className="footer-col-title footer-col-title-spaced">Check Availability In Your City</h4>
            <div className="footer-subscribe-form">
              <input type="text" placeholder="Enter your city" disabled />
              <button type="button" disabled>Check</button>
            </div>

            <h4 className="footer-col-title footer-col-title-spaced">Service Discounts & Updates</h4>
            <div className="footer-subscribe-form">
              <input type="email" placeholder="Enter your email" disabled />
              <button type="button" disabled>Join</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} LocalServ Technologies Pvt Ltd. All rights reserved. • Frontend Engineering Project (FEE)
          </p>
          <div className="legal-links">
            <span>Privacy Policy</span><span className="dot">•</span>
            <span>Terms of Service</span><span className="dot">•</span>
            <span>Security & Background Check</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
