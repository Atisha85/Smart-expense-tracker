import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";



function App() {
  return (
    <div className="min-h-screen">
      <ExpenseProvider>
       <BrowserRouter>
         <Routes>
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />
        
            <Route path="/" element={
              <ProtectedRoute>
               <Dashboard />
              </ProtectedRoute>
         } />

        
         </Routes>
       </BrowserRouter>
      </ExpenseProvider>
    </div>
  );
}

export default App;
