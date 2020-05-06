import React, { Component } from 'react';

// const sendToTwitter = () => {
//     console.log('Inside sendToTwitter function')
// }

const Login = (props) => {
    console.log(props);
    return(
        <div className="login-box">
            <h4>Please log into Twitter first</h4> 

            <button onClick={() => window.location.href='/api/twitter/login'} 
                    onSubmit={props.toggleLoggedInTrue}
                    id="twitter-login-btn" 
                    type="submit">
                <i className="fa fa-twitter fa-2x"></i>  <span>Sign in with Twitter</span>
            </button>
        </div>
    )
}

export default Login;

