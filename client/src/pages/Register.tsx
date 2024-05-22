import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";


const RegisterPage = (props: {}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      const response = await axios.post("/api/register", { email, password });
      console.log(response.data);
      // Navigate to a different page on success
      navigate("/Login");
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

  return (
    <div>
        <h1>Register</h1>
        <form>
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
        <button type="submit">Register</button>
        </form>
    </div>
  )
};

export default RegisterPage;