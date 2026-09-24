import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (value.trim() === "") {
      return "Email is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value.trim())) {
      return "Please enter a valid email";
    }

    return "";
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;

    setEmail(value);
    setSuccessMessage("");
    setError(validateEmail(value));
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    const storedUser = localStorage.getItem("registeredUser");

    if (!storedUser) {
      setError("No registered user found");
      return;
    }

    const user = JSON.parse(storedUser);

    if (email.trim().toLowerCase() !== user.email) {
      setError("No account found with this email");
      return;
    }

    setError("");
    setSuccessMessage(
      "Email verified. You can reset your password."
    );

    localStorage.setItem(
      "resetEmail",
      email.trim().toLowerCase()
    );

    setTimeout(() => {
      navigate("/reset-password");
    }, 800);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-icon">✉</div>

        <div className="forgot-brand">
          <span className="forgot-brand-icon">◆</span>
          Authentication Dashboard
        </div>

        <div className="forgot-content">
          <span className="forgot-badge">ACCOUNT RECOVERY</span>

          <h1>Forgot Password?</h1>

          <p className="forgot-description">
            Enter your registered email address and we'll help you
            securely reset your password.
          </p>

          <form onSubmit={handleForgotPassword}>
            <div className="forgot-field">
              <label htmlFor="forgot-email">
                Email Address
              </label>

              <input
                id="forgot-email"
                className="forgot-input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your registered email"
              />

              {error && (
                <p className="forgot-error">{error}</p>
              )}
            </div>

            {successMessage && (
              <div className="forgot-success">
                <span>✓</span>
                {successMessage}
              </div>
            )}

            <button
              className="forgot-button"
              type="submit"
            >
              Continue
            </button>
          </form>

          <button
            className="forgot-back"
            type="button"
            onClick={() => navigate("/login")}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;