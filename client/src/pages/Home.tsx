import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";
import "./css/Home.css";

axios.defaults.withCredentials = true;

const HomePage = (props: {}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = async () => {
    try {
      const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string}>("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
      console.log(data);
      // console.log("Response : "+data.id);
      // setIsLoggedIn(response.data.isProfessor);
    } catch (error) {
      console.error('Failed to fetch username:', error);
    }
  };

  // useEffect(() => {
  //   console.log("Current login status:", isLoggedIn);
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await axios.get("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
  //       if (response.status === 200 && response.data.isLoggedIn) {
  //         setIsLoggedIn(true);
  //         console.log('logged in now');
  //       } else {
  //         setIsLoggedIn(false);
  //         console.log('not logged in');
  //       }
  //     } catch (error) {
  //       console.error("Failed to check login status:", error);
  //       setIsLoggedIn(false);
  //     }
  //   };
  //   checkLoginStatus();
  // }, [isLoggedIn]);

  useEffect(() => {
    checkLogin();
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