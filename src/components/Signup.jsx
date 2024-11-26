import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";
import { MdOutlineMailLock } from "react-icons/md";
import { MdOutlineLockOpen } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! You can now log in.");
      navigate("/login");
      setEmail("");
      setPassword("");
      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-modal">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join us today! Please fill in your details</p>
        </div>

        <form onSubmit={handleSignup} className="signup-form">
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
            <div className="password-requirements">
              Password must be at least 8 characters long
            </div>
          </div>
          <button type="submit" className="signup-button">
            Create Account
          </button>
          <div className="terms-policy">
            By signing up, you agree to our{" "}
            <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </div>
        </form>
        <div className="login-link">
          Already have an account?
          <a href="#">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;