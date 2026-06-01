import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        name,
        email,
        password
      });

      alert("Signup successful");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-900 via-black to-purple-900">

      <form
        onSubmit={submitHandler}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-96 space-y-4"
      >

        <h2 className="text-2xl font-bold text-white text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full p-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold transition"
        >
          Signup
        </button>

        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;
