import React, { Component } from "react";
import { BallSpinFadeLoader } from "react-pure-loaders";
import Cookies from "js-cookie";
import MainPage from "../components/MainPage";
import Login from "../components/Login";
import AnalysisResults from "../components/AnalysisResults";

import "../stylesheets/style.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: Cookies.get(),
      loggedIn: false,
      searchTerm: Cookies.get("searchTerm"),
      loading: true,
      dataFound: Cookies.get("hasResults"),
      sentimentData: Cookies.get("sentimentData"),
      words: Cookies.get("words"),
      resultsIn: false,
    };
    this.toggleLoggedInTrue = this.toggleLoggedInTrue.bind(this);
  }

  toggleLoggedInTrue() {
    this.setState({ loggedIn: true });
  }

  componentDidMount() {
    // console.log('All visible cookies: ', this.state.cookies);

    // console.log('this.state.sentimentData: ', this.state.sentimentData);
    // console.log('this.state.words: ', this.state.words);
    // console.log('dataFound: ', this.state.dataFound);

    const isLoggedIn = Cookies.get("loggedInStatus");

    if (isLoggedIn === "yes") {
      this.setState({ loggedIn: true });
    }
    if (this.state.searchTerm) {
      this.setState({ loading: true });
      window.location.href = "/api/search/search";
    }
    // if results returned and haven't already been processed
    if (this.state.dataFound && !this.state.resultsIn) {
      this.setState({ resultsIn: true });
    }
  }

  render() {
    // On first render - prompt user to log in
    if (this.state.loggedIn === false) {
      return (
        <div className="mainBox">
          <Login />
        </div>
      );
    }

    // if results come in, re-render with analysis results component
    else if (
      this.state.loggedIn === true &&
      !this.state.searchTerm &&
      this.state.dataFound
    ) {
      return (
        <div className="mainBox resultsBox">
          <AnalysisResults
            sentimentData={this.state.sentimentData}
            words={this.state.words}
          />
        </div>
      );
    } else if (this.state.loggedIn === true && !this.state.searchTerm) {
      return (
        <div className="mainBox">
          <h2>
            Welcome, <span id="username">{this.state.cookies.username}</span>!
          </h2>

          <MainPage />
        </div>
      );
    } else if (
      this.state.loggedIn === true &&
      this.state.searchTerm !== null &&
      !this.state.dataFound
    ) {
      return (
        <div className="mainBox">
          <h2>Just a moment while we search Twitter</h2>

          <p>Searching...</p>
          <br></br>
          <br></br>
          <BallSpinFadeLoader
            color="black"
            loading={this.state.loading}
            className="loading-comp"
          />
        </div>
      );
    }
  }
}

export default Main;
