import React from "react";
import '../styles/Dashboard.css';


const Dashboard = () => {
    return (
        <div className = "DashboardSticky">
            <div className = "Dashboard">
            <header className = "DashboardTitle">
                SPR2023 - University of Texas at Dallas
            </header>
                <div className = "DashboardFlex">
                    <button className = "DashboardButton"> CS #### - Class Name - Class Professor</button>
                    <button className = "DashboardButton"> CS #### - Class Name - Class Professor</button>
                    <button className = "DashboardButton"> CS #### - Class Name - Class Professor</button>
                    <button className = "DashboardButton"> CS #### - Class Name - Class Professor</button>
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard