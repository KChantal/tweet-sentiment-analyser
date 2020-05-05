import React, { Component } from 'react';
import Main from './components/Main';
import Login from './components/Login';

import './stylesheets/style.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    render() {
        console.log(this.state);

        if (this.state.loggedIn === false) {
            return (
                <div className="mainBox">
                    <h1>Hi, I'm the React app</h1>
                    <Login />
                </div>    
            )
        }
        return (
            <div className="mainBox">
                <h1>Welcome, you are now logged in!</h1>
                <Main />
            </div>

        )
    }
        
}

// const App = (props) => {
//     return(
//         <div>
//             <h1>Hi, I'm the React app</h1>
//             <Login />
//         </div>
//     )
// }

export default App;