import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import global CSS for the app
import App from './app';  // Import the main App component

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);