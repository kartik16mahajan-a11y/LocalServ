import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES_DATA, CATEGORY_FILTERS } from '../../data/servicesData';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/format';
import './ServicesPage.css';

function ServicesPage() {
  const { currentUser, openAuth, updateUser } = useAuth();
  const { startBooking } = useData();
  const { showToast } = useToast();

  // The hero search box sends text in the URL: /services?search=plumber
  const [searchParams] = useSearchParams();

  const [activeGroup, setActiveGroup] = useState('all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);
  const sortOptions = [
    { value: 'popular', label: 'Most Popular', detail: 'Featured services first' },
    { value: 'price-asc', label: 'Price: Low to High', detail: 'Budget-friendly first' },
    { value: 'price-desc', label: 'Price: High to Low', detail: 'Premium services first' },
    { value: 'rating', label: 'Highest Rated', detail: 'Top customer ratings first' },
  ];
  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) setSortMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSortMenuOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  // Search + filter + sort. useMemo recalculates only when one of the
  // three values changes.
  const displayedServices = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    const list = SERVICES_DATA.filter((srv) => {
      const matchGroup = activeGroup === 'all' || srv.filterGroup === activeGroup;
      const matchSearch =
        query === '' ||
        srv.title.toLowerCase().includes(query) ||
        srv.tagline.toLowerCase().includes(query) ||
        srv.description.toLowerCase().includes(query);
      return matchGroup && matchSearch;
    });

    if (sortBy === 'price-asc') list.sort((a, b) => a.startingPrice - b.startingPrice);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.startingPrice - a.startingPrice);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => Number(b.popular) - Number(a.popular));

    return list;
  }, [activeGroup, searchTerm, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setActiveGroup('all');
    setSortBy('popular');
  };

  // Heart button: save / remove a service from the user's favourites
  const toggleFavourite = (serviceId) => {
    if (!currentUser) {
      showToast('Login to save services.', 'info');
      openAuth('login', 'user');
      return;
    }
    if (currentUser.role !== 'user') return;

    const saved = currentUser.favourites || [];
    const isSaved = saved.includes(serviceId);
    updateUser({ favourites: isSaved ? saved.filter((id) => id !== serviceId) : [...saved, serviceId] });
    showToast(isSaved ? 'Removed from saved services.' : 'Saved to your account.', 'info');
  };

  const showHearts = !currentUser || currentUser.role === 'user';

  return (
    <div className="services-page-root">
      <div className="services-page-header">
        <div className="container">
          <span className="section-badge">Service Directory</span>
          <h1 className="section-title">All {SERVICES_DATA.length} Professional Services</h1>
          <p className="section-subtitle">
            Hire background-checked electricians, plumbers, chefs, tutors and technicians with upfront pricing.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="services-controls-card">
          <div className="search-and-sort-row">
            <div className="services-search-input-wrap">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search services (e.g. electrician, cleaning, chef, tailor)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button type="button" className="clear-search-btn" onClick={() => setSearchTerm('')} aria-label="Clear search">✕</button>
              )}
            </div>

            <div className="sort-select-wrap" ref={sortMenuRef}>
              <label id="sort-select-label">Sort By</label>
              <div className="sort-dropdown">
                <button
                  type="button"
                  className={`sort-dropdown-trigger ${sortMenuOpen ? 'is-open' : ''}`}
                  aria-labelledby="sort-select-label"
                  aria-haspopup="listbox"
                  aria-expanded={sortMenuOpen}
                  onClick={() => setSortMenuOpen((open) => !open)}
                >
                  <span className="sort-trigger-icon" aria-hidden="true">↕</span>
                  <span className="sort-trigger-value">{sortOptions.find((option) => option.value === sortBy)?.label}</span>
                  <svg className="sort-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {sortMenuOpen && (
                  <div className="sort-dropdown-menu" role="listbox" aria-labelledby="sort-select-label">
                    <span className="sort-menu-eyebrow">SORT SERVICES</span>
                    {sortOptions.map((option) => (
                      <button
                        type="button"
                        role="option"
                        aria-selected={sortBy === option.value}
                        key={option.value}
                        className={`sort-dropdown-option ${sortBy === option.value ? 'selected' : ''}`}
                        onClick={() => { setSortBy(option.value); setSortMenuOpen(false); }}
                      >
                        <span className="sort-option-copy">
                          <span className="sort-option-label">{option.label}</span>
                          <span className="sort-option-detail">{option.detail}</span>
                        </span>
                        {sortBy === option.value && <span className="sort-option-check" aria-hidden="true">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="service-filter-chips">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-chip-btn ${activeGroup === f.id ? 'active' : ''}`}
                onClick={() => setActiveGroup(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="results-count">
          Showing <strong>{displayedServices.length}</strong> of {SERVICES_DATA.length} verified services
        </div>

        {displayedServices.length > 0 ? (
          <div className="services-grid-all">
            {displayedServices.map((srv) => {
              const isSaved = currentUser?.favourites?.includes(srv.id);
              return (
                <div key={srv.id} className="full-service-card">
                  <div className="service-card-top-row">
                    <div className="service-avatar-box">{srv.icon}</div>
                    <div className="card-top-right">
                      <span className="eta-badge">{srv.eta}</span>
                      {showHearts && (
                        <button
                          type="button"
                          className={`heart-btn ${isSaved ? 'saved' : ''}`}
                          onClick={() => toggleFavourite(srv.id)}
                          aria-label={isSaved ? 'Remove from saved' : 'Save service'}
                        >
                          {isSaved ? '♥' : '♡'}
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="full-service-title">{srv.title}</h3>
                  <p className="full-service-tagline">{srv.tagline}</p>
                  <p className="full-service-desc">{srv.description}</p>

                  <div className="service-badges-row">
                    {srv.badges.map((b) => (
                      <span key={b} className="badge-tag-sm">✓ {b}</span>
                    ))}
                  </div>

                  <div className="service-rating-line">
                    <span className="rating-badge">{srv.rating}/5</span>
                    <span>{srv.reviewsCount.toLocaleString('en-IN')} bookings rated</span>
                  </div>

                  <div className="full-card-footer">
                    <div className="service-price-block">
                      <span className="price-caption">Starting At</span>
                      <span className="price-amount">
                        {formatPrice(srv.startingPrice)} <span className="price-unit-tag">/{srv.priceUnit}</span>
                      </span>
                    </div>
                    <button type="button" className="book-now-btn" onClick={() => startBooking(srv)}>
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No services found</h3>
            <p>Try clearing your search term or selecting another category.</p>
            <button type="button" className="btn btn-primary" onClick={resetFilters}>Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
