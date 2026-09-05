import { useState } from "react";
import {
  ArrowLeft,
  Users,
  AlertTriangle,
  Award,
  IndianRupee,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";

import { dashboardData } from "../data/urbanCartData";

function Customers({ onBack, onInvestigate }) {
  const { customersData } = dashboardData;
  const { metrics, list } = customersData;
  
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredList = list.filter((cust) => {
    const matchesFilter = filter === "All" || cust.status === filter;
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Recovery Target":
        return { bg: "#2b1717", color: "#ef7777", border: "#421e1e" };
      case "At Risk":
        return { bg: "#2b2111", color: "#e8b152", border: "#45331a" };
      default:
        return { bg: "#11281c", color: "#4cda90", border: "#1c402e" };
    }
  };

  return (
    <main className="page">

      {/* Back Header */}
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={15} />
          Back to Overview
        </button>

        <p className="eyebrow">CUSTOMER REVENUE INTELLIGENCE</p>
        <h1>Customers & LTV Monitoring</h1>
        <p className="page-description">
          Track customer purchasing health, identify revenue loss targets, and prioritize high-LTV recovery segments.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="investigation-metrics" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="investigation-metric">
          <Users size={18} />
          <div>
            <span>Total Tracked Customers</span>
            <strong>{metrics.totalCustomers.toLocaleString()}</strong>
          </div>
        </div>

        <div className="investigation-metric" style={{ borderColor: "#45331a" }}>
          <AlertTriangle size={18} style={{ color: "#e8b152" }} />
          <div>
            <span>At-Risk Accounts</span>
            <strong style={{ color: "#e8b152" }}>{metrics.atRiskCustomers}</strong>
          </div>
        </div>

        <div className="investigation-metric">
          <Award size={18} style={{ color: "#a855f7" }} />
          <div>
            <span>High-LTV Buyers</span>
            <strong>{metrics.highValueBuyers.toLocaleString()}</strong>
          </div>
        </div>

        <div className="investigation-metric green">
          <IndianRupee size={18} />
          <div>
            <span>Recoverable LTV</span>
            <strong>₹{(metrics.recoverableRevenue / 1000).toFixed(0)}K</strong>
          </div>
        </div>
      </div>

      {/* Table Section with Filters */}
      <section className="drilldown-panel">
        <div className="drilldown-header" style={{ flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "16px", margin: 0 }}>Customer Directory</h2>
            <p style={{ color: "#718079", fontSize: "9px", margin: "3px 0 0" }}>
              Showing {filteredList.length} of {list.length} accounts
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Search Input */}
            <div style={{ position: "relative", width: "220px" }}>
              <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  background: "#111714",
                  border: "1px solid #1f2a24",
                  borderRadius: "8px",
                  padding: "7px 10px 7px 30px",
                  color: "#f3f4f6",
                  fontSize: "9px",
                  outline: "none"
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: "flex", gap: "5px", background: "#111714", padding: "3px", borderRadius: "8px", border: "1px solid #1f2a24" }}>
              {["All", "Recovery Target", "At Risk", "Healthy"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: filter === f ? "#133524" : "transparent",
                    color: filter === f ? "#4ade94" : "#9ca3af",
                    border: "0",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "8px",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="table-container">
          <table className="revive-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name & Email</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>LTV Segment</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((cust) => {
                const badge = getStatusBadge(cust.status);
                return (
                  <tr key={cust.id}>
                    <td style={{ fontFamily: "monospace", color: "#9ca3af" }}>{cust.id}</td>
                    <td>
                      <strong style={{ color: "#f3f4f6", fontSize: "10px" }}>{cust.name}</strong>
                      <div style={{ color: "#6b7280", fontSize: "8px" }}>{cust.email}</div>
                    </td>
                    <td style={{ color: "#d1d5db" }}>{cust.orders} orders</td>
                    <td style={{ fontWeight: 700, color: "#34d399" }}>₹{cust.spent.toLocaleString()}</td>
                    <td>
                      <span className="ltv-badge" style={{
                        background: cust.ltv === "VIP" ? "#2e1065" : cust.ltv === "High" ? "#132b20" : "#1f2937",
                        color: cust.ltv === "VIP" ? "#c084fc" : cust.ltv === "High" ? "#4ade94" : "#9ca3af"
                      }}>
                        {cust.ltv}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        padding: "3px 8px",
                        borderRadius: "5px",
                        background: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`,
                        fontSize: "8px",
                        fontWeight: 700
                      }}>
                        {cust.status}
                      </span>
                    </td>
                    <td style={{ color: "#9ca3af" }}>{cust.lastActive}</td>
                    <td>
                      {cust.status === "Recovery Target" ? (
                        <button
                          className="investigate-button"
                          style={{ padding: "4px 8px", fontSize: "8px" }}
                          onClick={() => onInvestigate && onInvestigate(dashboardData.revenueLeaks[0])}
                        >
                          Recover LTV <ArrowRight size={11} />
                        </button>
                      ) : (
                        <span style={{ color: "#4b5563", fontSize: "8px" }}>Monitored</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}

export default Customers;
