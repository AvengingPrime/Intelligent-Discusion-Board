import React, { useRef } from "react";
import Taskbar from "../components/Taskbar";
import "../styles/Create.css"

function Create() {
    const threadTopicRef  = useRef()
    const threadBodyRef  = useRef()

    return (
        <>
        <Taskbar />

        <div className="createContainer">

        <div className="courseInfoCard">
            {/* <h1> {course.name} - {course.section} */}
            <h1 className="courseInfo"> COURSE NAME - SECTION </h1>
        </div>
        <div className="postInfoCard">
            <div>
            <input ref={threadTopicRef} type="text" className="TopicInput" />
            </div>
            <div>
            <input ref={threadBodyRef} type="text" className="BodyInput" />
            </div>
        </div>
    </div>

    </>
    )

}

export default Create