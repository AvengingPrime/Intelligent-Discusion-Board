import React from "react";
import Thread from "../components/Thread"
import Reply from "../components/Reply"
import Taskbar from "../components/Taskbar"
import Dashboard from "../components/Dashboard"
import axios from "axios";
import {useState, useEffect} from "react";

import Search from "../components/Search"
import '../styles/Replies.css'
// consider putting args in function Replies(____ , ____) 
function Replies(threadReplies) {

//url = getURL();
const url = 'http://localhost:3000/getThreadReplies/0000000004'
const [replies, setReplies] = useState([]);
const [thread, setThread] = useState([]);
useEffect(() => {
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
}, [])
  
    return (
      <div className="container">
      {/* Threads will be populated based on the storedThreads in ClassThread */}
      <Taskbar/>
      <Search/>
      <Thread title={thread.Title} description={thread.Text} author={thread.PosterID} tags={['tags', 'go', 'here']} />
      {replies.map((reply) => (
        <Reply key={reply.id} author={reply.PosterID} description={reply.Text} />
      ))}
      </div>
    );
}

export default Replies;

// const url2 = "http://localhost:3000/getThread/0000000004"

//   axios.get(url2)
//   .then(response => {
//    setThread(response.data);
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
//       console.log("Error", err.message);
//     } else {
//       // some other errors
//       console.log("Error", err.message);
//     }
//   });