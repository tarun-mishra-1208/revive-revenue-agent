import {
  AlertTriangle,
  ShoppingCart,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react";

import { dashboardData } from "../data/urbanCartData";

function RevenueLeakMap({ onViewLeaks }) {
  const { revenueLeaks } = dashboardData;

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

  const getColorClass = (severity) => {
    switch (severity) {
      case "HIGH":
        return "leak-high";

      case "MEDIUM":
        return "leak-medium";

      default:
        return "leak-low";
    }
  };

  const formatMoney = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }

    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <section className="panel leak-map-panel">

      {/* Header */}
      <div className="panel-header">

        <div>
          <h2>Revenue Leak Map</h2>

          <p>
            Where potential revenue is being lost
          </p>
        </div>

        <button
  className="view-all-button"
  onClick={onViewLeaks}
>
  View all
  <ArrowRight size={13} />
</button>

      </div>

      {/* Leak List */}
      <div className="leak-map-list">

        {revenueLeaks.map((leak) => {

          const Icon = getIcon(leak.type);

          return (
            <div
              className="leak-map-item"
              key={leak.id}
            >

              {/* Left */}
              <div className="leak-info">

                <div
                  className={`leak-icon ${getColorClass(
                    leak.severity
                  )}`}
                >
                  <Icon size={16} />
                </div>

                <div>

                  <div className="leak-name">
                    {leak.type}
                  </div>

                  <div className="leak-affected">
                    {leak.affected}{" "}
                    {leak.type === "Failed Payments"
                      ? "affected customers"
                      : leak.type === "Abandoned Purchases"
                      ? "abandoned carts"
                      : leak.type === "At-Risk Customers"
                      ? "customers"
                      : "unusual patterns"}
                  </div>

                </div>

              </div>

              {/* Right */}
              <div className="leak-amount">

                <strong>
                  {formatMoney(leak.amount)}
                </strong>

                <span>
                  {formatMoney(leak.recoverable)} recoverable
                </span>

              </div>

            </div>
          );

        })}

      </div>

      {/* Total */}
      <div className="leak-map-total">

        <div>
          <span>Total estimated leakage</span>

          <small>
            Across all detected opportunities
          </small>
        </div>

        <strong>
          {formatMoney(
            dashboardData.metrics.revenueLeakage
          )}
        </strong>

      </div>

    </section>
  );
}

export default RevenueLeakMap;