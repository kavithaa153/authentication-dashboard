import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem("registeredUser");

      if (!storedUser) {
        setError("Unable to load user information.");
        setLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);
      } catch {
        setError("Unable to load user information.");
        setLoading(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-page">
        <div className="dashboard-loader"></div>

        <h2>Loading Dashboard</h2>

        <p>
          Please wait while we load your account.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-state-page">
        <div className="dashboard-state-card">
          <div className="dashboard-state-icon error-icon">
            !
          </div>

          <h2>Unable to load your dashboard</h2>

          <p>{error}</p>

          <button
            className="dashboard-primary-button"
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const searchValue = search.trim().toLowerCase();

  const searchResults = [
    {
      title: user.name,
      description: "User Profile",
    },
    {
      title: user.email,
      description: "Registered Email",
    },
    {
      title: "Profile",
      description: "Account information",
    },
    {
      title: "Change Password",
      description: "Security settings",
    },
  ].filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue)
  );

  const userInitial =
    user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="dashboard-page">
      <Sidebar activePage="dashboard" />

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-mobile-brand">
            <span className="dashboard-brand-icon">◆</span>
            Authentication Dashboard
          </div>

          <div className="dashboard-search">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search..."
            />
          </div>

          <div className="dashboard-top-actions">
            <button
              className="dashboard-icon-button"
              type="button"
            >
              ♢
            </button>

            <button
              className="dashboard-profile-button"
              type="button"
              onClick={() => navigate("/profile")}
            >
              <span className="dashboard-avatar">
                {userInitial}
              </span>

              <span className="dashboard-profile-name">
                {user.name}
              </span>

              <span className="dashboard-chevron">
                ⌄
              </span>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-heading">
            <div>
              <h1>
                Welcome back, {user.name}!
              </h1>

              <p>
                Here&apos;s what&apos;s happening with your
                account today.
              </p>
            </div>

            <div className="dashboard-status">
              <span></span>
              Account Active
            </div>
          </div>

          {search ? (
            <div className="dashboard-search-results">
              <div className="dashboard-section-heading">
                <h2>Search Results</h2>

                <p>
                  Results matching &quot;{search}&quot;
                </p>
              </div>

              {searchResults.length === 0 ? (
                <EmptyState
                  title="No results found"
                  message="Try searching with a different keyword."
                />
              ) : (
                <div className="dashboard-result-grid">
                  {searchResults.map((item, index) => (
                    <div
                      className="dashboard-result-card"
                      key={index}
                    >
                      <div className="dashboard-result-icon">
                        ◇
                      </div>

                      <div>
                        <h3>{item.title}</h3>

                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="dashboard-stats">
                <div className="dashboard-stat-card">
                  <div className="dashboard-stat-icon blue">
                    ◉
                  </div>

                  <div>
                    <p>Total Users</p>
                    <h3>01</h3>
                  </div>
                </div>

                <div className="dashboard-stat-card">
                  <div className="dashboard-stat-icon green">
                    ◉
                  </div>

                  <div>
                    <p>Active Sessions</p>
                    <h3>01</h3>
                  </div>
                </div>

                <div className="dashboard-stat-card">
                  <div className="dashboard-stat-icon purple">
                    ✓
                  </div>

                  <div>
                    <p>Account Status</p>
                    <h3>Active</h3>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <section className="dashboard-panel activity-panel">
                  <div className="dashboard-panel-heading">
                    <div>
                      <h2>Recent Activity</h2>

                      <p>
                        Your latest account activity
                      </p>
                    </div>

                    <button type="button">
                      View all
                    </button>
                  </div>

                  <div className="dashboard-activity-list">
                    <div className="dashboard-activity-item">
                      <div className="activity-icon blue">
                        ✓
                      </div>

                      <div>
                        <h3>Login successful</h3>
                        <p>Just now</p>
                      </div>
                    </div>

                    <div className="dashboard-activity-item">
                      <div className="activity-icon purple">
                        ◯
                      </div>

                      <div>
                        <h3>Profile updated</h3>
                        <p>2 hours ago</p>
                      </div>
                    </div>

                    <div className="dashboard-activity-item">
                      <div className="activity-icon red">
                        🔒
                      </div>

                      <div>
                        <h3>Password changed</h3>
                        <p>1 day ago</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="dashboard-panel statistics-panel">
                  <div className="dashboard-panel-heading">
                    <div>
                      <h2>Statistics</h2>
                      <p>Account activity</p>
                    </div>

                    <select defaultValue="week">
                      <option value="week">
                        This Week
                      </option>

                      <option value="month">
                        This Month
                      </option>
                    </select>
                  </div>

                  <div className="dashboard-chart">
                    <div className="chart-bars">
                      <span style={{ height: "35%" }}></span>
                      <span style={{ height: "55%" }}></span>
                      <span style={{ height: "42%" }}></span>
                      <span style={{ height: "72%" }}></span>
                      <span style={{ height: "50%" }}></span>
                      <span style={{ height: "82%" }}></span>
                      <span style={{ height: "67%" }}></span>
                      <span style={{ height: "92%" }}></span>
                    </div>

                    <div className="chart-labels">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </section>
              </div>

              <section className="dashboard-panel quick-actions-panel">
                <div className="dashboard-panel-heading">
                  <div>
                    <h2>Quick Actions</h2>
                    <p>Manage your account</p>
                  </div>
                </div>

                <div className="dashboard-actions">
                  <button
                    className="dashboard-action-card"
                    type="button"
                    onClick={() =>
                      navigate("/profile")
                    }
                  >
                    <span className="action-icon blue">
                      ◯
                    </span>

                    <span>
                      <strong>Profile</strong>
                      <small>Edit profile</small>
                    </span>
                  </button>

                  <button
                    className="dashboard-action-card"
                    type="button"
                  >
                    <span className="action-icon purple">
                      ⚙
                    </span>

                    <span>
                      <strong>Settings</strong>
                      <small>Account settings</small>
                    </span>
                  </button>

                  <button
                    className="dashboard-action-card"
                    type="button"
                    onClick={() =>
                      navigate("/profile")
                    }
                  >
                    <span className="action-icon red">
                      🔒
                    </span>

                    <span>
                      <strong>Security</strong>
                      <small>Change password</small>
                    </span>
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;