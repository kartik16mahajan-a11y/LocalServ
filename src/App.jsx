import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './layouts/Navbar/Navbar';
import Footer from './layouts/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';

import BookingsPage from './pages/Bookings/BookingsPage';
import ReviewsPage from './pages/Reviews/ReviewsPage';
import ServicesPage from './pages/Services/ServicesPage';
import ConsumerProfile from './pages/ConsumerProfile/ConsumerProfile';

import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  const { authModal } = useAuth();
  const { bookingTarget, closeBooking } = useData();
  const noop = () => {};

  return (
    <div className="app-layout">
      <ScrollToTop />

      <Navbar currentUser={null} activeBookingsCount={0} />

      <main className="main-content-body">
        <Routes>
          <Route path="/services" element={<ServicesPage onBookCategory={noop} />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute role="user">
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/consumer"
            element={<ConsumerProfile currentUser={null} />}
          />
        </Routes>
      </main>

      <Footer />

      {authModal.open && <AuthModal />}
      {bookingTarget && <BookingModal service={bookingTarget} onClose={closeBooking} />}
    </div>
  );
}

export default App;
