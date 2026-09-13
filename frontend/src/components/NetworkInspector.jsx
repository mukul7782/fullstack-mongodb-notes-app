import React from 'react';

/**
 * NetworkInspector Component
 * Renders real-time log entries showing outgoing requests, HTTP status codes,
 * and incoming JSON payloads from MongoDB / external APIs.
 * 
 * Props:
 *  - logs (array): Array of log objects { time, method, url, status, payload, response }
 *  - onClearLogs (function): Clears log list
 */
export default function NetworkInspector({ logs = [], onClearLogs }) {
  return (
    <div className="card inspector-card">
      <div className="card-header flex-between">
        <h2><i className="fa-solid fa-network-wired"></i> Network Inspector</h2>
        <button onClick={onClearLogs} className="btn btn-text">Clear</button>
      </div>
      <p className="inspector-sub">Shows real-time HTTP requests, status codes & MongoDB JSON payloads</p>
      
      <div className="logs-container">
        {logs.length === 0 ? (
          <div className="log-entry log-info">[SYSTEM] Initializing Network Inspector...</div>
        ) : (
          logs.map((log, index) => {
            const isSuccess = typeof log.status === 'number' && log.status >= 200 && log.status < 300;
            return (
              <div
                key={index}
                className={`log-entry ${isSuccess ? 'log-success' : 'log-error'}`}
              >
                [{log.time}] {log.method} {log.url} -&gt; HTTP {log.status}
                {log.payload && `\nPAYLOAD: ${JSON.stringify(log.payload)}`}
                {log.response && `\nMONGO RESPONSE: ${JSON.stringify(log.response, null, 2)}`}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}