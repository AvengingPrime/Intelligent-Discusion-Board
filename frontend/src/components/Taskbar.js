import React, { useContext} from "react";
import {Link } from "react-router-dom";
import '../styles/Taskbar.css';
import logo from '../images/header_ECS_White.png'

import { AdminContext } from "../App";



const Taskbar = () => {
const {isAdmin} = useContext(AdminContext);
    return (
        <div className = "sticky">
            <div className = "Taskbar">
                <div className = "TaskbarButtons">
                
                <Link to ='/HomePage' className="functionButton">
                    <button>
                        Home
                    </button>
                </Link>

                <Link to ='/profile' className = "functionButton">
                    <button>
                        Profile
                    </button>
                </Link>
                <Link to ='/Form' className = "functionButton" >
                    <button>
                        Ask a Question
                    </button>
                </Link>
                <Link to ='/testingpage' className="functionButton">
                    {
                    isAdmin && 
                    <button>
                        ADMIN VIEW = TRUE
                    </button>
                    }
                </Link>
                    
                <img className = "logo" src={logo} alt= "The University of Texas at Dallas" />
                </div>
                
            </div>
        </div>
    )
}

export default Taskbar