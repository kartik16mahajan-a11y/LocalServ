import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA, CITIES } from '../../data/servicesData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { isEmail } from '../../utils/validators';
import './Footer.css';

function Footer() {
  const { currentUser, openAuth } = useAuth();
  const { showToast } = useToast();

  const [cityInput, setCityInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  // Check if the typed city is one of our cities
  const handleCityCheck = (e) => {
    e.preventDefault();
    const text = cityInput.trim().toLowerCase();
    if (!text) {
      showToast('Please enter your city.', 'error');
      return;
    }
    const found = CITIES.find((c) => c.name.toLowerCase().includes(text) || text.includes(c.name.toLowerCase().split(' ')[0]));
    if (found) showToast(`Good news! LocalServ is available in ${found.name}.`);
    else showToast('Sorry, we are not in that city yet. Coming soon!', 'info');
    setCityInput('');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!isEmail(emailInput)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed! You will receive our latest offers.');
    setEmailInput('');
  };

  return (
    <footer className="footer-root">
      <div className="container">
        {/* Provider call-to-action: hidden for logged-in providers */}
        {currentUser?.role !== 'provider' && (
          <div className="footer-partner-banner">
            <div className="partner-banner-text">
              <span className="partner-badge">Service Provider Network</span>
              <h3>Are you a certified electrician, chef, plumber, or technician?</h3>
              <p>Join 1,200+ top service professionals earning consistent income with guaranteed weekly payouts.</p>
            </div>
            <button type="button" className="partner-cta-btn" onClick={() => openAuth('signup', 'provider')}>
              Join as a Provider →
            </button>
          </div>
        )}

        <div className="footer-main-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand">
              <span className="brand-icon">LS</span>
              <span className="brand-title">Local<span className="brand-grad">Serv</span></span>
            </Link>
            <p className="footer-bio">
              India's on-demand marketplace for trusted local trade and household services. Quality-checked, transparent pricing, and instant doorstep booking.
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
                  <Link to={`/services?search=${encodeURIComponent(srv.title)}`}>{srv.icon} {srv.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Explore Pages</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">All Service Categories</Link></li>
              <li><Link to="/plans">Membership Plans & Combos</Link></li>
              <li><Link to="/reviews">Customer Reviews</Link></li>
              {currentUser?.role === 'user' && <li><Link to="/bookings">My Bookings</Link></li>}
              {currentUser && <li><Link to={currentUser.role === 'provider' ? '/provider' : '/profile'}>My Account</Link></li>}
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
            <form className="footer-subscribe-form" onSubmit={handleCityCheck}>
              <input type="text" placeholder="Enter your city" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
              <button type="submit">Check</button>
            </form>

            <h4 className="footer-col-title footer-col-title-spaced">Service Discounts & Updates</h4>
            <form className="footer-subscribe-form" onSubmit={handleSubscribe} noValidate>
              <input type="email" placeholder="Enter your email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              <button type="submit">Join</button>
            </form>
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
