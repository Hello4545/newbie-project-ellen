import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./LabsGrid.css";
import { useNavigate } from 'react-router-dom';

const LabsGrid = () => {
    const [labs, setLabs] = useState([]);
    const navigate = useNavigate();
    const selectedLabID = undefined;

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const { data } = await axios.get("https://api.ellen.newbie.sparcsandbox.com/labs",{withCredentials: true});
                setLabs(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching labs:', error);
            }
        };

        fetchLabs();
    }, []);

    const handleNavigateToDetails = (labId) => {
        // console.log(lab);
        navigate("/LabView", { state: { labId : `${labId}` }});
      };

    return (
        <div className="labs-grid-container">
            {labs.map(lab => (
                <button key={lab.lab_id} className="lab-card" onClick={() => {
                        handleNavigateToDetails(lab.lab_id)
                    }
                    
                    }>
                    <h2 className="lab-title">{lab.lab_name}</h2>
                    <div className="lab-field">{lab.field}</div>
                    {/* <div className="lab-detail">Location: {lab.location}</div> */}
                    {/* <div className="lab-detail">Website: {lab.website}</div> */}
                    {/* <div className="lab-detail">Professor: {lab.professor.name}</div> */}
                </button>
            ))}
        </div>
    );
};

export default LabsGrid;

