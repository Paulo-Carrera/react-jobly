import React from "react";

/** Alert component for showing bootstrap-style alerts.
 *
 * { message, type }
 *
 * type is a bootstrap alert className like 'danger' or 'success'
 */

function Alert({ message, type = "danger" }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {Array.isArray(message) ? (
        <ul className="mb-0">
          {message.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      ) : (
        <p className="mb-0">{message}</p>
      )}
    </div>
  );
}

export default Alert;
