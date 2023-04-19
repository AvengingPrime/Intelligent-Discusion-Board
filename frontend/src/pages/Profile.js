import React from "react";
import Taskbar from "../components/Taskbar"
import Search from "../components/Search"
import '../styles/Profile.css'

function Profile() {

    /*
    const [query, setQuery] = useState("");
    */
  
    return (
      <div className="container">
      <Taskbar />
      <Search />
      

      </div>
    );
  }
  
  export default Profile;