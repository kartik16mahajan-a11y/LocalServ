import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './layouts/Navbar/Navbar';
import Footer from './layouts/Footer/Footer';
import BookingsPage from './pages/Bookings/BookingsPage';
import ServicesPage from './pages/Services/ServicesPage';
import ConsumerProfile from './pages/ConsumerProfile/ConsumerProfile';
import { INITIAL_BOOKINGS } from './data/servicesData';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  // Evaluation 1 version: UI + routing only.
  // No authentication, browser storage, booking persistence, popups, or toasts.
  const bookings = INITIAL_BOOKINGS;

  const noop = () => {};

  return (
    <div className="app-layout">
      <ScrollToTop />

      <Navbar currentUser={null} activeBookingsCount={0} />

      <main className="main-content-body">
        <Routes>
          {/* <Route path="/" element={<HomePage onBookCategory={noop} />} /> */}
          <Route path="/services" element={<ServicesPage onBookCategory={noop} />} />
          <Route
            path="/bookings"
            element={
              <BookingsPage
                bookings={bookings}
                onCancelBooking={noop}
                onRescheduleBooking={noop}
                onBookAgain={noop}
                onOpenNewBooking={noop}
              />
            }
          />
          {/* <Route path="/plans" element={<PlansPage onSelectPlan={noop} />} /> */}

          {/* Static provider profile/dashboard page for Evaluation 1. */}
          {/* <Route
            path="/dashboard"
            element={<ProviderDashboard currentUser={null} />}
          />
          <Route
            path="/profile/provider"
            element={<ProviderDashboard currentUser={null} />}
          /> */}

          {/* Static customer profile page. */}
          <Route
            path="/profile/consumer"
            element={<ConsumerProfile currentUser={null} />}
          />

          {/* <Route path="*" element={<HomePage onBookCategory={noop} />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
