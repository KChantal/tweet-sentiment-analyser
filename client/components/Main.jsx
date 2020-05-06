import React, { Component } from 'react';
import { BallPulse, BallSpinFadeLoader,  BallZigZagDeflect } from 'react-pure-loaders';
import Cookies from 'js-cookie';
import MainPage from '../components/MainPage';
import Login from '../components/Login';

import '../stylesheets/style.css';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookies: Cookies.get(),
            loggedIn: false,
            searchTerm: Cookies.get('searchTerm'),
            loading: true
        };
        this.toggleLoggedInTrue = this.toggleLoggedInTrue.bind(this);
    }

    toggleLoggedInTrue() {
        this.setState({ loggedIn: true });
    }

    componentDidMount() {
        console.log('All visible cookies: ', this.state.cookies);
        console.log(this.state.searchTerm);
        
        const isLoggedIn = Cookies.get('loggedInStatus');
        if (isLoggedIn === 'yes') {
            this.setState({loggedIn: true});
        }
        if (this.state.searchTerm) {
            this.setState({ loading: true });
            window.location.href = '/api/search/search';
        }
    }

    render() {
        

        if (this.state.loggedIn === false) {
            return (
                <div className="mainBox">
                    <Login />
                </div>    
            )
        } else if (this.state.loggedIn === true && !this.state.searchTerm) {
            return (
                <div className="mainBox">
                    <h2>Welcome, <span id="username">{this.state.cookies.username}</span>!</h2>

                    <MainPage />
                </div>
            )
        }  
        else if (this.state.loggedIn === true && this.state.cookies.searchTerm !== null && !this.state.dataFound) {
            return (
                <div className="mainBox">
                    <h2>Just a moment while we search Twitter</h2>

                    <p>Searching...</p>
                    <br></br>
                    <br></br>
                    <BallSpinFadeLoader color="black" loading={this.state.loading} className="loading-comp" />
                </div>

            )
        } 
    }
        
}

export default Main;