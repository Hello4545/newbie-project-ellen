import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import Nav from "./Nav";
import LabsGrid from '../components/LabsGrid.js';
import bannerImage from '../images/background.jpeg';

axios.defaults.withCredentials = true;

const HomePage = (props: {}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    try {
      const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string}>("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
      console.log(data);
      if (data.id) {
        setName(data.name);
        setEmail(data.email);
        setIsProfessor(data.isProfessor);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to fetch username:', error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://api.ellen.newbie.sparcsandbox.com/logout", {withCredentials: true});
      alert('Successfully logged out!');
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  const handleAddLabClick = () => {
    navigate("/AddLab");
  };

  return (
    <>
      <Nav />
      <div className="home">
        <div className="home-banner">
          <img src={bannerImage} className="background-image" alt="Banner"/>
        </div>
        <div className="App">
          <LabsGrid />
        </div>
        {isProfessor && (
          <div className="add-lab-button-container">
            <button className="add-lab-button" onClick={handleAddLabClick}>
              + Add Lab
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
