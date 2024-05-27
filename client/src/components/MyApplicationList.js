import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApplicationList.css";

const MyApplicationList = ({ initialApplications, user_id }) => {

    const [applications, setApplications] = useState(initialApplications);

    console.log("myapps:", applications)

    const fetchApplications = async () => {
        try {
            const response = await axios.post('https://api.ellen.newbie.sparcsandbox.com/myapplylist', {user_id});
            setApplications(response.data);
            console.log("response"+response.data);
            console.log("myapps check:", applications);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleDelete = async (apply_id) => {
        try {
            const response = await axios.post('https://api.ellen.newbie.sparcsandbox.com/myapplylist/delete', {
                apply_id
            });
            if (response.status === 200) {
                // console.log("response"+response);
                fetchApplications();
            } else {
                console.error('Failed to delete the application');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(applications);
    return (
        <div className="application-list">
            {applications.map((application, index) => (
                    <div key={index} className="application-view-container">
                        <div className="application-row">
                            <div className="application-view-label">Applied Lab</div>
                            <div className="application-view-value">{application.Labs.lab_name}</div>
                        </div>
                        <div className="application-row">
                            <div className="application-view-label">Motivation</div>
                            <div className="application-view-value">{application.motivation}</div>
                        </div>
                        <div className="application-row">
                            <div className="application-view-label">Research Interest</div>
                            <div className="application-view-value">{application.interest}</div>
                        </div>
                        <button className="delete-button" onClick={() => handleDelete(application.apply_id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
};

export default MyApplicationList;
