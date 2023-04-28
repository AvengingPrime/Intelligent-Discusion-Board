import React from "react"
import {useState, useEffect, useContext} from "react"
import axios from "axios";
import { currentHomepageContext } from "../pages/HomePage"
import "../styles/Form2.css"

export default function CreateThread({sectionID, userID})
{ 
    //useEffect to post using api calls

    const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies, setCreating} = useContext(currentHomepageContext);

    const [submit, setSubmit] = useState(false)
    const [getRelevant, setRelevant] = useState(false)
    const [threadTitle, setThreadTitle] = useState("")
    const [threadText, setThreadText] = useState("")

    const submitPostUrl = "http://localhost:3000/insertThread/"

    // function getRelevant()
    // {

    // }

    // function clickSubmit()
    // {
    //     setSubmit(true);
    //     // setCreating(false);
    // }

    useEffect(() => {
        console.log("INSERT THREAD URL")
        console.log(submit)
        console.log(submitPostUrl + sectionID + "/" + userID + "/norm/" + threadTitle.split(' ').join('-') + "/" + threadText.split(' ').join('-'))
        // if(submit)
        // {
        //     setCreating(false)
        // }
        axios.post(submitPostUrl + sectionID + "/" + userID + "/norm/" + threadTitle.split(' ').join('-') + "/" + threadText.split(' ').join('-'))
        // setCreating(false)

      .then(response => {

        console.log("THREAD CREATED")
        if(submit == true)
        {
            setCreating(false)
        }
        // setcurrentStateValue("")
        // setReplies([])
      })
      .catch((err) => {

        if(submit == true)
        {
            setCreating(false)
        }
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
          console.log("Error 3", err.message);
        } else {
          // some other errors
          console.log("Error 4", err.message);
        }
      });

      if(submit == true)
        {
            setCreating(false)
        }

      }, [submit])

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

            <button className = "RelevantSubmit" onClick = {() => setRelevant(true)}>
                Get Relevant Responses
            </button>
            <button className = "Submit" onClick = {() => setSubmit(true)}>
                Submit
            </button>


        </div>
    );
}