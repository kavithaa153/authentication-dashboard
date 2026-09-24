import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateName = (value) => {
    if (value.trim() === "") {
      return "Name is required";
    }

    if (value.trim().length < 3) {
      return "Name must be at least 3 characters";
    }

    return "";
  };

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

  const handleNameChange = (event) => {
    const value = event.target.value;

    setName(value);
    setSuccessMessage("");

    setErrors((previousErrors) => ({
      ...previousErrors,
      name: validateName(value),
    }));
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;

    setEmail(value);
    setSuccessMessage("");

    setErrors((previousErrors) => ({
      ...previousErrors,
      email: validateEmail(value),
    }));
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

  const handleRegister = (event) => {
    event.preventDefault();

    const newErrors = {};

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );

    if (nameError) {
      newErrors.name = nameError;
    }

    if (emailError) {
      newErrors.email = emailError;
    }

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const user = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      };

      localStorage.setItem("registeredUser", JSON.stringify(user));

      setSuccessMessage("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <div className="register-brand">
            <span className="register-brand-icon">◆</span>
            Authentication Dashboard
          </div>

          <div className="register-header-content">
            <span className="register-badge">SECURE ACCOUNT</span>

            <h1>Create Your Account</h1>

            <p>
              Start your secure journey with Authentication Dashboard.
            </p>
          </div>

          <div className="register-header-shape register-shape-one"></div>
          <div className="register-header-shape register-shape-two"></div>
        </div>

        <div className="register-content">
          <div className="register-title">
            <h2>Get Started</h2>

            <p>
              Complete the form below to create your account.
            </p>
          </div>

          <form
            className="register-form"
            onSubmit={handleRegister}
          >
            <div className="register-field">
              <label htmlFor="name">Full Name</label>

              <input
                id="name"
                className="register-input"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your full name"
              />

              {errors.name && (
                <p className="register-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="register-field">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                className="register-input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
              />

              {errors.email && (
                <p className="register-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="register-field">
              <label htmlFor="password">Password</label>

              <div className="register-input-wrapper">
                <input
                  id="password"
                  className="register-input register-password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Create a password"
                />

                <button
                  className="register-toggle"
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="register-error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="register-input-wrapper">
                <input
                  id="confirmPassword"
                  className="register-input register-password-input"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your password"
                />

                <button
                  className="register-toggle"
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
                <p className="register-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="register-password-info">
              <span>✓</span>
              Use 8+ characters with uppercase, lowercase, number and special character
            </div>

            {successMessage && (
              <div className="register-success">
                <span>✓</span>
                {successMessage}
              </div>
            )}

            <button
              className="register-button"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <div className="register-footer">
            <span>Already have an account?</span>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;