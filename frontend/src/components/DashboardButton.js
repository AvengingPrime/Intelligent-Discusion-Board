import React from "react";
import '../styles/DashboardButton.css';

const DashboardButton = ({description}) => {
    return (
        <div>
            <button className = "DashboardButton">{description}</button>
        </div>
    )
}

export default DashboardButton