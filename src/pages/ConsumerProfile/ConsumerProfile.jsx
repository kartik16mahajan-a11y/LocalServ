import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField, TextareaField } from '../../components/FormFields';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { SERVICES_DATA, PLANS } from '../../data/servicesData';
import { formatDate, formatPrice, getInitials } from '../../utils/format';
import { isPhone } from '../../utils/validators';
import '../../shared/styles/Dashboard.css';

// User dashboard: account details (editable), plan, saved services, recent bookings.
export default function ConsumerProfile() {
  const { currentUser, updateUser, logout } = useAuth();
  const { bookings, reviews, startBooking } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});

  const myBookings = bookings.filter((b) => b.userId === currentUser.id).sort((a, b) => b.createdAt - a.createdAt);
  const myReviewCount = reviews.filter((r) => r.userId === currentUser.id).length;
  const savedServices = SERVICES_DATA.filter((s) => currentUser.favourites?.includes(s.id));
  const plan = PLANS.find((p) => p.id === currentUser.plan) || PLANS[0];

  const startEdit = () => {
    setForm({ name: currentUser.name, phone: currentUser.phone, address: currentUser.address || '' });
    setErrors({});
    setEditing(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (form.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters.';
    if (!isPhone(form.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number.';
    if (form.address.trim().length < 10) newErrors.address = 'Enter your full address.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    updateUser({ name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() });
    setEditing(false);
    showToast('Profile updated successfully.');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    showToast('You have been logged out.', 'info');
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-page-header">
          <span className="section-badge">User Account</span>
          <h1>Welcome, {currentUser.name.split(' ')[0]}</h1>
          <p>Manage your details, saved services and bookings.</p>
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="sidebar-avatar">{getInitials(currentUser.name)}</div>
            <div className="sidebar-name">{currentUser.name}</div>
            <div className="sidebar-email">{currentUser.email}</div>
            <div className="sidebar-role-badge consumer">LocalServ Member</div>
            <div className="sidebar-divider"></div>
            <div className="sidebar-stats">
              <div className="sidebar-stat"><span className="sidebar-stat-value">{myBookings.length}</span><span className="sidebar-stat-label">Bookings</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">{savedServices.length}</span><span className="sidebar-stat-label">Saved</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">{myReviewCount}</span><span className="sidebar-stat-label">Reviews</span></div>
            </div>
            <div className="sidebar-divider"></div>
            <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>🚪 Log Out</button>
          </aside>

          <main className="dashboard-main fade-in">
            {/* Account details: view mode / edit mode */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title">Account Summary</div>
                {!editing && <button type="button" className="edit-toggle-btn" onClick={startEdit}>✏️ Edit Profile</button>}
              </div>

              {editing ? (
                <form onSubmit={handleSave} noValidate>
                  <div className="form-grid">
                    <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                    <InputField label="Mobile Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} maxLength={10} />
                  </div>
                  <TextareaField label="Saved Address" name="address" value={form.address} onChange={handleChange} error={errors.address} />
                  <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              ) : (
                <div className="account-summary-grid">
                  <div className="summary-item"><div className="summary-label">Full Name</div><div className="summary-value">{currentUser.name}</div></div>
                  <div className="summary-item"><div className="summary-label">Phone</div><div className="summary-value">+91 {currentUser.phone}</div></div>
                  <div className="summary-item"><div className="summary-label">Email</div><div className="summary-value">{currentUser.email}</div></div>
                  <div className="summary-item"><div className="summary-label">Saved Address</div><div className="summary-value">{currentUser.address || 'Not added yet'}</div></div>
                </div>
              )}
            </div>

            <div className="membership-card">
              <div className="membership-card-title">MEMBERSHIP</div>
              <div className="membership-card-plan">{plan.name}</div>
              <div className="membership-card-status">
                {plan.id === 'basic' ? 'Free plan active' : 'Active'} ·{' '}
                <Link to="/plans" className="membership-link">{plan.id === 'basic' ? 'Upgrade plan' : 'Change plan'}</Link>
              </div>
            </div>

            {/* Saved services (heart button on the Services page) */}
            <div className="profile-card">
              <div className="profile-card-title">♥ Saved Services</div>
              {savedServices.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-title">No saved services yet</div>
                  <div className="empty-state-text">Tap the heart on any service to save it here.</div>
                </div>
              ) : (
                <div className="cards-row">
                  {savedServices.map((service) => (
                    <div className="favourite-card" key={service.id}>
                      <div className="fav-avatar">{service.icon}</div>
                      <div className="fav-name">{service.title}</div>
                      <div className="fav-trade">From {formatPrice(service.startingPrice)} / {service.priceUnit}</div>
                      <button type="button" className="fav-book-btn" onClick={() => startBooking(service)}>Book Now</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent bookings */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title">Recent Bookings</div>
                <Link to="/bookings" className="edit-toggle-btn">View all</Link>
              </div>
              {myBookings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-title">No bookings yet</div>
                  <div className="empty-state-text"><Link to="/services" className="membership-link">Book your first service</Link></div>
                </div>
              ) : (
                <div className="job-cards-list">
                  {myBookings.slice(0, 3).map((b) => (
                    <div className="job-card" key={b.id}>
                      <div className="job-card-header">
                        <div className="job-card-title">{b.icon} {b.serviceTitle}</div>
                        <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                      </div>
                      <div className="job-card-meta">
                        <span>📅 {formatDate(b.date)}</span>
                        <span>🕐 {b.timeSlot}</span>
                        <span>{formatPrice(b.totalAmount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
