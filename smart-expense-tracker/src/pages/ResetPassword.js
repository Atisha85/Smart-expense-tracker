import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );

      alert("Password reset successful");
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-900 to-purple-900">
      <form
        onSubmit={submitHandler}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-white text-xl mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded">
          Reset
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
