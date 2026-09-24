import { useEffect } from "react";
import "./Toast.css";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === "error" ? "!" : "✓"}
      </div>

      <div className="toast-content">
        <strong>
          {type === "error" ? "Error" : "Success"}
        </strong>

        <p>{message}</p>
      </div>

      <button
        className="toast-close"
        type="button"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export default Toast;