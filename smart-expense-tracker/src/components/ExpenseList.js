import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { motion } from "framer-motion";
import { useState } from "react";

function ExpenseList() {
  const [search, setSearch] = useState("");

  const { transactions, deleteTransaction, deleteAllTransactions } = useContext(ExpenseContext);


  const filtered = transactions.filter(t =>
  t.category.toLowerCase().includes(search.toLowerCase())
  );

 

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-6">
       

      <h3 className="text-xl font-semibold text-white mb-4">
        Transactions
      </h3>

      {transactions.length === 0 && (
        <p className="text-gray-300">No transactions yet</p>
      )}
      <input
         type="text"
         placeholder="Search transactions..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 text-white"
       />


      <ul className="space-y-3">

        {filtered.map((t) => (
           
          <motion.li
            key={t._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center bg-white/25 backdrop-blur-xl p-4 rounded-xl shadow-md hover:shadow-xl transition"
          >

            <div className="text-white">
              <p className="font-medium">{t.category}</p>
              <p className="text-sm text-gray-300">₹{t.amount}</p>
            </div>

            <button
              onClick={() => deleteTransaction(t._id)}

              className="text-red-400 hover:text-red-600 hover:scale-110 transition"
            >
              ✕
            </button>

          </motion.li>

        ))}

      </ul>
      <button
          onClick={() => {
            if (window.confirm("Delete ALL transactions? This cannot be undone.")) {
              deleteAllTransactions();
            }
          }}
          className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete All
        </button>
    </div>
  );
}

export default ExpenseList;
