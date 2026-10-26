import { Link } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { SERVICES_DATA } from '../../../data/servicesData';
import { formatDate } from '../../../utils/format';

// Shows the 3 newest reviews from the shared reviews list.
// Reviews added on the Reviews page appear here automatically.
function Testimonials() {
  const { reviews } = useData();
  const latest = [...reviews].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  const getServiceTitle = (id) => SERVICES_DATA.find((s) => s.id === id)?.title || 'Service';

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
                <span className="review-date">{formatDate(review.date)}</span>
              </div>

              <p className="review-text">"{review.comment}"</p>

              <div className="review-author-wrap">
                <div className="author-avatar">{review.name.charAt(0)}</div>
                <div>
                  <h4 className="author-name">{review.name}</h4>
                  <div className="author-role">{review.role}</div>
                  <span className="booked-service-tag">{getServiceTitle(review.serviceId)}</span>
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
