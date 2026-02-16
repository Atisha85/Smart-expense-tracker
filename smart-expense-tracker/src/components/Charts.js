import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Charts() {
  const { transactions } = useContext(ExpenseContext);

  const categories = ["Food", "Shopping", "Travel", "Bills"];

  const pieData = categories.map(cat => ({
    name: cat,
    value: transactions
      .filter(t => t.category === cat)
      .reduce((a, b) => a + b.amount, 0)
  }));

  const COLORS = ["#6366f1", "#ec4899", "#22c55e", "#f59e0b"];

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-center font-bold mb-4">Category-wise Expense</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={100}>
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
