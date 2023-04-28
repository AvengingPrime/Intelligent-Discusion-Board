import React from "react"
import {useState, useEffect, useContext} from "react"
import axios from "axios";
import { currentHomepageContext } from "../pages/HomePage"
import "../styles/Form2.css"

export default function CreateThread({sectionID})
{ 
    //useEffect to post using api calls

    const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies, setCreating} = useContext(currentHomepageContext);

    const [submit, setSubmit] = useState([])
    const [threadTitle, setThreadTitle] = useState("")
    const [threadText, setThreadText] = useState("")

    // function getRelevant()
    // {

    // }

    // useEffect(() => {
    //     axios.get(getSectionsOfUserURL)
    //   .then(response => {

    //     setCurrentThread({'ThreadID' : "0000000000", 'Title' : "NULL", 'Text' : "NULL", 'Username' : "NULL"});
    //     setcurrentStateValue("")
    //     setReplies([])
    //   })
    //   .catch((err) => {
    //     // handling error
    //     if (err.response) {
    //       // Request made and server responded
      
    //       const { status, config } = err.response;
      
    //       if (status === 404) {
    //         console.log(`${config.url} not found`);
    //       }
    //       if (status === 500) {
    //         console.log("Server error");
    //       }
    //     } else if (err.request) {
    //       // Request made but no response from server
    //       console.log("Error 3", err.message);
    //     } else {
    //       // some other errors
    //       console.log("Error 4", err.message);
    //     }
    //   });
    //   }, [submit])

    return(
        <div className = "CreateThread">
            <div className = "PostType">
                {/* <PostSelection/> */}
            </div>
            <div className = "Title">
                {/* <TitleInput/> */}
                Title <br/>
                <input className = "InputTitle" value = {threadTitle} onChange={(e)=> setThreadTitle(e.target.value)} type = "text"/>
            </div>
            <div className = "Post">
                {/* <PostInput/> */}
                Post
                <textarea className = "InputText" value = {threadText} onChange={(e)=> setThreadText(e.target.value)} type = "text"/>
                    {/* <textarea rows="10" cols="35"/> */}
            </div>
            <div className = "AnonymousSelector">
                {/* <AnonymousSelection/> */}
            </div>

            <button className = "RelevantSubmit" 
                // onClick = {getRelevant}
                >
                Get Relevant Responses
            </button>
            <button className = "Submit" onClick = {() => setSubmit(true)}>
                Submit
            </button>
            
        </div>
    );
}