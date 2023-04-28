import React, { useContext } from "react";
import '../styles/ClassThread.css';
import {Link } from "react-router-dom";
import {axios} from "axios";
import { useEffect, useState} from "react";
import { currentHomepageContext } from "../pages/HomePage";


const ClassThread = ({coursenumber, coursename, description, professorname}) => {
/*
    const [courses, setCourse] = useState([]);
    url = "http://localhost:3000/getSection/0000000001"
    useEffect(() => {
        axios.get(url)
        .then(response => {
        setCourse(response.data);
        })
        .catch((err) => {
        // handling error
        if (err.response) {
            // Request made and server responded
    
            const { status, config } = err.response;
    
            if (status === 404) {
            console.log(`${config.url} not found`);
            }
            if (status === 500) {
            console.log("Server error");
            }
        } else if (err.request) {
            // Request made but no response from server
            console.log("Error", err.message);
        } else {
            // some other errors
            console.log("Error", err.message);
        }
        });
    }, [])
    */

    const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies, setCreating} = useContext(currentHomepageContext)

    function handleClick()
    {
        setCreating(true)
    }

    return (
        <div className="ClassThreadCard">
            <h1 className= "ClassThreadTitle">{coursenumber} - {coursename} - {professorname}</h1>
            <body className = "ClassThreadDescription">{description}</body>
            {/*}
            <h1 className= "ClassThreadTitle">{CourseNumber} - {CourseName} - Professor {ProfessorID}</h1>
            <body>{Description}</body>
    */}

            <button className = "askButton" onClick={handleClick}>Ask a Question</button>

        </div>
    )
}

export default ClassThread