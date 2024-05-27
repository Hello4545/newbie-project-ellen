import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./css/ApplyList.css";
import axios from "axios";
import Nav from "./Nav";
import LabsGrid from '../components/LabsGrid.js';
import { useNavigate, useLocation }  from "react-router-dom";
import MyApplicationList from '../components/MyApplicationList';

const MyApplyListPage = () => {
    
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
    const [profID, setProfID] = useState(0);
    const [apps, setApps] = useState([]);

    const checkLogin = async () => {
        try {
            const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string, dept: String}>("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
            console.log(data);
            if (data.id) {
                setUserID(data.id);
                console.log(data.id);
                console.log("user" + userID);
                // fetchProfessorId();
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

    useEffect(() => {
        if (userID !== 0) {
            fetchMyApplications();
        }
    }, [userID]);

    const fetchMyApplications = async () => {
        try {
            console.log("fetch"+userID);
            console.log(typeof(userID));
            const { data } = await axios.post(`https://api.ellen.newbie.sparcsandbox.com/myapplylist`, { userID });
            setApps(data);
            console.log("application forms!", data);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        }
    };
    

    return (
        <>
            <Nav />
            {/* <div className="lab-view-container1"> */}
                <div className="lab-view-container">
                    <div className="lab-view-title">Submitted Applications</div>
                    <div className="lab-view-content">
                        {apps.length > 0 ? (
                            <MyApplicationList initialApplications={apps} user_id={userID}/>
                        ) : (
                            <div>No applications found.</div>
                        )}
                    </div>
                </div>
            {/* </div> */}
        </>
    );
};

export default MyApplyListPage;
