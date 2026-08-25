import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Global sticky navbar.
 *
 * Only navigation (routing between pages) lives here — actions that belong
 * to a specific page (sign out, availability status, dashboard tabs, city
 * selection) live on that page instead, so the navbar stays short and the
 * same across every screen size.
 */
function Navbar({ currentUser = null, activeBookingsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow once the page has scrolled past the top.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProvider = false;
  const isConsumer = false;

  // Providers manage everything (dashboard / requests / active jobs) from
  // tabs inside the Provider Dashboard page itself, so the navbar shows no
  // links for them at all — just the brand and their profile pill.
  const guestLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'My Bookings', path: '/bookings', badge: activeBookingsCount },
    { label: 'Plans & Combos', path: '/plans' },
  ];

  const consumerLinks = guestLinks;
  const navLinks = isProvider ? [] : isConsumer ? consumerLinks : guestLinks;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-logo-icon">⭐</span>
          <span className="brand-name">Local<span className="brand-accent">Serv</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
          <ul className="nav-link-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                  end={link.path === '/'}
                >
                  {link.label}
                  {link.badge > 0 && (
                    <span className="nav-badge-count">{link.badge}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link to="/profile/consumer" className="profile-nav-btn consumer-profile-btn">
            👤 User Profile
          </Link>
          <Link to="/profile/provider" className="profile-nav-btn provider-profile-btn">
            🧰 Provider Profile
          </Link>

          <button type="button" className="auth-btn" disabled>
            Sign In / Register
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navLinks.length > 0 && (
            <ul className="mobile-links-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    end={link.path === '/'}
                  >
                    {link.label}
                    {link.badge > 0 && <span className="nav-badge-count">{link.badge}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          <div className="mobile-drawer-actions">
            <Link to="/profile/consumer" onClick={closeMobileMenu} className="btn btn-secondary w-full">
              👤 User Profile
            </Link>
            <Link to="/profile/provider" onClick={closeMobileMenu} className="btn btn-primary w-full">
              🧰 Provider Profil
            </Link>
            <button type="button" className="btn btn-secondary w-full" disabled>
              Sign In / Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
