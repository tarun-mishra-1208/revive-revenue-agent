import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Users,
  IndianRupee,
  ArrowRight,
  PieChart,
  ShieldAlert,
  Zap,
  Activity,
} from "lucide-react";

function Investigation({ leak, onBack, onRecovery }) {
  if (!leak) {
    return null;
  }

  const isFailedPayment = leak.type === "Failed Payments";
  const categories = leak.failureCategories || [
    { name: "Card Expired", amount: 34800, count: 54, pct: 42, color: "#ed6d6d" },
    { name: "Insufficient Funds", amount: 23200, count: 36, pct: 28, color: "#e6aa4d" },
    { name: "Gateway Timeout", amount: 14900, count: 23, pct: 18, color: "#65a8e0" },
    { name: "Bank Decline", amount: 10100, count: 14, pct: 12, color: "#a855f7" },
  ];

  const rootCauses = leak.rootCauseAnalysis?.breakdown || [
    { factor: "Expired Card Saved Tokens", impact: "42%", details: "Card expiration date passed; auto-retry blocked without fresh checkout link." },
    { factor: "Insufficient Balance Gap", impact: "28%", details: "End-of-month balance deficit; high conversion rate when retried after 48h." },
    { factor: "Gateway B API Timeout Spike", impact: "18%", details: "3DS verification latency > 8.5s caused session timeout on mobile app." },
    { factor: "Issuer Risk False Positive", impact: "12%", details: "Bank fraud filter flagged high-value electronics checkouts." },
  ];

  return (
    <main className="page investigation-page">

      {/* Back */}
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={15} />
        Back to Revenue Leaks
      </button>

      {/* Investigation Header */}
      <div className="investigation-header">
        <div>
          <div className="investigation-label">
            <Brain size={14} />
            AI INVESTIGATION ENGINE
          </div>

          <h1>{leak.type} Anomaly Investigation</h1>

          <p>
            REVIVE analyzed 10,482 transaction logs and isolated a distinct payment failure pattern affecting {leak.affected} high-LTV customers.
          </p>
        </div>

        <span className={`severity large ${leak.severity}`}>
          {leak.severity} PRIORITY · {leak.priority}/100
        </span>
      </div>

      {/* Metrics Bar */}
      <div className="investigation-metrics">
        <div className="investigation-metric">
          <Users size={18} />
          <div>
            <span>Targeted Customers</span>
            <strong>{leak.affected} accounts</strong>
          </div>
        </div>

        <div className="investigation-metric">
          <IndianRupee size={18} />
          <div>
            <span>Estimated Potential Loss</span>
            <strong>₹{(leak.amount / 1000).toFixed(1)}K</strong>
          </div>
        </div>

        <div className="investigation-metric green">
          <CheckCircle2 size={18} />
          <div>
            <span>Recoverable Revenue</span>
            <strong>₹{(leak.recoverable / 1000).toFixed(1)}K (77.1%)</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Findings + Recommendation */}
      <section className="investigation-grid">

        {/* Left Column: AI Findings & Root Cause */}
        <div className="panel investigation-panel" style={{ height: "auto" }}>

          <div className="panel-heading">
            <div className="ai-heading-icon">
              <Brain size={18} />
            </div>
            <div>
              <h2>Investigation Diagnostics & Root Cause</h2>
              <p>Automated root cause identification by REVIVE AI</p>
            </div>
          </div>

          {/* Finding 1: Anomaly */}
          <div className="finding">
            <span className="finding-number">01</span>
            <div>
              <strong>23% Anomaly Spike Detected</strong>
              <p>
                {isFailedPayment
                  ? "REVIVE detected an unusual spike in payment failures over the last 7 days. 89% of affected customers previously had 3+ successful checkouts."
                  : "REVIVE detected unusual transaction patterns resulting in uncaptured revenue."}
              </p>
            </div>
          </div>

          {/* Finding 2: Root Cause Breakdown */}
          <div className="finding">
            <span className="finding-number">02</span>
            <div style={{ width: "100%" }}>
              <strong>Primary Root Cause Analysis</strong>
              <p style={{ marginBottom: "10px" }}>
                {leak.rootCauseAnalysis?.summary || "Primary cause: Expired saved card tokens & 3DS Gateway B verification timeouts."}
              </p>

              <div className="root-cause-box">
                {rootCauses.map((rc) => (
                  <div className="root-cause-item" key={rc.factor}>
                    <div>
                      <div style={{ color: "#e5e7eb", fontSize: "9px", fontWeight: 600 }}>{rc.factor}</div>
                      <div style={{ color: "#6b7280", fontSize: "8px", marginTop: "2px" }}>{rc.details}</div>
                    </div>
                    <span style={{ color: "#34d399", fontWeight: 700, fontSize: "10px", marginLeft: "12px" }}>{rc.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Finding 3: Failure Category Distribution */}
          <div className="finding" style={{ borderBottom: "none" }}>
            <span className="finding-number">03</span>
            <div style={{ width: "100%" }}>
              <strong>Failure Category Distribution</strong>
              <p>Breakdown of loss by underlying decline mechanism:</p>

              <div className="category-bar-wrapper">
                <div className="category-bar-single">
                  {categories.map((c) => (
                    <div 
                      key={c.name}
                      className="category-bar-segment"
                      style={{ width: `${c.pct}%`, background: c.color }}
                      title={`${c.name}: ${c.pct}%`}
                    />
                  ))}
                </div>

                <div className="category-legend">
                  {categories.map((c) => (
                    <div className="category-legend-item" key={c.name}>
                      <span className="legend-color-dot" style={{ background: c.color }} />
                      <span>{c.name} ({c.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Prominent Recommended Recovery */}
        <div className="panel recommendation-panel" style={{ height: "auto" }}>

          <div className="recommendation-top">
            <div className="ai-heading-icon">✦</div>
            <span>RECOMMENDED RECOVERY PLAYBOOK</span>
          </div>

          <h2>Launch Smart Payment Recovery Campaign</h2>

          <p>
            REVIVE recommends executing a contextual recovery playbook:
          </p>

          <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#111a14", padding: "10px", borderRadius: "8px", border: "1px solid #1c2b22" }}>
              <Zap size={15} style={{ color: "#34d399" }} />
              <div>
                <strong style={{ display: "block", fontSize: "9px", color: "#f3f4f6" }}>Gateway Smart Retry</strong>
                <span style={{ fontSize: "8px", color: "#6b7280" }}>Auto-retry on Gateway A during off-peak bank window</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#111a14", padding: "10px", borderRadius: "8px", border: "1px solid #1c2b22" }}>
              <Users size={15} style={{ color: "#34d399" }} />
              <div>
                <strong style={{ display: "block", fontSize: "9px", color: "#f3f4f6" }}>Personalized Checkout Link</strong>
                <span style={{ fontSize: "8px", color: "#6b7280" }}>Deliver 1-click update link via WhatsApp / SMS</span>
              </div>
            </div>
          </div>

          <div className="confidence-box" style={{ marginTop: "20px" }}>
            <div>
              <span>AI Recovery Confidence</span>
              <strong>87% High Confidence</strong>
            </div>

            <div className="confidence-bar">
              <div style={{ width: "87%" }}></div>
            </div>
          </div>

          <div style={{ background: "#0b1510", border: "1px solid #1c3024", padding: "12px", borderRadius: "8px", marginTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#9ca3af" }}>
              <span>Expected Recoverable Revenue:</span>
              <strong style={{ color: "#34d399", fontSize: "11px" }}>₹{(leak.recoverable / 1000).toFixed(0)}K</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#9ca3af", marginTop: "6px" }}>
              <span>Customers Targeted:</span>
              <strong style={{ color: "#f3f4f6" }}>{leak.affected} high-LTV buyers</strong>
            </div>
          </div>

          <button
            className="primary-button recovery-button"
            onClick={() => onRecovery(leak)}
          >
            Start Recovery Playbook
            <ArrowRight size={14} />
          </button>

        </div>

      </section>

      {/* Evidence Signals */}
      <section className="panel evidence-panel">
        <div className="panel-header">
          <div>
            <h2>Investigation Evidence & Signals</h2>
            <p>Empirical data signals verified by REVIVE</p>
          </div>
        </div>

        <div className="evidence-grid">
          <div className="evidence-item">
            <AlertTriangle size={16} />
            <div>
              <strong>Transaction Anomaly Signal</strong>
              <span>Failure rate jumped from 3.2% to 7.8% over 7 days</span>
            </div>
          </div>

          <div className="evidence-item">
            <Users size={16} />
            <div>
              <strong>High LTV Pattern</strong>
              <span>89% of affected users have 3+ previous successful orders</span>
            </div>
          </div>

          <div className="evidence-item">
            <ShieldAlert size={16} />
            <div>
              <strong>Gateway Response Code</strong>
              <span>3DS Timeout code 501 & Expired Token code 402</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Investigation;