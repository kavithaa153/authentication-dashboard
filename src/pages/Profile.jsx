import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const getStoredUser = () => {
    const storedUser = localStorage.getItem("registeredUser");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser());

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileError, setProfileError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});

  const [toastMessage, setToastMessage] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

  const handleSaveProfile = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName === "") {
      setProfileError("Name is required");
      return;
    }

    if (trimmedName.length < 3) {
      setProfileError("Name must be at least 3 characters");
      return;
    }

    const storedUser = localStorage.getItem("registeredUser");

    if (!storedUser) {
      setProfileError("User profile not found");
      return;
    }

    try {
      const currentUser = JSON.parse(storedUser);

      const updatedUser = {
        ...currentUser,
        name: trimmedName,
      };

      localStorage.setItem(
        "registeredUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
      setName(updatedUser.name);
      setProfileError("");
      setToastMessage("Profile updated successfully!");
    } catch {
      setProfileError("Unable to update profile");
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    const newErrors = {};
    const latestUser = getStoredUser();

    if (!currentPassword) {
      newErrors.currentPassword =
        "Current password is required";
    } else if (
      !latestUser ||
      currentPassword !== latestUser.password
    ) {
      newErrors.currentPassword =
        "Current password is incorrect";
    }

    const newPasswordError = validatePassword(newPassword);

    if (newPasswordError) {
      newErrors.newPassword = newPasswordError;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setPasswordErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const updatedUser = {
      ...latestUser,
      password: newPassword,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors({});
    setIsPasswordModalOpen(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setToastMessage("Password changed successfully!");
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors({});
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  if (!user) {
    return (
      <div className="profile-state-page">
        <div className="profile-state-card">
          <div className="profile-state-icon">!</div>

          <h2>Profile unavailable</h2>

          <p>
            We could not find your registered account.
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  const userInitial =
    user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="profile-page">
      <Sidebar activePage="profile" />

      <main className="profile-main">
        <header className="profile-topbar">
          <button
            type="button"
            className="profile-back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>

          <div className="profile-top-user">
            <span className="profile-top-avatar">
              {userInitial}
            </span>

            <span>{user.name}</span>
          </div>
        </header>

        <div className="profile-content">
          <div className="profile-heading">
            <span className="profile-page-badge">
              ACCOUNT
            </span>

            <h1>Profile</h1>

            <p>
              Manage your personal information and account
              security.
            </p>
          </div>

          <section className="profile-card">
            <div className="profile-card-header">
              <div>
                <h2>Personal Information</h2>

                <p>
                  Update your account information.
                </p>
              </div>
            </div>

            <div className="profile-user-summary">
              <div className="profile-large-avatar">
                {userInitial}
              </div>

              <div>
                <h3>{user.name}</h3>

                <p>{user.email}</p>

                <span>Active account</span>
              </div>
            </div>

            <form
              className="profile-form"
              onSubmit={handleSaveProfile}
            >
              <div className="profile-field">
                <label htmlFor="profile-name">
                  Full Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setProfileError("");
                  }}
                  placeholder="Enter your full name"
                />

                {profileError && (
                  <p className="profile-error">
                    {profileError}
                  </p>
                )}
              </div>

              <div className="profile-field">
                <label htmlFor="profile-email">
                  Email Address
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  readOnly
                />

                <span className="profile-readonly">
                  Email cannot be changed
                </span>
              </div>

              <div className="profile-form-action">
                <button type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          <section className="profile-card">
            <div className="profile-card-header">
              <div>
                <h2>Security</h2>

                <p>
                  Keep your account protected with a secure
                  password.
                </p>
              </div>

              <div className="profile-security-icon">
                🔒
              </div>
            </div>

            <div className="profile-security-row">
              <div>
                <h3>Password</h3>

                <p>
                  Your password is securely stored for your
                  account.
                </p>

                <span className="profile-security-status">
                  ● Password protected
                </span>
              </div>

              <button
                type="button"
                className="profile-secondary-button"
                onClick={() =>
                  setIsPasswordModalOpen(true)
                }
              >
                Change Password
              </button>
            </div>
          </section>
        </div>
      </main>

      <Modal
        isOpen={isPasswordModalOpen}
        title="Change Password"
        onClose={handleClosePasswordModal}
      >
        <form
          className="profile-password-form"
          onSubmit={handleChangePassword}
        >
          <div className="profile-field">
            <label htmlFor="current-password">
              Current Password
            </label>

            <div className="profile-password-wrapper">
              <input
                id="current-password"
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);

                  setPasswordErrors((previousErrors) => ({
                    ...previousErrors,
                    currentPassword: "",
                  }));
                }}
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(
                    !showCurrentPassword
                  )
                }
              >
                {showCurrentPassword ? "Hide" : "Show"}
              </button>
            </div>

            {passwordErrors.currentPassword && (
              <p className="profile-error">
                {passwordErrors.currentPassword}
              </p>
            )}
          </div>

          <div className="profile-field">
            <label htmlFor="new-password">
              New Password
            </label>

            <div className="profile-password-wrapper">
              <input
                id="new-password"
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={(event) => {
                  const value = event.target.value;

                  setNewPassword(value);

                  setPasswordErrors((previousErrors) => ({
                    ...previousErrors,
                    newPassword:
                      validatePassword(value),
                    confirmPassword:
                      confirmPassword !== ""
                        ? value !== confirmPassword
                          ? "Passwords do not match"
                          : ""
                        : "",
                  }));
                }}
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>

            {passwordErrors.newPassword && (
              <p className="profile-error">
                {passwordErrors.newPassword}
              </p>
            )}
          </div>

          <div className="profile-field">
            <label htmlFor="confirm-new-password">
              Confirm New Password
            </label>

            <div className="profile-password-wrapper">
              <input
                id="confirm-new-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(event) => {
                  const value = event.target.value;

                  setConfirmPassword(value);

                  setPasswordErrors((previousErrors) => ({
                    ...previousErrors,
                    confirmPassword:
                      value !== newPassword
                        ? "Passwords do not match"
                        : "",
                  }));
                }}
                placeholder="Confirm new password"
              />

              <button
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

            {passwordErrors.confirmPassword && (
              <p className="profile-error">
                {passwordErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="profile-password-hint">
            Password must contain 8+ characters, uppercase,
            lowercase, number and special character.
          </div>

          <button
            className="profile-change-password-button"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </Modal>

      <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage("")}
      />
    </div>
  );
}

export default Profile;