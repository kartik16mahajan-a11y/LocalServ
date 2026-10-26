import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './layouts/Navbar/Navbar';
import Footer from './layouts/Footer/Footer';

import HomePage from './pages/Home/HomePage';
import ServicesPage from './pages/Services/ServicesPage';
import ConsumerProfile from './pages/ConsumerProfile/ConsumerProfile';
import ProviderDashboard from './pages/ProviderDashboard/ProviderDashboard';
import PlansPage from './pages/Plans/PlansPage';
import { INITIAL_BOOKINGS } from './data/servicesData';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function PlaceholderPage({ title }) {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem' }}>
      <span className="section-badge">LocalServ</span>

      <h1 className="section-title">{title}</h1>

      <p className="section-subtitle">
        This page will be added as part of the team's next contribution.
      </p>
    </div>
  );
}

function App() {
  const bookings = INITIAL_BOOKINGS;
  const noop = () => { };

  return (
    <div className="app-layout">
      <ScrollToTop />

      <Navbar currentUser={null} activeBookingsCount={0} />

      <main className="main-content-body">
        <Routes>

          <Route path="/" element={<HomePage />} />



          {/* Kartik's contribution */}
          <Route
            path="/services"
            element={<ServicesPage onBookCategory={noop} />}
          />

          <Route
            path="/profile/consumer"
            element={<ConsumerProfile currentUser={null} />}
          />

          {/* Temporary pages for other team members */}

          <Route path="/plans" element={<PlansPage onSelectPlan={noop} />} />

          <Route
            path="/bookings"
            element={<PlaceholderPage title="My Bookings" />}
          />

          {/* <Route
            path="/plans"
            element={<PlaceholderPage title="Plans & Combos" />}
          /> */}

          {/* <Route
            path="/profile/provider"
            element={<PlaceholderPage title="Provider Profile" />}
          /> */}
          <Route
            path="/profile/provider"
            element={<ProviderDashboard currentUser={null} />}
          />


          {/* Unknown URL */}
          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" />}
          />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;