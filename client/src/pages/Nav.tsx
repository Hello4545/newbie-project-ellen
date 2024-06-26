import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";
import "./css/Home.css";
import LabsGrid from '../components/LabsGrid.js';

axios.defaults.withCredentials = true;

const Nav = (props: {}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState(0);
  const [dept, setDept] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    try {
      const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string, dept: String}>("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
      console.log(data);
      if (data.id) {
        setName(data.name);
        setEmail(data.email);
        setUserID(data.id);
        setIsProfessor(data.isProfessor);
        // setDept(data.dept);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
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

  const handleApplyList = (user_id: number) => {
    console.log("userID"+user_id);
    navigate("/ApplyList", { state: { user_id :`${user_id}` }});
};
const handleMyApplyList = (user_id: number) => {
  console.log("userID"+user_id);
  navigate("/MyApplyList", { state: { user_id :`${user_id}` }});
};

  return (
    <div>
      <nav className="top-nav">
        <div className="nav-title"><h1 onClick={() => navigate("/")}>Labs</h1></div>
        <div className="nav-message">{isLoggedIn ? `Hello, ${name}!` : 'Please log in.'}</div>
        <div className="nav-buttons">
            {isLoggedIn && isProfessor && <div className="nav-clickable-text" onClick={() => {
                        handleApplyList(userID)
                    }}>View Applications</div>}
            {isLoggedIn && !isProfessor && <div className="nav-clickable-text" onClick={() => {
                        handleMyApplyList(userID)
                    }}>View My Applications</div>}
            {!isLoggedIn && (
                <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Sign Up</button>
                </>
            )}
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
      </nav>
    </div>
  )
};

export default Nav;