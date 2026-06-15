import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Wipe persisted client state (captcha verification, dismissed modals, etc.)
// whenever a new deployment ships, so stale flags never carry across releases.
const BUILD_ID_KEY = 'pfs-build-id';
try {
  if (localStorage.getItem(BUILD_ID_KEY) !== __BUILD_ID__) {
    localStorage.clear();
    localStorage.setItem(BUILD_ID_KEY, __BUILD_ID__);
  }
} catch {
  /* ignore storage errors */
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
