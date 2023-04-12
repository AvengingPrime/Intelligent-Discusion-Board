import React from "react";
import Thread from "../components/Thread"
import Taskbar from "../components/Taskbar"
import Dashboard from "../components/Dashboard"
import ClassThread from "../components/ClassThread"
import Search from "../components/Search"
import Vote from "../components/Vote"
import Create from "./Create";
import '../styles/HomePage.css'

import { useState, useEffect } from "react";

/*
  

  const searchInput = document.querySelector("[data-search]")

  searchInput.addEventListener("input", (e) => {
  const value = e.target.value
  console.log(value)
})
*/

function HomePage() {
 
  /*
  const [threadList, setThreadList] = useState([]);

  function addThread(e) {
    const threadtopic = threadTopicRef.current.value
    if (threadtopic === '') return
    const threadbody = threadBodyRef.current.value
    if (threadbody === '') return

  }

  useEffect(() => {
  fetch('http://localhost:3000/')
  .then(response => {
    if (response.ok) {
      return response.json()
    }
    throw response;
  })
  .then(threadList => {
    setThreadList(threadList);
  })
  .catch(error => {
    console.error("Error : ", error);
  })
}, [])
*/


  /*
  const createThread = () => {
    fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({
        Thread,
        userID: localStorage.getItem("id"),
      }),
      headers: {}
      })
    }),
  }
  */

  /*
  const [query, setQuery] = useState("");
  */

  return (
    <main>
    <Taskbar />
    <Dashboard />
    <Search />
    <ClassThread />

    <Thread />

    {/* Threads will be populated based on the storedThreads in ClassThread 
      <div className="container">
        {threadList.map((Thread) => (
          <div className = "threadInstance" key = {Thread.id}>
            <p>{Thread.title}</p>
            <div className='reactcontainer'>
              <Vote />
            </div>
          </div>
        ))}
      </div>
    */}
    
    
    </main>
  );
}

export default HomePage;
