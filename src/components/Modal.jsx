import { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, title, children, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal-container"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>{title}</h2>
            <p>Update your account security</p>
          </div>

          <button
            className="modal-close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;