import React from "react";
import './ClassThread.css';

const ClassThread = () => {
    return (
        <header className="ClassThreadCard">
            {/* bio and class name will be filled in whenever the call to database from App is done w parameters describing the classThread*/}
            <h1 classname= "ClassThreadTitle">CL#### - Class Name - Class Professor</h1>

            <body>class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-
            class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-
            class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-class-bio-
            </body>

            <button className = "askButton">Ask a Question</button>

        </header>
    )
}

export default ClassThread