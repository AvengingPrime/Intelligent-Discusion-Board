import React from "react";
import Thread from "../components/Thread"
import Reply from "../components/Reply"
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
      <Thread title="title" description="description" author="author" tags={['tags', 'go', 'here']} />
      <Reply author="test reply author" description = "description reply" />

      
      </div>
    );
  }
  
  export default Replies;
  