import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./css/Apply.css";
import axios from "axios";
import Nav from "./Nav";
import LabsGrid from '../components/LabsGrid.js';
import { useNavigate, useLocation }  from "react-router-dom";

const ApplyPage = () => {
    
    const location = useLocation();
    const labInfo = { ...location.state };
    console.log(labInfo);
    console.log(labInfo.lab_id);
    const lab_id = parseInt(labInfo.lab_id, 10);
    if(!location.state){
        console.log("error");
    }

    const navigate = useNavigate();
    const [studentNumber, setStudentNumber] = useState("");
    const [yearOfStudy, setYearOfStudy] = useState("");
    const [motivation, setMotivation] = useState("");
    const [researchInterest, setResearchInterest] = useState("");
    const [userID, setUserID] = useState(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "studentNumber":
                setStudentNumber(value);
                break;
            case "yearOfStudy":
                setYearOfStudy(value);
                break;
            case "motivation":
                setMotivation(value);
                break;
            case "researchInterest":
                setResearchInterest(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = {
            studentNumber,
            yearOfStudy,
            motivation,
            researchInterest, 
            lab_id,
            userID
        };
        console.log(formData);
        console.log(lab_id);
        try {
            const response = await axios.post("https://api.ellen.newbie.sparcsandbox.com/apply", 
            { student_no: studentNumber,
              years: yearOfStudy,
              motivation: motivation,
              interest: researchInterest,
              lab_id: lab_id,
              user_id: userID,
            });
            console.log("data" + response.data);
            navigate("/");
        } catch (error: any) {
            console.error("There was an error registering!", error);
        }
    };

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
            <div className="apply-page">
                <h1>Apply to Lab</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="studentNumber">Student Number</label>
                    <input
                    type="text"
                    id="studentNumber"
                    name="studentNumber"
                    value={studentNumber}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="yearOfStudy">Year of Study</label>
                    <input
                    type="text"
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={yearOfStudy}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="motivation">Motivation for Applying</label>
                    <textarea
                    id="motivation"
                    name="motivation"
                    value={motivation}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="researchInterest">Research Interest</label>
                    <textarea
                    id="researchInterest"
                    name="researchInterest"
                    value={researchInterest}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit" className="submit-button">Submit Application</button>
                </form>
            </div>
        </>
    
    );
};

export default ApplyPage;
