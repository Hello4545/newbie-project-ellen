import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./css/Apply.css";
import axios from "axios";
import Nav from "./Nav";
import LabsGrid from '../components/LabsGrid.js';
import { useNavigate, useLocation }  from "react-router-dom";

const ApplyListPage = () => {
    
    const location = useLocation();
    const userInfo = { ...location.state };
    console.log(userInfo);
    console.log(userInfo.user_id);
    const user_id = parseInt(userInfo.user_id, 10);
    if(!location.state){
        console.log("error");
    }

    const navigate = useNavigate();
    const [studentNumber, setStudentNumber] = useState("");
    const [yearOfStudy, setYearOfStudy] = useState("");
    const [motivation, setMotivation] = useState("");
    const [researchInterest, setResearchInterest] = useState("");
    const [userID, setUserID] = useState(0);

    const checkLogin = async () => {
        try {
            const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string, dept: String}>("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
            console.log(data);
            if (data.id) {
                setUserID(data.id);
                console.log(data.id);
            // console.log("Response : "+data.id);
            // setIsLoggedIn(response.data.isProfessor);
            }
        } catch (error) {
            console.error('Failed to fetch username:', error);
        }
    };
    useEffect(() => {
        checkLogin();
      }, []);
    return (
        <>
        <Nav />
            
        </>
    
    );
};

export default ApplyListPage;
