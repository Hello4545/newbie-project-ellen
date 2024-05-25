import React from "react";
import "./css/Home.css";
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
    return (
        <>
        <Nav />
        <div>
            
        </div>
        </>
    
  );
};

export default ApplyPage;