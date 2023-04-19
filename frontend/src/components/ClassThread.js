import React from "react";
import '../styles/ClassThread.css';
import {Link } from "react-router-dom";

const ClassThread = () => {
    return (
        <div className="ClassThreadCard">
            {/* bio and class name will be filled in whenever the call to database from App is done w parameters describing the classThread*/}
            <h1 className= "ClassThreadTitle">CL#### - Class Name - Class Professor</h1>

            <body>class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-
            class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-
            class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-
            </body>

            <Link to ='/createThread' className = "askButton">Ask a Question</Link>

        </div>
    )
}

export default ClassThread