import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function SmartAlerts() {
  const { transactions, budget } = useContext(ExpenseContext);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  if (expense >= budget) {
    return (
      <div className="bg-red-100 text-red-700 p-2 rounded w-80 text-center">
        ❌ Budget exceeded! Reduce spending.
      </div>
    );
  }

  if (expense >= budget * 0.8) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-2 rounded w-80 text-center">
        ⚠️ You’ve used 80% of your budget.
      </div>
    );
  }

  return null;
}

export default SmartAlerts;
