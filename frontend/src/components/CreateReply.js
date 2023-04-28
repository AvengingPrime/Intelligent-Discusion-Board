import React from "react"
import {useState, useEffect, useContext} from "react"
import axios from "axios";
import { currentHomepageContext } from "../pages/HomePage"
import "../styles/Form2.css"
import Thread from "./Thread";

export default function CreateReply({threadID, replyToID, userID})
{ 
    //useEffect to post using api calls

    const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies, setCreating, setCreatingReply, setCurrentReply} = useContext(currentHomepageContext);

    const [submit, setSubmit] = useState(false)
    const [anonymous, setAnonymous] = useState(false)
    // const [threadTitle, setThreadTitle] = useState("")
    const [threadText, setThreadText] = useState("")

    const submitReplyUrl = "http://localhost:3000/insertReply/"
    // const getRelevantThreadUrl = "http://localhost:5000/query/"
    // const getAdvancedInformationUrl = "http://localhost:5000/general/"
    // const getThreadsUrl = "http://localhost:3000/getThread/"

    useEffect(() => {
        console.log("INSERT REPLY URL")
        console.log()
        console.log(submit)
        let tempUserID = (anonymous)? "0ANONYMOUS" : userID;
        console.log(submitReplyUrl + threadID + "/" + tempUserID + "/" + replyToID + "/" +  threadText.split(' ').join('-'))
        axios.post(submitReplyUrl + threadID + "/" + tempUserID + "/" + replyToID + "/" +  threadText.split(' ').join('-'))

        .then(response => {

        console.log("REPLY CREATED")
        if(submit == true)
        {
            setCreatingReply(false)
        }
        // setcurrentStateValue("")
        // setReplies([])
      })
      .catch((err) => {

        if(submit == true)
        {
            
            setCreatingReply(false)
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
            setCurrentReply('NULL')
            setCreatingReply(false)
      }
      }, [submit])

    
    return(
        <div className = "CreateReply">
            {/* <div className = "Title"> */}
                {/* <TitleInput/> */}
                {/* Post <br/> */}
                {/* <input className = "InputTitle" value = {threadTitle} onChange={(e)=> setThreadTitle(e.target.value)} type = "text"/> */}
            {/* </div> */}
            <div className = "PostReply">
                {/* <PostInput/> */}
                Reply
                <textarea className = "InputText" value = {threadText} onChange={(e)=> setThreadText(e.target.value)} type = "text"/>
                    {/* <textarea rows="10" cols="35"/> */}
            </div>

            {/* <button className = "RelevantSubmit" onClick = {relevantClick}>
                Get Relevant Responses
            </button> */}
            <button className = "Submit" onClick = {() => setSubmit(true)}>
                Submit
            </button>
            {/* <button className = "AdvancedSubmit" onClick = {advancedClick}>
                Advanced Submit
            </button> */}
            <div className = "AnonymousCheck">
              {anonymous && "Anonymous" || !anonymous && "Not Anonymous"}
              <button onClick = {() => setAnonymous(!anonymous)}>Anon</button>
            </div>

            {/* {
              relevant && !generateAdvanced &&

              <Thread className = "Results" threadid = {relevantThreads.ThreadID} title = {relevantThreads.Title} description={relevantThreads.Text} author = {relevantThreads.Username} special = {true}/>
            }

            {
              generateAdvanced && !relevant && 

              <div className = "AdvancedResponseCard">
                Auto Generated Response <br/><br/>
                {advancedResponse}
              </div>
            } */}
            
        </div>
    );
}