import '../../shared/styles/Dashboard.css';

export default function ProviderDashboard() {
  const requests = [
    ['MCB Short Circuit Inspection', 'Aditya V.', 'Sector 45, Gurgaon', '30 min ago', '₹349'],
    ['Ceiling Fan Installation', 'Priya M.', 'Sector 56, Gurgaon', '1 hr ago', '₹499'],
    ['Inverter Battery Checkup', 'Rahul K.', 'DLF Phase 2', '2 hrs ago', '₹299'],
  ];

  const getInitials = (name) => name.substring(0, 2).toUpperCase();

  return (
    <div className="dashboard-page fade-in">
      <div className="container">
        <div className="dashboard-page-header">
          <span className="section-badge">🧰 Provider View</span>
          <h1>Vikram Singh's Service Profile</h1>
          <p>Static provider profile and dashboard preview for Evaluation 1.</p>
        </div>

        <div className="dashboard-tabs">
          <button className="dashboard-tab active" disabled>Dashboard</button>
          <button className="dashboard-tab" disabled>Requests</button>
          <button className="dashboard-tab" disabled>Active Jobs</button>
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="sidebar-avatar">{getInitials('Vikram Singh')}</div>
            <div className="sidebar-name">Vikram Singh</div>
            <div className="sidebar-email">vikram@localserv.in</div>
            <div className="sidebar-role-badge provider">✅ Verified Provider</div>
            <div className="sidebar-divider"></div>
            <div className="sidebar-stats">
              <div className="sidebar-stat"><span className="sidebar-stat-value">4.9</span><span className="sidebar-stat-label">Rating</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">803</span><span className="sidebar-stat-label">Jobs</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">341</span><span className="sidebar-stat-label">Reviews</span></div>
            </div>
            <div className="sidebar-divider"></div>
            <button className="sidebar-logout-btn" disabled>🚪 Sign Out</button>
          </aside>

          <main className="dashboard-main">
            <div className="availability-banner available">
              <div className="availability-text"><span className="status-dot online"></span>You're available for jobs today</div>
              <label className="toggle-switch">
                <input type="checkbox" checked readOnly disabled />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="stats-grid">
              <div className="stat-card"><span className="stat-card-icon">📋</span><span className="stat-card-value">3</span><span className="stat-card-label">New Requests</span></div>
              <div className="stat-card"><span className="stat-card-icon">🔧</span><span className="stat-card-value">2</span><span className="stat-card-label">Active Jobs</span></div>
              <div className="stat-card"><span className="stat-card-icon">⭐</span><span className="stat-card-value">4.9</span><span className="stat-card-label">Rating</span></div>
              <div className="stat-card"><span className="stat-card-icon">✅</span><span className="stat-card-value">803</span><span className="stat-card-label">Completed</span></div>
            </div>

            <div className="profile-card">
              <div className="profile-card-header">
                <h2 className="profile-card-title">Service Profile</h2>
                <button className="edit-toggle-btn" disabled>✏️ Edit Profile</button>
              </div>

              <div className="account-summary-grid">
                <div className="summary-item"><div className="summary-label">Full Name</div><div className="summary-value">Vikram Singh</div></div>
                <div className="summary-item"><div className="summary-label">Trade</div><div className="summary-value">Electrical Services</div></div>
                <div className="summary-item"><div className="summary-label">Experience</div><div className="summary-value">11 Years</div></div>
                <div className="summary-item"><div className="summary-label">Starting Rate</div><div className="summary-value">₹249</div></div>
                <div className="summary-item"><div className="summary-label">Phone</div><div className="summary-value">+91 98765 43210</div></div>
                <div className="summary-item"><div className="summary-label">Email</div><div className="summary-value">vikram@localserv.in</div></div>
                <div className="summary-item"><div className="summary-label">Service Area</div><div className="summary-value">Sector 56, Gurgaon</div></div>
                <div className="summary-item"><div className="summary-label">Rating</div><div className="summary-value">⭐ 4.9 / 5.0</div></div>
              </div>

              <div className="profile-bio">
                <div className="summary-label">ABOUT</div>
                <p>Experienced professional dedicated to quality service and customer satisfaction. Specializing in fault diagnosis, repair, and installations.</p>
              </div>

              <div className="skills-section">
                <div className="summary-label">SKILLS</div>
                <div className="skills-list">
                  {['Fault diagnosis', 'Inverter setup', 'MCB repair', 'Wiring', 'Fan installation'].map((skill) => (
                    <span className="skill-tag" key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-title">Incoming Service Requests</div>
              <div className="job-cards-list">
                {requests.map(([title, customer, location, time, budget]) => (
                  <div className="job-card" key={title}>
                    <div className="job-card-header">
                      <div className="job-card-title">{title}</div>
                      <div className="job-card-budget">{budget}</div>
                    </div>
                    <div className="job-card-meta"><span>📍 {location}</span><span>🕐 {time}</span><span>👤 {customer}</span></div>
                    <div className="job-card-actions">
                      <button className="accept-btn" disabled>✅ Accept</button>
                      <button className="decline-btn" disabled>Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-title">Active Jobs</div>
              <div className="job-cards-list">
                <div className="job-card">
                  <div className="job-card-header"><div className="job-card-title">Full Home Electrical Inspection</div><div className="job-card-budget">₹1,499</div></div>
                  <div className="job-card-meta"><span>📍 Sector 48</span><span>📅 23 Aug 2026</span><span>👤 Sneha R.</span></div>
                  <div className="job-card-actions"><button className="accept-btn" disabled>In Progress</button></div>
                </div>
                <div className="job-card">
                  <div className="job-card-header"><div className="job-card-title">Full MCB Repair & Inverter Setup</div><div className="job-card-budget">₹1,499</div></div>
                  <div className="job-card-meta"><span>📍 Sector 56</span><span>📅 20 Aug 2026</span><span>⭐ 5.0</span></div>
                  <div className="job-card-actions"><button className="accept-btn" disabled>Completed</button></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
