import React from "react";
import '../styles/DashboardButton.css';
import { useContext } from "react";
import {currentHomepageContext} from "../pages/HomePage";



const DashboardButton = ({name, coursenumber, sectionid}) => {
    const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies, setCreating, setCreatingReply} = useContext(currentHomepageContext)

    function handleClick() {
        setcurrentStateValue(sectionid);
        setCurrentThread({'ThreadID' : "0000000000", 'Title' : "NULL", 'Text' : "NULL", 'Username' : "NULL"});
        setCreating(false)
        setCreatingReply(false)
        setReplies([])
        // console.log("Dashboard Button")
        // console.log(currentStateValue)
    }

    return (
        <div>
            <button className = "DashboardButton" onClick = {handleClick}>{coursenumber} - {name}</button>
        </div>
    )
}

export default DashboardButton