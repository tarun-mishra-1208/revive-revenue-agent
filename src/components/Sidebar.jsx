import {
  LayoutDashboard,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Users,
  CreditCard,
  Activity,
  Settings,
} from "lucide-react";

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="brand">
        <div className="brand-icon">R</div>

        <div>
          <h2>REVIVE</h2>
          <span>Revenue Intelligence</span>
        </div>
      </div>

      {/* Merchant */}
      <div className="merchant">
        <div className="merchant-avatar">U</div>

        <div>
          <strong>UrbanCart</strong>
          <span>D2C Store</span>
        </div>
      </div>

      {/* Navigation */}
     <nav>
  <p className="nav-title">MAIN</p>

  <div
    className={`nav-item ${page === "overview" ? "active" : ""}`}
    onClick={() => setPage("overview")}
  >
    <LayoutDashboard size={17} />
    <span>Overview</span>
  </div>

  <div
    className={`nav-item ${page === "leaks" ? "active" : ""}`}
    onClick={() => setPage("leaks")}
  >
    <AlertTriangle size={17} />
    <span>Revenue Leaks</span>
  </div>

  <div
    className={`nav-item ${page === "investigation" ? "active" : ""}`}
    onClick={() => setPage("investigation")}
  >
    <Sparkles size={17} />
    <span>AI Recommendations</span>
  </div>

  <div
    className={`nav-item ${page === "recovery" ? "active" : ""}`}
    onClick={() => setPage("recovery")}
  >
    <RefreshCw size={17} />
    <span>Recovery</span>
  </div>

  <p className="nav-title">DATA</p>

  <div
    className={`nav-item ${page === "customers" ? "active" : ""}`}
    onClick={() => setPage("customers")}
  >
    <Users size={17} />
    <span>Customers</span>
  </div>

  <div
    className={`nav-item ${page === "transactions" ? "active" : ""}`}
    onClick={() => setPage("transactions")}
  >
    <CreditCard size={17} />
    <span>Transactions</span>
  </div>

  <div
    className={`nav-item ${page === "aiActivity" ? "active" : ""}`}
    onClick={() => setPage("aiActivity")}
  >
    <Activity size={17} />
    <span>AI Activity</span>
  </div>
</nav>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <div
          className={`nav-item ${page === "settings" ? "active" : ""}`}
          onClick={() => setPage("settings")}
        >
          <Settings size={17} />
          <span>Settings</span>
        </div>

        <div className="ai-status">
          <div className="status-dot"></div>

          <div>
            <strong>REVIVE AI</strong>
            <span>Monitoring revenue</span>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;