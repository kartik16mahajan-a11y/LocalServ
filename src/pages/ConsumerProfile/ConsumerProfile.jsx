import '../../shared/styles/Dashboard.css';

export default function ConsumerProfile() {
  const favHelpers = [
    { id: 1, name: 'Vikram Singh', initials: 'VS', trade: 'Electrician', rating: '4.9 ★', location: 'Sector 56' },
    { id: 2, name: 'Priya Patel', initials: 'PP', trade: 'House Cleaning', rating: '4.8 ★', location: 'Sector 45' },
    { id: 3, name: 'Amit Kumar', initials: 'AK', trade: 'Plumber', rating: '4.7 ★', location: 'DLF Phase 2' },
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-page-header">
          <span className="section-badge">👤 User View</span>
          <h1>My Account</h1>
          <p>Static consumer profile page for Evaluation 1.</p>
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="sidebar-avatar">KM</div>
            <div className="sidebar-name">Kartik Mahajan</div>
            <div className="sidebar-email">user@localserv.in</div>
            <div className="sidebar-role-badge consumer">⭐ LocalServ Member</div>
            <div className="sidebar-divider"></div>
            <div className="sidebar-stats">
              <div className="sidebar-stat"><span className="sidebar-stat-value">5</span><span className="sidebar-stat-label">Bookings</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">3</span><span className="sidebar-stat-label">Favourites</span></div>
              <div className="sidebar-stat"><span className="sidebar-stat-value">8</span><span className="sidebar-stat-label">Reviews</span></div>
            </div>
            <div className="sidebar-divider"></div>
            <button className="sidebar-logout-btn" disabled>🚪 Sign Out</button>
          </aside>

          <main className="dashboard-main fade-in">
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title">👤 Account Summary</div>
                <button className="edit-toggle-btn" disabled>✏️ Edit Profile</button>
              </div>

              <div className="account-summary-grid">
                <div className="summary-item"><div className="summary-label">Full Name</div><div className="summary-value">Kartik Mahajan</div></div>
                <div className="summary-item"><div className="summary-label">Phone</div><div className="summary-value">+91 98765 43210</div></div>
                <div className="summary-item"><div className="summary-label">Email</div><div className="summary-value">user@localserv.in</div></div>
                <div className="summary-item"><div className="summary-label">Saved Address</div><div className="summary-value">Sector 56, Gurgaon, Haryana</div></div>
              </div>
            </div>

            <div className="membership-card">
              <div className="membership-card-title">MEMBERSHIP</div>
              <div className="membership-card-plan">Home Plus</div>
              <div className="membership-card-status">✅ Active · Renews 15 Sep 2026</div>
            </div>

            <div className="profile-card">
              <div className="profile-card-title">❤️ Favourite Helpers</div>
              <div className="cards-row">
                {favHelpers.map((helper) => (
                  <div className="favourite-card" key={helper.id}>
                    <div className="fav-avatar">{helper.initials}</div>
                    <div className="fav-name">{helper.name}</div>
                    <div className="fav-trade">{helper.trade}</div>
                    <div className="fav-rating">{helper.rating}</div>
                    <div className="fav-location">{helper.location}</div>
                    <button className="fav-book-btn" disabled>Book Helper</button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
