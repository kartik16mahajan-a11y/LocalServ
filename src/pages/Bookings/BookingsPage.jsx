import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { InputField, SelectField } from '../../components/FormFields';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { SERVICES_DATA, TIME_SLOTS } from '../../data/servicesData';
import { formatDate, formatPrice, todayISO } from '../../utils/format';
import './BookingsPage.css';

const TABS = [
  { id: 'all', label: 'All Bookings' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

// Does a booking belong to a tab?
const matchesTab = (booking, tab) => {
  if (tab === 'all') return true;
  if (tab === 'active') return booking.status === 'Pending' || booking.status === 'Confirmed';
  return booking.status.toLowerCase() === tab;
};

const TRACK_STEPS = ['Booking placed', 'Provider confirmed', 'Service completed'];
const TRACK_INDEX = { Pending: 0, Confirmed: 1, Completed: 2 };

function BookingsPage() {
  const { currentUser } = useAuth();
  const { bookings, updateBooking, startBooking } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [cancelTarget, setCancelTarget] = useState(null);
  const [trackTarget, setTrackTarget] = useState(null);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [rescheduleError, setRescheduleError] = useState('');

  // Only this user's bookings, newest first
  const myBookings = bookings
    .filter((b) => b.userId === currentUser.id)
    .sort((a, b) => b.createdAt - a.createdAt);
  const visibleBookings = myBookings.filter((b) => matchesTab(b, activeTab));

  const confirmCancel = () => {
    updateBooking(cancelTarget.id, { status: 'Cancelled', cancelledBy: 'user' });
    setCancelTarget(null);
    showToast('Booking cancelled.', 'info');
  };

  const openReschedule = (booking) => {
    setRescheduleTarget(booking);
    setNewDate(booking.date);
    setNewSlot(booking.timeSlot);
    setRescheduleError('');
  };

  const confirmReschedule = (e) => {
    e.preventDefault();
    if (!newDate || newDate < todayISO()) {
      setRescheduleError('Please choose a valid future date.');
      return;
    }
    if (!newSlot) {
      setRescheduleError('Please select a time slot.');
      return;
    }
    updateBooking(rescheduleTarget.id, { date: newDate, timeSlot: newSlot });
    setRescheduleTarget(null);
    showToast('Booking rescheduled successfully.');
  };

  const handleBookAgain = (booking) => {
    const service = SERVICES_DATA.find((s) => s.id === booking.serviceId);
    if (service) startBooking(service);
  };

  return (
    <div className="bookings-page-root">
      <div className="container">
        <div className="bookings-page-header">
          <span className="section-badge">Service History</span>
          <h1 className="section-title">My Bookings</h1>
          <p className="section-subtitle">Track, reschedule or cancel your service bookings.</p>
        </div>

        <div className="bookings-filter-bar">
          <div className="bookings-tab-group">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`booking-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} ({myBookings.filter((b) => matchesTab(b, tab.id)).length})
              </button>
            ))}
          </div>

          <button type="button" className="new-booking-btn" onClick={() => navigate('/services')}>
            + New Booking
          </button>
        </div>

        {visibleBookings.length === 0 ? (
          <div className="empty-bookings">
            <div className="empty-bookings-icon">📋</div>
            <h3>No bookings here yet</h3>
            <p>Book a trusted professional in a few clicks.</p>
            <Link to="/services" className="btn btn-primary">Browse Services</Link>
          </div>
        ) : (
          <div className="bookings-list">
            {visibleBookings.map((booking) => {
              const isActive = booking.status === 'Pending' || booking.status === 'Confirmed';
              return (
                <article className="booking-card" key={booking.id}>
                  <div className="booking-card-top">
                    <div className="booking-service-title-wrap">
                      <div className="booking-icon">{booking.icon}</div>
                      <div>
                        <h2 className="booking-main-title">{booking.serviceTitle}</h2>
                        <span className="booking-id-tag">Booking #{booking.id}</span>
                      </div>
                    </div>
                    <span className={`booking-status-badge status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-card-body">
                    <div className="booking-info-block">
                      <span className="info-label">DATE & TIME</span>
                      <span className="info-val">{formatDate(booking.date)}</span>
                      <span className="info-val">{booking.timeSlot}</span>
                    </div>

                    <div className="booking-info-block">
                      <span className="info-label">SERVICE ADDRESS</span>
                      <span className="info-val">{booking.address}</span>
                      <span className="info-val">{booking.city}</span>
                    </div>

                    <div className="booking-info-block">
                      <span className="info-label">SERVICE PROVIDER</span>
                      <span className="info-val">{booking.providerName || 'Awaiting provider'}</span>
                      {booking.providerName && <span className="info-val">Verified professional</span>}
                    </div>

                    <div className="booking-info-block">
                      <span className="info-label">START OTP</span>
                      {booking.status === 'Confirmed' ? (
                        <span className="otp-highlight">🔐 {booking.otp}</span>
                      ) : (
                        <span className="info-val">
                          {booking.status === 'Pending' ? 'Shown after confirmation' : '—'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="booking-card-footer">
                    <div className="booking-pricing-total">
                      <span className="total-label">Total</span>
                      <span className="total-val">{formatPrice(booking.totalAmount)}</span>
                    </div>

                    <div className="booking-actions-group">
                      {booking.status !== 'Cancelled' && (
                        <button type="button" className="btn-action-sm" onClick={() => setTrackTarget(booking)}>
                          📍 Track Status
                        </button>
                      )}
                      {isActive && (
                        <button type="button" className="btn-action-sm" onClick={() => openReschedule(booking)}>
                          ⏱️ Reschedule
                        </button>
                      )}
                      {isActive && (
                        <button type="button" className="btn-action-sm btn-action-danger" onClick={() => setCancelTarget(booking)}>
                          ✕ Cancel
                        </button>
                      )}
                      {booking.status === 'Completed' && (
                        <button
                          type="button"
                          className="btn-action-sm"
                          onClick={() => navigate('/reviews', { state: { serviceId: booking.serviceId, bookingId: booking.id } })}
                        >
                          Write Review
                        </button>
                      )}
                      {(booking.status === 'Completed' || booking.status === 'Cancelled') && (
                        <button type="button" className="btn-action-sm" onClick={() => handleBookAgain(booking)}>
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel confirmation popup */}
      {cancelTarget && (
        <Modal title="Cancel booking?" onClose={() => setCancelTarget(null)}>
          <p className="modal-text">
            Are you sure you want to cancel <strong>{cancelTarget.serviceTitle}</strong> (#{cancelTarget.id}) on {formatDate(cancelTarget.date)}?
          </p>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setCancelTarget(null)}>Keep Booking</button>
            <button type="button" className="btn btn-danger" onClick={confirmCancel}>Yes, Cancel</button>
          </div>
        </Modal>
      )}

      {/* Reschedule popup */}
      {rescheduleTarget && (
        <Modal title="Reschedule booking" onClose={() => setRescheduleTarget(null)}>
          <form onSubmit={confirmReschedule} noValidate>
            {rescheduleError && <div className="form-alert">{rescheduleError}</div>}
            <InputField label="New Date" name="newDate" type="date" min={todayISO()} value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <SelectField label="New Time Slot" name="newSlot" value={newSlot} onChange={(e) => setNewSlot(e.target.value)}
              options={TIME_SLOTS.map((t) => ({ value: t, label: t }))} placeholder="Select a slot" />
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setRescheduleTarget(null)}>Close</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Track status popup */}
      {trackTarget && (
        <Modal title={`Track #${trackTarget.id}`} onClose={() => setTrackTarget(null)}>
          <ol className="track-list">
            {TRACK_STEPS.map((step, index) => {
              const current = TRACK_INDEX[trackTarget.status];
              const state = index < current ? 'done' : index === current ? 'current' : 'todo';
              return (
                <li key={step} className={`track-step ${state}`}>
                  <span className="track-dot">{state === 'done' ? '✓' : index + 1}</span>
                  <div>
                    <strong>{step}</strong>
                    {index === 1 && trackTarget.providerName && <span>{trackTarget.providerName} is assigned</span>}
                  </div>
                </li>
              );
            })}
          </ol>
        </Modal>
      )}
    </div>
  );
}

export default BookingsPage;
