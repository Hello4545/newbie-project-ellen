import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/Register.css';

const RegisterPage = (props: {}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleProfessorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProfessor(e.target.checked);
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.ellen.newbie.sparcsandbox.com/register", 
      { email, 
        password, 
        isProfessor, 
        name, 
        dept: department, 
      });
      console.log("data"+response.data);
      navigate("/login"); // Navigate to login on success
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
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-container">
          <h1>Sign Up</h1>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={department}
              onChange={handleDepartmentChange}
              required
            >
              <option value="">Select a department</option>
              <option value="Aerospace Engineering">Aerospace Engineering</option>
              <option value="Bio and Brain Engineering">Bio and Brain Engineering</option>
              <option value="Business and Technology Management">Biology</option>
              <option value="Chemical and Biomolecular Engineering">Chemical and Biomolecular Engineering</option>
              <option value="Civil and Environmental Engineering">Civil and Environmental Engineering</option>
              <option value="Industrial & System Engineering">Industrial & System Engineering</option>
              <option value="Industrial Design">Industrial Design</option>
              <option value="Materials Science & Engineering">Materials Science & Engineering</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Nuclear & Quantum Engineering">Nuclear & Quantum Engineering</option>
              <option value="School of Computing">School of Computing</option>
              <option value="School of Electrical Engineering">School of Electrical Engineering</option>
            </select>
          </div>
          <div className="role-section">
            <div className="role-label">I am a...</div>
              <div className="role-options">
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
              </div>
          </div>
          <button type="submit" className="submit-button">Register</button>
        </div>
      </form>
    </div>
    

  );
};

export default RegisterPage;

