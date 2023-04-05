import React from "react";
import Thread from "../components/Thread"
import Taskbar from "../components/Taskbar"
import Dashboard from "../components/Dashboard"

import Search from "../components/Search"
import '../styles/Replies.css'

function Replies() {

    /*
    const [query, setQuery] = useState("");
    */
  
    return (
      <div className="container">
      <Taskbar />
      <Dashboard />
      <Search />
  
      {/* Threads will be populated based on the storedThreads in ClassThread */}
      <Thread />

      
      </div>
    );
  }
  
  export default Replies;
  