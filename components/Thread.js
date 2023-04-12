import React from "react";
import '../styles/Thread.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import Vote from "./Vote";
import {Link } from "react-router-dom";


const Thread = () => {

    

    return(
    <div>
        <Link to = '/:id/replies'>
        <button className="threadCard" >
        
            <h1 classname= "threadTitle">question-question-question-question-question-question-question-question
            question-</h1>

            <body>question-content-question-content-question-content-question-content-
            question-content-question-content-question-content-question-content-question-content-
            question-content-question-content-question-content-question-content-question-content-
            question-content-question-content-question-content-question-content-question-content-
            </body>

            

            <body className = "threadTags">Tags:
            </body> 
            {/* array of tags go here ^ */}

            
            
        </button>
        </Link>
        </div>
    )
}

export default Thread