import React from "react";
import '../styles/ClassThread.css';
import {Link } from "react-router-dom";
import {axios} from "axios";
import { useEffect, useState } from "react";

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
    return (
        <div className="ClassThreadCard">
            <h1 className= "ClassThreadTitle">{coursenumber} - {coursename} - {professorname}</h1>
            <body>{description}</body>
            {/*}
            <h1 className= "ClassThreadTitle">{CourseNumber} - {CourseName} - Professor {ProfessorID}</h1>
            <body>{Description}</body>
    */}

            <Link to ='/Form' className = "askButton">Ask a Question</Link>

        </div>
    )
}

export default ClassThread