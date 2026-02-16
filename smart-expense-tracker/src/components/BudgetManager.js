import { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function BudgetManager() {
  const { budget, setBudget } = useContext(ExpenseContext);
  const [value, setValue] = useState(budget);

  useEffect(() => {
    setValue(budget);
  }, [budget]);

  const saveBudget = () => {
    setBudget(Number(value));
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-3">
        Monthly Budget
      </h2>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 rounded-md bg-white/20 text-white outline-none"
        placeholder="Enter budget"
      />

      <button
        onClick={saveBudget}
        className="w-full py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
      >
        Save Budget
      </button>
    </div>
  );
}

export default BudgetManager;
