import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./LabsGrid.css";

const LabsGrid = () => {
    const [labs, setLabs] = useState([]);

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

    return (
        <div className="labs-grid-container">
            {labs.map(lab => (
                <div key={lab.id} className="lab-card">
                    <h2 className="lab-title">{lab.lab_name}</h2>
                    <div className="lab-field">{lab.field}</div>
                    {/* <div className="lab-detail">Location: {lab.location}</div> */}
                    {/* <div className="lab-detail">Website: {lab.website}</div> */}
                    {/* <div className="lab-detail">Professor: {lab.professor.name}</div> */}
                </div>
            ))}
        </div>
    );
};

export default LabsGrid;
