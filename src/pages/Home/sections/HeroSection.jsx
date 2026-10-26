import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICES_DATA, CITIES } from '../../../data/servicesData';

const POPULAR_SEARCHES = ['Electrician', 'Plumber', 'House Cleaning', 'AC Repair', 'Home Chef'];

function HeroSection() {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeCount] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const suggestions = query.length > 0
    ? SERVICES_DATA.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.tagline.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    const text = query.trim();
    navigate(text ? `/services?search=${encodeURIComponent(text)}` : '/services');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setShowSuggestions(false);
    navigate(`/services?search=${encodeURIComponent(title)}`);
  };

  const handleQuickSearch = (term) => {
    navigate(`/services?search=${encodeURIComponent(term)}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="hero-section">
      {/* Animated background orbs */}
      <div className="hero-bg-orb hero-orb-1" />
      <div className="hero-bg-orb hero-orb-2" />
      <div className="hero-bg-orb hero-orb-3" />

      <div className="container">
        <div className="hero-inner">
          {/* Trust badge */}
          <div className="hero-trust-badge">
            <span className="trust-badge-dot" />
            <span>Verified local service professionals</span>
            <span className="trust-badge-sep">·</span>
            <span className="trust-badge-highlight">4.9★ avg rating</span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            Trusted Help for Your Home,{' '}
            <span className="hero-title-highlight">
              Just a Booking Away
            </span>
          </h1>

          <p className="hero-description">
            Book background-checked electricians, plumbers, cleaners, chefs and
            tutors with fixed pricing and on-time arrival — across 5 cities.
          </p>

          {/* Search card */}
          <div className="hero-search-card">
            <form className="hero-search-form" onSubmit={handleSearch}>
              {/* City picker */}
              <div className="hero-city-select-wrap">
                <span className="hero-input-icon">📍</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="hero-city-select"
                  aria-label="Select city"
                >
                  <option value="">All Cities</option>
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="hero-search-divider" />

              {/* Autocomplete search */}
              <div className="hero-query-wrap" ref={inputRef}>
                <span className="hero-input-icon">🔍</span>
                <input
                  type="text"
                  placeholder="What do you need? e.g. plumber, cleaning..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  className="hero-query-input"
                  aria-label="Search services"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    className="hero-clear-btn"
                    onClick={() => { setQuery(''); setShowSuggestions(false); }}
                    aria-label="Clear"
                  >
                    ✕
                  </button>
                )}

                {/* Dropdown suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="hero-suggestions-dropdown">
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className="hero-suggestion-item"
                        onClick={() => handleSuggestionClick(s.title)}
                      >
                        <span className="suggestion-icon">{s.icon}</span>
                        <div className="suggestion-info">
                          <span className="suggestion-title">{s.title}</span>
                          <span className="suggestion-tagline">{s.tagline}</span>
                        </div>
                        <span className="suggestion-price">from ₹{s.startingPrice}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="hero-search-btn">
                <span>Search</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </form>

            {/* Popular tags */}
            <div className="hero-popular-searches">
              <span className="popular-label">Trending:</span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="popular-tag"
                  onClick={() => handleQuickSearch(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* CTA links */}
          <div className="hero-cta-links">
            <Link to="/services" className="hero-cta-btn hero-cta-primary">
              Browse All Services →
            </Link>
            <Link to="/reviews" className="hero-cta-btn hero-cta-ghost">
              Read Customer Reviews
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats-row">
            <div className="hero-stat">
              <strong>20+</strong>
              <span>Service Categories</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>1,200+</strong>
              <span>Verified Professionals</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>5</strong>
              <span>Cities Served</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>4.9★</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
