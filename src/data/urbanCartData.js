// Synthetic UrbanCart data used for the REVIVE demo.
export const dashboardData = {
  merchant: {
    name: "UrbanCart",
    type: "D2C Fashion & Electronics",
    domain: "urbancart.store",
    status: "Active Monitoring",
  },

  metrics: {
    totalRevenue: 482000,
    revenueChange: 12.4,
    revenueLeakage: 414000,
    leakageChange: 8.7,
    recoverableRevenue: 231000,
    recoveryRate: 63.8,
    recoveryChange: 6.2,
  },

  revenueLeaks: [
    {
      id: 1,
      type: "Failed Payments",
      amount: 83000,
      recoverable: 64000,
      affected: 127,
      severity: "HIGH",
      priority: 91,
      failureCategories: [
        { name: "Card Expired", amount: 34800, count: 54, pct: 42, color: "#ed6d6d" },
        { name: "Insufficient Funds", amount: 23200, count: 36, pct: 28, color: "#e6aa4d" },
        { name: "Gateway Timeout", amount: 14900, count: 23, pct: 18, color: "#65a8e0" },
        { name: "Bank Decline", amount: 10100, count: 14, pct: 12, color: "#a855f7" },
      ],
      affectedTransactions: [
        { id: "TXN-8941", customer: "Priya Sharma", email: "priya.s@gmail.com", amount: 4850, category: "Card Expired", lastSuccess: "14 days ago", ltv: "High (₹32K)" },
        { id: "TXN-8938", customer: "Rohan Verma", email: "rohan.v@outlook.com", amount: 12900, category: "Gateway Timeout", lastSuccess: "3 days ago", ltv: "VIP (₹84K)" },
        { id: "TXN-8932", customer: "Ananya Iyer", email: "ananya.i@yahoo.in", amount: 3200, category: "Insufficient Funds", lastSuccess: "21 days ago", ltv: "Medium (₹18K)" },
        { id: "TXN-8929", customer: "Vikram Patel", email: "vikram.p@techcorp.io", amount: 8900, category: "Bank Decline", lastSuccess: "7 days ago", ltv: "High (₹45K)" },
        { id: "TXN-8924", customer: "Neha Gupta", email: "neha.g@gmail.com", amount: 6400, category: "Card Expired", lastSuccess: "30 days ago", ltv: "High (₹29K)" },
      ],
      rootCauseAnalysis: {
        primaryCause: "Saved Token Expiration & Gateway 3DS Timeout Spike",
        summary: "REVIVE detected that 42% of failures are due to expired card tokens after month-end, and 18% are caused by 3DS auth timeouts on Gateway B. 89% of affected users have 3+ previous successful orders.",
        breakdown: [
          { factor: "Expired Card Saved Tokens", impact: "42%", details: "Card expiration date passed; auto-retry blocked without fresh checkout link." },
          { factor: "Insufficient Funds Gap", impact: "28%", details: "End-of-month balance deficit; high conversion rate when retried after 48h." },
          { factor: "Gateway B API Timeout Spike", impact: "18%", details: "3DS verification latency > 8.5s caused session timeout on mobile app." },
          { factor: "Issuer Risk False Positive", impact: "12%", details: "Bank fraud filter flagged high-value electronics checkouts." },
        ]
      }
    },
    {
      id: 2,
      type: "Abandoned Purchases",
      amount: 121000,
      recoverable: 71000,
      affected: 342,
      severity: "MEDIUM",
      priority: 78,
    },
    {
      id: 3,
      type: "At-Risk Customers",
      amount: 210000,
      recoverable: 96000,
      affected: 218,
      severity: "MEDIUM",
      priority: 84,
    },
    {
      id: 4,
      type: "Revenue Anomalies",
      amount: 38000,
      recoverable: 21000,
      affected: 7,
      severity: "LOW",
      priority: 62,
    },
  ],

  aiInsight: {
    title: "Failed payments increased by 23%",
    description:
      "REVIVE identified 127 customers who previously completed successful purchases but recently experienced payment failures.",
    potentialRecovery: 64000,
    priority: 91,
    confidence: 87,
  },

  // CUSTOMERS DATASET
  customersData: {
    metrics: {
      totalCustomers: 10482,
      atRiskCustomers: 218,
      highValueBuyers: 1420,
      recoverableRevenue: 231000,
    },
    list: [
      { id: "CUST-1092", name: "Priya Sharma", email: "priya.s@gmail.com", orders: 12, spent: 32400, ltv: "High", status: "Recovery Target", lastActive: "10 mins ago" },
      { id: "CUST-1088", name: "Rohan Verma", email: "rohan.v@outlook.com", orders: 28, spent: 84200, ltv: "VIP", status: "Recovery Target", lastActive: "2 hours ago" },
      { id: "CUST-1084", name: "Ananya Iyer", email: "ananya.i@yahoo.in", orders: 6, spent: 18200, ltv: "Medium", status: "At Risk", lastActive: "1 day ago" },
      { id: "CUST-1079", name: "Vikram Patel", email: "vikram.p@techcorp.io", orders: 19, spent: 45900, ltv: "High", status: "Healthy", lastActive: "5 mins ago" },
      { id: "CUST-1075", name: "Neha Gupta", email: "neha.g@gmail.com", orders: 14, spent: 29100, ltv: "High", status: "Recovery Target", lastActive: "3 hours ago" },
      { id: "CUST-1062", name: "Karan Malhotra", email: "karan.m@gmail.com", orders: 4, spent: 12500, ltv: "Medium", status: "Healthy", lastActive: "4 days ago" },
      { id: "CUST-1051", name: "Siddharth Rao", email: "siddharth.r@d2c.io", orders: 31, spent: 96000, ltv: "VIP", status: "Healthy", lastActive: "Just now" },
      { id: "CUST-1044", name: "Meera Nair", email: "meera.n@hotmail.com", orders: 8, spent: 21400, ltv: "Medium", status: "At Risk", lastActive: "6 days ago" },
    ]
  },

  // TRANSACTIONS DATASET
  transactionsData: {
    metrics: {
      totalTransactions: 14280,
      successful: 13580,
      failed: 573,
      recovered: 127,
    },
    list: [
      { id: "TXN-8941", customer: "Priya Sharma", amount: 4850, gateway: "Razorpay", status: "Failed", reason: "Card Expired (Code 402)", date: "Today, 01:14 AM" },
      { id: "TXN-8940", customer: "Siddharth Rao", amount: 15400, gateway: "Stripe", status: "Success", reason: "Authorized", date: "Today, 01:05 AM" },
      { id: "TXN-8939", customer: "Arjun Reddy", amount: 8900, gateway: "Paytm", status: "Recovered", reason: "Smart Retry Successful", date: "Yesterday, 11:42 PM" },
      { id: "TXN-8938", customer: "Rohan Verma", amount: 12900, gateway: "Razorpay", status: "Failed", reason: "Gateway 3DS Timeout (Code 501)", date: "Yesterday, 10:15 PM" },
      { id: "TXN-8937", customer: "Kavya Menon", amount: 3600, gateway: "PhonePe", status: "Success", reason: "Authorized", date: "Yesterday, 09:30 PM" },
      { id: "TXN-8936", customer: "Aarav Kapoor", amount: 7200, gateway: "Razorpay", status: "Retry Pending", reason: "Scheduled Auto-Retry", date: "Yesterday, 08:20 PM" },
      { id: "TXN-8932", customer: "Ananya Iyer", amount: 3200, gateway: "Stripe", status: "Failed", reason: "Insufficient Balance", date: "Yesterday, 06:12 PM" },
      { id: "TXN-8929", customer: "Vikram Patel", amount: 8900, gateway: "Razorpay", status: "Failed", reason: "Bank Risk Filter Decline", date: "Yesterday, 04:45 PM" },
      { id: "TXN-8924", customer: "Neha Gupta", amount: 6400, gateway: "Stripe", status: "Recovered", reason: "WhatsApp 1-Click Recovered", date: "2 days ago" },
    ]
  },

  // AI ACTIVITY DATASET
  aiActivityData: {
    metrics: {
      scannedToday: 10482,
      anomaliesDetected: 4,
      overallConfidence: 87,
      recoveredThisMonth: 231000,
    },
    timeline: [
      { id: "EVT-904", time: "Just now", type: "scan", title: "Scanned 10,482 transactions", desc: "REVIVE AI continuous monitoring scan completed. 0 new critical anomalies.", status: "Success", confidence: 99 },
      { id: "EVT-903", time: "12 minutes ago", type: "detection", title: "Detected Failed-Payment Anomaly", desc: "Spike in card expiration declines isolated across 127 high-LTV repeat customers.", status: "Action Required", confidence: 91 },
      { id: "EVT-902", time: "45 minutes ago", type: "recovery", title: "Smart Retry Recovered ₹12,900", desc: "Auto-retry executed on Gateway A off-peak window for account Rohan Verma.", status: "Completed", confidence: 94 },
      { id: "EVT-901", time: "2 hours ago", type: "investigation", title: "AI Root Cause Investigation Complete", desc: "Isolated Gateway B 3DS timeout code 501 as root cause for 18% of failures.", status: "Verified", confidence: 87 },
      { id: "EVT-900", time: "4 hours ago", type: "recommendation", title: "Generated Recovery Playbook #1", desc: "Recommended WhatsApp 1-click checkout recovery for 54 card expiration targets.", status: "Ready", confidence: 89 },
      { id: "EVT-899", time: "Yesterday", type: "recovery", title: "Recovered ₹48,200 via WhatsApp Link", desc: "Targeted message campaign converted 34 abandoned cart buyers.", status: "Completed", confidence: 96 },
    ]
  },

  // SETTINGS DATASET
  settingsData: {
    merchant: {
      name: "UrbanCart",
      email: "finance@urbancart.store",
      currency: "INR (₹)",
      timezone: "Asia/Kolkata (GMT+05:30)",
    },
    monitoring: {
      aiEngineActive: true,
      scanInterval: "Real-time (Every 5 mins)",
      sensitivity: "High (0.05 anomaly threshold)",
    },
    automation: {
      autoRetryEnabled: true,
      smartRoutingEnabled: true,
      maxRetries: 3,
      recoveryDiscount: 5,
    },
    notifications: {
      emailAlerts: true,
      whatsAppAlerts: true,
      weeklyReport: true,
    }
  }
};