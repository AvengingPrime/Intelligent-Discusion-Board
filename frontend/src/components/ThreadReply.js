import React from "react";
import '../styles/ThreadReply.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import Vote from "./Vote";

const ThreadReply = ({description, author}) => {
    {/*
    const [votes, setvotes] = useState(0);


    useEffect(() => {

    })


    const upvote = () => {
        setvotes(votes + 1);
    };

    const downvote = () => {
        setvotes(votes - 1);
    };
    */}

    return(
        <div className="replyCard">

            <h1 classname= "replyTitle">{author}</h1>

            <body>{description}</body>
            

            <Vote />

        </div>
    )
}

export default ThreadReply