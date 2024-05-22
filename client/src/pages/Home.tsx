import React from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";
import "./css/Home.css";


const HomePage = (props: {}) => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="top-nav">
        <h1>Hello</h1>
        <button onClick={() => navigate("/Login")}>Login</button>
        <button onClick={() => navigate("/Register")}>Sign Up</button>
      </nav>
      <div className="home">
        <div className="home-banner">
        </div>
      </div>
    </div>
  )
};

export default HomePage;