import React, {useContext} from "react";
import '../styles/Dashboard.css';
import { AdminContext } from "../App";

const Dashboard = () => {
    const {isAdmin} = useContext(AdminContext);

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
            {isAdmin && <h2 className = "dashboardAdd">+</h2>}
        </div>
    )
}

export default Dashboard