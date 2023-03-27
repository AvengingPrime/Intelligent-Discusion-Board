import React from "react";
import './Search.css';



const Search = () => {

    return (
        <div className="search-wrapper">
            <label htmlFor="search"></label>
            <input type="search" id="search" data-search></input>
        </div>
    );
}

export default Search