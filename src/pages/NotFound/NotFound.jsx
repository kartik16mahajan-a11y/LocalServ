import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="login-required">
      <div className="not-found-code">404</div>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}

export default NotFound;
