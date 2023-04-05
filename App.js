import React from "react";
import Thread from "./components/Thread"
import Taskbar from "./components/Taskbar"
import Dashboard from "./components/Dashboard"
import ClassThread from "./components/ClassThread"
import Search from "./components/Search"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Replies from "./pages/Replies";
import Create from "./pages/Create";
import './App.css'


/*
  import { useState } from "react";

  const searchInput = document.querySelector("[data-search]")

  searchInput.addEventListener("input", (e) => {
  const value = e.target.value
  console.log(value)
})
*/

function App() {

  /*
  const [query, setQuery] = useState("");
  */

  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path = '/' element ={<HomePage />}         />
          <Route path = '/profile' element={<Profile />}    />
          <Route path = '/createThread' element={<Create />}/>
          <Route path = '/:id/replies' element={<Replies />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
