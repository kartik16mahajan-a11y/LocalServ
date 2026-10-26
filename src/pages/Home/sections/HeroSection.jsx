import { Link, useNavigate } from 'react-router-dom';

const POPULAR_SEARCHES = [
  { label: 'Electrician', icon: '⚡' },
  { label: 'Plumber', icon: '🔧' },
  { label: 'House Cleaning', icon: '🧹' },
  { label: 'AC Repair', icon: '❄️' },
  { label: 'Home Chef', icon: '👨‍🍳' },
];

function HeroSection() {
  const navigate = useNavigate();

  const handleQuickSearch = (term) => {
    navigate(`/services?search=${encodeURIComponent(term)}`);
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-orb hero-orb-1" />
      <div className="hero-bg-orb hero-orb-2" />
      <div className="hero-bg-orb hero-orb-3" />

      <div className="container">
        <div className="hero-inner">
          <div className="hero-trust-badge">
            <span className="trust-badge-dot" />
            <span>Verified local service professionals</span>
            <span className="trust-badge-sep">·</span>
            <span className="trust-badge-highlight">4.9★ avg rating</span>
          </div>

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

          <div className="hero-trending">
            <span className="popular-label">Trending services</span>
            <div className="hero-trending-grid">
              {POPULAR_SEARCHES.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="popular-tag"
                  onClick={() => handleQuickSearch(label)}
                >
                  <span className="popular-tag-icon">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hero-cta-links">
            <Link to="/services" className="hero-cta-btn hero-cta-primary">
              Browse All Services →
            </Link>
            <Link to="/reviews" className="hero-cta-btn hero-cta-ghost">
              Read Customer Reviews
            </Link>
          </div>

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