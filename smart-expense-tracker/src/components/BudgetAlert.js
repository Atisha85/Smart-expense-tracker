import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function BudgetAlert() {
  const { transactions, budget } = useContext(ExpenseContext);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  if (expense > budget * 0.9) {
    return <p style={{color:"red"}}>⚠️ Budget almost exceeded!</p>;
  }

  return (
    <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-3 text-center">
       ⚠️ You are close to exceeding your monthly budget!
    </div>
  );
  
}

export default BudgetAlert;
