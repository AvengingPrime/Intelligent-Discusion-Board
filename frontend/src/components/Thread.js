import React, {useContext} from "react";
import '../styles/Thread.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import {Link } from "react-router-dom";
import { AdminContext } from "../App";
import axios from "axios";
import Reply from "./Reply";
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


const Thread = ({id, threadid, title, description, author, tags, isHidden, special}) => {
//function Thread(props) {
//const Thread = ({threadData}) => {
//const [details, setDetails] = useState([]);
//const tagsList = tags.join(', ');
const tagsList = ['']
// const hidden = isHidden;
// const {isAdmin} = useContext(AdminContext);

const [replies2, setReplies2] = useState([]);

// if(special)
// {
  const getRepliesUrl = 'http://localhost:3000/getTopLevelReplies/'

  useEffect(() => {
    console.log("Replies URL 2.0 Current Thread")
    console.log(getRepliesUrl + threadid, special)

    // axios.get(getRepliesUrl + JSON.stringify(currentThread.ThreadID).substring(1,11))
    axios.get(getRepliesUrl + threadid)
    .then(response => {
      setReplies2(response.data)
      console.log("Thread special replies")
      console.log(response.data)
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
// }


const {currentStateValue, setcurrentStateValue, currentThread, setCurrentThread, setReplies, setCreating} = useContext(currentHomepageContext)
    function handleClick()
    {
      console.log("currentThread vals")
      console.log(currentThread)
      console.log(threadid)
      setCurrentThread({'ThreadID' : threadid, 'Title' : title, 'Text' : description, 'Username' : author})
      setCreating(false)
      console.log(currentThread)
    }

    return (
    <div>
        {/* <Link to = '/:id/replies'> */}
        <button className={special && "threadCard2" || !special && "threadCard"} onClick={handleClick}>
        {/* {isAdmin && <button className = "hideThread"><i class="gg-eye"></i></button>} */}
            <h1 className= "threadTitle">{title}</h1>
            <p className = "threadBody">
            {description} <br /> <br />
            <strong>This was created by : </strong>{author} <br />
            <strong>Tags : </strong>{tagsList}
            </p>

            {
              special &&

              replies2.map((reply) => (
              <Reply key={reply.id} replyid={reply.ReplyID} author={reply.Username} description={reply.Text} upvotes={reply.Upvotes} nested={false} special = {true}/>

            ))}
            
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