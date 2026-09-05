import { useState } from "react";
import {
  AlertTriangle,
  ShoppingCart,
  Users,
  Activity,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";

import { dashboardData } from "../data/urbanCartData";

function RevenueLeaks({ onBack, onInvestigate }) {
  const { revenueLeaks, metrics } = dashboardData;
  const [selectedLeakId, setSelectedLeakId] = useState(1); // Default to Failed Payments (id: 1)

  const selectedLeak = revenueLeaks.find((l) => l.id === selectedLeakId) || revenueLeaks[0];

  const getIcon = (type) => {
    switch (type) {
      case "Failed Payments":
        return AlertTriangle;
      case "Abandoned Purchases":
        return ShoppingCart;
      case "At-Risk Customers":
        return Users;
      default:
        return Activity;
    }
  };

  const getClass = (severity) => {
    if (severity === "HIGH") return "leak-high";
    if (severity === "MEDIUM") return "leak-medium";
    return "leak-low";
  };

  const formatMoney = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
    return `₹${(amount / 1000).toFixed(1)}K`;
  };

  const recoverablePct = ((metrics.recoverableRevenue / metrics.revenueLeakage) * 100).toFixed(1);

  return (
    <main className="page">

      {/* Header */}
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={15} />
          Back to Overview
        </button>

        <p className="eyebrow">REVENUE INTELLIGENCE</p>
        <h1>Revenue Leaks</h1>
        <p className="page-description">
          REVIVE continuously scans transaction streams for revenue leakage opportunities across UrbanCart.
        </p>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="leak-summary">
        <div className="summary-card">
          <span>Total Leakage</span>
          <strong>{formatMoney(metrics.revenueLeakage)}</strong>
          <small>estimated potential loss</small>
        </div>

        <div className="summary-card">
          <span>Recoverable</span>
          <strong className="green">{formatMoney(metrics.recoverableRevenue)}</strong>
          <small>{recoverablePct}% of detected leakage</small>
        </div>

        <div className="summary-card">
          <span>Opportunities</span>
          <strong>{revenueLeaks.length}</strong>
          <small>detected by REVIVE AI</small>
        </div>
      </div>

      {/* Leak Cards List */}
      <section className="leaks-page-list">
        {revenueLeaks.map((leak) => {
          const Icon = getIcon(leak.type);
          const isSelected = selectedLeakId === leak.id;

          return (
            <div 
              className={`leak-card ${isSelected ? "selected-leak-card" : ""}`} 
              key={leak.id}
              style={{
                borderColor: isSelected ? "#34d399" : undefined,
                boxShadow: isSelected ? "0 0 15px rgba(52, 211, 153, 0.15)" : undefined,
                cursor: "pointer"
              }}
              onClick={() => setSelectedLeakId(leak.id)}
            >
              <div className="leak-card-left">
                <div className={`large-leak-icon ${getClass(leak.severity)}`}>
                  <Icon size={21} />
                </div>

                <div>
                  <div className="leak-title-row">
                    <h2>{leak.type}</h2>
                    <span className={`severity ${getClass(leak.severity)}`}>
                      {leak.severity}
                    </span>
                  </div>

                  <p>
                    {leak.affected} affected records detected by REVIVE's engine. Click to view breakdown.
                  </p>
                </div>
              </div>

              <div className="leak-card-middle">
                <div>
                  <span>Potential Leakage</span>
                  <strong>{formatMoney(leak.amount)}</strong>
                </div>

                <div>
                  <span>Recoverable</span>
                  <strong className="green">
                    {formatMoney(leak.recoverable)}
                  </strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>{leak.priority}/100</strong>
                </div>
              </div>

              <button
                className="investigate-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInvestigate(leak);
                }}
              >
                Investigate
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </section>

      {/* Failed Payments Drill-down Section */}
      {selectedLeak && selectedLeak.type === "Failed Payments" && (
        <section className="drilldown-panel">
          <div className="drilldown-header">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontSize: "11px", fontWeight: 700 }}>
                <Layers size={15} />
                FAILED PAYMENTS DRILL-DOWN
              </div>
              <h2 style={{ margin: "6px 0 0", fontSize: "18px" }}>Failure Category Breakdown & Transactions</h2>
              <p style={{ color: "#718079", fontSize: "10px", margin: "4px 0 0" }}>
                Deep-dive into 127 failed checkout attempts totaling {formatMoney(selectedLeak.amount)}
              </p>
            </div>

            <button 
              className="primary-button" 
              style={{ width: "auto", padding: "8px 16px" }}
              onClick={() => onInvestigate(selectedLeak)}
            >
              <Sparkles size={14} style={{ marginRight: "6px" }} />
              Investigate with AI →
            </button>
          </div>

          {/* Failure Category Cards */}
          <div className="category-grid">
            {selectedLeak.failureCategories && selectedLeak.failureCategories.map((cat) => (
              <div 
                className="category-card" 
                key={cat.name}
                style={{ borderTop: `3px solid ${cat.color}` }}
              >
                <span style={{ color: cat.color, fontWeight: 700 }}>{cat.name}</span>
                <strong>{formatMoney(cat.amount)}</strong>
                <span>{cat.count} customers ({cat.pct}%)</span>
              </div>
            ))}
          </div>

          {/* Affected Customers Table */}
          <h3 style={{ fontSize: "12px", color: "#d1d5db", margin: "16px 0 8px" }}>Sample Affected High-LTV Customer Transactions</h3>
          <div className="table-container">
            <table className="revive-table">
              <thead>
                <tr>
                  <th>Txn ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Failure Reason</th>
                  <th>Last Success</th>
                  <th>Customer LTV</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedLeak.affectedTransactions && selectedLeak.affectedTransactions.map((txn) => (
                  <tr key={txn.id}>
                    <td style={{ fontFamily: "monospace", color: "#9ca3af" }}>{txn.id}</td>
                    <td>
                      <strong>{txn.customer}</strong>
                      <div style={{ color: "#6b7280", fontSize: "8px" }}>{txn.email}</div>
                    </td>
                    <td style={{ fontWeight: 700, color: "#f3f4f6" }}>₹{txn.amount.toLocaleString()}</td>
                    <td>
                      <span style={{ 
                        padding: "2px 6px", 
                        borderRadius: "4px", 
                        background: "#1f2937",
                        fontSize: "8px"
                      }}>
                        {txn.category}
                      </span>
                    </td>
                    <td style={{ color: "#9ca3af" }}>{txn.lastSuccess}</td>
                    <td>
                      <span className="ltv-badge">{txn.ltv}</span>
                    </td>
                    <td>
                      <button 
                        style={{
                          background: "transparent",
                          border: "1px solid #10b981",
                          color: "#34d399",
                          borderRadius: "5px",
                          padding: "3px 8px",
                          fontSize: "8px",
                          cursor: "pointer"
                        }}
                        onClick={() => onInvestigate(selectedLeak)}
                      >
                        Recover →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </main>
  );
}

export default RevenueLeaks;