import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { motion } from "framer-motion";
import CountUp from "react-countup";


function SummaryCards() {
  const { transactions } = useContext(ExpenseContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  
    const cardStyle =
    "p-6 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700";

  return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
    
        <div className={`${cardStyle} border-l-4 border-green-500`}>
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-2xl font-semibold text-green-600">
            ₹<CountUp end={income} duration={1.5} />
          </p>
       </div>

       <div className={`${cardStyle} border-l-4 border-red-500`}>
         <p className="text-sm text-gray-500">Expense</p>
         <p className="text-2xl font-semibold text-green-600">
           ₹<CountUp end={expense} duration={1.5} />
         </p>
       </div>

       <div className={`${cardStyle} border-l-4 border-indigo-500`}>
         <p className="text-sm text-gray-500">Balance</p>
         <p className="text-2xl font-semibold text-green-600">
           ₹<CountUp end={income - expense} duration={1.5} />
         </p>
       </div>

      </div>
  );
}

export default SummaryCards;
