import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

const MainPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermRef = useRef(searchTerm);

  const handleSearch = (e) => {
    searchTermRef.current = e.target.value;
  };

  const handleClick = (e) => {
    searchTermRef.current = searchTermRef.current.split(" ").join("");

    Cookies.set("searchTerm", searchTermRef.current, { expires: 1 / 1000 });
    window.location.href = "/";
  };

  return (
    <div>
      <h3>Enter a word or phrase to search for on Twitter</h3>

      <p className="info-p">
        After you enter your search term, the app will search on Twitter for
        posts containing your word/phrase, analysing the sentiment of each post,
        and returning the results to you.
      </p>

      <div className="submit-term-div">
        <input
          id="twitter-search-term"
          placeholder="Enter your word or phrase here...."
          onChange={handleSearch}
        ></input>
        <button id="search-twitter-btn" onClick={handleClick} type="button">
          <span>Search For Tweets</span>
          <i className="fa fa-twitter fa-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
