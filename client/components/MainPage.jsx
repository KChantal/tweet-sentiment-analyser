import React, { Component, useEffect } from 'react';
import Cookies from 'js-cookie';



const MainPage = (props) => {
    const handleSearch = (e) => {
        let input = e.target.parentNode.querySelector("input").value;
        Cookies.set('searchTerm', input);
        // e.target.parentNode.querySelector("input").value = null;
        window.location.href = '/api/search/search';
    }

    return(
        <div>
            <h3>Enter a word or phrase to search for on Twitter</h3>

            <p className="info-p">When you enter your search term, the app will search it on Twitter,
                and return the results to you.
            </p>

            <div className="submit-term-div">
                <input id="twitter-search-term" placeholder="Enter your word or phrase here...."></input>
                <button id="search-twitter-btn"
                        onClick={handleSearch}
                        type="button">
                            <span>Search For Tweets</span>
                            <i className="fa fa-twitter fa-lg"></i>
                </button> 
            </div>
        </div>
    )
}

export default MainPage;