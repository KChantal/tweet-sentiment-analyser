import React, { Component } from 'react';

const sendToTwitter = () => {
    console.log('Inside sendToTwitter function')
}

const Login = (props) => {
    return(
        <div className="login-box">
            <h3>Please log in first!</h3> 

            <button onClick={() => window.location.href='https://api.twitter.com/oauth/request_token'}>Log in with Twitter</button>
        </div>
    )
}

export default Login;

