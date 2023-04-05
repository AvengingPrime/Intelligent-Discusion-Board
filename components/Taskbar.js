import React from "react";
import {Link } from "react-router-dom";
import '../styles/Taskbar.css';



const Taskbar = () => {
    return (
        <div className = "sticky">
            <div className = "Taskbar">
                <div className = "TaskbarButtons">
                
                <Link to ='/' className="functionButton">Home</Link>
                <Link to ='/profile' className = "functionButton">My Profile</Link>
                <Link to ='/createThread' className = "functionButton" >Ask a Question</Link>
                <img src="..\..\public\header_ECS_White.png" alt= "The University of Texas at Dallas" />
                </div>
                
            </div>
        </div>
    )
}

export default Taskbar