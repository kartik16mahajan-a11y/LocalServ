import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protected route: only lets the right type of user see a page.
//   <ProtectedRoute role="user"> ... </ProtectedRoute>
function ProtectedRoute({ role, children }) {
  const { currentUser, openAuth } = useAuth();

  // Not logged in -> ask them to login
  if (!currentUser) {
    return (
      <div className="login-required">
        <div className="login-required-icon">🔒</div>
        <h2>Login required</h2>
        <p>Please login as a {role === 'provider' ? 'service provider' : 'user'} to open this page.</p>
        <button type="button" className="btn btn-primary" onClick={() => openAuth('login', role)}>
          Login
        </button>
      </div>
    );
  }

  // Logged in with the wrong role -> send to home
  if (currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
