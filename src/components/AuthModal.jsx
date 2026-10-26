import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { InputField, SelectField } from './FormFields';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SERVICES_DATA } from '../data/servicesData';
import { isEmail, isPhone } from '../utils/validators';

const EMPTY_FORM = { name: '', email: '', phone: '', password: '', confirm: '', serviceId: '' };

const DEMO_ACCOUNTS = {
  user: { email: 'user@localserv.in', password: 'user123' },
  provider: { email: 'vikram@localserv.in', password: 'pro123' },
};

// One popup for Login + Sign up, with a User / Provider switch.
function AuthModal() {
  const { authModal, closeAuth, login, signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [mode, setMode] = useState(authModal.mode); // 'login' | 'signup'
  const [role, setRole] = useState(authModal.role); // 'user' | 'provider'
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear that field's error
    setServerError('');
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setServerError('');
  };

  const fillDemo = () => setForm({ ...EMPTY_FORM, ...DEMO_ACCOUNTS[role] });

  // Returns an object like { email: 'Enter a valid email' }
  const validate = () => {
    const newErrors = {};
    if (mode === 'signup') {
      if (form.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters.';
      if (!isPhone(form.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number.';
      if (role === 'provider' && !form.serviceId) newErrors.serviceId = 'Select the service you provide.';
    }
    if (!isEmail(form.email)) newErrors.email = 'Enter a valid email address.';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (mode === 'signup' && form.confirm !== form.password) newErrors.confirm = 'Passwords do not match.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const result =
      mode === 'login'
        ? login(form.email, form.password, role)
        : signup({ ...form, role });

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    closeAuth();
    showToast(mode === 'login' ? `Welcome back, ${result.user.name}!` : 'Account created successfully!');
    // Show the correct pages for this type of account
    navigate(result.user.role === 'provider' ? '/provider' : '/profile');
  };

  const serviceOptions = SERVICES_DATA.map((s) => ({ value: s.id, label: `${s.icon} ${s.title}` }));

  return (
    <Modal title={mode === 'login' ? 'Login to LocalServ' : 'Create your account'} onClose={closeAuth}>
      {/* Role switch */}
      <div className="segmented" role="tablist">
        <button type="button" className={role === 'user' ? 'active' : ''} onClick={() => { setRole('user'); setServerError(''); }}>
          👤 User
        </button>
        <button type="button" className={role === 'provider' ? 'active' : ''} onClick={() => { setRole('provider'); setServerError(''); }}>
          🧰 Provider
        </button>
      </div>

      {/* Login / Signup tabs */}
      <div className="auth-tabs">
        <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => changeMode('login')}>Login</button>
        <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => changeMode('signup')}>Sign Up</button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {serverError && <div className="form-alert">{serverError}</div>}

        {mode === 'signup' && (
          <>
            <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="e.g. Rahul Sharma" />
            <InputField label="Mobile Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="10-digit number" maxLength={10} />
            {role === 'provider' && (
              <SelectField label="Service You Provide" name="serviceId" value={form.serviceId} onChange={handleChange} error={errors.serviceId} options={serviceOptions} placeholder="Select your trade" />
            )}
          </>
        )}

        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="At least 6 characters" />
        {mode === 'signup' && (
          <InputField label="Confirm Password" name="confirm" type="password" value={form.confirm} onChange={handleChange} error={errors.confirm} placeholder="Re-enter password" />
        )}

        <button type="submit" className="btn btn-primary w-full">
          {mode === 'login' ? 'Login' : `Sign Up as ${role === 'user' ? 'User' : 'Provider'}`}
        </button>
      </form>

      {mode === 'login' && (
        <p className="auth-demo">
          Demo {role} account: <strong>{DEMO_ACCOUNTS[role].email}</strong> / <strong>{DEMO_ACCOUNTS[role].password}</strong>{' '}
          <button type="button" className="link-btn" onClick={fillDemo}>Fill</button>
        </p>
      )}
    </Modal>
  );
}

export default AuthModal;
