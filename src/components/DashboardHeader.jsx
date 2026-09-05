import { Bell, ChevronDown } from "lucide-react";

function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <p className="eyebrow">OVERVIEW</p>

        <h1>Good morning, UrbanCart</h1>

        <p className="subtitle">
          Here's what REVIVE found across your revenue today.
        </p>
      </div>

      <div className="header-actions">
        <button className="date-button">
          Last 30 days
          <ChevronDown size={14} />
        </button>

        <button className="icon-button">
          <Bell size={17} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          UC
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;