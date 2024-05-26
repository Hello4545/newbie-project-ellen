import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./css/ApplyList.css";
import axios from "axios";
import Nav from "./Nav";
import LabsGrid from '../components/LabsGrid.js';
import { useNavigate, useLocation }  from "react-router-dom";
import ApplicationList from '../components/ApplicationList.js';

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
            fetchProfessorId();
        }
    }, [userID]);

    useEffect(() => {
        if (profID !== 0) {
            fetchProfessorId();
        }
    }, [profID]);
    

    const fetchProfessorId = async () => {
        try {
            console.log("userfpid" + userID);
            const { data } = await axios.post(`https://api.ellen.newbie.sparcsandbox.com/get-prof-id`, { userID });
            setProfID(data.prof_id);
            console.log("profID"+profID);
            console.log(typeof(profID));
            fetchApplications();
            console.log("Prof_id"+data.prof_id)
        } catch (error) {
            console.error('Failed to fetch professor ID:', error);
        }
    };

    const fetchApplications = async () => {
        try {
            console.log("fetch"+profID);
            console.log(typeof(profID));
            const { data } = await axios.post(`https://api.ellen.newbie.sparcsandbox.com/applylist`, { profID });
            console.log(typeof(profID));
            setApps(data);
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        }
    };

    return (
        <>
            <Nav />
            {/* <div className="lab-view-container1"> */}
                <div className="lab-view-container">
                    <div className="lab-view-title">Applications</div>
                    <div className="lab-view-content">
                        {apps.length > 0 ? (
                            <ApplicationList applications={apps} />
                        ) : (
                            <div>No applications found.</div>
                        )}
                    </div>
                </div>
            {/* </div> */}
        </>
    );
};

export default ApplyListPage;
