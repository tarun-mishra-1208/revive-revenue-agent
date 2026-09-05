import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Users,
  IndianRupee,
  MessageSquare,
  CreditCard,
  BarChart3,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Terminal,
} from "lucide-react";

function Recovery({ leak, onBack }) {
  const [simState, setSimState] = useState("idle"); // "idle" | "running" | "completed"
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const consoleEndRef = useRef(null);

  if (!leak) {
    return null;
  }

  const recoverableAmount = leak.recoverable || 64000;
  const recoverableStr = `₹${(recoverableAmount / 1000).toFixed(0)}K`;

  const runSimulation = () => {
    setSimState("running");
    setProgress(0);
    setLogs([]);
    setActiveStepIndex(0);

    const logSequence = [
      { time: 200, step: 0, text: "[0.2s] [REVIVE Engine] Initializing recovery campaign for 127 affected accounts...", pct: 15 },
      { time: 800, step: 1, text: "[0.8s] [Segment Analyzer] Isolated 127 high-LTV repeat buyers with past successful history.", pct: 35 },
      { time: 1500, step: 1, text: "[1.5s] [Dispatch Service] Generating personalized 1-click recovery links via WhatsApp & Email.", pct: 55 },
      { time: 2300, step: 2, text: "[2.3s] [Smart Retry Router] Executing off-peak token refresh on Gateway A for expired card accounts.", pct: 75 },
      { time: 3100, step: 3, text: "[3.1s] [Gateway Auth] 98 transactions authorized & captured. Total recovered: ₹64,000.", pct: 90 },
      { time: 3800, step: 3, text: "[3.8s] [Campaign Complete] Recovery successful! Revenue metrics & merchant dashboard updated.", pct: 100 },
    ];

    logSequence.forEach((item) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
        setProgress(item.pct);
        setActiveStepIndex(item.step);

        if (item.pct === 100) {
          setTimeout(() => {
            setSimState("completed");
          }, 400);
        }
      }, item.time);
    });
  };

  const resetSimulation = () => {
    setSimState("idle");
    setProgress(0);
    setLogs([]);
    setActiveStepIndex(0);
  };

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <main className="page recovery-page">

      {/* Back */}
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={15} />
        Back to Investigation
      </button>

      {/* Header */}
      <div className="recovery-header">
        <div>
          <div className="investigation-label">
            <Play size={13} />
            RECOVERY PLAYBOOK & CAMPAIGN
          </div>

          <h1>Recover Lost Revenue</h1>

          <p>
            REVIVE created an automated recovery campaign targeted at {leak.affected} high-LTV customers affected by {leak.type.toLowerCase()}.
          </p>
        </div>

        <div className="recovery-status" style={{
          borderColor: simState === "completed" ? "#34d399" : simState === "running" ? "#e5ad50" : undefined,
          color: simState === "completed" ? "#34d399" : simState === "running" ? "#e5ad50" : undefined,
        }}>
          {simState === "completed" ? "CAMPAIGN EXECUTED SUCCESSFULLY" : simState === "running" ? "SIMULATION RUNNING..." : "READY TO LAUNCH"}
        </div>
      </div>

      {/* Metrics Header */}
      <div className="investigation-metrics">
        <div className="investigation-metric green">
          <IndianRupee size={18} />
          <div>
            <span>Recoverable Revenue</span>
            <strong>{recoverableStr}</strong>
          </div>
        </div>

        <div className="investigation-metric">
          <Users size={18} />
          <div>
            <span>Customers Targeted</span>
            <strong>{leak.affected} accounts</strong>
          </div>
        </div>

        <div className="investigation-metric">
          <BarChart3 size={18} />
          <div>
            <span>AI Confidence</span>
            <strong>87% High Confidence</strong>
          </div>
        </div>
      </div>

      {/* Recommended Playbook Steps */}
      <section className="panel recovery-panel">
        <div className="panel-header">
          <div>
            <h2>Automated Recovery Workflow</h2>
            <p>4-stage playbook execution pipeline by REVIVE AI</p>
          </div>
        </div>

        <div className="recovery-steps">

          {/* Step 1 */}
          <div className={`recovery-step ${activeStepIndex >= 0 ? "active" : ""}`}>
            <div className={`step-number ${simState === "completed" || activeStepIndex > 0 ? "completed" : ""}`}>
              <CheckCircle2 size={16} />
            </div>
            <div className="step-content">
              <div className="step-title">
                1. Identify & Segment Affected Customers
                <span className={activeStepIndex >= 0 ? "step-complete" : "step-next"}>
                  {simState === "completed" || activeStepIndex > 0 ? "COMPLETED" : "READY"}
                </span>
              </div>
              <p>Target {leak.affected} customers with verified previous successful purchase history.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`recovery-step ${activeStepIndex >= 1 ? "active" : ""}`}>
            <div className={`step-number ${simState === "completed" || activeStepIndex > 1 ? "completed" : ""}`}>
              <MessageSquare size={16} />
            </div>
            <div className="step-content">
              <div className="step-title">
                2. Send Personalized Recovery Communications
                <span className={simState === "completed" || activeStepIndex > 1 ? "step-complete" : activeStepIndex === 1 ? "step-next" : ""}>
                  {simState === "completed" || activeStepIndex > 1 ? "COMPLETED" : activeStepIndex === 1 ? "RUNNING" : "PENDING"}
                </span>
              </div>
              <p>Deliver contextual WhatsApp/Email notifications with a pre-authenticated 1-click checkout link.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`recovery-step ${activeStepIndex >= 2 ? "active" : ""}`}>
            <div className={`step-number ${simState === "completed" || activeStepIndex > 2 ? "completed" : ""}`}>
              <CreditCard size={16} />
            </div>
            <div className="step-content">
              <div className="step-title">
                3. Gateway Smart Retry Routing
                <span className={simState === "completed" || activeStepIndex > 2 ? "step-complete" : activeStepIndex === 2 ? "step-next" : ""}>
                  {simState === "completed" || activeStepIndex > 2 ? "COMPLETED" : activeStepIndex === 2 ? "RUNNING" : "PENDING"}
                </span>
              </div>
              <p>Reroute failed card tokens through Gateway A off-peak token refresh protocol.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className={`recovery-step ${activeStepIndex >= 3 ? "active" : ""}`}>
            <div className={`step-number ${simState === "completed" ? "completed" : ""}`}>
              <BarChart3 size={16} />
            </div>
            <div className="step-content">
              <div className="step-title">
                4. Track & Update Recovered Revenue
                <span className={simState === "completed" ? "step-complete" : activeStepIndex === 3 ? "step-next" : ""}>
                  {simState === "completed" ? "COMPLETED" : activeStepIndex === 3 ? "RUNNING" : "PENDING"}
                </span>
              </div>
              <p>Reconcile captured funds, update recovery metrics, and calculate net merchant return.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Simulation Area */}
      {simState === "idle" && (
        <section className="panel simulation-panel">
          <div>
            <div className="simulation-label">DEMO MODE · INTERACTIVE RECOVERY</div>
            <h2>Simulate Recovery Campaign</h2>
            <p>
              Run an in-app execution simulation to witness how REVIVE automatically recovers revenue from this opportunity.
            </p>
          </div>

          <button className="primary-button simulation-button" onClick={runSimulation}>
            <Play size={14} />
            Simulate Recovery
          </button>
        </section>
      )}

      {/* Running / Completed Simulation Panel */}
      {(simState === "running" || simState === "completed") && (
        <section className="simulation-running-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontSize: "10px", fontWeight: 700 }}>
                <Terminal size={14} />
                LIVE CAMPAIGN SIMULATION CONSOLE
              </div>
              <h2 style={{ margin: "4px 0 0", fontSize: "16px" }}>
                {simState === "running" ? "Executing Automated Recovery..." : "Simulation Complete"}
              </h2>
            </div>

            {simState === "completed" && (
              <button 
                className="primary-button" 
                style={{ width: "auto", padding: "7px 14px", background: "#1f2937", border: "1px solid #374151" }}
                onClick={resetSimulation}
              >
                <RotateCcw size={13} style={{ marginRight: "5px" }} />
                Run Another Simulation
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="sim-progress-bar-bg">
            <div className="sim-progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Real-time Log Stream Console */}
          <div className="log-console">
            {logs.map((log, idx) => (
              <div className="log-line" key={idx}>
                {log}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          {/* Before vs After Impact Metrics (On Completion) */}
          {simState === "completed" && (
            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #1c2b22" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontWeight: 700, fontSize: "12px", marginBottom: "14px" }}>
                <Sparkles size={16} />
                CAMPAIGN IMPACT & BEFORE VS AFTER METRICS
              </div>

              <div className="before-after-grid">
                <div className="metric-comparison-card">
                  <label>Revenue Leakage</label>
                  <div style={{ marginTop: "6px" }}>
                    <span className="val-before">₹83,000</span>
                    <span className="val-after">₹19,000</span>
                  </div>
                  <div style={{ fontSize: "8px", color: "#34d399", marginTop: "4px" }}>-77.1% reduction</div>
                </div>

                <div className="metric-comparison-card">
                  <label>Recovered Revenue</label>
                  <div style={{ marginTop: "6px" }}>
                    <span className="val-before">₹0</span>
                    <span className="val-after">₹64,000</span>
                  </div>
                  <div style={{ fontSize: "8px", color: "#34d399", marginTop: "4px" }}>+₹64,000 net gain</div>
                </div>

                <div className="metric-comparison-card">
                  <label>Recovery Rate</label>
                  <div style={{ marginTop: "6px" }}>
                    <span className="val-before">63.8%</span>
                    <span className="val-after">77.1%</span>
                  </div>
                  <div style={{ fontSize: "8px", color: "#34d399", marginTop: "4px" }}>+13.3% rate boost</div>
                </div>

                <div className="metric-comparison-card">
                  <label>Recovered Accounts</label>
                  <div style={{ marginTop: "6px" }}>
                    <span className="val-before">0 / 127</span>
                    <span className="val-after">98 / 127</span>
                  </div>
                  <div style={{ fontSize: "8px", color: "#34d399", marginTop: "4px" }}>77.2% success rate</div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

    </main>
  );
}

export default Recovery;