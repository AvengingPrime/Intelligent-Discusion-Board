import React, { useContext } from "react";
import '../styles/ClassThread.css';
import {Link } from "react-router-dom";
import {axios} from "axios";
import { useEffect, useState} from "react";
import { currentHomepageContext } from "../pages/HomePage";


const ClassThread = ({coursenumber, coursename, description, professorname}) => {
/*
Expand Down
Expand Up
	@@ -38,24 +36,16 @@ const ClassThread = ({coursenumber, coursename, description, professorname}) =>
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