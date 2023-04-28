import React from "react";
import '../styles/Search.css';



const Search = () => {

    return (
        <div className="search-wrapper">
            <label htmlFor="search"></label>
            <input className = "searchInput" type="search" id="search" data-search></input>
        </div>
    );
}

export default Search