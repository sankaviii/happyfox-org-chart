import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { makeServer } from './server.js';

// Start MirageJS server in development AND production (for demo)
// In a real app, this would only run in development
makeServer({ environment: 'development' });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
