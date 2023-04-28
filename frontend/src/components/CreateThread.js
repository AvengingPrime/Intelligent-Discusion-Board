import React from "react"
import {useState, useEffect, useContext} from "react"
import axios from "axios";
import { currentHomepageContext } from "../pages/HomePage"
import "../styles/Form2.css"
import Thread from "./Thread";

export default function CreateThread({sectionID, userID})
{ 
    //useEffect to post using api calls

    const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies, setCreating} = useContext(currentHomepageContext);

    const [submit, setSubmit] = useState(false)
    const [relevant, setRelevant] = useState(false)
    const [generateAdvanced, setGenerateAdvanced] = useState(false)
    const [advancedResponse, setAdvancedResponse] = useState("")
    const [threadIDs, setThreadIDs] = useState([['NULL', 'NULL']])
    const [relevantThreads, setRelevantThreads] = useState([])
    const [threadTitle, setThreadTitle] = useState("")
    const [threadText, setThreadText] = useState("")

    const submitPostUrl = "http://localhost:3000/insertThread/"
    const getRelevantThreadUrl = "http://localhost:5000/query/"
    const getAdvancedInformationUrl = "http://localhost:5000/general/"
    const getThreadsUrl = "http://localhost:3000/getThread/"

    function relevantClick()
    {
      setRelevant(false)
      setGenerateAdvanced(false)
      setRelevant(true)
    }

    function advancedClick()
    {
      setGenerateAdvanced(false)
      setRelevant(false)
      setGenerateAdvanced(true)
    }


    useEffect(() => {
        console.log("INSERT THREAD URL")
        console.log(submit)
        console.log(submitPostUrl + sectionID + "/" + userID + "/norm/" + threadTitle.split(' ').join('-') + "/" + threadText.split(' ').join('-'))
        axios.post(submitPostUrl + sectionID + "/" + userID + "/norm/" + threadTitle.split(' ').join('-') + "/" + threadText.split(' ').join('-'))

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

      useEffect(() => {
        if(!relevant)
        {
          return
        }
        console.log("RELEVANT THREAD URL")
        console.log(relevant)
        console.log(getRelevantThreadUrl + sectionID + "/" + threadTitle.split(' ').join('-'))
        // if(submit)
        // {
        //     setCreating(false)
        // }
        axios.get(getRelevantThreadUrl + sectionID + "/" + threadTitle.split(' ').join('-'), {mode:'no-cors'})
        // setCreating(false)

      .then(response => {

        console.log("RELEVANT FOUND")
        console.log(response)
        if(response.data.posts == [])
        {
          setThreadIDs([])
        }
        else
        {
          setThreadIDs(response.data.posts)
        }
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
          console.log("Error 3", err.message);
        } else {
          // some other errors
          console.log("Error 4", err.message);
        }
      });
      }, [relevant])

      useEffect(() => {
        if(!generateAdvanced)
        {
          return
        }
        console.log("ADVANCED INFO URL")
        console.log(generateAdvanced)
        console.log(getAdvancedInformationUrl + sectionID + "/" + threadTitle.split(' ').join('-') + "/" + threadText.split(' ').join('-'))
        // if(submit)
        // {
        //     setCreating(false)
        // }
        axios.get(getAdvancedInformationUrl + sectionID + "/" + threadTitle.split(' ').join('-') + "/" + threadText.split(' ').join('-'), {mode:'no-cors'})
        // setCreating(false)

      .then(response => {

        console.log("ADVANCED FOUND")
        console.log(response)
        setAdvancedResponse(response.data.relevant)
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
          console.log("Error 3", err.message);
        } else {
          // some other errors
          console.log("Error 4", err.message);
        }
      });
      }, [generateAdvanced])

      useEffect(() => {
        // console.log("RELEVANT THREAD URL")
        // console.log(relevant)
        // console.log(getRelevantThreadUrl + sectionID + "/" + threadTitle.split(' ').join('-'))
        // if(submit)
        // {
        //     setCreating(false)
        // }

        axios.get(getThreadsUrl + threadIDs[0][1])
        // setCreating(false)

      .then(response => {
        console.log("RELEVANT FOUND")
        console.log(response)
        setRelevantThreads(response.data)
        // setThreadIDs(response.data.posts)
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
          console.log("Error 3", err.message);
        } else {
          // some other errors
          console.log("Error 4", err.message);
        }
      });
      }, [threadIDs])

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

            <button className = "RelevantSubmit" onClick = {relevantClick}>
                Get Relevant Responses
            </button>
            <button className = "Submit" onClick = {() => setSubmit(true)}>
                Submit
            </button>
            <button className = "AdvancedSubmit" onClick = {advancedClick}>
                Advanced Submit
            </button>

            {
              relevant && !generateAdvanced &&

              <Thread className = "Results" threadid = {relevantThreads.ThreadID} title = {relevantThreads.Title} description={relevantThreads.Text} author = {relevantThreads.Username} special = {true}/>
            }

            {
              generateAdvanced && !relevant && 

              <div className = "AdvancedResponseCard">
                Auto Generated Response <br/><br/>
                {advancedResponse}
              </div>
            }
            
        </div>
    );
}