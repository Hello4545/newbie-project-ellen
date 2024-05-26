import React from "react";
import "./ApplicationList.css";

const MyApplicationList = ({ applications }) => {
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
                    </div>
                ))}
        </div>
    );
};

export default MyApplicationList;
