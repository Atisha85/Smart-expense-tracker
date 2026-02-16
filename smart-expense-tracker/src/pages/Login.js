import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );

      loginUser(res.data);
      navigate("/");

    } catch (error) {
      alert(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-900 via-black to-purple-900">

      <form
        onSubmit={submitHandler}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-96 space-y-4"
      >

        <h2 className="text-2xl font-bold text-white text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 caret-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 caret-whiteoutline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-right text-sm">
          <a
            href="/forgot-password"
            className="text-indigo-400 hover:underline"
          >
             Forgot Password?
          </a>
        </div>


        <button
          className="w-full p-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold transition"
        >
          Login
        </button>
        <p className="text-center text-gray-300 text-sm">
           Don’t have an account?{" "}
           <Link
              to="/signup"
              className="text-indigo-400 hover:underline"
           >
              Create account
            </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;
