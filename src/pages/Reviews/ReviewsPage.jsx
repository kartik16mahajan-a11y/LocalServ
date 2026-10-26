import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import RatingPicker from '../../components/RatingPicker';
import { SelectField, TextareaField } from '../../components/FormFields';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { formatDate, todayISO } from '../../utils/format';
import './ReviewsPage.css';

const serviceOptions = SERVICES_DATA.map((s) => ({ value: s.id, label: s.title }));
const getServiceTitle = (id) => SERVICES_DATA.find((s) => s.id === id)?.title || 'Service';

function ReviewsPage() {
  const { currentUser, openAuth } = useAuth();
  const { reviews, addReview, updateBooking } = useData();
  const { showToast } = useToast();

  // "Write Review" on the Bookings page sends the service id here
  const location = useLocation();
  const fromBooking = location.state;

  // ----- list filters -----
  const [serviceFilter, setServiceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // ----- review form -----
  const [form, setForm] = useState({ serviceId: fromBooking?.serviceId || '', rating: 0, comment: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.serviceId) newErrors.serviceId = 'Select the service you used.';
    if (!form.rating) newErrors.rating = 'Please give a rating.';
    const length = form.comment.trim().length;
    if (length < 15) newErrors.comment = 'Please write at least 15 characters.';
    else if (length > 400) newErrors.comment = 'Review is too long (max 400 characters).';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    addReview({
      id: `r-${Date.now()}`,
      userId: currentUser.id,
      name: currentUser.name,
      role: currentUser.address ? `Customer, ${currentUser.address.split(',')[0]}` : 'LocalServ customer',
      serviceId: form.serviceId,
      rating: form.rating,
      date: todayISO(),
      comment: form.comment.trim(),
    });

    // If the user came from a booking, mark that booking as reviewed
    if (fromBooking?.bookingId) updateBooking(fromBooking.bookingId, { reviewed: true });

    setForm({ serviceId: '', rating: 0, comment: '' });
    showToast('Thank you! Your review has been published.');
  };

  // ----- filtered + sorted list -----
  const visibleReviews = useMemo(() => {
    const list = reviews.filter(
      (r) =>
        (serviceFilter === 'all' || r.serviceId === serviceFilter) &&
        (ratingFilter === 'all' || r.rating === Number(ratingFilter))
    );
    if (sortBy === 'highest') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'lowest') list.sort((a, b) => a.rating - b.rating);
    else list.sort((a, b) => b.date.localeCompare(a.date));
    return list;
  }, [reviews, serviceFilter, ratingFilter, sortBy]);

  // ----- summary numbers (from all reviews) -----
  const total = reviews.length;
  const average = total ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : '0.0';
  const countFor = (n) => reviews.filter((r) => r.rating === n).length;

  const canWrite = currentUser?.role === 'user';

  return (
    <div className="reviews-page-root">
      <div className="reviews-page-header">
        <div className="container">
          <span className="section-badge">Customer Reviews</span>
          <h1 className="section-title">What our customers say</h1>
          <p className="section-subtitle">Honest feedback from people who booked services on LocalServ.</p>
        </div>
      </div>

      <div className="container">
        {/* Summary */}
        <div className="reviews-summary">
          <div className="summary-score">
            <span className="summary-score-number">{average}</span>
            <span className="summary-score-out">out of 5</span>
            <span className="summary-score-count">{total} reviews</span>
          </div>
          <div className="summary-bars">
            {[5, 4, 3, 2, 1].map((n) => (
              <div className="summary-bar-row" key={n}>
                <span>{n}</span>
                <div className="summary-bar-track">
                  <div className="summary-bar-fill" style={{ width: `${total ? (countFor(n) / total) * 100 : 0}%` }} />
                </div>
                <span className="summary-bar-count">{countFor(n)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reviews-layout">
          {/* Left: list */}
          <div className="reviews-list-col">
            <div className="reviews-filters">
              <SelectField label="Service" name="serviceFilter" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
                options={[{ value: 'all', label: 'All services' }, ...serviceOptions]} />
              <SelectField label="Rating" name="ratingFilter" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}
                options={[{ value: 'all', label: 'All ratings' }, ...[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} out of 5` }))]} />
              <SelectField label="Sort by" name="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                options={[
                  { value: 'newest', label: 'Newest first' },
                  { value: 'highest', label: 'Highest rated' },
                  { value: 'lowest', label: 'Lowest rated' },
                ]} />
            </div>

            <p className="results-count">Showing <strong>{visibleReviews.length}</strong> of {total} reviews</p>

            {visibleReviews.length === 0 ? (
              <div className="no-results"><h3>No reviews match these filters</h3></div>
            ) : (
              <div className="review-list">
                {visibleReviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card-top">
                      <div className="review-author-wrap">
                        <div className="author-avatar">{review.name.charAt(0)}</div>
                        <div>
                          <h4 className="author-name">{review.name}</h4>
                          <div className="author-role">{review.role}</div>
                        </div>
                      </div>
                      <div className="review-card-meta">
                        <span className="rating-badge">{review.rating}/5</span>
                        <span className="review-date">{formatDate(review.date)}</span>
                      </div>
                    </div>
                    <p className="review-card-text">{review.comment}</p>
                    <span className="booked-service-tag">{getServiceTitle(review.serviceId)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: submit review form */}
          <aside className="review-form-card">
            <h2>Write a review</h2>
            {canWrite ? (
              <form onSubmit={handleSubmit} noValidate>
                <SelectField label="Service used" name="serviceId" value={form.serviceId} onChange={handleChange}
                  error={errors.serviceId} options={serviceOptions} placeholder="Select a service" />

                <div className={`field ${errors.rating ? 'field-has-error' : ''}`}>
                  <label>Your rating</label>
                  <RatingPicker
                    value={form.rating}
                    onChange={(n) => { setForm({ ...form, rating: n }); setErrors({ ...errors, rating: '' }); }}
                  />
                  {errors.rating && <span className="field-error">{errors.rating}</span>}
                </div>

                <TextareaField label="Your review" name="comment" rows={5} value={form.comment} onChange={handleChange}
                  error={errors.comment} placeholder="Tell others about your experience..." />
                <div className="char-count">{form.comment.length}/400</div>

                <button type="submit" className="btn btn-primary w-full">Submit Review</button>
              </form>
            ) : (
              <div className="review-locked">
                <p>
                  {currentUser
                    ? 'Only customers can write reviews. Please use a user account.'
                    : 'Please login as a user to share your experience.'}
                </p>
                {!currentUser && (
                  <button type="button" className="btn btn-primary w-full" onClick={() => openAuth('login', 'user')}>
                    Login to write a review
                  </button>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
