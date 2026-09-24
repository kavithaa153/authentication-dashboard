import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  const validatePassword = (value) => {
    if (value === "") {
      return "Password is required";
    }

    return "";
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;

    setEmail(value);
    setSuccessMessage("");

    setErrors((previousErrors) => ({
      ...previousErrors,
      email: validateEmail(value)
    }));
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setPassword(value);
    setSuccessMessage("");

    setErrors((previousErrors) => ({
      ...previousErrors,
      password: validatePassword(value)
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const newErrors = {};

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) {
      newErrors.email = emailError;
    }

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storedUser = localStorage.getItem("registeredUser");

    if (!storedUser) {
      setErrors({
        email: "No registered user found. Please register first."
      });
      return;
    }

    const user = JSON.parse(storedUser);

    const enteredEmail = email.trim().toLowerCase();

    if (enteredEmail !== user.email || password !== user.password) {
      setErrors({
        email: "Invalid email or password"
      });
      return;
    }

    setErrors({});
    setSuccessMessage("Login successful!");

    localStorage.setItem("isLoggedIn", "true");

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual">
          <div className="auth-logo">
            <span className="auth-logo-icon">◆</span>
            Authentication Dashboard
          </div>


          <div className="auth-visual-content">
            <span className="auth-badge">SECURE ACCESS</span>

            <h2>Secure Access for a Brighter Future</h2>

            <p>
              Sign in to securely manage your account and access your dashboard.
            </p>
          </div>

          <div className="auth-decoration">
            <div className="auth-glow auth-glow-one"></div>
            <div className="auth-glow auth-glow-two"></div>

            <div className="auth-security">
              <div className="auth-security-icon">✓</div>

              <div className="auth-security-content">
                <strong>Secure Account</strong>
                <span>Your account is protected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-form-heading">
              <span className="auth-form-label">WELCOME BACK</span>

              <h1>Welcome Back</h1>

              <p className="auth-subtitle">
                Sign in to continue to your account
              </p>
            </div>

            <form onSubmit={handleLogin} autoComplete="off">
              <div className="auth-field">
                <label>Email</label>

                <input
                  className="auth-input"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  autoComplete="off"
                />

                {errors.email && (
                  <p className="auth-error">{errors.email}</p>
                )}
              </div>

              <div className="auth-field">
                <label>Password</label>

                <div className="auth-input-wrapper">
                  <input
                    className="auth-input auth-password-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                  />

                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="auth-error">{errors.password}</p>
                )}
              </div>

              <div className="auth-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                  />
                  Remember me
                </label>

                <button
                  className="auth-link"
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <button className="auth-button" type="submit">
                Login
              </button>
            </form>

            <p className="auth-register-text">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>

      <Toast
        message={successMessage}
        type="success"
        onClose={() => setSuccessMessage("")}
      />
    </div>
  );
}

export default Login;