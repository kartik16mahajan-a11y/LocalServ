import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { getInitials } from '../../utils/format';
import './Navbar.css';

// Links shown for each type of visitor
const GUEST_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Plans & Combos', path: '/plans' },
  { label: 'Reviews', path: '/reviews' },
];

const USER_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'My Bookings', path: '/bookings', hasBadge: true },
  { label: 'Plans & Combos', path: '/plans' },
  { label: 'Reviews', path: '/reviews' },
];

const PROVIDER_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/provider' },
  { label: 'Reviews', path: '/reviews' },
];

function Navbar() {
  const { currentUser, openAuth, logout } = useAuth();
  const { bookings } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow once the page has scrolled.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Choose links according to who is logged in
  let navLinks = GUEST_LINKS;
  if (currentUser?.role === 'user') navLinks = USER_LINKS;
  if (currentUser?.role === 'provider') navLinks = PROVIDER_LINKS;

  // Badge on "My Bookings" = this user's active bookings
  const activeCount = currentUser
    ? bookings.filter((b) => b.userId === currentUser.id && (b.status === 'Pending' || b.status === 'Confirmed')).length
    : 0;

  const accountPath = currentUser?.role === 'provider' ? '/provider' : '/profile';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogin = () => {
    closeMobileMenu();
    openAuth('login', 'user');
  };

  const handleLogout = () => {
    closeMobileMenu();
    logout();
    navigate('/');
    showToast('You have been logged out.', 'info');
  };

  const renderLinks = (className) =>
    navLinks.map((link) => (
      <li key={link.label}>
        <NavLink
          to={link.path}
          end={link.path === '/'}
          onClick={closeMobileMenu}
          className={({ isActive }) => `${className} ${isActive ? 'active' : ''}`}
        >
          {link.label}
          {link.hasBadge && activeCount > 0 && <span className="nav-badge-count">{activeCount}</span>}
        </NavLink>
      </li>
    ));

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-logo-icon">LS</span>
          <span className="brand-name">Local<span className="brand-accent">Serv</span></span>
        </Link>

        <nav className="navbar-desktop-nav">
          <ul className="nav-link-list">{renderLinks('nav-link-item')}</ul>
        </nav>

        <div className="navbar-actions">
          {currentUser ? (
            <>
              <Link to={accountPath} className="user-badge-pill">
                <span className="user-badge-avatar">{getInitials(currentUser.name)}</span>
                <span className="user-badge-name">{currentUser.name.split(' ')[0]}</span>
              </Link>
              <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button type="button" className="auth-btn" onClick={handleLogin}>Login</button>
          )}

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

      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-links-list">{renderLinks('')}</ul>
          <div className="mobile-drawer-actions">
            {currentUser ? (
              <>
                <Link to={accountPath} onClick={closeMobileMenu} className="btn btn-secondary w-full">
                  {currentUser.role === 'provider' ? 'My Dashboard' : 'My Account'}
                </Link>
                <button type="button" className="btn btn-primary w-full" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button type="button" className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
