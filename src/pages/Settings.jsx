import { useState } from "react";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  Store,
  Brain,
  Zap,
  Bell,
  CheckCircle2,
  RotateCcw,
  Sliders,
} from "lucide-react";

import { dashboardData } from "../data/urbanCartData";

function Settings({ onBack }) {
  const { settingsData, merchant } = dashboardData;

  const [aiActive, setAiActive] = useState(settingsData.monitoring.aiEngineActive);
  const [autoRetry, setAutoRetry] = useState(settingsData.automation.autoRetryEnabled);
  const [emailAlerts, setEmailAlerts] = useState(settingsData.notifications.emailAlerts);
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(settingsData.notifications.whatsAppAlerts);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <main className="page">

      {/* Back Header */}
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={15} />
          Back to Overview
        </button>

        <p className="eyebrow">PLATFORM CONFIGURATION</p>
        <h1>Settings & AI Automation</h1>
        <p className="page-description">
          Manage merchant account integration, REVIVE AI monitoring sensitivity, and automated recovery workflow parameters.
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="investigation-grid">

        {/* Left Column: Merchant Profile & AI Monitoring */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          {/* Merchant Profile */}
          <section className="panel">
            <div className="panel-heading" style={{ marginBottom: "16px" }}>
              <div className="ai-heading-icon">
                <Store size={18} />
              </div>
              <div>
                <h2 style={{ fontSize: "14px", margin: 0 }}>Merchant Store Profile</h2>
                <p style={{ color: "#6b7280", fontSize: "8px" }}>Connected store integration</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "9px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <span style={{ color: "#9ca3af" }}>Store Name:</span>
                <strong style={{ color: "#f3f4f6" }}>{merchant.name}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <span style={{ color: "#9ca3af" }}>Business Type:</span>
                <strong style={{ color: "#f3f4f6" }}>{merchant.type}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <span style={{ color: "#9ca3af" }}>Domain URL:</span>
                <code style={{ color: "#34d399", fontSize: "9px" }}>{settingsData.merchant.domain}</code>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <span style={{ color: "#9ca3af" }}>Timezone:</span>
                <span style={{ color: "#d1d5db" }}>{settingsData.merchant.timezone}</span>
              </div>
            </div>
          </section>

          {/* AI Monitoring Engine */}
          <section className="panel">
            <div className="panel-heading" style={{ marginBottom: "16px" }}>
              <div className="ai-heading-icon">
                <Brain size={18} />
              </div>
              <div>
                <h2 style={{ fontSize: "14px", margin: 0 }}>AI Anomaly Engine Settings</h2>
                <p style={{ color: "#6b7280", fontSize: "8px" }}>Configure real-time monitoring sensitivity</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <div>
                  <strong style={{ display: "block", color: "#f3f4f6", fontSize: "10px" }}>Real-time AI Monitoring</strong>
                  <span style={{ color: "#6b7280", fontSize: "8px" }}>Scan all transaction streams every 5 minutes</span>
                </div>
                <input
                  type="checkbox"
                  checked={aiActive}
                  onChange={(e) => setAiActive(e.target.checked)}
                  style={{ accentColor: "#10b981", width: "16px", height: "16px", cursor: "pointer" }}
                />
              </div>

              <div style={{ padding: "12px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px" }}>
                  <span style={{ color: "#9ca3af" }}>Anomaly Sensitivity:</span>
                  <strong style={{ color: "#34d399" }}>{settingsData.monitoring.sensitivity}</strong>
                </div>
                <div style={{ color: "#6b7280", fontSize: "8px", marginTop: "4px" }}>Flags failure rate deviations above 0.05 z-score baseline.</div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Recovery Automation & Notifications */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          {/* Automated Recovery Playbook Settings */}
          <section className="panel">
            <div className="panel-heading" style={{ marginBottom: "16px" }}>
              <div className="ai-heading-icon">
                <Zap size={18} />
              </div>
              <div>
                <h2 style={{ fontSize: "14px", margin: 0 }}>Automated Recovery Rules</h2>
                <p style={{ color: "#6b7280", fontSize: "8px" }}>Auto-retry & communication parameters</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <div>
                  <strong style={{ display: "block", color: "#f3f4f6", fontSize: "10px" }}>Gateway Smart Auto-Retry</strong>
                  <span style={{ color: "#6b7280", fontSize: "8px" }}>Auto-retry failed tokens on off-peak window</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoRetry}
                  onChange={(e) => setAutoRetry(e.target.checked)}
                  style={{ accentColor: "#10b981", width: "16px", height: "16px", cursor: "pointer" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <div>
                  <strong style={{ display: "block", color: "#f3f4f6", fontSize: "10px" }}>Email Recovery Notifications</strong>
                  <span style={{ color: "#6b7280", fontSize: "8px" }}>Send 1-click update emails to affected customers</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ accentColor: "#10b981", width: "16px", height: "16px", cursor: "pointer" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#111714", borderRadius: "8px", border: "1px solid #1f2a24" }}>
                <div>
                  <strong style={{ display: "block", color: "#f3f4f6", fontSize: "10px" }}>WhatsApp 1-Click Messaging</strong>
                  <span style={{ color: "#6b7280", fontSize: "8px" }}>Dispatch WhatsApp checkout links for high-LTV users</span>
                </div>
                <input
                  type="checkbox"
                  checked={whatsAppAlerts}
                  onChange={(e) => setWhatsAppAlerts(e.target.checked)}
                  style={{ accentColor: "#10b981", width: "16px", height: "16px", cursor: "pointer" }}
                />
              </div>
            </div>
          </section>

          {/* Demo Mode & Action Buttons */}
          <section className="panel" style={{ background: "radial-gradient(circle at 100% 0%, rgba(22, 112, 71, 0.15), transparent 45%), #0e1311" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="simulation-label">DEMO MODE ACTIVE</div>
                <h2 style={{ fontSize: "14px", margin: "4px 0 0" }}>Interactive Environment</h2>
                <p style={{ color: "#6b7280", fontSize: "8px", margin: "2px 0 0" }}>Synthetic merchant data for UrbanCart demo</p>
              </div>

              <button
                className="primary-button"
                style={{ width: "auto", padding: "8px 16px" }}
                onClick={handleSave}
              >
                {saveSuccess ? <><CheckCircle2 size={13} style={{ marginRight: "4px" }} /> Saved!</> : "Save Preferences"}
              </button>
            </div>
          </section>

        </div>

      </div>

    </main>
  );
}

export default Settings;
