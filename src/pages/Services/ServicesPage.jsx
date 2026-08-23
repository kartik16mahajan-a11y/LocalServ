import { useState, useMemo } from 'react';
import { SERVICES_DATA, CATEGORY_FILTERS } from '../../data/servicesData';
import './ServicesPage.css';

function ServicesPage({ onBookCategory }) {
  const [activeGroup, setActiveGroup] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');


  // Filter and sort services
  const displayedServices = useMemo(() => {
    let list = SERVICES_DATA.filter((srv) => {
      const matchGroup = activeGroup === 'all' || srv.filterGroup === activeGroup;
      const query = searchTerm.toLowerCase().trim();
      const matchSearch =
        query === '' ||
        srv.title.toLowerCase().includes(query) ||
        srv.tagline.toLowerCase().includes(query) ||
        srv.description.toLowerCase().includes(query);

      return matchGroup && matchSearch;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: Popular first
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [activeGroup, searchTerm, sortBy]);

  return (
    <div className="services-page-root">
      {/* Page Header */}
      <div className="services-page-header">
        <div className="container">
          <span className="section-badge">🛠️ Complete Service Directory</span>
          <h1 className="section-title">All 20 Professional Services</h1>
          <p className="section-subtitle">
            Hire background-checked electricians, plumbers, chefs, tutors, and technicians with guaranteed upfront pricing.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Controls Card (Search, Filter, Sort) */}
        <div className="services-controls-card">
          <div className="search-and-sort-row">
            <div className="services-search-input-wrap">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search across all 20 categories (e.g., electrician, cleaning, chef, tailor)..."
                value={searchTerm}
                disabled
              />
              {searchTerm && (
                <button
                  type="button"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  disabled
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sort-select-wrap">
              <label htmlFor="sort-select">Sort By:</label>
              <select
                id="sort-select"
                value={sortBy}
                disabled
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Group Filter Chips */}
          <div className="service-filter-chips">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-chip-btn ${activeGroup === f.id ? 'active' : ''}`}
                disabled
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          Showing <strong>{displayedServices.length}</strong> of 20 verified services
        </div>

        {/* All Services Grid */}
        {displayedServices.length > 0 ? (
          <div className="services-grid-all">
            {displayedServices.map((srv) => (
              <div key={srv.id} className="full-service-card">
                <div className="service-card-top-row">
                  <div className="service-avatar-box">{srv.icon}</div>
                  <span className="eta-badge">⏱️ {srv.eta}</span>
                </div>

                <h3 className="full-service-title">{srv.title}</h3>
                <p className="full-service-tagline">{srv.tagline}</p>
                <p className="full-service-desc">{srv.description}</p>

                <div className="service-badges-row">
                  {srv.badges.map((b, i) => (
                    <span key={i} className="badge-tag-sm">
                      ✓ {b}
                    </span>
                  ))}
                </div>

                <div className="full-card-footer">
                  <div className="service-price-block">
                    <span className="price-caption">Starting At</span>
                    <span className="price-amount">
                      ₹{srv.startingPrice} <span className="price-unit-tag">/{srv.priceUnit}</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="book-now-btn"
                    disabled
                  >
                    Book Pro
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <span style={{ fontSize: '3rem', display: 'block' }}>🔍</span>
            <h3 style={{ fontSize: '1.3rem', marginTop: '0.5rem' }}>No services found</h3>
            <p style={{ color: '#64748b', marginTop: '0.3rem' }}>Try clearing your search term or selecting another category filter.</p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              disabled
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
