import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function ExpenseForm() {
  const { addTransaction } = useContext(ExpenseContext);


  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Food");

  const inputStyle =
    "w-full p-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const submitHandler = e => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      type,
      category
    };

    addTransaction(newTransaction);
    setAmount("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="p-6 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/70 backdrop-blur-md space-y-4"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className={inputStyle}
      />

      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className={inputStyle}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className={inputStyle}
      >
        <option>Food</option>
        <option>Shopping</option>
        <option>Travel</option>
        <option>Bills</option>
      </select>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 transition"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default ExpenseForm;
