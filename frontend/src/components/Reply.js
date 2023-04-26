import React from "react";
import '../styles/Reply.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import Vote from "./Vote";
import {Link } from "react-router-dom";

const Reply = ({author, description}) => {
    return (
        <div>
            <button className="replyCard" >
            
            <h3 classname= "replyAuthor">{author}</h3>

            <body>{description}</body>

            <Vote />
            
            </button>
        </div>
    )
}

export default Reply