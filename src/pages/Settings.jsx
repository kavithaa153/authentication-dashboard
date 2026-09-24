import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSaveSettings = (event) => {
    event.preventDefault();

    const settings = {
      emailNotifications,
      securityAlerts,
      twoFactor,
    };

    localStorage.setItem(
      "accountSettings",
      JSON.stringify(settings)
    );

    setToastMessage("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <Sidebar activePage="settings" />

      <main className="settings-main">
        <header className="settings-topbar">
          <button
            type="button"
            className="settings-back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>
        </header>

        <div className="settings-content">
          <div className="settings-heading">
            <span className="settings-badge">PREFERENCES</span>

            <h1>Settings</h1>

            <p>
              Manage your account preferences and security options.
            </p>
          </div>

          <form onSubmit={handleSaveSettings}>
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Notifications</h2>
                  <p>
                    Choose how you want to receive account updates.
                  </p>
                </div>

                <div className="settings-card-icon">
                  ◇
                </div>
              </div>

              <div className="settings-option">
                <div>
                  <h3>Email Notifications</h3>

                  <p>
                    Receive important account updates by email.
                  </p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(event) =>
                      setEmailNotifications(
                        event.target.checked
                      )
                    }
                  />

                  <span></span>
                </label>
              </div>

              <div className="settings-option">
                <div>
                  <h3>Security Alerts</h3>

                  <p>
                    Get notified about important security activity.
                  </p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={securityAlerts}
                    onChange={(event) =>
                      setSecurityAlerts(
                        event.target.checked
                      )
                    }
                  />

                  <span></span>
                </label>
              </div>
            </section>

            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Security</h2>

                  <p>
                    Protect your account with additional security.
                  </p>
                </div>

                <div className="settings-card-icon security">
                  🔒
                </div>
              </div>

              <div className="settings-option">
                <div>
                  <h3>Two-Factor Authentication</h3>

                  <p>
                    Add an additional verification step when signing in.
                  </p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(event) =>
                      setTwoFactor(event.target.checked)
                    }
                  />

                  <span></span>
                </label>
              </div>

              <div className="settings-security-note">
                <span>✓</span>

                <p>
                  Your account is protected by password-based
                  authentication.
                </p>
              </div>
            </section>

            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Account</h2>

                  <p>
                    Manage your account information.
                  </p>
                </div>

                <div className="settings-card-icon">
                  ◯
                </div>
              </div>

              <div className="settings-account-actions">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                >
                  <span>Profile</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/profile")
                  }
                >
                  <span>Change Password</span>
                  <span>→</span>
                </button>
              </div>
            </section>

            <div className="settings-save-area">
              <button
                className="settings-save-button"
                type="submit"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </main>

      <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage("")}
      />
    </div>
  );
}

export default Settings;