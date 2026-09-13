import React from 'react';

/**
 * Navbar Component
 * Displays the app branding and the live API Connection Status Badge.
 * 
 * Props:
 *  - isConnected (boolean): true if backend (Port 5000) is reachable
 */
export default function Navbar({ isConnected }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <i className="fa-solid fa-leaf brand-icon"></i>
        <span>TaskStream <strong>Vite + React</strong></span>
      </div>
      <div className="nav-status">
        <span className={`badge ${isConnected ? 'badge-connected' : 'badge-error'}`}>
          <i className={`fa-solid ${isConnected ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
          {isConnected ? 'API Connected (Port 5000)' : 'Backend Disconnected'}
        </span>
      </div>
    </nav>
  );
}