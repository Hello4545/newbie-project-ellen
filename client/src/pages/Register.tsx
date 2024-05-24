import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import './css/Register.css';

const RegisterPage = (props: {}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleProfessorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProfessor(e.target.checked);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.ellen.newbie.sparcsandbox.com/register", { email, password, isProfessor });
      console.log(response.data);
      navigate("/login"); // Navigate to login on success
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
        <section>
          <span>I am a...:</span>
          <input
            type="radio"
            name="role"
            id="professor"
            value="Professor"
            onChange={handleProfessorChange}
            checked={isProfessor}
          />
          <label htmlFor="professor">Professor</label>
          <input
            type="radio"
            name="role"
            id="student"
            value="Student"
            onChange={() => setIsProfessor(false)}
            checked={!isProfessor}
          />
          <label htmlFor="student">Student</label>
        </section>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterPage;
