import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './layouts/Navbar/Navbar';
import Footer from './layouts/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';

import HomePage from './pages/Home/HomePage';
import ServicesPage from './pages/Services/ServicesPage';
import BookingsPage from './pages/Bookings/BookingsPage';
import PlansPage from './pages/Plans/PlansPage';
import ReviewsPage from './pages/Reviews/ReviewsPage';
import ConsumerProfile from './pages/ConsumerProfile/ConsumerProfile';
import ProviderDashboard from './pages/ProviderDashboard/ProviderDashboard';
import NotFound from './pages/NotFound/NotFound';

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

  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />

      <main className="main-content-body">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />

          {/* User-only pages */}
          <Route path="/bookings" element={<ProtectedRoute role="user"><BookingsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute role="user"><ConsumerProfile /></ProtectedRoute>} />

          {/* Provider-only page */}
          <Route path="/provider" element={<ProtectedRoute role="provider"><ProviderDashboard /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Popups are shown only when needed */}
      {authModal.open && <AuthModal />}
      {bookingTarget && <BookingModal service={bookingTarget} onClose={closeBooking} />}
    </div>
  );
}

export default App;
