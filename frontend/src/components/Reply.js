import React from "react";
import '../styles/Reply.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import Vote from "./Vote";
import {Link } from "react-router-dom";

const Reply = () => {
    return (
        <div>
            <button className="replyCard" >
            
            <h3 classname= "replyAuthor">reply-author-reply-author-</h3>

            <body>reply-content-reply-content-reply-content-reply-content-reply-content-
            reply-content-reply-content-reply-content-reply-content-reply-content-reply-content-
            reply-content-reply-content-reply-content-reply-content-reply-content-reply-content-
            </body>

            <Vote />
            
            </button>
        </div>
    )
}

export default Reply