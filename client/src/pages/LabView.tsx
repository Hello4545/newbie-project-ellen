import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation }  from "react-router-dom";
import "./css/LabView.css";
import Nav from "./Nav";
// import "./css/Home.css";

axios.defaults.withCredentials = true;

const LabViewPage = (props: {}) => {
    const navigate = useNavigate();
    const [labname, setLabName] = useState("");
    const [labLocation, setLabLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [field, setField] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isProfessor, setIsProfessor] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const location = useLocation();
    const labInfo = { ...location.state };
    console.log(labInfo.labId)
    const lab_id = parseInt(labInfo.labId, 10);
    if(!location.state){
        console.log("error");
    }

    const checkLogin = async () => {
        try {
          const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string}>("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
          console.log(data);
          if (data.id) {
            setName(data.name);
            setEmail(data.email);
            setIsProfessor(data.isProfessor);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
          // console.log("Response : "+data.id);
          // setIsLoggedIn(response.data.isProfessor);
        } catch (error) {
          console.error('Failed to fetch username:', error);
        }
      };

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
    
    const handleLogout = async () => {
        try {
          const response = await axios.post("https://api.ellen.newbie.sparcsandbox.com/logout", {withCredentials: true});
          alert('Successfully logged out!');
          navigate("/");
        window.location.reload();
        } catch (error) {
          console.error('Failed to logout:', error);
        }
      }
    
    useEffect(() => {
        getLabInfo();
        checkLogin();
    }, []);

    return (
        <div>
            <Nav />
            <div className="lab-view-container">
                <h1 className="lab-view-title">Lab Details</h1>
                <div className="lab-view-content">
                    <div><label className="lab-view-label">Name:</label> {labname}</div>
                    <div><label className="lab-view-label">Location:</label> {labLocation}</div>
                    <div><label className="lab-view-label">Website:</label> <a className="lab-view-link" href={website} target="_blank" rel="noopener noreferrer">{website}</a></div>
                    <div><label className="lab-view-label">Field of Study:</label> {field}</div>
                </div>
            </div>
        </div>
    )
};

export default LabViewPage;
