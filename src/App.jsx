import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import KpiCards from "./components/KpiCards";
import RevenueLeakMap from "./components/RevenueLeakMap";

import RevenueLeaks from "./pages/RevenueLeaks";
import Investigation from "./pages/Investigation";
import Recovery from "./pages/Recovery";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";
import AiActivity from "./pages/AiActivity";
import Settings from "./pages/Settings";
import { dashboardData } from "./data/urbanCartData";

function App() {
  const [page, setPage] = useState("overview");
  const [selectedLeak, setSelectedLeak] = useState(null);

  const activeLeak = selectedLeak || dashboardData.revenueLeaks[0];

  const handleInvestigate = (leak) => {
    setSelectedLeak(leak);
    setPage("investigation");
  };

 const handleRecovery = (leak) => {
  setSelectedLeak(leak);
  setPage("recovery");
};

  return (
    <div className="app">

      <Sidebar page={page} setPage={setPage} />

      <main className="main">

        {/* OVERVIEW */}
        {page === "overview" && (
          <>
            <DashboardHeader />

            <KpiCards />

            <section className="dashboard-grid">

              {/* Revenue Performance */}
              <div className="panel revenue-panel">

                <div className="panel-header">
                  <div>
                    <h2>Revenue Performance</h2>

                    <p>
                      Revenue vs potential revenue over the last 30 days
                    </p>
                  </div>

                  <div className="legend">
                    <span>
                      <i className="legend-dot revenue-dot"></i>
                      Revenue
                    </span>

                    <span>
                      <i className="legend-dot potential-dot"></i>
                      Potential
                    </span>
                  </div>
                </div>

                <div className="chart-placeholder">

                  <div className="chart-value">
                    ₹4.82L
                  </div>

                  <div className="fake-chart">
                    <div style={{ height: "35%" }}></div>
                    <div style={{ height: "45%" }}></div>
                    <div style={{ height: "40%" }}></div>
                    <div style={{ height: "55%" }}></div>
                    <div style={{ height: "62%" }}></div>
                    <div style={{ height: "72%" }}></div>
                    <div style={{ height: "80%" }}></div>
                  </div>

                  <div className="chart-labels">
                    <span>Aug 1</span>
                    <span>Aug 5</span>
                    <span>Aug 10</span>
                    <span>Aug 15</span>
                    <span>Aug 20</span>
                    <span>Aug 25</span>
                    <span>Aug 30</span>
                  </div>

                </div>

              </div>

              {/* Revenue Leak Map */}
              <RevenueLeakMap
  onViewLeaks={() => setPage("leaks")}
/>

            </section>

            <section className="bottom-grid">

              {/* AI Activity */}
              <div className="panel activity-panel">

                <div className="panel-header">

                  <div>
                    <h2>REVIVE AI Activity</h2>

                    <p>
                      What your AI agent has discovered
                    </p>
                  </div>

                  <span className="live-status">
                    <i></i>
                    LIVE
                  </span>

                </div>

                <div className="activity-list">

                  <div className="activity-item">
                    <div className="activity-check">✓</div>

                    <div>
                      <strong>
                        Scanned 10,482 transactions
                      </strong>
                      <span>Just now</span>
                    </div>
                  </div>

                  <div className="activity-item">
                    <div className="activity-check">✓</div>

                    <div>
                      <strong>
                        Detected failed-payment anomaly
                      </strong>
                      <span>2 minutes ago</span>
                    </div>
                  </div>

                  <div className="activity-item">
                    <div className="activity-check">✓</div>

                    <div>
                      <strong>
                        Identified ₹83K potential leakage
                      </strong>
                      <span>3 minutes ago</span>
                    </div>
                  </div>

                  <div className="activity-item">
                    <div className="activity-check">✓</div>

                    <div>
                      <strong>
                        Recovery opportunity ranked #1
                      </strong>
                      <span>4 minutes ago</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* AI Recommendation */}
              <div className="panel opportunity-panel">

                <div className="opportunity-icon">
                  ✦
                </div>

                <p className="opportunity-label">
                  AI RECOMMENDATION
                </p>

                <h2>
                  Recover ₹64K from failed payments
                </h2>

                <p>
                  REVIVE found 127 customers who previously
                  paid successfully but recently experienced
                  payment failures.
                </p>

                <div className="recommendation-meta">

                  <div>
                    <span>Priority</span>
                    <strong className="priority">
                      91 / 100
                    </strong>
                  </div>

                  <div>
                    <span>Confidence</span>
                    <strong>
                      87%
                    </strong>
                  </div>

                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    setSelectedLeak({
                      id: 1,
                      type: "Failed Payments",
                      amount: 83000,
                      recoverable: 64000,
                      affected: 127,
                      severity: "HIGH",
                      priority: 91,
                    });

                    setPage("investigation");
                  }}
                >
                  Investigate Opportunity →
                </button>

              </div>

            </section>

            <footer>
              <span>
                REVIVE AI · Revenue Intelligence Platform
              </span>

              <span>
                UrbanCart · Demo Environment
              </span>
            </footer>
          </>
        )}

        {/* REVENUE LEAKS */}
        {page === "leaks" && (
          <RevenueLeaks
            onBack={() => setPage("overview")}
            onInvestigate={handleInvestigate}
          />
        )}

        {/* AI INVESTIGATION */}
        {page === "investigation" && (
          <Investigation
            leak={activeLeak}
            onBack={() => setPage("leaks")}
            onRecovery={handleRecovery}
          />
        )}
        {page === "recovery" && (
          <Recovery
            leak={activeLeak}
            onBack={() => setPage("investigation")}
          />
        )}

        {/* CUSTOMERS */}
        {page === "customers" && (
          <Customers
            onBack={() => setPage("overview")}
            onInvestigate={handleInvestigate}
          />
        )}

        {/* TRANSACTIONS */}
        {page === "transactions" && (
          <Transactions
            onBack={() => setPage("overview")}
            onInvestigate={handleInvestigate}
          />
        )}

        {/* AI ACTIVITY */}
        {page === "aiActivity" && (
          <AiActivity
            onBack={() => setPage("overview")}
            onInvestigate={handleInvestigate}
          />
        )}

        {/* SETTINGS */}
        {page === "settings" && (
          <Settings
            onBack={() => setPage("overview")}
          />
        )}

      </main>

    </div>
  );
}

export default App;