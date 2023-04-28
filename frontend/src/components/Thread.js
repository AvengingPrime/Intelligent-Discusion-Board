import React, {useContext} from "react";
import '../styles/Thread.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import {Link } from "react-router-dom";
import { AdminContext } from "../App";
import {axios} from "axios";
import { currentHomepageContext } from "../pages/HomePage";

/*
function handleThreadClick(ThreadID) {
    const url = 'http://localhost:3000/getThreadReplies/${ThreadID}'
    const [replies, setReplies] = useState([]);
    axios.get(url)
    .then(response => {
      setReplies(response.data);
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
  }
*/
const Thread = ({id, threadid, title, description, author, tags, isHidden}) => {
//function Thread(props) {
//const Thread = ({threadData}) => {
//const [details, setDetails] = useState([]);
//const tagsList = tags.join(', ');
const tagsList = ['']
// const hidden = isHidden;
// const {isAdmin} = useContext(AdminContext);


const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies} = useContext(currentHomepageContext)
    function handleClick()
    {
      console.log("currentThread vals")
      console.log(currentThread)
      console.log(threadid)
      setCurrentThread({'ThreadID' : threadid, 'Title' : title, 'Text' : description, 'Username' : author})
      console.log(currentThread)
    }

    return (
    <div>
        {/* <Link to = '/:id/replies'> */}
        <button className="threadCard" onClick={handleClick}>
        {/* {isAdmin && <button className = "hideThread"><i class="gg-eye"></i></button>} */}
            <h1 className= "threadTitle">{title}</h1>
            <p className = "threadBody">
            {description} <br /> <br />
            <strong>This was created by : </strong>{author} <br />
            <strong>Tags : </strong>{tagsList}
            </p>
            
            {/*<ul className = "threadTags">
                {tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
                </ul> */}

            {/* array of tags go here ^ */}
            </button>
        {/* </Link> */}
    </div>
    )
}
// }
export default Thread;