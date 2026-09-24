import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ activePage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberMe");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">◆</span>
        Authentication Dashboard
      </div>

      <nav className="sidebar-menu">
        <p className="sidebar-label">MAIN MENU</p>

        <button
          type="button"
          className={`sidebar-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <span>⌂</span>
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className={`sidebar-item ${
            activePage === "profile" ? "active" : ""
          }`}
          onClick={() => navigate("/profile")}
        >
          <span>◯</span>
          <span>Profile</span>
        </button>

        <button
          type="button"
          className={`sidebar-item ${
            activePage === "settings" ? "active" : ""
          }`}
          onClick={() => navigate("/settings")}
        >
          <span>⚙</span>
          <span>Settings</span>
        </button>
      </nav>

      <button
        type="button"
        className="sidebar-item sidebar-logout"
        onClick={handleLogout}
      >
        <span>↪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;