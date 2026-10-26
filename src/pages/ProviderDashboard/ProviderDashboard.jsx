import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField, TextareaField } from '../../components/FormFields';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { formatDate, formatPrice, getInitials } from '../../utils/format';
import { isPhone } from '../../utils/validators';
import '../../shared/styles/Dashboard.css';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'requests', label: 'Requests' },
  { id: 'jobs', label: 'Active Jobs' },
];

// Provider dashboard: tabs, availability switch, accept/decline requests,
// complete jobs, and an editable service profile.
export default function ProviderDashboard() {
  const { currentUser, updateUser, logout } = useAuth();
  const { bookings, reviews, updateBooking } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');

  const service = SERVICES_DATA.find((s) => s.id === currentUser.serviceId);
  const skills = currentUser.skills || [];

  // ----- data for this provider (calculated from the shared bookings list) -----
  // New requests: pending bookings for my trade that I have not declined
  const requests = bookings.filter(
    (b) => b.status === 'Pending' && b.serviceId === currentUser.serviceId && !b.declinedBy?.includes(currentUser.id)
  );
  const activeJobs = bookings.filter((b) => b.providerId === currentUser.id && b.status === 'Confirmed');
  const completedJobs = bookings.filter((b) => b.providerId === currentUser.id && b.status === 'Completed');
  const earnings = completedJobs.reduce((sum, b) => sum + b.totalAmount, 0);

  const myReviews = reviews.filter((r) => r.serviceId === currentUser.serviceId);
  const rating = myReviews.length
    ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
    : '—';

  // ----- actions -----
  const acceptRequest = (booking) => {
    updateBooking(booking.id, { status: 'Confirmed', providerId: currentUser.id, providerName: currentUser.name });
    showToast(`Request #${booking.id} accepted.`);
  };

  const declineRequest = (booking) => {
    updateBooking(booking.id, { declinedBy: [...(booking.declinedBy || []), currentUser.id] });
    showToast('Request declined.', 'info');
  };

  const completeJob = (booking) => {
    updateBooking(booking.id, { status: 'Completed' });
    showToast(`Job #${booking.id} marked as completed.`);
  };

  const toggleAvailability = (e) => {
    updateUser({ available: e.target.checked });
    showToast(e.target.checked ? 'You are now available for jobs.' : 'You are now offline.', 'info');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    showToast('You have been logged out.', 'info');
  };

  // ----- profile editing -----
  const startEdit = () => {
    setForm({
      name: currentUser.name,
      phone: currentUser.phone,
      experience: currentUser.experience,
      rate: currentUser.rate,
      area: currentUser.area || '',
      bio: currentUser.bio || '',
    });
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
    if (!isPhone(String(form.phone))) newErrors.phone = 'Enter a valid 10-digit mobile number.';
    if (form.experience === '' || Number(form.experience) < 0 || Number(form.experience) > 50) newErrors.experience = 'Enter years between 0 and 50.';
    if (!form.rate || Number(form.rate) < 1) newErrors.rate = 'Enter a valid starting rate.';
    if (form.area.trim().length < 3) newErrors.area = 'Enter your service area.';
    if (form.bio.trim().length < 20) newErrors.bio = 'Write at least 20 characters about yourself.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    updateUser({
      name: form.name.trim(),
      phone: String(form.phone).trim(),
      experience: Number(form.experience),
      rate: Number(form.rate),
      area: form.area.trim(),
      bio: form.bio.trim(),
    });
    setEditing(false);
    showToast('Profile updated successfully.');
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      showToast('That skill is already added.', 'error');
      return;
    }
    updateUser({ skills: [...skills, skill] });
    setSkillInput('');
  };

  const removeSkill = (skill) => updateUser({ skills: skills.filter((s) => s !== skill) });

  // ----- small reusable pieces -----
  const jobMeta = (b) => (
    <div className="job-card-meta">
      <span>📍 {b.address}</span>
      <span>📅 {formatDate(b.date)}</span>
      <span>🕐 {b.timeSlot}</span>
      <span>👤 {b.customerName}</span>
    </div>
  );

  const requestList = (
    <div className="job-cards-list">
      {requests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No new requests</div>
          <div className="empty-state-text">New bookings for {service?.title} will appear here.</div>
        </div>
      ) : (
        requests.map((b) => (
          <div className="job-card" key={b.id}>
            <div className="job-card-header">
              <div className="job-card-title">{b.icon} {b.serviceTitle} <small>#{b.id}</small></div>
              <div className="job-card-budget">{formatPrice(b.totalAmount)}</div>
            </div>
            {jobMeta(b)}
            {b.notes && <p className="job-note">“{b.notes}”</p>}
            <div className="job-card-actions">
              <button type="button" className="accept-btn" disabled={!currentUser.available} onClick={() => acceptRequest(b)}>✅ Accept</button>
              <button type="button" className="decline-btn" onClick={() => declineRequest(b)}>Decline</button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const jobsList = (
    <div className="job-cards-list">
      {activeJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛠️</div>
          <div className="empty-state-title">No active jobs</div>
          <div className="empty-state-text">Accept a request to start a job.</div>
        </div>
      ) : (
        activeJobs.map((b) => (
          <div className="job-card" key={b.id}>
            <div className="job-card-header">
              <div className="job-card-title">{b.icon} {b.serviceTitle} <small>#{b.id}</small></div>
              <div className="job-card-budget">{formatPrice(b.totalAmount)}</div>
            </div>
            {jobMeta(b)}
            <p className="job-note">Customer OTP to start the job: <strong>{b.otp}</strong></p>
            <div className="job-card-actions">
              <button type="button" className="accept-btn" onClick={() => completeJob(b)}>Mark as Completed</button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="dashboard-page fade-in">
      <div className="container">
        <div className="dashboard-page-header">
          <span className="section-badge">Provider View</span>
          <h1>{currentUser.name}'s Dashboard</h1>
          <p>{service ? `${service.icon} ${service.title}` : 'Service provider'} · manage requests, jobs and your profile.</p>
        </div>

        <div className="dashboard-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.id === 'requests' && requests.length > 0 && ` (${requests.length})`}
              {tab.id === 'jobs' && activeJobs.length > 0 && ` (${activeJobs.length})`}
            </button>
          ))}
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="sidebar-avatar">{getInitials(currentUser.name)}</div>
            <div className="sidebar-name">{currentUser.name}</div>
            <div className="sidebar-email">{currentUser.email}</div>
            <div className="sidebar-role-badge provider">✅ Verified Provider</div>
            <div className="sidebar-divider"></div>
            <div className="sidebar-stats">
              <div className="sidebar-stat"><span className="sidebar-stat-value">{rating}</span><span className="sidebar-stat-label">Rating</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">{completedJobs.length}</span><span className="sidebar-stat-label">Jobs</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">{myReviews.length}</span><span className="sidebar-stat-label">Reviews</span></div>
            </div>
            <div className="sidebar-divider"></div>
            <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>🚪 Log Out</button>
          </aside>

          <main className="dashboard-main">
            {/* Availability switch (always visible) */}
            <div className={`availability-banner ${currentUser.available ? 'available' : 'offline'}`}>
              <div className="availability-text">
                <span className={`status-dot ${currentUser.available ? 'online' : 'off'}`}></span>
                {currentUser.available ? "You're available for jobs today" : "You're offline - new requests can't be accepted"}
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={!!currentUser.available} onChange={toggleAvailability} />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {activeTab === 'dashboard' && (
              <>
                <div className="stats-grid">
                  <div className="stat-card"><span className="stat-card-icon">📋</span><span className="stat-card-value">{requests.length}</span><span className="stat-card-label">New Requests</span></div>
                  <div className="stat-card"><span className="stat-card-icon">🔧</span><span className="stat-card-value">{activeJobs.length}</span><span className="stat-card-label">Active Jobs</span></div>
                  <div className="stat-card"><span className="stat-card-icon">✅</span><span className="stat-card-value">{completedJobs.length}</span><span className="stat-card-label">Completed</span></div>
                  <div className="stat-card"><span className="stat-card-icon">💰</span><span className="stat-card-value">{formatPrice(earnings)}</span><span className="stat-card-label">Earnings</span></div>
                </div>

                <div className="profile-card">
                  <div className="profile-card-header">
                    <h2 className="profile-card-title">Service Profile</h2>
                    {!editing && <button type="button" className="edit-toggle-btn" onClick={startEdit}>✏️ Edit Profile</button>}
                  </div>

                  {editing ? (
                    <form onSubmit={handleSave} noValidate>
                      <div className="form-grid">
                        <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                        <InputField label="Mobile Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} maxLength={10} />
                        <InputField label="Experience (years)" name="experience" type="number" min="0" max="50" value={form.experience} onChange={handleChange} error={errors.experience} />
                        <InputField label="Starting Rate (₹)" name="rate" type="number" min="1" value={form.rate} onChange={handleChange} error={errors.rate} />
                      </div>
                      <InputField label="Service Area" name="area" value={form.area} onChange={handleChange} error={errors.area} placeholder="e.g. Sector 56, Gurgaon" />
                      <TextareaField label="About You" name="bio" value={form.bio} onChange={handleChange} error={errors.bio} placeholder="Describe your experience and work" />
                      <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="account-summary-grid">
                        <div className="summary-item"><div className="summary-label">Full Name</div><div className="summary-value">{currentUser.name}</div></div>
                        <div className="summary-item"><div className="summary-label">Trade</div><div className="summary-value">{service?.title}</div></div>
                        <div className="summary-item"><div className="summary-label">Experience</div><div className="summary-value">{currentUser.experience} {currentUser.experience === 1 ? 'Year' : 'Years'}</div></div>
                        <div className="summary-item"><div className="summary-label">Starting Rate</div><div className="summary-value">{formatPrice(currentUser.rate)}</div></div>
                        <div className="summary-item"><div className="summary-label">Phone</div><div className="summary-value">+91 {currentUser.phone}</div></div>
                        <div className="summary-item"><div className="summary-label">Email</div><div className="summary-value">{currentUser.email}</div></div>
                        <div className="summary-item"><div className="summary-label">Service Area</div><div className="summary-value">{currentUser.area || 'Not added yet'}</div></div>
                        <div className="summary-item"><div className="summary-label">Customer Rating</div><div className="summary-value">{rating === '—' ? 'No reviews yet' : `${rating} / 5.0`}</div></div>
                      </div>
                      <div className="profile-bio">
                        <div className="summary-label">ABOUT</div>
                        <p>{currentUser.bio || 'Add a short bio so customers know about your work.'}</p>
                      </div>
                    </>
                  )}

                  <div className="skills-section">
                    <div className="summary-label">SKILLS</div>
                    <div className="skills-container">
                      {skills.map((skill) => (
                        <span className="skill-chip" key={skill}>
                          {skill}
                          <button type="button" className="skill-remove" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>✕</button>
                        </span>
                      ))}
                      {skills.length === 0 && <span className="muted-text">No skills added yet.</span>}
                    </div>
                    <div className="skill-add-row">
                      <input
                        className="skill-add-input"
                        placeholder="Add a skill, e.g. Wiring"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                      />
                      <button type="button" className="skill-add-btn" onClick={addSkill}>Add</button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'requests' && (
              <div className="profile-card">
                <div className="profile-card-title">Incoming Service Requests</div>
                {requestList}
              </div>
            )}

            {activeTab === 'jobs' && (
              <>
                <div className="profile-card">
                  <div className="profile-card-title">Active Jobs</div>
                  {jobsList}
                </div>
                <div className="profile-card">
                  <div className="profile-card-title">Completed Jobs ({completedJobs.length})</div>
                  <div className="job-cards-list">
                    {completedJobs.length === 0 ? (
                      <div className="empty-state"><div className="empty-state-text">Completed jobs will be listed here.</div></div>
                    ) : (
                      completedJobs.map((b) => (
                        <div className="job-card" key={b.id}>
                          <div className="job-card-header">
                            <div className="job-card-title">{b.icon} {b.serviceTitle} <small>#{b.id}</small></div>
                            <div className="job-card-budget">{formatPrice(b.totalAmount)}</div>
                          </div>
                          {jobMeta(b)}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
