import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("Reset link sent to email");
    } catch (error) {
      alert(error.response?.data || "Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-900 via-black to-purple-900">

      <form
        onSubmit={submitHandler}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-96 space-y-4"
      >

        <h2 className="text-white text-2xl font-bold text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full p-3 bg-indigo-500 text-white rounded-lg">
          Send Reset Link
        </button>

      </form>
    </div>
  );
}

export default ForgotPassword;
