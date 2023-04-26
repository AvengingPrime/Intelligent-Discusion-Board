import React, {useContext, useState, useEffect} from "react";
import '../styles/Dashboard.css';
import { AdminContext } from "../App";
import axios from "axios";
import DashboardButton from "./DashboardButton";


const Dashboard = ({sections}) => {
    const {isAdmin} = useContext(AdminContext);

//     const url = 'http://localhost:3000/getSectionsOfStudent/0000000001'
//     const [classes, setClasses] = useState([]);
//     useEffect(() => {
//     axios.get(url)
//     .then(response => {
//     setClasses(response.data);
//     })
//     .catch((err) => {
//     // handling error
//     if (err.response) {
//         // Request made and server responded

//         const { status, config } = err.response;

//         if (status === 404) {
//         console.log(`${config.url} not found`);
//         }
//         if (status === 500) {
//         console.log("Server error");
//         }
//     } else if (err.request) {
//         // Request made but no response from server
//         console.log("Error", err.message);
//     } else {
//         // some other errors
//         console.log("Error", err.message);
//     }
//     });
// }, [])

    return (
        <div className = "DashboardSticky">
            <div className = "Dashboard">
            <header className = "DashboardTitle">
                SPR2023 - University of Texas at Dallas
            </header>
                <div className = "DashboardFlex">
                    {/* <DashboardButton description="test" /> */}
                    
                    {/* {classes.map((item) => (
                        <DashboardButton key={item.id} coursenumber={item.CourseNumber} name ={item.CourseName} />
                    ))} */}
                    {sections.map((item) => (
                        <DashboardButton key={item.id} coursenumber={item.CourseNumber} name ={item.CourseName} 
                        sectionid={item.SectionID}  />
                    ))}
                    
                    
                    
                </div>
                
            </div>
            {isAdmin && <h2 className = "dashboardAdd">+</h2>}
        </div>
    )
}

export default Dashboard