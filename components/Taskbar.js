import React from "react";
import './Taskbar.css';


const Taskbar = () => {
    return (
        <div className = "sticky">
            <div className = "Taskbar">
                <div className = "TaskbarButtons">
                <button className = "functionButton" > profile icon</button>
                <button className = "functionButton" >My Profile</button>
                <button className = "functionButton" >Ask a Question</button>
                <img src="..\images\header_ECS_White.png" alt= "The University of Texas at Dallas" />
                </div>
                
            </div>
        </div>
    )
}

export default Taskbar