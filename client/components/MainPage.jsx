import React, { Component } from 'react';




const MainPage = (props) => {
    return(
        <div>
            <h1>Well, hello there! You are now free to use the app!</h1>

            <div className="submit-term-div">
                <input id="twitter-search-term" placeholder="Enter your word or phrase here...."></input>
                <button type="submit" id="search-twitter-btn"><span>Search For Tweets</span><i className="fa fa-twitter fa-lg"></i></button> 
            </div>
        </div>
    )
}

export default MainPage;