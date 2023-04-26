import React from "react";
import '../styles/DashboardButton.css';
import { useContext } from "react";
import {currentSectionContext} from "../pages/HomePage";



const DashboardButton = ({name, coursenumber, sectionid}) => {
    const {currentStateValue, setcurrentStateValue} = useContext(currentSectionContext)

    function handleClick() {
        setcurrentStateValue(sectionid)
    }

    return (
        <div>
            <button className = "DashboardButton" onClick = {handleClick}>{coursenumber} - {name}</button>
        </div>
    )
}

export default DashboardButton