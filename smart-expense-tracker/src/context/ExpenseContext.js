import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);

  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) || 0
  );

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/transactions`)

      .then(res => setTransactions(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/transactions",
        transaction
      );

      setTransactions(prev => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/transactions/${id}`
      );

      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAllTransactions = async () => {
    try {
      await axios.delete("http://localhost:5000/api/transactions/delete-all");
      setTransactions([]);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ExpenseContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      deleteAllTransactions,
      budget,
      setBudget
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};
