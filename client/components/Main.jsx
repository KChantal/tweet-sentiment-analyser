import React, { Component } from 'react';




const Main = (props) => {
    return(
        <div>
            <h1>Hi, I'm the Main component</h1>

            <input id="twitter-search-term" placeholder="Enter your word or phrase here...."></input>
            <button type="submit">Search on Twitter</button> 
        </div>
    )
}

export default Main;