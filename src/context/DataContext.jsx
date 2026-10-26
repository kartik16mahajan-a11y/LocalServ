import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { SEED_BOOKINGS, SEED_REVIEWS } from '../data/seedData';

// Context API (global state): bookings and reviews, stored in localStorage.
// Users and providers both read from the same bookings list - that is how a
// booking made by a user shows up as a request on the provider dashboard.
const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { currentUser, openAuth } = useAuth();
  const { showToast } = useToast();

  const [bookings, setBookings] = useLocalStorage('ls_bookings', SEED_BOOKINGS);
  const [reviews, setReviews] = useLocalStorage('ls_reviews', SEED_REVIEWS);

  // The service the user is currently booking (null = booking popup closed)
  const [bookingTarget, setBookingTarget] = useState(null);

  // Called by every "Book" button on the site.
  const startBooking = (service) => {
    if (!currentUser) {
      showToast('Please login as a user to book a service.', 'info');
      openAuth('login', 'user');
    } else if (currentUser.role === 'provider') {
      showToast('Providers cannot book services. Use a user account.', 'error');
    } else {
      setBookingTarget(service);
    }
  };
  const closeBooking = () => setBookingTarget(null);

  const addBooking = (booking) => setBookings((prev) => [booking, ...prev]);

  const updateBooking = (id, changes) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...changes } : b)));
  };

  const addReview = (review) => setReviews((prev) => [review, ...prev]);

  const value = {
    bookings, reviews,
    bookingTarget, startBooking, closeBooking,
    addBooking, updateBooking, addReview,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  return useContext(DataContext);
}
