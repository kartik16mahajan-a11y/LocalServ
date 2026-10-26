import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../../../data/servicesData';
import { useData } from '../../../context/DataContext';
import { formatPrice } from '../../../utils/format';

function ServicesPreview() {
  const { startBooking } = useData();

  // Only 4 popular services on the homepage keeps it clean
  const popularServices = SERVICES_DATA.filter((s) => s.popular).slice(0, 4);

  return (
    <section className="services-preview-section section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">On-Demand Services</span>
          <h2 className="section-title">Most Popular Professional Services</h2>
          <p className="section-subtitle">
            Instant booking for everyday repair, cleaning and lifestyle needs.
          </p>
        </div>

        <div className="preview-cards-grid">
          {popularServices.map((service) => (
            <div key={service.id} className="preview-card">
              <div className="preview-card-top">
                <div className="preview-icon-box">{service.icon}</div>
                <span className="preview-eta">{service.eta}</span>
              </div>

              <h3 className="preview-card-title">{service.title}</h3>
              <p className="preview-card-tagline">{service.tagline}</p>

              <div className="preview-card-footer">
                <div className="preview-pricing">
                  <span className="preview-price-label">Starts at</span>
                  <span className="preview-price-val">{formatPrice(service.startingPrice)}</span>
                </div>
                <button type="button" className="preview-book-btn" onClick={() => startBooking(service)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-services-bar">
          <Link to="/services" className="view-all-services-btn">
            <span>Explore all {SERVICES_DATA.length} services</span>
            <span>→</span>
          </Link>
        </div>

        <div className="home-plans-banner">
          <div className="plans-banner-text">
            <h3>Save up to 25% on every booking with Membership</h3>
            <p>Priority dispatch, zero inspection fees and extended damage cover.</p>
          </div>
          <Link to="/plans" className="plans-banner-btn">View Plans & Combos →</Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
