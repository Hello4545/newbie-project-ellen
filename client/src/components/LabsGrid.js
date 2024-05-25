import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {labs.map(lab => (
                <div key={lab.lab_id} style={{ padding: '20px', border: '1px solid #ccc' }}>
                    <h2>{lab.lab_name}</h2>
                    <p>{lab.field}</p> 
                    <p>{lab.location}</p>
                    <p>{lab.website}</p>
                </div>
            ))}
        </div>
    );
};

export default LabsGrid;
