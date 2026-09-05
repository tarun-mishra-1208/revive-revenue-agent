import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { dashboardData } from "../data/urbanCartData";

function AiActivity({ onBack, onInvestigate }) {
  const { aiActivityData } = dashboardData;
  const { metrics, timeline } = aiActivityData;

  const getEventIcon = (type) => {
    switch (type) {
      case "detection":
        return AlertTriangle;
      case "recovery":
        return Zap;
      case "investigation":
        return Brain;
      case "recommendation":
        return Sparkles;
      default:
        return Activity;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Action Required":
        return { bg: "#2b1717", color: "#ef7777" };
      case "Completed":
        return { bg: "#11281c", color: "#4cda90" };
      case "Verified":
        return { bg: "#152332", color: "#70ace0" };
      default:
        return { bg: "#2b2111", color: "#e8b152" };
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

        <p className="eyebrow">REAL-TIME AGENTIC LOGS</p>
        <h1>REVIVE AI Engine Activity</h1>
        <p className="page-description">
          Audit stream of autonomous detection events, anomaly investigations, confidence scores, and automated recovery actions.
        </p>
      </div>

      {/* Monitoring Stats */}
      <div className="investigation-metrics" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="investigation-metric">
          <Activity size={18} />
          <div>
            <span>Scanned Transactions Today</span>
            <strong>{metrics.scannedToday.toLocaleString()} txns</strong>
          </div>
        </div>

        <div className="investigation-metric" style={{ borderColor: "#45331a" }}>
          <AlertTriangle size={18} style={{ color: "#e8b152" }} />
          <div>
            <span>Anomalies Isolated</span>
            <strong style={{ color: "#e8b152" }}>{metrics.anomaliesDetected} active</strong>
          </div>
        </div>

        <div className="investigation-metric green">
          <ShieldCheck size={18} />
          <div>
            <span>AI Model Confidence</span>
            <strong>{metrics.overallConfidence}% High Confidence</strong>
          </div>
        </div>

        <div className="investigation-metric green">
          <Zap size={18} />
          <div>
            <span>Recovered This Month</span>
            <strong>₹{(metrics.recoveredThisMonth / 1000).toFixed(0)}K</strong>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="drilldown-panel">
        <div className="drilldown-header">
          <div>
            <h2 style={{ fontSize: "16px", margin: 0 }}>Autonomous Activity Stream</h2>
            <p style={{ color: "#718079", fontSize: "9px", margin: "3px 0 0" }}>
              Live event log from REVIVE AI agentic monitor
            </p>
          </div>

          <span className="live-status" style={{ background: "#11281c", padding: "5px 10px", borderRadius: "6px", border: "1px solid #1c402e" }}>
            <i></i> LIVE ENGINE ACTIVE
          </span>
        </div>

        {/* Timeline List */}
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {timeline.map((evt) => {
            const Icon = getEventIcon(evt.type);
            const badge = getStatusBadge(evt.status);

            return (
              <div
                key={evt.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "16px",
                  background: "#111714",
                  border: "1px solid #1f2a24",
                  borderRadius: "10px"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "#16281e",
                    color: "#34d399",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "36px"
                  }}
                >
                  <Icon size={18} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <strong style={{ color: "#f3f4f6", fontSize: "11px" }}>{evt.title}</strong>
                      <span style={{
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: badge.bg,
                        color: badge.color,
                        fontSize: "7px",
                        fontWeight: 700
                      }}>
                        {evt.status}
                      </span>
                    </div>
                    <span style={{ color: "#6b7280", fontSize: "8px" }}>{evt.time}</span>
                  </div>

                  <p style={{ color: "#9ca3af", fontSize: "9px", margin: "5px 0 0", lineHeight: 1.5 }}>
                    {evt.desc}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "8px", fontSize: "8px", color: "#6b7280" }}>
                    <span>Event ID: <code style={{ fontSize: "8px", padding: "1px 4px" }}>{evt.id}</code></span>
                    <span>AI Confidence: <strong style={{ color: "#34d399" }}>{evt.confidence}%</strong></span>
                  </div>
                </div>

                {evt.status === "Action Required" && (
                  <button
                    className="investigate-button"
                    style={{ alignSelf: "center", padding: "6px 10px" }}
                    onClick={() => onInvestigate && onInvestigate(dashboardData.revenueLeaks[0])}
                  >
                    Investigate <ArrowRight size={11} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}

export default AiActivity;
