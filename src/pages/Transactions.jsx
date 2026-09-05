import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  ArrowRight,
} from "lucide-react";

import { dashboardData } from "../data/urbanCartData";

function Transactions({ onBack, onInvestigate }) {
  const { transactionsData } = dashboardData;
  const { metrics, list } = transactionsData;

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredList = list.filter((txn) => {
    const matchesFilter = filter === "All" || txn.status === filter;
    const matchesSearch =
      txn.id.toLowerCase().includes(search.toLowerCase()) ||
      txn.customer.toLowerCase().includes(search.toLowerCase()) ||
      txn.gateway.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Failed":
        return { bg: "#2b1717", color: "#ef7777", border: "#421e1e" };
      case "Recovered":
        return { bg: "#11281c", color: "#4cda90", border: "#1c402e" };
      case "Retry Pending":
        return { bg: "#2b2111", color: "#e8b152", border: "#45331a" };
      default:
        return { bg: "#152332", color: "#70ace0", border: "#1d344b" };
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

        <p className="eyebrow">TRANSACTION LOG & RECOVERY AUDIT</p>
        <h1>Transactions & Gateway Logs</h1>
        <p className="page-description">
          Monitor payment authorization statuses across gateways, track automatic retries, and audit recovered transactions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="investigation-metrics" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="investigation-metric">
          <CreditCard size={18} />
          <div>
            <span>Total Transactions</span>
            <strong>{metrics.totalTransactions.toLocaleString()}</strong>
          </div>
        </div>

        <div className="investigation-metric green">
          <CheckCircle2 size={18} />
          <div>
            <span>Successful Payments</span>
            <strong>{metrics.successful.toLocaleString()}</strong>
          </div>
        </div>

        <div className="investigation-metric" style={{ borderColor: "#421e1e" }}>
          <AlertTriangle size={18} style={{ color: "#ef7777" }} />
          <div>
            <span>Failed Payments</span>
            <strong style={{ color: "#ef7777" }}>{metrics.failed}</strong>
          </div>
        </div>

        <div className="investigation-metric">
          <RefreshCw size={18} style={{ color: "#34d399" }} />
          <div>
            <span>Recovered Transactions</span>
            <strong style={{ color: "#34d399" }}>{metrics.recovered}</strong>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <section className="drilldown-panel">
        <div className="drilldown-header" style={{ flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "16px", margin: 0 }}>Transaction Stream</h2>
            <p style={{ color: "#718079", fontSize: "9px", margin: "3px 0 0" }}>
              Showing {filteredList.length} of {list.length} transactions
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Search Input */}
            <div style={{ position: "relative", width: "220px" }}>
              <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
              <input
                type="text"
                placeholder="Search Txn ID, customer, gateway..."
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
              {["All", "Failed", "Recovered", "Success", "Retry Pending"].map((f) => (
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

        {/* Transactions Table */}
        <div className="table-container">
          <table className="revive-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Gateway</th>
                <th>Status</th>
                <th>Gateway Response / Reason</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((txn) => {
                const badge = getStatusBadge(txn.status);
                return (
                  <tr key={txn.id}>
                    <td style={{ fontFamily: "monospace", color: "#f3f4f6", fontWeight: 600 }}>{txn.id}</td>
                    <td style={{ color: "#d1d5db" }}>{txn.customer}</td>
                    <td style={{ fontWeight: 700, color: "#f3f4f6" }}>₹{txn.amount.toLocaleString()}</td>
                    <td>
                      <span style={{
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: "#1f2937",
                        fontSize: "8px",
                        color: "#9ca3af"
                      }}>
                        {txn.gateway}
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
                        {txn.status}
                      </span>
                    </td>
                    <td style={{ color: "#9ca3af", fontSize: "8px" }}>{txn.reason}</td>
                    <td style={{ color: "#6b7280" }}>{txn.date}</td>
                    <td>
                      {txn.status === "Failed" ? (
                        <button
                          className="investigate-button"
                          style={{ padding: "3px 8px", fontSize: "8px" }}
                          onClick={() => onInvestigate && onInvestigate(dashboardData.revenueLeaks[0])}
                        >
                          Investigate <ArrowRight size={10} />
                        </button>
                      ) : txn.status === "Retry Pending" ? (
                        <span style={{ color: "#e8b152", fontSize: "8px", fontWeight: 600 }}>Auto-Retry Active</span>
                      ) : (
                        <span style={{ color: "#4b5563", fontSize: "8px" }}>Audited</span>
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

export default Transactions;
