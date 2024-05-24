import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/Login.css';

const LoginPage = (props: {}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.ellen.newbie.sparcsandbox.com/login", 
      { email, 
        password,
      });
      console.log("data"+response.data);
      navigate("/home");
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.status === 403) {
          window.alert("Professor가 아닙니다!");
        } else if (error.response.status === 409) {
          window.alert("User already exists!");
        } else {
          window.alert(error.response.data.message);
        }
      } else {
        window.alert("An error occurred during registration.");
      }
      console.error("There was an error registering!", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="register-form">
      <div className="form-container">
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </div>
      </form>
    </div>
    

  );
};

export default LoginPage;

