import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation }  from "react-router-dom";
// import "./css/Home.css";

axios.defaults.withCredentials = true;

const LabViewPage = (props: {}) => {
    const navigate = useNavigate();
    const [labname, setLabName] = useState("");
    const [labLocation, setLabLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [field, setField] = useState("");

    const location = useLocation();
    const labInfo = { ...location.state };
    console.log(labInfo.labId)
    const lab_id = parseInt(labInfo.labId, 10);
    if(!location.state){
        console.log("error");
    }

    const getLabInfo = async () => {
        try {
            const {data} = await axios.post("https://api.ellen.newbie.sparcsandbox.com/labview", {lab_id});
            //   const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string}>("https://api.ellen.newbie.sparcsandbox.com/labview", {withCredentials: true});
            console.log(data);
            if (data) {
                setLabName(data.lab.lab_name);
                // console.log("title"+data.lab.lab_name);
                setLabLocation(data.lab.location);
                setWebsite(data.lab.website);
                setField(data.lab.field);
            }
            } catch (error) {
            console.error('Failed to get lab info:', error);
        }
    };
    
    useEffect(() => {
        getLabInfo();
    }, []);

    return (
        <div className="lab-view">
            <h1>Lab Details</h1>
            <div>
                <div><label>Name:</label> {labname}</div>
                <div><label>Location:</label> {labLocation}</div>
                <div><label>Website:</label> {website} </div>
                <div><label>Field of Study:</label> {field}</div>
            </div>
        </div>
        
    )
};

export default LabViewPage;
