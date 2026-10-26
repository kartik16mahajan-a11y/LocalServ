import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import './Navbar.css';

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

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function useOptionalAuth() {
  const ctx = useAuth();
  if (ctx && typeof ctx === 'object') {
    return {
      currentUser: ctx.currentUser ?? null,
      openAuth: ctx.openAuth ?? (() => {}),
      logout: ctx.logout ?? (() => {}),
    };
  }
  return { currentUser: null, openAuth: () => {}, logout: () => {} };
}

function useOptionalBookings() {
  const ctx = useData();
  if (ctx && Array.isArray(ctx.bookings)) return ctx.bookings;
  return [];
}

function useOptionalToast() {
  const toast = useToast();
  if (toast && typeof toast.showToast === 'function') return toast.showToast;
  if (typeof toast === 'function') return toast;
  return () => {};
}

function Navbar({ currentUser: currentUserProp = null, activeBookingsCount = 0 }) {
  const { currentUser: authUser, openAuth, logout } = useOptionalAuth();
  const bookings = useOptionalBookings();
  const showToast = useOptionalToast();
  const navigate = useNavigate();

  const currentUser = authUser ?? currentUserProp;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let navLinks = GUEST_LINKS;
  if (currentUser?.role === 'user') navLinks = USER_LINKS;
  if (currentUser?.role === 'provider') navLinks = PROVIDER_LINKS;

  const activeCount = currentUser
    ? bookings.filter((b) => b.userId === currentUser.id && (b.status === 'Pending' || b.status === 'Confirmed')).length
    : activeBookingsCount;

  const accountPath = currentUser?.role === 'provider' ? '/profile/provider' : '/profile/consumer';

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
