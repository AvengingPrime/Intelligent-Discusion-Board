import React from "react";
import Thread from "../components/Thread"
import Taskbar from "../components/Taskbar"
import Dashboard from "../components/Dashboard"
import ClassThread from "../components/ClassThread"
import Search from "../components/Search"
import Vote from "../components/Vote"
import Create from "./Create";
import '../styles/HomePage.css'

import axios from "axios";
import { useState, useEffect } from "react";

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

const [threadData, setthreadData] = useState([]);

const test = {
  Title: "this is test",
  Text:  "this is test text",
  PosterID: "this is test posterID"
};

const url = 'http://localhost:3000/getThread/0000000001'
useEffect(() => {

/*
async function fetchData() {
  const response = await fetch('http://10.176.67.70:3210/getThread/0000000001');
  const json = await response.json();
  setthreadData(json);
}

fetchData();
*/

axios.get(url)
.then(response => console.log(response.data))
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


/*
var responseClone;
fetch('http://10.176.67.70:3210/getThread/0000000001')
.then(function (response) {
  responseClone = response.clone();
  return response.json();
})
.then(console.log, function (rejectionReason) {
  console.log('Error parsing JSON from response:', rejectionReason, responseClone);
  responseClone.text()
  .then(function (bodyText) {
    console.log('Received the following instead of JSON : ', bodyText);
  });
})
.catch (error => {
  console.error("error : ", error);
})
*/

}, [])

//console.log('Data found was : ', threadData);

/*
fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
*/
  /*
  const createThread = () => {
    fetch("http://10.176.67.70:3210:3000/", {
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
if (isAdmin) {
  return (
    <main>
    <Taskbar />
    <Dashboard />
    <Search />
    <ClassThread />
    {/*<Thread title={threadData.Title} description={threadData.Text} author={threadData.PosterID} tags={['tags', 'go', 'here']} isHidden = {false} />*/}
    </main>
  )
}

else
{
  return (
    <main>
    <Taskbar />
    <Dashboard />
    <Search />
    <ClassThread />
    <Thread title={"title"} description={"description"} author={"author"} tags={['tags', 'go', 'here']} isHidden = {false} />
    <Thread title={test.Title} description={test.Text} author={test.PosterID} tags={['tags', 'go', 'here']} isHidden = {false} />
    <Thread title={threadData.Title} description={threadData.Text} author={threadData.PosterID} tags={['tags', 'go', 'here']} />
    

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
}
export default HomePage;
