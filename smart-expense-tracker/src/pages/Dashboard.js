import React, { useContext } from "react";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BudgetManager from "../components/BudgetManager";

import { ExpenseContext } from "../context/ExpenseContext";

const Dashboard = () => {
  const { transactions, budget, setBudget, deleteAllTransactions } = useContext(ExpenseContext);

// Helper to calculate expense by category
  const getCategoryTotal = (category) =>
    transactions
      .filter(t =>
        t.type?.toLowerCase() === "expense" &&
        t.category?.toLowerCase() === category.toLowerCase()
      )
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

// Total expense
   const totalExpense = transactions
     .filter(t => t.type?.toLowerCase() === "expense")
     .reduce((sum, t) => sum + Number(t.amount || 0), 0);

const foodExpense = getCategoryTotal("food");
const shoppingExpense = getCategoryTotal("shopping");
const travelExpense = getCategoryTotal("travel");

// Threshold = 40%
const isHeavy = (amount) =>
  totalExpense > 0 && amount / totalExpense > 0.4;

const foodAlert = isHeavy(foodExpense);
const shoppingAlert = isHeavy(shoppingExpense);
const travelAlert = isHeavy(travelExpense);

// Budget alert
const budgetExceeded = totalExpense > budget;


  

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

      <Header />

      <h1 className="text-3xl font-bold">
        Smart Expense Tracker
      </h1>
      <div className="space-y-2">
        {foodAlert && (
          <div className="food-alert">
            🍔 You’re spending heavily on Food. Consider optimizing.
          </div>
        )}
        {shoppingAlert && (
         <div className="alert-card">
           🛍 Shopping expenses are high. Try reducing impulse purchases.
         </div>
        )}

        {travelAlert && (
          <div className="alert-card">
             ✈ Travel spending is high this period.
          </div>
        )}

        {budgetExceeded && (
          <div className="alert-danger">
            🚨 Budget exceeded! Review your expenses.
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="glass-card p-6">
        <SummaryCards />
      </div>

      {/* Budget */}
      <div className="glass-card p-6">
        <BudgetManager />
      </div>

      {/* Add transaction */}
      <div className="glass-card p-6">
        <ExpenseForm />
      </div>

      {/* Charts */}
      <div className="glass-card p-6">
        <Charts />
      </div>

      {/* Expense list */}
      <div className="glass-card p-6">
        <ExpenseList />
      </div>
      

      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Logout
      </button>

    </div>
  );
};

export default Dashboard;
