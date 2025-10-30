import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [token, setToken] = useState("");
  let navigate = useNavigate();


  
  useEffect(() => {
    let jwtToken = localStorage.getItem("token")
    setToken(jwtToken); 
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault();

    let obj = {
      email,
      password,
    };

    try {
      let url = "http://localhost:5000/login";
      let response = await axios.post(url, obj);

      console.log(response.data);
      
      if (response.data.status) {
        localStorage.setItem("token" , response.data.token)
        localStorage.setItem("userId" , response.data.userId)
        
        navigate("/dashboard");
      } else {
        console.log(response.data.message);
      }
      

    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Log in to track your expenses 💰
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">
          <Link
            to="/signup"
            className="text-gray-600 hover:underline font-medium"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
