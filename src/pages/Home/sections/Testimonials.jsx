import { Link } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { SERVICES_DATA, TESTIMONIALS } from '../../../data/servicesData';

function Testimonials() {
  const data = useData();
  const liveReviews = data && Array.isArray(data.reviews) ? data.reviews : [];

  const latest = (liveReviews.length > 0 ? liveReviews : TESTIMONIALS)
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 3);

  const getServiceTitle = (review) => {
    if (review.service) return review.service;
    return SERVICES_DATA.find((s) => s.id === review.serviceId)?.title || 'Service';
  };

  return (
    <section className="testimonials-section section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Client Feedback</span>
          <h2 className="section-title">Loved by 50,000+ Happy Customers</h2>
          <p className="section-subtitle">
            Real reviews from homeowners, professionals and families.
          </p>
        </div>

        <div className="testimonials-grid">
          {latest.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="review-top-row">
                <span className="rating-badge">{review.rating}/5</span>
                <span className="review-date">{review.date}</span>
              </div>

              <p className="review-text">"{review.comment}"</p>

              <div className="review-author-wrap">
                <div className="author-avatar">{review.name.charAt(0)}</div>
                <div>
                  <h4 className="author-name">{review.name}</h4>
                  <div className="author-role">{review.role}</div>
                  <span className="booked-service-tag">{getServiceTitle(review)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-services-bar">
          <Link to="/reviews" className="view-all-services-btn">
            <span>Read all reviews</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
