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
function Replies(thread, replies) {

  console.log("REPLIES/THREADS HERE")
  // console.log(replies)
  console.log(thread)

//url = getURL();
  return (
    <div className="container">
    {/* Threads will be populated based on the storedThreads in ClassThread */}
    {/* <Taskbar/>
    <Search/> */}
    <Thread title={thread.thread.Title} description={thread.thread.Text} author={thread.thread.Username} tags={['tags', 'go', 'here']} threadType = {thread.thread.ThreadType} replyStage = {true} />
    {thread.replies != [] && 
      thread.replies.map((reply) => (
      <Reply key={reply.id} replyid={reply.ReplyID} author={reply.Username} description={reply.Text} upvotes={reply.Upvotes} nested={false} />
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