import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function Insights() {
  const { transactions } = useContext(ExpenseContext);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const foodExpense = transactions
    .filter(t => t.category === "Food")
    .reduce((a, b) => a + b.amount, 0);

  if (foodExpense > totalExpense * 0.4) {
    return (
      <div className="bg-blue-100 text-blue-800 p-2 rounded w-80 text-center">
        🍔 You’re spending heavily on Food. Consider optimizing.
      </div>
    );
  }

  return null;
}

export default Insights;
