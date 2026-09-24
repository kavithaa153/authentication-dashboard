import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (value) => {
    if (value === "") {
      return "Password is required";
    }

    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain an uppercase letter";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain a lowercase letter";
    }

    if (!/[0-9]/.test(value)) {
      return "Password must contain a number";
    }

    if (!/[!@#$%^&*]/.test(value)) {
      return "Password must contain a special character";
    }

    return "";
  };

  const validateConfirmPassword = (value, passwordValue) => {
    if (value === "") {
      return "Please confirm your password";
    }

    if (value !== passwordValue) {
      return "Passwords do not match";
    }

    return "";
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setPassword(value);
    setSuccessMessage("");

    setErrors((previousErrors) => ({
      ...previousErrors,
      password: validatePassword(value),
      confirmPassword:
        confirmPassword !== ""
          ? validateConfirmPassword(confirmPassword, value)
          : "",
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;

    setConfirmPassword(value);
    setSuccessMessage("");

    setErrors((previousErrors) => ({
      ...previousErrors,
      confirmPassword: validateConfirmPassword(value, password),
    }));
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    const newErrors = {};

    const passwordError = validatePassword(password);

    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const resetEmail = localStorage.getItem("resetEmail");
    const storedUser = localStorage.getItem("registeredUser");

    if (!resetEmail || !storedUser) {
      setErrors({
        password:
          "Password reset session expired. Please try again.",
      });
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      if (resetEmail !== user.email) {
        setErrors({
          password: "Invalid password reset session.",
        });
        return;
      }

      const updatedUser = {
        ...user,
        password: password,
      };

      localStorage.setItem(
        "registeredUser",
        JSON.stringify(updatedUser)
      );

      localStorage.removeItem("resetEmail");

      setErrors({});
      setSuccessMessage("Password reset successful!");

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch {
      setErrors({
        password: "Unable to reset password. Please try again.",
      });
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-header">
          <div className="reset-brand">
            <span className="reset-brand-icon">◆</span>
            Authentication Dashboard
          </div>

          <div className="reset-security-icon">
            🔒
          </div>

          <span className="reset-badge">
            SECURE PASSWORD RESET
          </span>

          <h1>Reset Your Password</h1>

          <p>
            Create a new password to secure your account.
          </p>
        </div>

        <div className="reset-content">
          <form
            className="reset-form"
            onSubmit={handleResetPassword}
          >
            <div className="reset-field">
              <label htmlFor="reset-password">
                New Password
              </label>

              <div className="reset-input-wrapper">
                <input
                  id="reset-password"
                  className="reset-input reset-password-input"
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your new password"
                />

                <button
                  className="reset-toggle"
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="reset-error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="reset-field">
              <label htmlFor="reset-confirm-password">
                Confirm Password
              </label>

              <div className="reset-input-wrapper">
                <input
                  id="reset-confirm-password"
                  className="reset-input reset-password-input"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your new password"
                />

                <button
                  className="reset-toggle"
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="reset-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="reset-password-rules">
              <div className="reset-rules-title">
                Password requirements
              </div>

              <div className="reset-rule">
                <span>✓</span>
                At least 8 characters
              </div>

              <div className="reset-rule">
                <span>✓</span>
                Uppercase and lowercase letters
              </div>

              <div className="reset-rule">
                <span>✓</span>
                At least one number
              </div>

              <div className="reset-rule">
                <span>✓</span>
                At least one special character
              </div>
            </div>

            {successMessage && (
              <div className="reset-success">
                <span>✓</span>
                {successMessage}
              </div>
            )}

            <button
              className="reset-button"
              type="submit"
            >
              Reset Password
            </button>
          </form>

          <button
            className="reset-back"
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

export default ResetPassword;