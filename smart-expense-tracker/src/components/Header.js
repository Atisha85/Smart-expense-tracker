import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center mb-10">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Smart Expense Tracker
       </h1>

       <p className="text-gray-300">
          Manage your finances intelligently
       </p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />

      </div>
   </div>
  );

}

export default Header;