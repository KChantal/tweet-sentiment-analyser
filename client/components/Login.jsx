import React, { Component } from 'react';

// const sendToTwitter = () => {
//     console.log('Inside sendToTwitter function')
// }

const Login = (props) => {
    return(
        <div className="login-box">
            <h3>Please log in first!</h3> 

            <button onClick={() => window.location.href='/api/twitter/login'}>
                <img src="https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/icons/sign-in-with-twitter-gray-1-png-img-fullhd-medium.png.img.fullhd.medium.png">
                </img>
            </button>
        </div>
    )
}

export default Login;

