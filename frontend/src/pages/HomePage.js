import React from "react";
import Thread from "../components/Thread"
import Taskbar from "../components/Taskbar"
import Dashboard from "../components/Dashboard"
import ClassThread from "../components/ClassThread"
import Search from "../components/Search"
import Vote from "../components/Vote"
import Create from "./Create";
import Replies from "./Replies.js"
import '../styles/HomePage.css'

import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const currentHomepageContext = createContext();

/*
  

  const searchInput = document.querySelector("[data-search]")

  searchInput.addEventListener("input", (e) => {
  const value = e.target.value
  console.log(value)
})
*/

function HomePage() {
  
 const isAdmin = false;
  /*
  const [threadList, setThreadList] = useState([]);

  function addThread(e) {
    const threadtopic = threadTopicRef.current.value
    if (threadtopic === '') return
    const threadbody = threadBodyRef.current.value
    if (threadbody === '') return

  }

  useEffect(() => {
  fetch('http://10.176.67.70:3000/')
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

const getSectionsOfUserURL = 'http://localhost:3000/getSectionsOfStudent/0000000001' // get sections of student 1 {$userID}
const [threads, setThreads] = useState([]);
const [sectionidarray, setsectionidarray] = useState([]);
const [currentStateValue, setcurrentStateValue] = useState("0000000000");
const [classThread, setclassThread] = useState([]);
const [currentThread, setCurrentThread] = useState({'ThreadID' : "0000000000", 'Title' : "NULL", 'Text' : "NULL", 'Username' : "NULL"});
const [replies, setReplies] = useState([]);


// grabs the sections from userID
useEffect(() => {
  axios.get(getSectionsOfUserURL)
.then(response => {
  const tempData = response.data
  console.log("the first response is ")
  console.log(tempData[0].SectionID)
  // console.log(tempData[1])
  setcurrentStateValue(tempData[0].SectionID)
  console.log(currentStateValue)
  setsectionidarray(tempData)
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
    console.log("Error 3", err.message);
  } else {
    // some other errors
    console.log("Error 4", err.message);
  }
});
}, [])

// function handleClick(sectionid) {
//   setcurrentStateValue(sectionid)
// }
//handleClick(0000000002);
//setcurrentStateValue(sectionidarray[1].SectionID)
// console.log("sectionidarray")
// console.log(sectionidarray)
// console.log("current state value")
// console.log(currentStateValue)
const currentSection = currentStateValue//[0].SectionID //sectionidarray[0]['SectionID']
// console.log(" current section is ")
// console.log(currentSection)
const getThreadsForSectionUrl = `http://localhost:3000/getThreadForSection/`
const getSectionUrl = `http://localhost:3000/getSection/`
// console.log(getThreadsForSectionUrl + JSON.stringify(currentStateValue).substring(1,11))
// console.log(getSectionUrl + JSON.stringify(currentStateValue).substring(1,11))
// console.log("1st use effect current state val")
// console.log(sectionidarray);

// console.log("classThread is this : ")
// console.log(classThread)
// grabs threads from sectionID class thread useEffect
useEffect(() => {
axios.get(getThreadsForSectionUrl + JSON.stringify(currentStateValue).substring(1,11))
.then(response => {
  console.log("Threads here")
  console.log(response)
  console.log(getThreadsForSectionUrl + JSON.stringify(currentStateValue))
  setThreads(response.data);
  // setCurrentThread(response.data[0])
  // console.log("Current Thread is")
  // console.log(currentThread)
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
}, [currentStateValue])

// fetch class thread values
useEffect(() => {
  axios.get(getSectionUrl + JSON.stringify(currentStateValue).substring(1,11))
  // axios.get(getSectionUrl + "0000000001")
  .then(response => {
    console.log(" getsection got this : ")
    console.log(response.data)
    setclassThread(response.data)
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
}, [currentStateValue])

const getRepliesUrl = 'http://localhost:3000/getThreadReplies/'

useEffect(() => {
  console.log("Replies URL Current Thread")
  console.log((currentThread.ThreadID))

  // axios.get(getRepliesUrl + JSON.stringify(currentThread.ThreadID).substring(1,11))
  axios.get(getRepliesUrl + currentThread.ThreadID)
  .then(response => {
   setReplies(response.data);
   console.log("REPLIES HERE 1.0")
   console.log(response.data)
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
      console.log("Error", err.message);
    } else {
      // some other errors
      console.log("Error", err.message);
    }
  });
}, [currentThread])

console.log('Data found was : ', threads);

  return (
    <div>
      <currentHomepageContext.Provider value ={{currentStateValue, setcurrentStateValue, currentThread, setCurrentThread}} >
        <Taskbar />
        <Dashboard sections={sectionidarray}/>
        <Search />
        
        <ClassThread coursename={classThread.CourseName} coursenumber={classThread.CourseNumber}
        description={classThread.Description} professorname={classThread.Professor}/>   
        
        {currentThread.ThreadID == "0000000000" &&
          threads.map((thread) => (
            <Thread key={thread.id} threadid={thread.ThreadID} title={thread.Title} description={thread.Text} author={thread.Username} />
          ))}
        
        {
          currentThread.ThreadID != "0000000000" && 
            <Replies replies={replies} thread={currentThread}/>
        }    
      </currentHomepageContext.Provider>
    </div>
  );
}

export default HomePage;

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
    {/*
    {threadArray.map(thread => (
      <Thread key = {thread.threadID} data={thread} />
    ))}
    <Thread title={"title"} description={"description"} author={"author"} tags={['tags', 'go', 'here']} isHidden = {false} />
    <Thread title={test.Title} description={test.Text} author={test.PosterID} tags={['tags', 'go', 'here']} isHidden = {false} />
    */} 