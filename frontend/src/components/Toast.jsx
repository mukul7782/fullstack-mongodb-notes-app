import React from 'react';

/**
 * Toast Notification Component
 * Displays slide-in alert messages for Success or Error states.
 */
export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="toast-container">
      <div className={`toast ${isError ? 'toast-error' : ''}`}>
        <i className={`fa-solid ${isError ? 'fa-triangle-exclamation' : 'fa-circle-check'}`}></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}