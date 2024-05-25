import React, { useState, ChangeEvent, FormEvent } from "react";
import "./css/Apply.css";
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

    const [formData, setFormData] = useState({
        studentNumber: "",
        yearOfStudy: "",
        motivation: "",
        researchInterest: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

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
                    value={formData.studentNumber}
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
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="motivation">Motivation for Applying</label>
                    <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="researchInterest">Research Interest</label>
                    <textarea
                    id="researchInterest"
                    name="researchInterest"
                    value={formData.researchInterest}
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