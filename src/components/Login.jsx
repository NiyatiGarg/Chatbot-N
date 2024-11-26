import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MdOutlineMailLock } from "react-icons/md";
import { MdOutlineLockOpen } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-modal">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
          <MdOutlineMailLock className="icon"/>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
          <MdOutlineLockOpen className="icon"/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>

          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </form>

        <div className="signup-link">
          Don't have an account?
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;