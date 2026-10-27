import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import './shared/styles/components.css';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { store } from './store/store';

// Context providers wrap the whole app so every page can use them.
// Order matters: DataProvider uses Auth + Toast, AuthProvider is inside Toast.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
