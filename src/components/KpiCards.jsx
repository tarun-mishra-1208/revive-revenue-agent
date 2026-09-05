import {
  IndianRupee,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

import { dashboardData } from "../data/urbanCartData";

function KpiCards() {
  const { metrics } = dashboardData;

  const formatMoney = (amount) => {
    return `₹${(amount / 100000).toFixed(2)}L`;
  };

  const cards = [
    {
      title: "Total Revenue",
      value: formatMoney(metrics.totalRevenue),
      change: `↑ ${metrics.revenueChange}%`,
      description: "vs previous period",
      icon: IndianRupee,
      type: "success",
    },
    {
      title: "Revenue Leakage",
      value: formatMoney(metrics.revenueLeakage),
      change: `↑ ${metrics.leakageChange}%`,
      description: "potentially lost",
      icon: AlertTriangle,
      type: "warning",
    },
    {
      title: "Recoverable Revenue",
      value: formatMoney(metrics.recoverableRevenue),
      change: "55.8%",
      description: "of total leakage",
      icon: TrendingUp,
      type: "success",
    },
    {
      title: "Recovery Rate",
      value: `${metrics.recoveryRate}%`,
      change: `↑ ${metrics.recoveryChange}%`,
      description: "this month",
      icon: CheckCircle2,
      type: "success",
    },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="stat-card" key={card.title}>
            <div className="stat-header">
              <span>{card.title}</span>

              <span className={`stat-icon ${card.type}`}>
                <Icon size={15} />
              </span>
            </div>

            <div className="stat-value">
              {card.value}
            </div>

            <div className="stat-footer">
              <span className={card.type === "warning" ? "negative" : "positive"}>
                {card.change}
              </span>

              <span>{card.description}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default KpiCards;