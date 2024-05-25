import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./LabsGrid.css";

const LabsGrid = () => {
    const [labs, setLabs] = useState([]);
    const [isProfessor, setIsProfessor] = useState(false);
    const navigate = useNavigate();

    const checkLogin = async () => {
        try {
            const { data } = await axios.get("https://api.ellen.newbie.sparcsandbox.com/check-login", { withCredentials: true });
            if (data.isLoggedIn && data.user && data.user.isProfessor) {
                setIsProfessor(true);
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const { data } = await axios.get("https://api.ellen.newbie.sparcsandbox.com/labs", { withCredentials: true });
                setLabs(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching labs:', error);
            }
        };

        checkLogin();
        fetchLabs();
    }, []);

    const handleCardClick = (labId) => {
        navigate(`/LabView`);
    };

    const handleAddLab = () => {
        console.log('Add Lab button clicked');
    };

    return (
        <div className="labs-grid-container">
            {labs.map(lab => (
                <div key={lab.lab_id} className="lab-card" onClick={() => handleCardClick(lab.lab_id)}>
                    <h2 className="lab-title">{lab.lab_name}</h2>
                    <div className="lab-field">{lab.field}</div>
                    {/* <div className="lab-detail">Location: {lab.location}</div> */}
                    {/* <div className="lab-detail">Website: {lab.website}</div> */}
                    {/* <div className="lab-detail">Professor: {lab.professor.name}</div> */}
                </div>
            ))}
            {isProfessor && (
                <button onClick={handleAddLab} className="add-lab-button">Add Lab</button>
            )}
        </div>
    );
};

export default LabsGrid;
