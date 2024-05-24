import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";
import "./css/Home.css";


const HomePage = (props: {}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/check-login");
        if (response.status === 200 && response.data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div>
      <nav className="top-nav">
        <h1>Hello {isLoggedIn ? 'Hello' : ''}</h1>
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