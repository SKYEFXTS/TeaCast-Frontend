import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Only initialize MSW in development mode
async function initializeMSWIfNeeded() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { worker } = await import('./mocks/server');
      worker.start({ onUnhandledRequest: 'bypass' });
      console.log('Mock Service Worker started for development');
    } catch (error) {
      console.error('Error starting Mock Service Worker:', error);
    }
  }
}

// Initialize MSW conditionally
initializeMSWIfNeeded();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
