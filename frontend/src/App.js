import React from "react";
import { useState, useEffect, createContext } from "react";
import Thread from "./components/Thread"
import Taskbar from "./components/Taskbar"
import Dashboard from "./components/Dashboard"
import ClassThread from "./components/ClassThread"
import Search from "./components/Search"
import TestComponent from "./components/TestComponent";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Replies from "./pages/Replies";
import Form from "./pages/Form";
//import Form from "./pages/Form";
import Test from "./pages/Test";

import './App.css'
//import './apiCalls';

/*
  import { useState } from "react";

  const searchInput = document.querySelector("[data-search]")

  searchInput.addEventListener("input", (e) => {
  const value = e.target.value
  console.log(value)
})
*/

export const AdminContext = createContext();

function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  function toggleAdmin() {
    setIsAdmin(!isAdmin)
  }

  /*
  const [query, setQuery] = useState("");
  */
  
  /*
  const url = "localhost:3000/"
  const [thread, setThread] = useState([]);

  fetch(url, {
    method: "getReply",
    headers: { "Content-Type": "application/json"}
  })
  .then(callback => {
    return callback.json();
  })

 return (
  <div>
    <h1> getThread </h1>
    {thread ? <TestComponent thread={thread} /> : <p>Loading...</p>}
  </div>
 );
};
*/
 
/*
 if (isAdmin) {
  return (
    <div>
    <BrowserRouter>

      <Routes>
        <Route path = '/' element ={<AdminPage />}         />
        <Route path = '/profile' element={<Profile />}    />
        <Route path = '/createThread' element={<Create />}/>
        <Route path = '/:id/replies' element={<Replies />}/>
        <Route path = '/testpage' element ={<Test />}         />
        
      </Routes>
    </BrowserRouter>


  </div>
  );
}
*/


/*ORIGINAL*/
  return (
    <AdminContext.Provider value = {{ isAdmin, toggleAdmin}}>
    <div>
      <BrowserRouter>

        <Routes>
          <Route path = '/' element ={<HomePage />}         />
          <Route path = '/profile' element={<Profile />}    />
          <Route path = '/Form' element={<Form />}/>
          <Route path = '/:id/replies' element={<Replies />}/>
          <Route path = '/testpage' element={<Form />} />
          
        </Routes>
      </BrowserRouter>

      {/* <br/> <button onClick = {toggleAdmin}> toggle admin view </button> */}
    </div>
    
  </AdminContext.Provider>
  );
}

export default App;
