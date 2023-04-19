import React, {useContext} from "react";
import '../styles/Thread.css';
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import {Link } from "react-router-dom";
import { AdminContext } from "../App";


const Thread = ({title, description, author, tags, isHidden}) => {
//const Thread = ({threadData}) => {
//const [details, setDetails] = useState([]);
const tagsList = tags.join(', ');
const hidden = isHidden;
const {isAdmin} = useContext(AdminContext);
/*
    useEffect(() => {
        setDetails(threadData.items)
    })
*/   
    if (hidden) {
        return <div>
            this thread is now hidden
        </div>;
    }

    else {
    return(
    <div>
        <Link to = '/:id/replies'>
        <button className="threadCard" >
        {isAdmin && <button className = "hideThread"><i class="gg-eye"></i></button>}
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
        </Link>
        
        </div>
    )
}
}
export default Thread