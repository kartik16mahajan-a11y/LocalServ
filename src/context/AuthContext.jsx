import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { SEED_USERS } from '../data/seedData';
import { SERVICES_DATA } from '../data/servicesData';

// Context API (global state): who is logged in, and the login/signup popup.
// All accounts are saved in localStorage ("ls_users"); the logged-in user's
// id is saved in "ls_session".
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('ls_users', SEED_USERS);
  const [sessionId, setSessionId] = useLocalStorage('ls_session', null);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login', role: 'user' });

  const currentUser = users.find((u) => u.id === sessionId) || null;

  const openAuth = (mode = 'login', role = 'user') => setAuthModal({ open: true, mode, role });
  const closeAuth = () => setAuthModal((prev) => ({ ...prev, open: false }));

  // Each function returns { ok: true, user } or { ok: false, error }
  const signup = (data) => {
    const email = data.email.trim().toLowerCase();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'An account with this email already exists. Please login.' };
    }

    const common = {
      id: `${data.role === 'provider' ? 'p' : 'u'}-${Date.now()}`,
      role: data.role,
      name: data.name.trim(),
      email,
      password: data.password,
      phone: data.phone.trim(),
    };

    let newUser;
    if (data.role === 'provider') {
      const service = SERVICES_DATA.find((s) => s.id === data.serviceId);
      newUser = {
        ...common,
        serviceId: data.serviceId,
        experience: 1,
        rate: service ? service.startingPrice : 0,
        area: '',
        bio: '',
        skills: [],
        available: true,
      };
    } else {
      newUser = { ...common, address: '', plan: 'basic', favourites: [] };
    }

    setUsers((prev) => [...prev, newUser]);
    setSessionId(newUser.id);
    return { ok: true, user: newUser };
  };

  const login = (email, password, role) => {
    const user = users.find((u) => u.email === email.trim().toLowerCase());
    if (!user) return { ok: false, error: 'No account found with this email. Please sign up first.' };
    if (user.password !== password) return { ok: false, error: 'Incorrect password. Please try again.' };
    if (user.role !== role) {
      return { ok: false, error: `This email is registered as a ${user.role}. Please select "${user.role === 'user' ? 'User' : 'Provider'}" above.` };
    }
    setSessionId(user.id);
    return { ok: true, user };
  };

  const logout = () => setSessionId(null);

  // Update fields of the logged-in user, e.g. updateUser({ phone: '98...' })
  const updateUser = (changes) => {
    setUsers((prev) => prev.map((u) => (u.id === sessionId ? { ...u, ...changes } : u)));
  };

  const value = { currentUser, authModal, openAuth, closeAuth, signup, login, logout, updateUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
