import React from "react";
import '../styles/Reply.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import axios from 'axios';
import Vote from "./Vote";
import {Link } from "react-router-dom";

const Reply = ({replyid, author, description, upvotes}) => {

    const [replies, setReplies] = useState([])

    const getSubRepliesUrl = `http://localhost:3000/getSubReplies/`

    useEffect(() => {
        console.log('getSubRepliesUrl')
        console.log(getSubRepliesUrl + replyid)
        console.log(replyid)
        axios.get(getSubRepliesUrl + replyid)
        // axios.get(getSectionUrl + "0000000001")
        .then(response => {
          console.log(" getSubReplies got this : ")
          console.log(response.data)
          setReplies(response.data)
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
            console.log("Error here", err.message);
          } else {
            // some other errors
            console.log("Error here 2", err.message);
          }
        });
      }, [])
    
    return (
        <div>
            <button className="replyCard" >
            
            <h3 classname= "replyAuthor">{author}</h3>

            <body>{description}</body>

            {replies != [] &&
                replies.map((reply) => (
                <Reply key={reply.id} replyid={reply.ReplyID} author={reply.Username} description={reply.Text} upvotes={reply.Upvotes} />
            ))}

            <Vote count ={upvotes} />
            
            </button>
        </div>
    )
}

export default Reply