import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";


const RegisterPage = (props: {}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://ssal.sparcs.org:17305/register", { email, password });
      console.log(response.data);
      navigate("/login"); // Navigate to login on success
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
};

export default RegisterPage;