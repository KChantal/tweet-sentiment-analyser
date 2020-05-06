import React, { Component } from 'react';
import Cookies from 'js-cookie';
import MainPage from '../components/MainPage';
import Login from '../components/Login';

import '../stylesheets/style.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookies: Cookies.get(),
            loggedIn: false
        };
        this.toggleLoggedInTrue = this.toggleLoggedInTrue.bind(this);
    }

    toggleLoggedInTrue() {
        console.log('trying to execute toggleLoggedInTrue');
        this.setState({ loggedIn: true });
    }

    componentDidMount() {
        console.log('All visible cookies: ', this.state.cookies);
        const isLoggedIn = Cookies.get('loggedInStatus');
        if (isLoggedIn === 'yes') {
            this.setState({loggedIn: true});
        }
    }

    render() {
        

        if (this.state.loggedIn === false) {
            return (
                <div className="mainBox">
                    <Login />
                </div>    
            )
        } else if (this.state.loggedIn === true) {
            return (
                <div className="mainBox">
                    <h2>Welcome,<span id="username">{this.state.cookies.username}</span>!</h2>
                    <h2>You are now logged in!</h2>
                    
                    <MainPage />
                </div>
            )
        }
    }
        
}

export default Main;